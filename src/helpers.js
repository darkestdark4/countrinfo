export const sortDataCountry = (data, prop, param = 'asc') => {
  let result = null
  result = data.sort((a, b) => {
    if(a.name.common > b.name.common) {
      return (param === 'asc') ? 1 : -1
    }
    if(a.name.common < b.name.common) {
      return (param === 'asc') ? -1 : 1
    }
    return 0
  })

  return result
}