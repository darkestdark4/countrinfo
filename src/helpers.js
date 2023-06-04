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

export const generatePhoneData = (data) => {
  let phoneString = ''
  const root = data.root
  const suffixes = data.suffixes

  if(suffixes) {
    if(suffixes.length > 4) {
      phoneString = root
    } else {
      suffixes.forEach((phone, i) => {
        let phoneList = `${root}${phone}`
        if(phoneList.length > 4) {
          phoneList = `${root}-${phone}`
        }

        if((suffixes.length - 1) == i) {
          phoneString += phoneList
        } else {
          phoneString += `${phoneList}, `
        }
      })
    }
  } else {
    phoneString = '-'
  }

  return phoneString
}

export const numberFormat = (val) => {
  return new Intl.NumberFormat().format(val)
}