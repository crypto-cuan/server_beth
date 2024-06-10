import axios from 'axios'

export const sendPayment = async (url, body) => {
  await axios.post(url, body, {
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    return result
  }).catch(err => {
    return false
  })
}
