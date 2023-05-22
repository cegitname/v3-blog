const getXPath = (elm) => {
  try {
    const allNodes = document.getElementsByTagName('*')
    // allNodes 所有节点
    const segs = []
    /**
     *  如果节点是元素节点，则 nodeType 属性将返回 1。
     *  如果节点是属性节点，则 nodeType 属性将返回 2。
     *  如果节点是文本节点，则 nodeType 属性将返回 3。
     *  如果节点是注释节点，则 nodeType 属性将返回 8。
     * */
    for (; elm && elm.nodeType === 1; elm = elm.parentNode) {
      if (elm.hasAttribute('id')) {
        let uniqueIdCount = 0

        for (let n = 0; n < allNodes.length; n++) {
          if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id) {
            uniqueIdCount++
          }
          if (uniqueIdCount > 1) break
        }

        if (uniqueIdCount === 1) {
          segs.unshift('//*[@id="' + elm.getAttribute('id') + '"]')
          return segs.join('/')
        } else {
          return false
        }
        // segs = ['//*[@id="id"']
      } else {
        let i = 1
        //previousSibling 返回上一个同胞节点：元素节点、文本节点或注释节点。
        for (let sib = elm.previousSibling; sib; sib = sib.previousSibling) {
          if (sib.localName === elm.localName) {
            i++
          }
        }

        if (i === 1) {
          if (elm.nextElementSibling) {
            if (elm.nextElementSibling.localName !== elm.localName) {
              segs.unshift(elm.localName.toLowerCase())
            } else {
              segs.unshift(elm.localName.toLowerCase() + '[' + i + ']')
            }
          } else {
            segs.unshift(elm.localName.toLowerCase())
          }
        } else {
          segs.unshift(elm.localName.toLowerCase() + '[' + i + ']')
        }
      }
    }
    return segs.length ? '/' + segs.join('/') : null
  } catch (err) {
    return null
  }
}

export default getXPath
