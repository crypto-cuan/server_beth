// import AWS from 'aws-sdk'
import response from '../util/response/response'
import flag from '../util/flag/errorCode_v2'
import Multer from 'multer'
const upload = Multer({ dest: 'upload/' })

export const uploadS3 = async (req, res, next) => {
  try {
    // AWS.config.update({
    //   accessKeyId: process.env.AccessKeyID,
    //   secretAccessKey: process.env.SecretAccessKey,
    // })
    // const cloud = new AWS.S3()
    // req.body.pictures = []
    // let dataImages = []
    // // files
    // const files = req.files
    // if (files) {
    //   const promises = files.map((file, i) => {
    //     if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg'){
    //       return response.forbidden('the file type not allow', res, flag.request.invalid_body)
    //     }
    //     const params = {
    //       Bucket: process.env.BucketName,
    //       Body: file.buffer,
    //       Key: `${req.body.folder}/${Date.now()}_test${file.originalname}`,
    //       ContentType: file.mimetype,
    //       // GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
    //     }
    //     return processImage(params)
    //   })
    //   console.log("== files", files)
    //   dataImages = await Promise.all(promises)
    //   console.log("== dataImages", dataImages)
    //   req.body.images = dataImages
    //   next()
    // } else {
    //   return []
    // }
    return []
  } catch (err) {
      console.log("== err", err)
    return response.error('error', res)
  }
}

const processImage = async (param) => {
  const cloud = new AWS.S3()
  return new Promise((resolve, reject) => {
    cloud.upload(param, (err, data) => {
      if (err) {
        return response.error(`upload file filed : ${err}`, res, flag.request.failed_insert)
      }
      if (data) {
        const url = data.Location
        resolve(url)
      }
    })
  })
}