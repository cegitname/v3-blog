import { ItemCode } from '@/components/types'
export const collapseCode: ItemCode[] = [
  {
    key: '1',
    header: 'aws上传文件',
    code: `"@aws-sdk/client-s3": "^3.259.0"
"@aws-sdk/lib-storage": "^3.259.0"
import { Upload } from '@aws-sdk/lib-storage'
import { S3Client } from '@aws-sdk/client-s3'

const S3Upload = new Upload({
  client: new S3Client({
    // region S3 地域信息
    region: res.region,
    // credentials S3 鉴权用的临时密钥信息，由服务端配置授权
    credentials: {
      accessKeyId: res.accessKeyId,
      secretAccessKey: res.secretAccessKey,
      sessionToken: res.sessionToken,
      expiration: res.expiration
    }
  }),
  // params 调用 S3 方法时的默认参数表，
  // 在初始化时配置后，以后调用 S3.xxx 方法都会自动加上这些参数
  params: {
    //s3Bucket 信息
    Bucket: BUCKET,
    //必需参数，本次上传的文件路径 Key 信息
    Key: path, 
    //必需参数，上传的文件本体，
    // 除了 File 以外，还可以是 Buffer, Typed Array, Blob, String, ReadableStream 等类型
    Body: file,
    //上传后文件的 Content-Type 头，即 MIME 类型
    ContentType: file.type 
  },
  //分片上传允许同时上传的分片数，你可以理解为上传线程数。默认是 4
  queueSize: 4, 
  //分片上传每个分片的文件大小，单位字节。默认 5 MB 即 5 * 1024 * 1024
  partSize: 1024 * 1024 * 5, 
  //取消上传后，是否保留已经上传完的分片。默认 false 即删除
  leavePartsOnError: false 
  
  # 返回值 {S3Upload} 一个 S3Upload 对象，
    该对象有 S3Upload.send(callback) 和 S3Upload.abort() 两个方法，
    还支持一个 httpUploadProgress 事件。
    > S3Upload.send：用于开始上传，支持一个参数：
      上传结束时的回调函数 callback，该回调函数有两参数，
      第一个参数 err，
      如果不为空，表示上传出错，第二参数 data 表示上传成功的信息；
    > S3Upload.abort：用于取消本次上传；
    > S3Upload.on('httpUploadProgress', function(progress){})：用于上传进度回调的事件
`
  },
  {
    key: '2',
    header: '监听上传过程 httpUploadProgress',
    code: `S3Upload.on('httpUploadProgress', async (e) => {
    console.log(e, 'eeee')
    {
      Bucket: 'xxx',
      Key:'xxx/xx/xx..',
      loaded:xxx 已加载数,
      total:xxx 总加载数
    }
    percent.value = (parseInt(e.loaded, 10) / parseInt(e.total, 10)) * 100
    percent.value = parseInt(percent.value.toFixed(2))
})
`
  }
]
