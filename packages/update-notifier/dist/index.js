var H=`
self.onmessage = function (e) {
  const { url, init } = e.data
  const request = () => {
  return fetch(url, init)
  }
  request().then(async res => {
  const result = await res.text()
  self.postMessage(result)
  })
}
`,m=()=>{let s=new Blob([H],{type:"application/javascript"}),o=URL.createObjectURL(s),r=new Worker(o);return(i,t)=>new Promise((c,l)=>{r.onmessage=a=>{c(a.data)},r.onerror=a=>{console.log(a,"error"),l(a)},r.postMessage({url:i,init:t})})},y=m();function E(s){let o=()=>{let e=document.querySelector("body");return e?e.getAttribute("data-hash"):""},r=new RegExp(`${s.key}\\s*=\\s*['"]([^'"]+)['"]`),i,t=o(),c=s.loop||!1,l=(e,n)=>new CustomEvent("siteUpdate",{bubbles:!0,detail:{data:n,status:e}}),a=y.bind(null,s.url||`${window.origin}?t=${Date.now()}`,s.init||{method:"get"}),u=async()=>{let n=(await a()).match(r);return n&&n[1]||null},w=()=>{window.addEventListener("load",f),document.addEventListener("visibilitychange",g)},g=async()=>{if(document.visibilityState==="visible"){let e=await u();e!==t?h(!0,{siteHash:e,currentHash:t}):d()}else clearInterval(i)},f=async()=>{let e=await u();e!==t&&h(!0,{siteHash:e,currentHash:t})},h=(e,n)=>{let b=l(e,n);window.dispatchEvent(b),c||(t=n.siteHash)},d=()=>{i=setInterval(async()=>{let e=await u();e!==t&&h(!0,{siteHash:e,currentHash:t})},s.delay)};t&&(w(),d())}export{E as useNotification};
//# sourceMappingURL=index.js.map
