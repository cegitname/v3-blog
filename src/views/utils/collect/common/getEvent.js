const getEvent = (e) => {
  const event = e || window.event
  // e.srcElement 兼容 IE
  const targetElement = event.target || event.srcElement
  return {
    event,
    targetElement
  }
}

export default getEvent
