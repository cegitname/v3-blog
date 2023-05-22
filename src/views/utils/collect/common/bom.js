const win = (typeof window !== 'undefined' ? window : this)
const doc = document
const nav = navigator
const ua = nav && nav.userAgent && nav.userAgent.toString()
const loc = location
const ref = doc && doc.referrer
const title = doc && doc.title

const bom = {
  win,
  doc,
  nav,
  loc,
  ua,
  ref,
  title
}

export {
  win,
  doc,
  nav,
  loc,
  ua,
  ref,
  title
}

export default bom
