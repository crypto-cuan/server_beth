import crypto from 'crypto'

export const oldMethod = (paymentChannel, OrderCode) => {
  if (!paymentChannel || !OrderCode)
    throw new Error(
      'paymentChannel & OrderCode both, are required to generate transaction code.'
    )

  const date = new Date()
  const xYear = date.getFullYear()
  const xMonth = date.getMonth()
  const xDate = date.getDate()
  const xHour = date.getHours()
  const xMinute = date.getMinutes()
  const xSecond = date.getSeconds()
  const xDayTime = xDate + xHour + xMinute + xSecond
  const fourDigitRandom = () => Math.floor(Math.random() * 8999 + 1000)
  let xDayTimeString = xDayTime.toString()

  switch (xDayTimeString.length) {
  case 1:
    xDayTimeString = xDayTimeString + '00'
    break

  case 2:
    xDayTimeString = xDayTimeString + '0'
    break

  default:
    break
  }
  const generatedCode =
    paymentChannel +
    OrderCode +
    xYear +
    xMonth +
    xDayTimeString +
    fourDigitRandom()
  return generatedCode
}

export const genRandomMd5 = () => {
  const hash = crypto.randomBytes(24).toString('hex')
  return hash
}
