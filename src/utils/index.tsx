import { sha256 } from 'js-sha256'
import moment from 'moment'

export const generateHash = async (
  ts: string,
  token: string = '',
  data?: object
) => {
  const str =
    JSON.stringify(data) + import.meta.env.VITE_HASH_SECRET + ts + token
  const hash = sha256.hex(str).toString()
  return hash
}

export const serviceWrapper = (cb: (p: any, t: any) => any) => {
  return async (options: any, thunkApi: any) => {
    try {
      const res = await cb(options, thunkApi)
      return res?.data
    } catch (error: any) {
      throw (thunkApi as any).rejectWithValue(error)
    }
  }
}

export const throttle = (cb: any, delay = 1000) => {
  let isWaiting = false
  let oldArgs: any

  const timeout = () => {
    if (oldArgs === null) {
      isWaiting = false
    } else {
      cb(...oldArgs)
      oldArgs = null
      setTimeout(timeout, delay)
    }
  }

  return (...args: any) => {
    if (isWaiting) {
      oldArgs = args
      return
    }
    cb(...args)
    isWaiting = true
    setTimeout(timeout, delay)
  }
}

export const debounce = (cb: any, delay = 1000) => {
  let timeout: any
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

export const currencyFormat = (value: any, currency: any, decimal = 0) => {
  let symbol

  switch (true) {
    case currency === 'USD':
      symbol = <>&#36;</>
      decimal = value % 1 !== 0 ? 2 : decimal
      break

    case currency === 'KHR':
      symbol = <>&#6107;</>
      break

    default:
      decimal = value % 1 !== 0 ? 2 : decimal
      symbol = <>&#37;</>
      break
  }
  if (!value || typeof value !== 'number') return <span>0{symbol}</span>
  return (
    <span>
      {value?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0}
      {symbol}
    </span>
  )
}

export const durationFormat = (value: any, time: any) => {
  let symbol

  switch (true) {
    case time === 'year':
      symbol = value > 1 ? 'years' : 'year'
      break

    case time === 'month':
      symbol = value > 1 ? 'months' : 'month'
      break

    case time === 'week':
      symbol = value > 1 ? 'weeks' : 'week'
      break

    default:
      symbol = value > 1 ? 'days' : 'day'
      break
  }
  if (!value || typeof value !== 'number') return <span>0{symbol}</span>
  return (
    <span>
      {value || 0}
      {symbol}
    </span>
  )
}

export const durationPriceFormat = (
  value: any,
  currency: any,
  duration: any
) => {
  let symbol
  let decimal

  switch (true) {
    case currency === 'USD':
      symbol = <>&#36;</>
      decimal = value % 1 !== 0 ? 2 : 0
      break

    case currency === 'KHR':
      symbol = <>&#6107;</>
      decimal = 0
      break

    default:
      symbol = <>&#37;</>
      decimal = 0
      break
  }
  if (!value || typeof value !== 'number') return <span>0{symbol}</span>
  return (
    <span>
      {value?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0}
      {symbol}/{duration}
    </span>
  )
}

export const compareDate = (date1: any, date2: any) => {
  if (!date1 && !date2) return false

  return date1 > date2
}

export const combineDate = (date1: any, date2: any) => {
  if (!date1 && !date2) return moment(new Date()).format('L')
  if (moment(date1).format('L') === moment(date2).format('L'))
    return moment(date1).format('L')
  else return `${moment(date1).format('L')} - ${moment(date2).format('L')}`
}

export const dateFormat = (date: any = null) => {
  if (!date) return new Date().toDateString()

  const localDate = new Date(date).toDateString()
  return localDate
}

export const timeFormat = (date: any, format = 'HH:mm') => {
  if (!date) return new Date().toLocaleTimeString()

  const localDate = moment(date).format(format)
  return localDate
}

export const dateFullYear = (date = null) => {
  if (!date) return new Date().getFullYear()

  const year = new Date(date).getFullYear()
  return year
}

export const formatAttendanceDate = (dayString: any) => {
  const today = new Date()
  const year = today.getFullYear().toString()
  let month = (today.getMonth() + 1).toString()

  if (month.length === 1) {
    month = '0' + month
  }

  return dayString.replace('YEAR', year).replace('MONTH', month)
}

export const inputDateFormat = (d: any) => {
  if (!d) return ''
  if (d === '') return d

  let date = new Date(d)
  let dd: any = date.getDate()
  let mm: any = date.getMonth() + 1
  let yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return (d = yyyy + '-' + mm + '-' + dd)
}

export const inputDateTimeFormat = (d: any) => {
  if (d === '') return d

  let date = new Date(d)
  let dd: any = date.getDate()
  let mm: any = date.getMonth() + 1
  let yyyy = date.getFullYear()
  let hour: any = date.getHours()
  let minute: any = date.getMinutes()

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }

  d = [yyyy, mm, dd].join('-') + 'T' + [hour, minute].join(':')
  return d
}

