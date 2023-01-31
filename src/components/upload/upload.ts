import { getFileToken } from '@/api/components'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Client } from '@aws-sdk/client-s3'
import { ref } from 'vue'
import type { UploadProps, UploadFile } from 'ant-design-vue'
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
enum uploadStatus {
  Fail = 'fail',
  Done = 'done',
  OnProcess = 'onProcess',
  Preload = 'preload',
  Empty = ''
}
interface fileStackItem {
  uid: string
  url: string
  percent: number
  name: string
  status: uploadStatus
  run: () => any
  type: string | undefined
}
const hasFile = (list: any[], target: any, key: string): boolean => {
  return list.some((item) => item[key] === target[key])
}
const uploadStatck = ref<fileStackItem[]>([])
export const fileList = ref<UploadProps['fileList']>([])
export const uploadFiles = (currentFile: { file: UploadFile }) => {
  console.log(currentFile, 'currentFile')
  if (fileList.value!.length > 8) {
    return
  }
  if (!hasFile(uploadStatck.value, currentFile, 'uid')) {
    uploadStatck.value.push({
      uid: currentFile.file.uid,
      url: '',
      percent: 0,
      name: currentFile.file.name,
      status: uploadStatus.Preload,
      type: currentFile.file.type,
      run: () => {}
    })
  }
  console.log(uploadStatck.value, 'uploadStatck')
}
