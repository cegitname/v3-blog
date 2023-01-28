import { getFileToken } from '@/api/components'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Client } from '@aws-sdk/client-s3'
interface S3ClientOpt {
  url: string
  bucket: string
  region: string
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  expiration: Date
}

interface S3uploadResult {
  url: string
  s3: any
}
/**
 * 拼接aws 储存路径
 * */
export const getsavePath = (file: any) => {
  const year = new Date().getFullYear() + ''
  let month: string | number = new Date().getMonth() + 1
  let days: string | number = new Date().getDate()
  month = month < 10 ? '0' + month : month + ''
  days = days < 10 ? '0' + days : days + ''
  const filetype = file.name.substring(
    file.name.lastIndexOf('.') + 1,
    file.name.length
  )
  return (
    `local/${year}/${month}/${days}/image/` +
    new Date().getTime() +
    '.' +
    filetype
  )
}
/**
 * 获取aws upload对象
 * */
export const useS3upload = async (
  file: any
): Promise<S3uploadResult | undefined> => {
  const res: S3ClientOpt = await getFileToken()
  const BUCKET = res.bucket
  try {
    const path = getsavePath(file)
    const parallelUploads3 = new Upload({
      client: new S3Client({
        region: res.region, // S3 地域信息
        credentials: {
          accessKeyId: res.accessKeyId,
          secretAccessKey: res.secretAccessKey,
          sessionToken: res.sessionToken,
          expiration: res.expiration
        }
      }),
      params: {
        Bucket: BUCKET,
        Key: path,
        Body: file,
        ContentType: file.type
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false
    })
    return {
      s3: parallelUploads3,
      url: res.url + path
    }
  } catch (error) {
    Promise.reject(error)
  }
}
