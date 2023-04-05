
interface Initial {
  delay: number,
  url: string,
  method: string,
  loop: boolean,
}

export function useNotification(params: Initial) {
  const useCreateNotif = (notice: boolean) => new CustomEvent("siteUpdate", {
    bubbles: true,
    detail: { data: notice }
  })
}

const getCurrentHash = () => {
  const body = document.querySelector('body')
  if (!body) return
  const hash = body.getAttribute('data-hash')
  return hash
}