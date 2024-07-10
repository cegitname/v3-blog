export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length) // abs 取绝对值

  // O(n^2)
  for (let i = 0; i < step; i++) {
      const n = arr.pop()
      if (n != null) {
          arr.unshift(n) // 数组是一个有序结构，unshift 操作非常慢！！！ O(n)
      }
  }
  return arr
}