import { Storage } from '@google-cloud/storage'
import path from 'path'

// const GOOGLE_CLOUD_KEYFILE = path.join(__dirname,process.env.GOOGLE_APPLICATION_CREDENTIALS)
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname,`../util/${process.env.CLOUD_CREDENTIAL}`)

export const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

export const getPublicUrl = fileName => `https://storage.googleapis.com/${process.env.BUCKET_STORAGE_USER}/${fileName}`
