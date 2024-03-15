"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[251],{5810:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var t=s(4848),r=s(8453);const o={},i="FreshRSS",a={id:"RSS/FreshRSS/index",title:"FreshRSS",description:"docker-compose.yml",source:"@site/docs/RSS/FreshRSS/index.md",sourceDirName:"RSS/FreshRSS",slug:"/RSS/FreshRSS/",permalink:"/docs/RSS/FreshRSS/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Translate your site",permalink:"/docs/tutorial-extras/translate-your-site"}},c={},l=[];function d(e){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"freshrss",children:"FreshRSS"}),"\n",(0,t.jsx)(n.p,{children:"docker-compose.yml"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"version: \"2.4\"\n\nvolumes:\n  data:\n  extensions:\n\nservices:\n\n  freshrss:\n    image: freshrss/freshrss:latest\n    # Optional build section if you want to build the image locally:\n    build:\n      # Pick #latest (stable release) or #edge (rolling release) or a specific release like #1.21.0\n      context: https://github.com/FreshRSS/FreshRSS.git#latest\n      dockerfile: Docker/Dockerfile-Alpine\n    container_name: freshrss\n    hostname: freshrss\n    restart: unless-stopped\n    logging:\n      options:\n        max-size: 10m\n    volumes:\n      - data:/var/www/FreshRSS/data\n      - extensions:/var/www/FreshRSS/extensions\n    environment:\n      TZ: Europe/Paris\n      CRON_MIN: '3,33'\n      TRUSTED_PROXY: 172.16.0.1/12 192.168.0.1/16\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>a});var t=s(6540);const r={},o=t.createContext(r);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);