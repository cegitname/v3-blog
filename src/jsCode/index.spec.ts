import { rotate1 } from './index'

describe('rotate1', () => {
  it('正常情况', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    const result = rotate1(arr, k)
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })
})