export const timeDifferent = (from: any, to: any) => {
  let x = moment(from)
  let y = moment(to)
  const duration = moment.duration(x.diff(y))
  return duration.humanize()
}

export const calculateDay = (from: any, to: any) => {
  let x = moment(from)
  let y = moment(to)
  const duration = moment.duration(x.diff(y))

  return duration.asDays()
}

export const capitalizeText = (text: any) => {
  if (!text) return '...'
  return text?.charAt(0).toUpperCase() + text?.slice(1)
}

export const calculateTotalScore = (scores: any, subject = null) => {
  let total = 0
  if (subject) {
    scores?.forEach((score: any) => {
      if (score.subject === subject) total += score.score
    })
    return total
  } else {
    scores?.forEach((score: any) => {
      total += score.score
    })
    return total
  }
}

export const calculateAverageScore = (scores: any, number: any) => {
  let total = 0
  scores?.forEach((score: any) => {
    total += score.score
  })

  if (total === 0) return '0.00'
  return (total / number).toFixed(2)
}

export const calculatePercentage = (value: any, limit: any) => {
  return (value / limit) * 100 || 0
}

export const calculateGraduateResult = (scores: any, subjects: any) => {
  let totalScore = 0
  let passScore = 0
  let fullScore = 0

  scores?.forEach((score: any) => {
    totalScore += score.score
  })

  subjects?.forEach((subject: any) => {
    passScore += subject.passScore
    fullScore += subject.fullScore
  })

  const totalAverage = totalScore / subjects?.length
  const passAverage = passScore / subjects?.length
  const fullAverage = fullScore / subjects?.length

  const gradeF = passAverage
  const gradeE = passAverage + (fullAverage - passAverage) / 4
  const gradeD = gradeE + (fullAverage - passAverage) / 4
  const gradeC = gradeD + (fullAverage - passAverage) / 4
  const gradeB = gradeD + (fullAverage - passAverage) / 3
  const gradeA = fullAverage

  switch (true) {
    case totalAverage < gradeF:
      return 'F'
    case totalAverage < gradeE:
      return 'E'
    case totalAverage < gradeD:
      return 'D'
    case totalAverage < gradeC:
      return 'C'
    case totalAverage < gradeB:
      return 'B'
    case totalAverage < gradeA:
      return 'A'
  }
}

export const generateColor = () => {
  let letters = '456789AB'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)]
  }
  return color
}

export const generateId = () => {
  let letters = '1234567890ABCDEFGHIJK'
  let id = ''
  for (let i = 0; i < 10; i++) {
    id += letters[Math.floor(Math.random() * 8)]
  }
  return id
}

export const checkArrayValue = (array: any, value: any) => {
  const result = array.every((element: any) => {
    if (element === value) return true
    return false
  })
  return result
}

