// https://github.com/xyxiao001/vue-cropper/blob/master/README.md
export interface opt {
  outputType: 'jpeg || png || jpg'
  canMove: boolean
  canMoveBox: boolean
  original: boolean
  autoCrop: boolean
  fixed: boolean
  full: boolean
  canScale: boolean
  fixedNumber: Array<number>
  centerBox: boolean
  infoTrue: boolean
  fixedBox: boolean
  info: boolean
  autoCropWidth: number
  autoCropHeight: number
  enlarge: number
}

export interface ratioItem {
  fixedNumber: Array<number>
  name: string
  check: boolean
  fixed: boolean
}
export const ratios: ratioItem[] = [
  {
    fixedNumber: [1, 1],
    name: '1:1',
    check: false,
    fixed: true
  },
  {
    fixedNumber: [16, 9],
    name: '16:9',
    check: false,
    fixed: true
  },
  {
    fixedNumber: [9, 16],
    name: '9:16',
    check: false,
    fixed: true
  },
  { fixedNumber: [], name: '自定义', check: false, fixed: false }
]
