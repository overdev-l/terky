"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var update_notifier_exports = {};
__export(update_notifier_exports, {
  useNotification: () => useNotification
});
module.exports = __toCommonJS(update_notifier_exports);

// ../../node_modules/.pnpm/greenlet@1.1.0/node_modules/greenlet/dist/greenlet.m.js
function greenlet_m_default(e) {
  var n = 0, t = {}, a = URL.createObjectURL(new Blob(["$$=" + e + ";onmessage=" + function(e2) {
    Promise.resolve(e2.data[1]).then(function(e3) {
      return $$.apply($$, e3);
    }).then(function(n2) {
      postMessage([e2.data[0], 0, n2], [n2].filter(function(e3) {
        return e3 instanceof ArrayBuffer || e3 instanceof MessagePort || self.ImageBitmap && e3 instanceof ImageBitmap;
      }));
    }, function(n2) {
      postMessage([e2.data[0], 1, "" + n2]);
    });
  }])), o = new Worker(a);
  return o.onmessage = function(e2) {
    t[e2.data[0]][e2.data[1]](e2.data[2]), t[e2.data[0]] = null;
  }, function(e2) {
    return e2 = [].slice.call(arguments), new Promise(function() {
      t[++n] = arguments, o.postMessage([n, e2], e2.filter(function(e3) {
        return e3 instanceof ArrayBuffer || e3 instanceof MessagePort || self.ImageBitmap && e3 instanceof ImageBitmap;
      }));
    });
  };
}

// index.ts
function useNotification(params) {
  const regex = new RegExp(`${params.key}\\s*=\\s*['"]([^'"]+)['"]`);
  let timer;
  const useCreateNotify = (notice) => new CustomEvent("siteUpdate", {
    bubbles: true,
    detail: { data: notice }
  });
  const getCurrentHash = () => {
    const body = document.querySelector("body");
    if (!body)
      return false;
    const hash = body.getAttribute("data-hash");
    return hash;
  };
  const currentHash = getCurrentHash();
  const requestHash = async () => {
    const res = await fetch(`${window.origin + (params.rootPath || "")} ?t=${Date.now()}`);
    const data = await res.text();
    const matchResult = data.match(regex);
    return matchResult ? matchResult[2] : null;
  };
  const queryNewHash = greenlet_m_default(params.request || requestHash);
  const initEvent = () => {
    window.addEventListener("load", windowLoaded);
    document.addEventListener("visibilitychange", handleVisibilityChange);
  };
  const handleVisibilityChange = async () => {
    if (document.visibilityState === "visible") {
      const hash = await queryNewHash();
      if (hash !== currentHash) {
        dispatchEvent(true);
      } else {
        initTimer();
      }
    } else {
      clearInterval(timer);
    }
  };
  const windowLoaded = async () => {
    const hash = await queryNewHash();
    if (hash !== currentHash) {
      dispatchEvent(true);
    }
  };
  const dispatchEvent = (status) => {
    const notice = useCreateNotify(status);
    window.dispatchEvent(notice);
  };
  const initTimer = () => {
    timer = setInterval(async () => {
      const hash = await queryNewHash();
      if (hash !== currentHash) {
        dispatchEvent(true);
      }
    }, params.delay);
  };
  if (!currentHash)
    return;
  initEvent();
  initTimer();
}
