import { useGreenlet } from './utils'
interface FecthInit {
  mehtod?: 'get' | 'post',
  headers?: Headers,
  body?: any,
  mode?: any
  credentials?: any
  cache?: any
  redirect?: any
  referrer?: any
  referrerPolicy?: any
  integrity?: any
}
interface Initial {
  delay: number
  url?: string
  init?: FecthInit
  key: string
}
export function useNotification(params: Initial) {
  const regex = new RegExp(`${params.key}\\s*=\\s*['"]([^'"]+)['"]`)
  let timer: any
  const useCreateNotify = (notice: boolean) => new CustomEvent('siteUpdate', {
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
  const queryNewHash = useGreenlet.bind(null, params.url || `${window.origin}?t=${Date.now()}`, params.init || {
    method: 'get'
  })
  const validateHash = async () => {
    const hash = await queryNewHash()
    const data = hash.match(regex)
    return data ? data[1] || null : null
  }
  const initEvent = () => {
    window.addEventListener('load', windowLoaded)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible') {
      const hash = await validateHash()
      console.log(hash, currentHash, typeof hash, typeof currentHash, hash !== currentHash, 'hash !== currentHash')
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
    const hash = await validateHash()
    console.log(hash, currentHash, typeof hash, typeof currentHash, hash !== currentHash, 'hash !== currentHash')
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
      const hash = await validateHash()
      console.log(hash, currentHash, typeof hash, typeof currentHash, hash !== currentHash, 'hash !== currentHash')
      if (hash !== currentHash) {
        dispatchEvent(true)
      }
    }, params.delay)
  }
  if (!currentHash) return
  initEvent()
  initTimer()
}
