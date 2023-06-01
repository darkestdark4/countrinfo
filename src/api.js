import axios from "axios"
import { sortDataCountry } from './helpers.js'

const baseUrl = import.meta.env.VITE_APP_BASEURL
export const getCountries = async() => {
  const countries = await axios.get(`${baseUrl}/all`)

  // sorting data
  return sortDataCountry(countries.data, 'name', 'asc')
}

export const searchCountry = async(q) => {
  const countries = await axios.get(`${baseUrl}/name/${q}`)

  // sorting data
  return sortDataCountry(countries.data, 'name', 'asc')
}