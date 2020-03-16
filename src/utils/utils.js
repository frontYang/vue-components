/**
 * 拖动选择时间段————拼接时间
 * @param {Array} list
 */
export const splicing = (list) => {
  let same
  let i = -1
  const len = list.length
  const arr = []

  if (!len) { return }
  while (++i < len) {
    const item = list[i]
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...['、', item.begin, '~', item.end])
      } else if (arr.length) {
        arr.pop()
        arr.push(item.end)
      }
    }
    same = Boolean(item.check)
  }
  arr.shift()
  return arr.join('')
}

/**
 * 一维数组转多维数组
 */
export const oneToMoreArr = function(arr, num = 2) {
  const len = arr.length
  const lineNum = len % num === 0 ? len / num : Math.floor((len / num) + 1)
  const res = []
  for (let i = 0; i < lineNum; i++) {
    const temp = arr.slice(i * num, i * num + num)
    res.push(temp)
  }
  return res
}

/**
 * 获取时间拖拽组件结果
 * @param {Array} range 选中数据
 * @param {Array} weekData 全部数据
 * @param {Object} Vue 实例对象
 */
export const getResult = (range, weekData, Vue) => {
  /**
   * 获取具体时间
   */
  const filterRangeTime = function(range, weektimeData) {
    const filterArr = []

    range.forEach((item, index) => {
      const child = weektimeData[item.id].child
      const splitValue = item.value.split('、')
      splitValue.forEach((valueItem) => {
        const splitItemValue = valueItem.split('~')
        const begin = child.filter((val) => {
          return splitItemValue[0] === val.begin
        })
        const end = child.filter((val) => {
          return splitItemValue[splitItemValue.length - 1] === val.end
        })

        filterArr[item.id] = filterArr[item.id] || []

        begin.length > 0 && (filterArr[item.id].push(...begin))
        end.length > 0 && (filterArr[item.id].push(...end))
      })
    })
    return filterArr
  }

  /**
   * 提取时间col
   */
  const getNumArr = function(filterArr) {
    const numArr = []
    filterArr.forEach((item, index) => {
      const mapVal = item.map(m => m.col)
      numArr[index] = numArr[index] || []
      numArr[index] = Vue.$utils.oneToMoreArr(mapVal, 2)
    })
    return numArr
  }

  /**
   * 获取全部时间
   */
  const getAllTime = function(numArr) {
    const allTimeData = []
    numArr.forEach((item, index) => {
      allTimeData[index] = allTimeData[index] || []
      item.forEach(a => {
        if (a[0] === a[1]) {
          allTimeData[index].push(...new Set(a))
        } else {
          for (var i = a[0]; i <= a[1]; i++) {
            allTimeData[index].push(i)
          }
        }
      })
    })
    return allTimeData
  }

  const filterArr = filterRangeTime(range, weekData)
  const numArr = getNumArr(filterArr)
  const allTimeData = getAllTime(numArr)
  return allTimeData
}

/**
 * loading 视频
 * @param {String} 视频链接
 */
export const loadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = src
    video.addEventListener('canplay', function() {
      resolve({
        width: this.videoWidth,
        height: this.videoWidth
      })
    })
    video.onerror = function() {
      reject()
    }
  })
}

/**
 * loading图片
 * @param {String} src 图片链接
 */
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = src
    img.crossOrigin = 'Anonymous'
    img.onload = function() {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = function() {
      reject()
    }
  })
}

/**
 * 多级多选联动————增加check属性
 * @param {Array} list 数组
 * @param {Object} Vue vue示例
 */
export const computeChild = (list, prop, Vue) => {
  list.forEach(item => {
    if (item[prop.children] && item[prop.children].length) {
      const child = item[prop.children]
      if (child.every(ret => ret[prop.check])) {
        Vue.$set(item, [prop.check], true)
      } else {
        Vue.$set(item, [prop.check], false)
      }
      child && computeChild(child, Vue)
    }
  })
}

/**
 * 多级多选联动————筛选已选
 * @param { Array } list
 * @param {*} value
 */
export const getNameOfData = (list, prop, value) => {
  let i = -1
  const len = list.length
  let homeItem = {}

  while (++i < len) {
    const item = list[i]

    if (item[prop.value] === value) {
      homeItem = item
      break
    } else if (item[prop.children] && item[prop.children].length) {
      const res = getNameOfData(item[prop.children], prop, value)
      if (res[prop.value]) { return res }
    }
  }

  return homeItem
}

/**
 * 多级多选联动————清空全部
 * @param {Array} list
 * @param {Object} Vue vue示例
 */
export const clearTagOfData = (list, prop, Vue) => {
  let i = -1
  const len = list.length
  while (++i < len) {
    const item = list[i]
    if (item[prop.children] && item[prop.children].length) {
      clearTagOfData(item[prop.children], Vue)
    }
    Vue.$set(item, 'check', false)
  }
}

/**
 * 多级多选联动————筛选选中
 * @param { Array } list
 * @param {*} arr
 */
export const findCheck = (list, prop, arr = []) => {
  list.forEach(ret => {
    if (ret.check) {
      arr.push(ret)
    } else if (ret[prop.children] && ret[prop.children].length !== 0) {
      findCheck(ret[prop.children], arr)
    }
  })
  return arr
}
