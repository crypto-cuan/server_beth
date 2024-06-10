import { createSign } from 'crypto'
import { readFileSync } from 'fs'
import path from 'path'

const signature = async (message) => {
  try {
    const sign = createSign('sha256')
    sign.update(message)
    sign.end()
    const privateKey = readFileSync(
      path.join(__dirname, '../util/key/pkcs8_rsa_private_key.pem'),
      'utf8'
    )
    const keysign = sign.sign(privateKey, 'base64')
    return keysign
  } catch (err) {
    return false
  }
}

export default signature