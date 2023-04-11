var p=`
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
`,m=()=>{let n=new Blob([p],{type:"application/javascript"}),a=URL.createObjectURL(n),o=new Worker(a);return(r,i)=>new Promise((c,u)=>{o.onmessage=t=>{c(t.data)},o.onerror=t=>{console.log(t,"error"),u(t)},o.postMessage({url:r,init:i})})},y=m();function E(n){let a=new RegExp(`${n.key}\\s*=\\s*['"]([^'"]+)['"]`),o,r=!1,i=n.loop||!1,c=e=>new CustomEvent("siteUpdate",{bubbles:!0,detail:{data:e}}),t=(()=>{let e=document.querySelector("body");return e?e.getAttribute("data-hash"):!1})(),f=y.bind(null,n.url||`${window.origin}?t=${Date.now()}`,n.init||{method:"get"}),l=async()=>{let s=(await f()).match(a);return console.log(s,"data"),s&&s[1]||null},g=()=>{window.addEventListener("load",b),document.addEventListener("visibilitychange",w)},w=async()=>{if(document.visibilityState==="visible"){let e=await l();console.log(e,t,typeof e,typeof t,e!==t,"hash !== currentHash"),e!==t?h(!0):d()}else clearInterval(o)},b=async()=>{let e=await l();console.log(e,t,typeof e,typeof t,e!==t,"hash !== currentHash"),e!==t&&h(!0)},h=e=>{if(!i&&r)return;e&&(r=!0);let s=c(e);window.dispatchEvent(s)},d=()=>{o=setInterval(async()=>{let e=await l();console.log(e,t,typeof e,typeof t,e!==t,"hash !== currentHash"),e!==t&&h(!0)},n.delay)};t&&(g(),d())}export{E as useNotification};
//# sourceMappingURL=index.js.map
