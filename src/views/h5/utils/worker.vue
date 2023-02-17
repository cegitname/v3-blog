<template>
  <div>
    <button @click="makeWorker">开始线程</button>
    <!--在计算时 往input输入值时 没有发生卡顿-->
    <p><input type="text" /></p>
  </div>
</template>

<script>
import Worker from 'worker-loader!./worker'

export default {
  data() {
    // 模拟数据
    let arr = new Array(100000).fill(1).map(() => Math.random() * 10000)
    let weightedList = new Array(100000)
      .fill(1)
      .map(() => Math.random() * 10000)
    let calcList = [
      { type: 'sum', name: '总和' },
      { type: 'average', name: '算术平均' },
      { type: 'weightedAverage', name: '加权平均' },
      { type: 'max', name: '最大' },
      { type: 'middleNum', name: '中位数' },
      { type: 'min', name: '最小' },
      { type: 'variance', name: '样本方差' },
      { type: 'popVariance', name: '总体方差' },
      { type: 'stdDeviation', name: '样本标准差' },
      { type: 'popStandardDeviation', name: '总体标准差' }
    ]
    return {
      workerList: [], // 用来存储所有的线程
      calcList, // 计算类型
      arr, // 数据
      weightedList // 加权因子
    }
  },
  methods: {
    makeWorker() {
      this.calcList.forEach((item) => {
        let workerName = `worker${this.workerList.length}`
        let worker = new Worker()
        let start = performance.now()
        worker.postMessage({
          arr: this.arr,
          type: item.type,
          weightedList: this.weightedList
        })
        worker.addEventListener('message', (e) => {
          worker.terminate()

          let tastName = ''
          this.calcList.forEach((item) => {
            if (item.type === e.data.type) {
              item.value = e.data.value
              tastName = item.name
            }
          })

          let end = performance.now()
          let duration = end - start
          console.log(`当前任务: ${tastName}, 计算用时: ${duration} 毫秒`)
        })
        this.workerList.push({ [workerName]: worker })
      })
    },
    clearWorker() {
      if (this.workerList.length > 0) {
        this.workerList.forEach((item, key) => {
          item[`worker${key}`].terminate && item[`worker${key}`].terminate() // 终止所有线程
        })
      }
    }
  },
  // 页面关闭，如果还没有计算完成，要销毁对应线程
  beforeUnmount() {
    this.clearWorker()
  }
}
</script>
