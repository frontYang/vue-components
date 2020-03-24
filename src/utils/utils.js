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
      child && computeChild(child, prop, Vue)
    }
  })
}

/**
 * 多级多选联动————筛选已选
 * @param { Array } list
 * @param {*}  id
 */
export const getIdOfData = (list, prop, id) => {
  let i = -1
  const len = list.length
  let homeItem = {}

  while (++i < len) {
    const item = list[i]
    if (item[prop.id] === id) {
      homeItem = item
      break
    } else if (item[prop.children] && item[prop.children].length) {
      const res = getIdOfData(item[prop.children], prop, id)
      if (res[prop.id]) { return res }
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
      clearTagOfData(item[prop.children], prop, Vue)
    }
    Vue.$set(item, 'check', false)
  }
}

/**
 * 多级多选联动————筛选选中
 * @param { Array } list
 * @param {*} arr
 */
export const findCheck = ({
  list = [],
  prop = {},
  filter = 0, // 0: 首层可多选，即不过滤首层；1：首层不可多选，过滤首层
  arr = []
}) => {
  list.forEach((ret, index) => {
    if (ret.check && !filter) {
      arr.push(ret)
    } else if (ret[prop.children] && ret[prop.children].length !== 0) {
      findCheck({
        list: ret[prop.children],
        prop,
        filter: 0,
        arr
      })
    }
  })
  return arr
}

/**
 * 多级多选联动———选中已选
 */
export const selectCheck = ({ data, selected, prop, check }) => {
  data.forEach((item) => {
    let checked = false
    // eslint-disable-next-line
    if (check !== undefined) {
      checked = check
    } else {
      checked = selected.includes(item.id)
    }

    item[prop.check] = checked

    if (item[prop.children]) {
      selectCheck({
        data: item[prop.children],
        selected: selected,
        prop,
        check: checked
      })
    }
  })
  return data
}

/**
 * 树形数组模糊搜索————返回链式字符串数组
 */
export const findTreeStr = (data, prop, value) => {
  if (!data || data.length <= 0) { return }

  const fn = (item, value, first) => {
    const newArr = []
    item.forEach(inner => {
      let str = first ? (first + ' / ') : ''
      str += value + ' / ' + inner.value
      newArr.push({
        path_name: str,
        pid: inner.pid,
        index: inner.index,
        [prop.id]: inner[prop.id],
        [prop.value]: inner[prop.value],
        [prop.check]: inner[prop.check],
        [prop.children]: inner[prop.children]
      })
    })
    return newArr
  }

  let arr = []

  data.forEach(item => {
    let str = value ? (value + ' / ') : ''
    str += item.value

    !value && arr.push({
      path_name: str,
      pid: item.pid,
      index: item.index,
      [prop.id]: item[prop.id],
      [prop.value]: item[prop.value],
      [prop.check]: item[prop.check],
      [prop.children]: findTreeStr(item[prop.children], prop, str)
    })
    if (item[prop.children] && item[prop.children].length > 0) {
      arr = arr.concat(...fn(item[prop.children], item.value, value))
      const str = value ? (value + '/' + item.value) : item.value
      arr = arr.concat(...findTreeStr(item[prop.children], prop, str))
    }
  })
  return arr
}

/**
 * 树状模糊搜索————返回树形数组，名称携带父级名称
 */
export const findTreeFuzzy = ({
  val = '', // 搜索值
  prop = { // key值
    check: 'check',
    children: 'children',
    id: 'id',
    value: 'value'
  },
  data = [], // 树形数组
  pid = -1, // 父id
  isStr = true // 是否返回拼接名称数组
}) => {
  if (val === '' || !data || data.length <= 0) { return }
  const newarr = []
  data.forEach((element, index) => {
    if (element.value.indexOf(val) !== -1) {
      newarr.push({
        index,
        pid: pid,
        ...element
      })
    } else {
      if (element[prop.children] && element[prop.children].length) {
        const ab = findTreeFuzzy({
          val,
          prop,
          data: element[prop.children],
          pid: element[prop.id]
        })
        const obj = {
          ...element,
          pid: pid,
          index,
          children: ab
        }
        if (ab && ab.length) {
          newarr.push(obj)
        }
      }
    }
  })
  const result = isStr ? findTreeStr(newarr, prop) : newarr
  return result
}

/**
 * 日历————获取指定年月的全部日期， 默认当前年月
 * @param {Number} year 年份
 * @param {Number} month 月份
 */
export const getDaysInMonth = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1
}) => {
  const daysOfMonth = []
  const lastDayOfMonth = new Date(year, month, 0).getDate()

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const month1 = parseInt(month) < 10 ? `0${parseInt(month)}` : month
    const date = parseInt(i) < 10 ? `0${parseInt(i)}` : i
    const format = `${year}-${month1}-${date}`
    const day = new Date(format).getDay()

    daysOfMonth.push({
      year: year,
      month: month1,
      date: date,
      day: day,
      format: format
    })
  }
  return daysOfMonth
}

export const formatTime = (time = new Date()) => {
  const month = time.getMonth() + 1
  const date = time.getDate()
  return {
    year: time.getFullYear(),
    month: parseInt(month) < 10 ? `0${parseInt(month)}` : month,
    date: parseInt(date) < 10 ? `0${parseInt(date)}` : date,
    day: time.getDay(),
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  }
}
