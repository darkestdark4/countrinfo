import axios from "axios"
import { sortDataCountry } from './helpers.js'

const baseUrl = import.meta.env.VITE_APP_BASEURL
export const getCountries = async() => {
  const countries = await axios.get(`${baseUrl}/all`)

  // sorting data
  return sortDataCountry(countries.data, 'name', 'asc')
}

export const getCountryByCode = async(code) => {
  const country = await axios.get(`${baseUrl}/alpha/${code}`)
  return country.data
}