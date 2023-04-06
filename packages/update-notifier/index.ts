
interface Initial {
  delay: number
  rootPath?: string
  loop: boolean
  request?: (toggle:() => void) => void
}

export function useNotification(params: Initial) {
  const currentHash = getCurrentHash()
  if (!currentHash) return
  init(currentHash)
}

const useCreateNotify = (notice: boolean) => new CustomEvent("siteUpdate", {
  bubbles: true,
  detail: { data: notice }
})

const getCurrentHash = () => {
  const body = document.querySelector('body')
  if (!body) return false
  const hash = body.getAttribute('data-hash')
  return hash
}

const queryNewHash = async () => {
  const res = await fetch('/hash')
  const data = await res.json()
  return data.hash
}

const init = (currentHash: string) => {
  window.addEventListener('load', windowLoaded.bind(null, currentHash))

  document.addEventListener('visibilitychange', handleVisibilityChange.bind(null, currentHash))
}


const handleVisibilityChange = async (currentHash: string) => {
  if (document.visibilityState === 'visible') {
    const hash = await queryNewHash()
  if (hash !== currentHash) {
    dispatchEvent(true)
  }
 } 
}
const windowLoaded = async (currentHash: string) => {
  const hash = await queryNewHash()
  if (hash !== currentHash) {
    dispatchEvent(true)
  }
}

const interval = (fn: () => void, delay: number) => {
  fn()
  return setInterval(fn, delay)
}

const dispatchEvent = (status: boolean) => {
  const notice = useCreateNotify(status)
  window.dispatchEvent(notice)
}