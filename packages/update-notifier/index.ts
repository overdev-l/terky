import { useGreenlet } from './utils'
interface FecthInit {
  method?: 'get' | 'post',
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
  key: string,
  loop?: boolean
}
interface Data {
  siteHash: string | null,
  currentHash: string | null
}
export function useNotification(params: Initial) {
  const regex = new RegExp(`${params.key}\\s*=\\s*['"]([^'"]+)['"]`)
  let timer: any
  const sended = false
  const loop = params.loop || false
  const useCreateNotify = (notice: boolean, data: Data) => new CustomEvent('siteUpdate', {
    bubbles: true,
    detail: { data: data, status: notice }
  })

  const getCurrentHash = () => {
    const body = document.querySelector('body')
    if (!body) return ''
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
      if (hash !== currentHash) {
        dispatchEvent(true, {
          siteHash: hash,
          currentHash: currentHash
        })
      } else {
        initTimer()
      }
    } else {
      clearInterval(timer)
    }
  }
  const windowLoaded = async () => {
    const hash = await validateHash()
    if (hash !== currentHash) {
      dispatchEvent(true, {
        siteHash: hash,
        currentHash: currentHash
      })
    }
  }
  const dispatchEvent = (status: boolean, data: Data) => {
    if (!loop && sended){
      disposeUpdate()
      return
    }
    const notice = useCreateNotify(status, data)
    window.dispatchEvent(notice)
  }
  const initTimer = () => {
    timer = setInterval(async () => {
      const hash = await validateHash()
      if (hash !== currentHash) {
        dispatchEvent(true, {
          siteHash: hash,
          currentHash: currentHash
        })
      }
    }, params.delay)
  }
  if (!currentHash) return
  initEvent()
  initTimer()

  const disposeUpdate = () => {
    clearInterval(timer)
    window.removeEventListener('load', windowLoaded)
    window.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}
