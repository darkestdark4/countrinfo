import { useEffect, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import { getCountryByCode } from './api.js'
import { generatePhoneData, numberFormat } from './helpers.js'
import Pill from './components/Pill.jsx'
import {
  ArrowUturnLeftIcon, BuildingOffice2Icon,
  PhoneIcon, GlobeAsiaAustraliaIcon,
  MapIcon, GlobeAltIcon, EllipsisHorizontalCircleIcon,
  LanguageIcon, UserGroupIcon
} from "@heroicons/react/24/outline/index.js";

export async function loader({ params }) {
  const country = await getCountryByCode(params.id)
  return { country }
}

const CountryDetail = () => {
  const [bordersName, setBordersName] = useState([])
  const { country } = useLoaderData()
  const data = country[0]

  useEffect(() => {
    getBorderData()
  }, [])

  const getBorderData = () => {
    const borders = data.borders
    
    if(borders) {
      borders.forEach(async (border) => {
        const borderQuery = await getCountryByCode(border)
        const borderItem = {
          code: borderQuery[0].cca3,
          name: borderQuery[0].name.common
        }
        
        setBordersName(prevValues =>
          (checkSameBorder(prevValues, borderItem) ? [ ...prevValues, borderItem ] : [...prevValues])
        )
      })
    }
  }
  const checkSameBorder = (data, borderItem) => {
    const check = data.filter(item => {
      return item.name === borderItem.name
    })
    
    if(check.length === 0) return true
    return false
  }

  const CoatOfArms = ({ data }) => {
    if(Object.keys(data.coatOfArms).length > 0) {
      return (<>
        <div className="flex flex-col w-72">
          <img src={ data.coatOfArms.png } className=""/>
          <p className="text-sm text-center mt-1">{ data.name.common } Coat of Arms</p>
        </div>
      </>)
    }
  }

  const PhoneData = ({ data }) => {
    if(Object.keys(data).length > 0) {
      return <p>{generatePhoneData(data)}</p>
    } else {
      return <p>-</p>
    }
  }

  const CapitalData = ({ data }) => {
    if(data !== undefined) {
      if(data.length > 0) {
        return data.map((capital, i) => {
          if((i+1) === data.length) {
            return <p key={i}>{capital}</p>
          }

          return <p key={i}>{capital},&nbsp;</p>
        })
      }
    }

    return <p>-</p>
  }

  const LanguageData = ({ data }) => {
    if(data) {
      const languages = Object.values(data)
      return languages.map((language, i) => {
        return (<>
          <Pill key={i} type="standard" bgcolor="bg-gray-300" value={language} />
        </>)
      })
    }
    
    return <>-</>
  }

  return <>
    <div className="w-screen h-screen overflow-x-hidden bg-gray-100">
      <div className="flex flex-col md:p-14 p-5">
        <div>
          <a className="inline-flex items-center border px-4 py-2 bg-white text-sm hover:bg-gray-200 drop-shadow-lg" href={`/`}>
            <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
            Back
          </a>
        </div>
        <div className="mt-14 flex md:flex-row flex-col">
          {/*Flag*/}
          <div className="md:mr-20">
            <div className="flex flex-col w-72 mb-10">
              <img src={ data.flags.png } className="" />
              <p className="text-sm text-center mt-1">{ data.name.common } Flag</p>
            </div>
            <CoatOfArms data={data} />
          </div>

          {/*Information*/}
          <div className="px-6 py-10 w-full">
            {/*Title*/}
            <div>
              <h3 className="text-3xl font-bold mb-2">{ data.name.common }</h3>
              <p className="text-sm mb-1">{ data.name.official }</p>
              <p className="text-sm italic text-gray-500">
                { data.altSpellings.map((item, i) => {
                  if(data.altSpellings.length === (i+1)) {
                    return item
                  }
                  
                  return `${item} - `
                })}
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center my-3">
                <BuildingOffice2Icon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Capital City :&nbsp;</p>
                <CapitalData data={data.capital} />
              </div>
              <div className="flex items-center my-3">
                <PhoneIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Phone Code :&nbsp;</p>
                <PhoneData data={data.idd} />
              </div>
              <div className="flex items-center my-3">
                <GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Region :&nbsp;</p>
                <p>{ data.region }</p>
              </div>
              <div className="flex items-center my-3">
                <GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Subregion :&nbsp;</p>
                <p>{ (data.subregion !== undefined) ? data.subregion : '-' }</p>
              </div>
              <div className="flex items-center my-3">
                <MapIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Area :&nbsp;</p>
                <p>{numberFormat(data.area)} km<sup>2</sup></p>
              </div>
              <div className="flex items-center my-3">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Population :&nbsp;</p>
                <p>{numberFormat(data.population)}</p>
              </div>
              <div className="flex items-center my-3">
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Domain :&nbsp;</p>
                <div>
                  { data.tld.map((tld, i) => {
                    return (<>
                      <Pill key={i} type="standard" bgcolor="bg-gray-300" value={tld} />
                    </>)
                  }) }
                </div>
              </div>
              <div className="flex items-center my-3">
                <MapIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Maps :&nbsp;</p>
                <Pill type="link" bgcolor="bg-gray-300" value='Google Maps'
                  addprop={{ link: data.maps.googleMaps, hover: 'bg-gray-400', newPage: true }}
                />
                <Pill type="link" bgcolor="bg-gray-300" value='OpenStreetMap'
                  addprop={{ link: data.maps.openStreetMaps, hover: 'bg-gray-400', newPage: true }}
                />
              </div>
              <div className="flex flex-wrap items-center my-3">
                <EllipsisHorizontalCircleIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Borders :&nbsp;</p>
                {bordersName.map((border) => {
                  return (<>
                    <Pill type="link" bgcolor="bg-gray-300" value={border.name}
                      addprop={{ link: border.code, hover: 'bg-gray-400', newPage: false }}
                    />
                  </>)
                })}
              </div>
              <div className="flex items-center my-3">
                <LanguageIcon className="w-4 h-4 mr-2" />
                <p className="font-semibold">Language :&nbsp;</p>
                <LanguageData data={data.languages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default CountryDetail