```javascript
/**
 * 判断data中是否包含target
 * 或者判断 data 中是否包含 target 中相同的键值对
 * */ 
export function has (data, target) {
  if (typeof data === 'string') {
      return data.indexOf(target) !== -1
  }
  if (Array.isArray(data)) {
      if (data.some(item => item === target)) {
          return true
      }
      if (data.some(item => typeof item === 'object' && Object.keys(item).some(key => item[key] === target))) {
          return true
      }
  }
  return false
}