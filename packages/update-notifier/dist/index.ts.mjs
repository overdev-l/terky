import b from"greenlet";function v(a){let o;const d=t=>new CustomEvent("siteUpdate",{bubbles:!0,detail:{data:t}}),e=(()=>{const t=document.querySelector("body");return t?t.getAttribute("data-hash"):!1})(),c=async()=>await(await fetch(window.origin+(a.rootPath||""))).text(),i=b(a.request||c),r=()=>{window.addEventListener("load",u),document.addEventListener("visibilitychange",l)},l=async()=>{document.visibilityState==="visible"?await i()!==e?n(!0):s():clearInterval(o)},u=async()=>{await i()!==e&&n(!0)},n=t=>{const w=d(t);window.dispatchEvent(w)},s=()=>{o=setInterval(async()=>{await i()!==e&&n(!0)},a.delay)};e&&(r(),s())}export{v as useNotification};
