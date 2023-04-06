import greenlet from 'greenlet'
interface Initial {
  delay: number
  rootPath?: string
  request?: () => Promise<string>
  key: string 
}

export function useNotification(params: Initial) {
const regex = new RegExp(`${params.key}\\s*=\\s*['"]([^'"]+)['"]`)
  let timer: number
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
  const currentHash = getCurrentHash()
  const requestHash = async () => {
    const res = await fetch(window.origin + (params.rootPath || ''))
    const data = await res.text()
    const matchResult = data.match(regex)
    return matchResult ? matchResult[2] : null
  }
  const queryNewHash = greenlet(params.request || requestHash)

  const initEvent = () => {
    window.addEventListener('load', windowLoaded)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }


  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible') {
      const hash = await queryNewHash()
      if (hash !== currentHash) {
        dispatchEvent(true)
      } else {
        initTimer()
      }
    } else {
      clearInterval(timer)
    }
  }
  const windowLoaded = async () => {
    const hash = await queryNewHash()
    if (hash !== currentHash) {
      dispatchEvent(true)
    }
  }
  const dispatchEvent = (status: boolean) => {
    const notice = useCreateNotify(status)
    window.dispatchEvent(notice)
  }
  const initTimer = () => {
    timer = setInterval(async () => {
      const hash = await queryNewHash()
      if (hash !== currentHash) {
        dispatchEvent(true)
      }
    }, params.delay)
  }
  if (!currentHash) return
  initEvent()
  initTimer()
}


















