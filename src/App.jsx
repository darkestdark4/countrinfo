import { useEffect, useState } from 'react'
import { getCountries, searchCountry } from './api.js'
import { UserIcon, PhoneIcon, MagnifyingGlassIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline'
const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getAllCountries()
  }, [])

  const getAllCountries = () => {
    getCountries().then(result => {
      setCountries((result))
    }).catch(error => {
      console.log(error)
    })
  }

  const search = async (query) => {
    if(query === '') {
      getAllCountries()
    } else {
      if(query.length > 3) {
        const result = await searchCountry(query)
        setCountries(result)
      }
    }
  }

  const PhoneList = (data) => {
    let phoneData = ''
    const root = data.data.root
    const suffixes = data.data.suffixes

    if(suffixes) {
      if(suffixes.length > 4) {
        phoneData = root
      } else {
        suffixes.forEach((phone, i) => {
          let phoneList = `${root}${phone}`
          if(phoneList.length > 4) {
            phoneList = `${root}-${phone}`
          }

          if((suffixes.length - 1) == i) {
            phoneData += phoneList
          } else {
            phoneData += `${phoneList}, `
          }
        })
      }
    } else {
      phoneData = '-'
    }

    return phoneData
  }

  const CountryList = () => {
    return countries.map((country, i) => {
      return (
        <div key={i} className="flex flex-col bg-white drop-shadow-md">
          <div className="bg-cover bg-no-repeat bg-center w-full h-40" style={{ backgroundImage: `url(${country.flags.png})` }}></div>
          <div className="flex flex-col p-5 ">
            <div className="text-sm">
              <h3 className="font-bold uppercase">{country.name.common}</h3>
              {/*<p>{country.name.official}</p>*/}
            </div>
            <div className="flex flex-col mt-5 gap-2 text-sm">
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2"></UserIcon>
                Population :&nbsp;
                {new Intl.NumberFormat().format(country.population)}
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2"></PhoneIcon>
                Phone Code :&nbsp;
                <PhoneList data={country.idd}></PhoneList>
              </div>
              <div className="flex items-center">
                <GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2"></GlobeAsiaAustraliaIcon>
                Continent :&nbsp;
                {country.continents[0]}
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return <div className="bg-gray-100">
    <h2 className="text-center font-bold text-4xl p-7">Country Info</h2>

    <div className="flex flex-col md:p-20 p-5">
      <div className="relative flex justify-between items-center mb-10">
        <MagnifyingGlassIcon className="w-4 h-4 absolute z-50 text-gray-500 ml-4"></MagnifyingGlassIcon>
        <input type="text"
          className="w-1/4 h-full py-4 pr-4 pl-12 text-sm text-gray-500 caret-gray-500 drop-shadow-lg focus:outline-0 focus:ring-1 focus:ring-gray-300"
          placeholder="Search"
          onChange={({ target }) => search(target.value)}
        />
      </div>
      <div className="grid gap-12 md:grid-cols-4 sm:grid-cols-2">
        <CountryList></CountryList>
      </div>
    </div>
  </div>
}

export default App