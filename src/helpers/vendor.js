import { genSaltSync, hashSync } from 'bcryptjs'
import response from '../util/response/response'
import errorCode from '../util/flag/errorCode_v2'
import { AccVendor } from '../models'
import { sixDigitRandomNumber } from '../util/randomNumber'
import { validateAndConvertPhoneNumber } from '../util/validateAndConvertPN'
import { ErrorForBreakingPromise } from '../util/error'
import { sendSms } from '../services/smsClient'

export const isPhoneNumberValid = phone_number => {
  phone_number = validateAndConvertPhoneNumber.getLocalFormat(phone_number)
  if (!phone_number)
    throw ErrorForBreakingPromise(`Phone number is not valid`, response.invalidInput, errorCode.request.invalid_body)
}


export const generatePin = () => {
  let newPin = sixDigitRandomNumber()
  let newPinHash = hashSync(String(newPin), genSaltSync())
  return { newPin, newPinHash }
}

