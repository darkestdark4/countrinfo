import { useEffect, useState } from 'react'
import { getCountries } from './api.js'
import CountryList from './components/CountryList.jsx'
import { Listbox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const App = () => {
  const filterData = [
    { name: 'All' },
    { name: 'Asia' },
    { name: 'Oceania' },
    { name: 'Europe' },
    { name: 'Africa' },
    { name: 'Americas' },
    { name: 'Antarctic' }
  ]
  const sortData = [
    { id: 'no_sort', name: 'No Sort' },
    { id: 'low_pop', name: 'Lowest population' },
    { id: 'high_pop', name: 'Highest population' },
    { id: 'small_area', name: 'Smallest area' },
    { id: 'big_area', name: 'Biggest area' }
  ]

  const [countriesModify, setCountriesModify] = useState([])
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState(filterData[0])
  const [sort, setSort] = useState(sortData[0])

  useEffect(() => {
    resetData()
  }, [])

  const getAllCountries = () => {
    getCountries().then(result => {
      setCountries(result)
      setCountriesModify(result)
    }).catch(error => {
      console.log(error)
    })
  }

  const searchCountries = (query) => {
    let result = countries

    if(query.length > 3) {
      result = countries.filter(country => {
        // lower alphabet
        const name = country.name.common.toLowerCase()
        query = query.toLowerCase()

        return name.indexOf(query) > -1
      })
    }

    return result
  }

  const filterCountries = (data, val) => {
    let result = []

    if(val.name === 'All') {
      result = data
    } else {
      result = data.filter(item => {
        return item.region === val.name
      })
    }

    return result
  }

  const sortCountries = (data, val) => {
    let result = []

    switch(val.id) {
      case 'low_pop':
        result = data.sort((a, b) => {
          return a.population - b.population
        })
        break;
      case 'high_pop':
        result = data.sort((a, b) => {
          return b.population - a.population
        })
        break;
      case 'small_area':
        result = data.sort((a, b) => {
          return a.area - b.area
        })
        break;
      case 'big_area':
        result = data.sort((a, b) => {
          return b.area - a.area
        })
        break;
      case 'no_sort':
        result = data
        break;
    }

    return result
  }

  const modifyCountries = (type, val) => {
    let searchValue = keyword
    let filterValue = filter
    let sortValue = sort

    if(type === 'search') {
      setKeyword(val)
      searchValue = val
    } else if(type === 'filter') {
      setFilter(val)
      filterValue = val
    } else if(type === 'sort') {
      setSort(val)
      sortValue = val
    }

    let searchResult = searchCountries(searchValue)
    let filterResult = filterCountries(searchResult, filterValue)
    let sortResult = sortCountries(filterResult, sortValue)

    setCountriesModify(sortResult)
  }

  const resetData = () => {
    getAllCountries()
    setKeyword('')
    setFilter(filterData[0])
    setSort(sortData[0])
  }

  return <div className="bg-gray-100">
    <h2 className="text-center font-bold text-4xl p-7">Country Stuff</h2>

    <div className="flex flex-col md:p-20 p-5">
      <div className="flex justify-between items-center mb-10">
        {/*Search box*/}
        <div className="relative flex justify-between items-center">
          <MagnifyingGlassIcon className="w-4 h-4 absolute z-50 text-gray-500 ml-4"></MagnifyingGlassIcon>
          <input type="text"
            className="w-full h-full py-2 pr-4 pl-12 text-sm text-gray-500 caret-gray-500 drop-shadow-lg focus:outline-0 focus:ring-1 focus:ring-gray-300"
            placeholder="Search"
            value={keyword}
            onChange={({ target }) => {
              modifyCountries('search', target.value)
            }}
          />
        </div>
        
        {/*Filter and sort*/}
        <div className="flex gap-2">
          {/*Sort by area and population*/}
          <div className="w-48">
            <Listbox value={sort}
              onChange={(selected) => modifyCountries('sort', selected)}
            >
              <div className="flex flex-col relative">
                <Listbox.Button className="bg-white px-4 py-2 text-sm text-left drop-shadow-lg">
                  {sort.name}
                </Listbox.Button>
                <Listbox.Options className="bg-white text-sm absolute top-12 right-0 z-50 w-full drop-shadow-lg">
                  {sortData.map((sortItem) => (
                    <Listbox.Option key={sortItem.id} value={sortItem}
                      className="relative py-2 px-4 my-1 hover:bg-gray-200"
                    >
                      {sortItem.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          
          {/*Filter by region*/}
          <div className="w-40">
            <Listbox value={filter}
              onChange={(selected) => modifyCountries('filter', selected)}
            >
              <div className="flex flex-col relative">
                <Listbox.Button className="bg-white px-4 py-2 text-sm text-left drop-shadow-lg">
                  {filter.name}
                </Listbox.Button>
                <Listbox.Options className="bg-white text-sm absolute top-12 right-0 z-50 w-full drop-shadow-lg">
                  {filterData.map((continent) => (
                    <Listbox.Option key={continent.name} value={continent}
                      className="relative py-2 px-4 my-1 hover:bg-gray-200"
                    >
                      {continent.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/*Reset button*/}
          <div>
            <button className="px-4 py-2 border text-sm text-white bg-blue-400 hover:bg-blue-500 drop-shadow-lg"
              onClick={(e) => resetData()}>Reset</button>
          </div>
        </div>
      </div>
      
      {/*Data display*/}
      <div className="grid gap-12 md:grid-cols-4 sm:grid-cols-2">
        <CountryList data={countriesModify}></CountryList>
      </div>
    </div>
  </div>
}

export default App