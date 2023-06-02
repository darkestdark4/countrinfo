import { useEffect, useState } from 'react'
import { getCountries, searchCountry, filterByRegion } from './api.js'
import CountryList from './components/CountryList.jsx'
import { Listbox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
const App = () => {
  const continents = [
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
  
  const [selectedContinent, setSelectedContinent] = useState([])
  const [selectedSort, setSelectedSort] = useState([])
  const [countriesModify, setCountriesModify] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getAllCountries()
    setSelectedSort(sortData[0])
    setSelectedContinent(continents[0])
  }, [])

  const getAllCountries = () => {
    setTimeout(() => {
      console.log(selectedSort, selectedContinent)
    }, 2000)
    
    getCountries().then(result => {
      setCountries(result)
      setCountriesModify(result)
    }).catch(error => {
      console.log(error)
    })
  }

  const searchCountries = async (query) => {
    const continent = selectedContinent.name

    if(query === '') {
      resetQuery()
    } else {
      if(query.length > 3) {
        let result = await searchCountry(query)

        if(continent !== 'All') {
          result = result.filter(item => {
            return item.region === continent
          })
        }

        setCountries(result)
      }
    }
  }

  const filterByContinent = (val) => {
    setSelectedContinent(val)
    
    if(val.name === 'All') {
      getAllCountries()
    } else {
      const result = countries.filter(item => {
        return item.region === val.name
      })
      setCountriesModify(result)
    }
  }
  
  const sortCountries = (val) => {
    let result = []
    setSelectedSort(val)
    
    switch(val.id) {
      case 'low_pop':
        result = countries.sort((a, b) => {
          return a.population - b.population
        })
        break;
      case 'high_pop':
        result = countries.sort((a, b) => {
          return b.population - a.population
        })
        break;
      case 'small_area':
        result = countries.sort((a, b) => {
          return a.area - b.area
        })
        break;
      case 'big_area':
        result = countries.sort((a, b) => {
          return b.area - a.area
        })
        break;
      case 'no_sort':
        getAllCountries()
        break;
    }
    
    if(val.id !== 'no_sort') {
      setCountriesModify(result)
    }
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
            onChange={({ target }) => searchCountries(target.value)}
          />
        </div>
        
        {/*Filter and sort*/}
        <div className="flex gap-2">
          {/*Sort by area and populatiton*/}
          <div className="w-48">
            <Listbox value={selectedSort}
              onChange={(selected) => {
                sortCountries(selected)
              }}
            >
              <div className="flex flex-col relative">
                <Listbox.Button className="bg-white px-4 py-2 text-sm text-left drop-shadow-lg">
                  {selectedSort.name}
                </Listbox.Button>
                <Listbox.Options className="bg-white text-sm absolute top-12 right-0 z-50 w-full drop-shadow-lg">
                  {sortData.map((sort) => (
                    <Listbox.Option key={sort.id} value={sort}
                      className="relative py-2 px-4 my-1 hover:bg-gray-200"
                    >
                      {sort.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          
          {/*Filter by region*/}
          <div className="w-40">
            <Listbox value={selectedContinent}
              onChange={(selected) => {
                filterByContinent(selected)
              }}
            >
              <div className="flex flex-col relative">
                <Listbox.Button className="bg-white px-4 py-2 text-sm text-left drop-shadow-lg">
                  {selectedContinent.name}
                </Listbox.Button>
                <Listbox.Options className="bg-white text-sm absolute top-12 right-0 z-50 w-full drop-shadow-lg">
                  {continents.map((continent) => (
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