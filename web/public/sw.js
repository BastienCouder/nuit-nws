if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),f={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/TiEJfKiyrJ9M5sKG0UjKw/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/TiEJfKiyrJ9M5sKG0UjKw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/250-4e677a33d6119480.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/288-798be72840c874b6.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/2bd3f8c6.7b4b3f76e120346b.js",revision:"7b4b3f76e120346b"},{url:"/_next/static/chunks/468-efa76fadebeda748.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/749-601ab36488618248.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/840.1594d493090cd8b4.js",revision:"1594d493090cd8b4"},{url:"/_next/static/chunks/8e1d74a4-0964536cb10862a9.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/(tabs)/layout-fba4836a868f2980.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/(tabs)/page-da779fb82cb66bb8.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/(tabs)/rank/page-a75bf08e2d9c96b6.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/(tabs)/scan/page-71e5e6f36bd547f6.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/(tabs)/user/%5Btoken%5D/page-e6be3150426dcf1f.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/_not-found-63b7e22c4515983e.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/layout-00f5265080590b96.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/login/page-119ab873c510d080.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/modal/page-be58a85872460421.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/app/qrcodes/page-d227197d9298d982.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/fd9d1056-340219dd63d2b9a9.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/main-app-1463c34ef3d696be.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/main-bf9e73838d41a15d.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d4f6fb50cdefeb78.js",revision:"TiEJfKiyrJ9M5sKG0UjKw"},{url:"/_next/static/css/47124aaa3e6d6b52.css",revision:"47124aaa3e6d6b52"},{url:"/_next/static/media/016998512d65d2ad-s.woff2",revision:"e6472ecef3f5c3c267f7ecb9836b2fec"},{url:"/_next/static/media/05aedd27f74b307f-s.woff2",revision:"2d3fe7cb2f52d77d6600540fbd37a83d"},{url:"/_next/static/media/18699a9281f7a2a2-s.woff2",revision:"b62c23b875f0f39547b97e783677f1b8"},{url:"/_next/static/media/201acb11f7c24f1b-s.woff2",revision:"55cd5c9ca469d287433487597a42a2ba"},{url:"/_next/static/media/28012c104291fc5e-s.woff2",revision:"2dc3e189395d39806969dd67d04ad6b3"},{url:"/_next/static/media/336600a271c6b1d8-s.woff2",revision:"ce00c920bd3e7ec8b9d436e043895735"},{url:"/_next/static/media/4007bd53a5e80126-s.p.woff2",revision:"4f856f88829df6d32e57948c613f4c0e"},{url:"/_next/static/media/5c321730472a6124-s.woff2",revision:"5c31c471fa36ee8c6f06a0d096acff8a"},{url:"/_next/static/media/5ea63b290dc24b98-s.p.woff2",revision:"b76d8cc11cd246f1e2db477e3921e5b8"},{url:"/_next/static/media/670e7515c0ec7969-s.woff2",revision:"8dc82cec3d114254052c661319ddc4a2"},{url:"/_next/static/media/80d925a0815d4a5e-s.woff2",revision:"59b3693dd52c52c7cc44b6820487ae69"},{url:"/_next/static/media/a07a681310c4fd05-s.woff2",revision:"e923816a0439ebe3358e734829282e2c"},{url:"/_next/static/media/bab17ed55dc9a065-s.p.woff2",revision:"788050e44ac40fa2b3b8f680395ae98b"},{url:"/_next/static/media/d814be474d188212-s.woff2",revision:"47c1727e08bb6f292efc04c36ab1ee1d"},{url:"/_next/static/media/e95b56c55e926f76-s.woff2",revision:"825a59e34e6af69e2f6c4f6a7acc906d"},{url:"/_next/static/media/scanner-beep.8f39bf73.mp3",revision:"8f39bf73"},{url:"/icons/favicon.png",revision:"4fcbdfb560554e9b99c0a83f98272a39"},{url:"/images/logo-help.svg",revision:"54415f34e0b61b9201504f1924fb71a6"},{url:"/images/logo-layout.svg",revision:"213a5174ae485ad4ff61b4404d0ef35d"},{url:"/images/logo.svg",revision:"fe7c33ef9f7c3408419214484c988bd8"},{url:"/images/podium.svg",revision:"c02b3eca1f25d021bd6d82937d7f7bb6"},{url:"/images/rank.svg",revision:"f1fb1c93300901c5bace05d4a8e6d930"},{url:"/manifest.json",revision:"941417c545c1abaa30542f287c434a96"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));