export const checkArraySequence = (array: any, increment: any) => {
  if (array.length < 2) return false

  let result = true
  let sortedArray = array.sort((a: any, b: any) => a - b)
  sortedArray.forEach((element: any, index: any) => {
    let nextElement = sortedArray[index + 1]

    if (!nextElement || !result) return
    if (nextElement !== element + increment) result = false
  })
  return result
}

export const calculateStructuresPrice = (structures: any, buyRate: any) => {
  let price = 0
  const structuresIds: any[] = []
  structures.forEach((structure: any) => {
    let structurePrice = structure.price.value
    if (structure.price.currency !== 'USD') structurePrice /= buyRate || 4000
    structuresIds.push(structure._id)

    switch (structure.price.duration) {
      case '1d':
        price += structurePrice / 24
        break

      case '1w':
        price += structurePrice / (24 * 7)
        break

      case '1m':
        price += structurePrice / (24 * 30.4167)
        break

      case '1y':
        price += structurePrice / (24 * 365)
        break

      default:
        price += structurePrice
        break
    }
  })
  return { price, structuresIds }
}

export const downloadFile = (url: any, filename: any) => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}

export const convertBufferToArrayBuffer = (buf: any) => {
  const ab = new ArrayBuffer(buf.length)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return ab
}

export const checkVisibleElement = (element: HTMLElement | null) => {
  if (!element) return
  const position = element.getBoundingClientRect()

  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    if (!element.id) return 'profile'
    return element.id.split('-')[0]
  }
}

export const determineObjectValue = (obj: Object) => {
  if (typeof obj !== 'object') return false
  const values = Object.values(obj)
  if (values.every((v) => v === true)) return true
  if (values.every((v) => v === false)) return false
  return 'indeterminate'
}

export const determineCheckAll = (obj: any) => {
  if (typeof obj !== 'object') return false
  let values: any = []
  Object.keys(obj).forEach((key: any) => {
    if (typeof obj[key]?.[Object.keys(obj[key])[0]] === 'object') {
      Object.keys(obj[key]).forEach((action: any) => {
        values.push(...Object.values(obj[key]?.[action]).filter(item => item !== undefined))
      })
    } else {
      values.push(...Object.values(obj[key]).filter(item => item !== undefined))
    }
  })
  if (values.length === 0) return false
  if (values.every((v: boolean) => v === true)) return true
  if (values.every((v: boolean) => v === false)) return false
  return 'indeterminate'
}

export const mergeObjects = (obj1: Object = {}, obj2: Object = {}) => {
  const mergedObj: any = {}

  for (let key in obj1) {
    if (
      typeof obj1[key as keyof typeof obj1] === 'object' &&
      typeof obj2[key as keyof typeof obj2] === 'object'
    ) {
      mergedObj[key] = mergeObjects(
        obj1[key as keyof typeof obj1],
        obj2[key as keyof typeof obj2]
      )
    } else {
      mergedObj[key] =
        obj2[key as keyof typeof obj2] ?? obj1[key as keyof typeof obj1]
    }
  }

  for (let key in obj2) {
    if (
      typeof obj2[key as keyof typeof obj2] === 'object' &&
      typeof mergedObj[key] === 'undefined'
    ) {
      mergedObj[key] =
        obj2[key as keyof typeof obj2] ?? obj1[key as keyof typeof obj1]
    }
  }

  return mergedObj
}

export const filterSelectedMenu = (privilege: any, selectedMenu: any) => {
  let filteredObj: any = {}
  Object.keys(selectedMenu).forEach(menu => {
    filteredObj = {
      ...filteredObj,
      [menu]: {}
    }
    Object.keys(selectedMenu[menu]).forEach(nav => {
      if (!selectedMenu[menu]?.[nav]) return
      filteredObj[menu] = {
        ...filteredObj[menu],
        [nav]: privilege?.[menu]?.[nav]
      }
    })
  })
  return filteredObj
}
