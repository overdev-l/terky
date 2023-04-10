const worker = `
self.onmessage = function (e) {
  const { url, init } = e.data
  console.log(e)
  const request = () => {
  return fetch(url, init)
  }
  request().then(async res => {
  const result = await res.text()
  self.postMessage(result)
  })
}
`

const greenlet = () => {
    const blob = new Blob([worker], { type: 'application/javascript' })
    const workerUrl = URL.createObjectURL(blob)
    const workerInstance = new Worker(workerUrl)
    return (url: string, init: any): Promise<string> => new Promise((resolve, reject) => {
        workerInstance.onmessage = e => {
            resolve(e.data)
        }
        workerInstance.onerror = e => {
            console.log(e, 'error')
            reject(e)
        }
        workerInstance.postMessage({ url: url, init: init })
    })
}

export const useGreenlet = greenlet()
