const max4 = 9999
const min4 = 1000
export const fourDigitRandomNumber = () => Math.round(Math.random() * (min4 - max4)) + max4

const max5 = 99999
const min5 = 10000
export const fiveDigitRandomNumber = () => Math.round(Math.random() * (min5 - max5)) + max5

const max6 = 999999
const min6 = 100000
export const sixDigitRandomNumber = () => Math.round(Math.random() * (min6 - max6)) + max6
