import { Storage } from '@google-cloud/storage'
import path from 'path'

const GOOGLE_CLOUD_PROJECT_ID = 'halo-jasa-production'
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname, '../util/gcs-key.json')

export const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE
})

export const getPublicUrl = fileName => `https://storage.googleapis.com/${projectId}/${fileName}`

const getKtpUrl = fileName => `https://storage.googleapis.com/${projectId}/ktp/${fileName}`
