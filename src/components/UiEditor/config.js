
/* 上传配置 */
export const uploadConfig = {
  action: 'http://192.168.3.24:7300/mock/5e20035d4aa07c2d7ca3a8d2/vue_demo_api/upload', // 必填参数 图片上传地址
  methods: 'POST', // 必填参数 图片上传方式
  token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'img', // 必填参数 文件的参数名
  size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' // 可选 可上传的图片格式
}

/* 自定义上传 */
export const customUpload = (editor) => {
  return new Promise((resolve, reject) => {
    var fileInput = editor.container.querySelector('input.ql-image-bg[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('file', uploadConfig.name)
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image-bg')
      // 监听选择文件
      fileInput.addEventListener('change', () => {
        // 创建formData
        var formData = new FormData()
        formData.append(uploadConfig.name, fileInput.files[0])
        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token)
        }
        // 图片上传
        var xhr = new XMLHttpRequest()
        xhr.open(uploadConfig.methods, uploadConfig.action, true)
        // 上传数据成功，会触发
        xhr.onload = (e) => {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText)
            resolve(res.data.src)
          }
          fileInput.value = ''
        }
        // 开始上传数据
        xhr.upload.onloadstart = function(e) {
          fileInput.value = ''
        }
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function(e) {
        }
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function(e) {
          // console.log('上传结束')
        }
        xhr.send(formData)
      })
    }
    fileInput.click()
  })
}
