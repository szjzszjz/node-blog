const fs  = require('fs')
const path = require('path')
const readline = require('readline')

//文件名
const fileName = path.join(__dirname,'../','../','logs','access.log')
//创建 readStream 
const readStream = fs.createReadStream(fileName)

//创建readline 对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let num= 0

//分析日志 逐行读取
rl.on('line', lineData => {
  if(!lineData) return

  //记录总行数
  num ++
  const arr = lineData.split('--')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum ++
  }
})

//监听读取完成之后
rl.on('close', () => {
  console.log('chrome 占比：', chromeNum/num);
})
