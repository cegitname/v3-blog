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
  fixedNumber: Array<number> | undefined
  autoCropWidth?: number | null
  autoCropHeight?: number | null
  name: string
  check: boolean
}
export const ratios: ratioItem[] = [
  {
    fixedNumber: [1, 1],
    name: '1:1',
    check: false,
    autoCropWidth: 200,
    autoCropHeight: 200
  },
  {
    fixedNumber: [16, 9],
    name: '16:9',
    check: false,
    autoCropWidth: 160,
    autoCropHeight: 90
  },
  {
    fixedNumber: [9, 16],
    name: '9:16',
    check: false,
    autoCropWidth: 90,
    autoCropHeight: 160
  },
  { fixedNumber: undefined, name: '自定义', check: false }
]
