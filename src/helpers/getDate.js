import dateFormat from 'dateformat'
import currentWeekNumber from 'current-week-number'

export const matchingDate = (dbDate, askedDate) => {
  if (
    askedDate === undefined ||
    askedDate === null ||
    askedDate[0] === undefined
  ) {
    askedDate = dateFormat()
  }
  let date = String(dateFormat(askedDate)).split(' ')
  let strDate = String(dbDate).split(' ')
  let result =
    date[0] + date[1] + date[2] + date[3] ===
    strDate[0] + strDate[1] + strDate[2] + strDate[3]
  return result
}

export const monthOrder = (dbDate, askedDate) => {
  let monthName = String(dateFormat(askedDate)).split(' ')
  let monthNow = String(dbDate).split(' ')
  let condition =  monthNow[1] + monthNow[3] === monthName[1] + monthName[3]
  return condition
}

export const weekOrder = dbDate => {
  let nowDate = currentWeekNumber(String(dateFormat()))
  let strDate = currentWeekNumber(String(dbDate))
  return nowDate === strDate
}

