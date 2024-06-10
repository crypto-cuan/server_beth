// import phone from 'libphonenumber-js'
import phone from 'phone'

export const validateAndConvertPhoneNumber = {
  getInternationalFormat(input) {
    const internationFormat = phone(input, 'ID')
    return internationFormat['number'] // This will return either undefined or, Valid phone number
  },
  getLocalFormat(input) {
    const localPhone = phone(input,'ID')
    // const localFormat = '0' + localPhone['nationalNumber']
    const localFormat = 0 + localPhone[0].split('+62')[1];
    return localFormat
  }
}

export const indonesianNumberGen = () => {
  let generatedNumber = '628' // Indonesian Country Code Prefix
  for (let i = 0; i < 10; i++) {
    generatedNumber = generatedNumber + Math.floor(Math.random() * 10)
  }
  return generatedNumber
}
