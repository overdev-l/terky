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
`,H=()=>{let n=new Blob([p],{type:"application/javascript"}),a=URL.createObjectURL(n),s=new Worker(a);return(i,o)=>new Promise((c,d)=>{s.onmessage=t=>{c(t.data)},s.onerror=t=>{console.log(t,"error"),d(t)},s.postMessage({url:i,init:o})})},g=H();function L(n){let a=new RegExp(`${n.key}\\s*=\\s*['"]([^'"]+)['"]`),s,i=!1,o=n.loop||!1,c=(e,r)=>new CustomEvent("siteUpdate",{bubbles:!0,detail:{data:r,status:e}}),t=(()=>{let e=document.querySelector("body");return e?e.getAttribute("data-hash"):""})(),f=g.bind(null,n.url||`${window.origin}?t=${Date.now()}`,n.init||{method:"get"}),l=async()=>{let r=(await f()).match(a);return r&&r[1]||null},b=()=>{window.addEventListener("load",y),document.addEventListener("visibilitychange",h)},h=async()=>{if(document.visibilityState==="visible"){let e=await l();e!==t?u(!0,{siteHash:e,currentHash:t}):w()}else clearInterval(s)},y=async()=>{let e=await l();e!==t&&u(!0,{siteHash:e,currentHash:t})},u=(e,r)=>{if(!o&&i){v();return}let m=c(e,r);window.dispatchEvent(m)},w=()=>{s=setInterval(async()=>{let e=await l();e!==t&&u(!0,{siteHash:e,currentHash:t})},n.delay)};if(!t)return;b(),w();let v=()=>{clearInterval(s),window.removeEventListener("load",y),window.removeEventListener("visibilitychange",h)}}export{L as useNotification};
//# sourceMappingURL=index.js.map
