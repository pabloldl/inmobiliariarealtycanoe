const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname)); if(!p.startsWith(root+path.sep)&&p!==root){res.writeHead(403).end();return}let f=p===root||p===root+path.sep?path.join(root,'index.html'):p;fs.readFile(f,(err,b)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.jpg':'image/jpeg','.ttf':'font/ttf','.svg':'image/svg+xml'})[path.extname(f)]||'text/plain; charset=utf-8');res.end(b)})});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let browser,ws;const errors=[];
(async()=>{await new Promise(r=>server.listen(8765,'127.0.0.1',r));browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9333','--user-data-dir='+path.join(__dirname,'chrome'),'about:blank'],{stdio:'ignore'});
let tabs;for(let i=0;i<40;i++){try{tabs=await(await fetch('http://127.0.0.1:9333/json')).json();break}catch{await delay(250)}}if(!tabs)throw Error('Chrome did not start');
ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){let p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push(m.params.entry.text)};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');await send('Page.navigate',{url:'http://127.0.0.1:8765/'});await delay(900);await ev('document.fonts.ready.then(()=>true)');await ev("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)}))" );

const report={widths:[],errors};
for(const width of [375,768,1440,1920]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 await ev('window.scrollTo(0,0)');await delay(300);
 report.widths.push(await ev(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),fonts:document.fonts.check('16px Bodoni')&&document.fonts.check('16px Manrope')})`));
 const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,`screen-${width}.png`),Buffer.from(shot.data,'base64'));
}
await send('Emulation.setDeviceMetricsOverride',{width:375,height:850,deviceScaleFactor:1,mobile:false});
report.menu=await ev(`(()=>{const t=document.querySelector('.index-toggle');t.click();const open=t.getAttribute('aria-expanded')==='true';document.querySelector('#navigation a[href="#espacios"]').click();return {open,closed:t.getAttribute('aria-expanded')==='false'}})()`);
await ev(`document.querySelector('.index-toggle').click()`);await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
report.escape=await ev(`document.querySelector('.index-toggle').getAttribute('aria-expanded')==='false'&&document.activeElement===document.querySelector('.index-toggle')`);
await send('Browser.grantPermissions',{origin:'http://127.0.0.1:8765',permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
await ev(`document.querySelector('.copy-phone').click()`);await delay(250);
report.clipboard=await ev(`navigator.clipboard.readText()`);
report.copyStatus=await ev(`document.querySelector('#copy-status').textContent`);
report.telephones=await ev(`[...document.querySelectorAll('a[href^="tel:"]')].every(a=>a.getAttribute('href')==='tel:+34600280386')`);
report.maps=await ev(`[...document.querySelectorAll('a[href*="google.com/maps"]')].map(a=>new URL(a.href).searchParams.get('query'))`);
report.photos=await ev(`({count:document.images.length,unique:new Set([...document.images].map(i=>i.src)).size,missingAlt:[...document.images].filter(i=>!i.alt).length})`);
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
report.reducedMotion=await ev(`getComputedStyle(document.documentElement).scrollBehavior==='auto'`);
report.fallbackCopy=await ev(`(async()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined});document.querySelector('.copy-phone').click();await new Promise(r=>setTimeout(r,100));return document.querySelector('#copy-status').textContent})()`);
for(const width of [375,768,1440,1920]){await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await ev(`document.activeElement.blur();window.scrollTo(0,0);document.querySelectorAll('.pending').forEach(e=>e.classList.remove('pending'))`);await delay(150);const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(__dirname,`full-${width}.png`),Buffer.from(shot.data,'base64'));}
report.architecture=await ev(`({sectionCount:document.querySelectorAll('main>section').length,rail:getComputedStyle(document.querySelector('.publication-rail')).position,coverPortrait:document.querySelector('.cover-image img').getBoundingClientRect().height>document.querySelector('.cover-image img').getBoundingClientRect().width,declarationHasNoImage:!document.querySelector('.declaration img'),sequence:[...document.querySelectorAll('.plate')].map(p=>({width:Math.round(p.getBoundingClientRect().width),left:Math.round(p.getBoundingClientRect().left),top:Math.round(p.getBoundingClientRect().top)})),stackedPhone:document.querySelectorAll('.phone-typesetting>span').length===3})`);
await send('Emulation.setDeviceMetricsOverride',{width:375,height:850,deviceScaleFactor:1,mobile:false});
report.mobileHeadline=await ev(`(()=>{const h=document.querySelector('#cover-title');return [...h.children].map(e=>{const r=document.createRange();r.selectNodeContents(e);const b=r.getBoundingClientRect();return {left:b.left,right:b.right,fits:b.left>=0&&b.right<=document.documentElement.clientWidth}})})()`);
await ev(`document.querySelector('.index-toggle').setAttribute('aria-expanded','false');document.querySelector('#navigation').classList.remove('open');document.querySelector('.index-toggle').focus()`);await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await send('Input.dispatchKeyEvent',{type:'char',text:'\r',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
report.keyboardIndex=await ev(`document.querySelector('.index-toggle').getAttribute('aria-expanded')==='true'`);
await ev(`document.querySelector('#navigation a[href="#ubicacion"]').click()`);await delay(150);
report.indexFollowsSection=await ev(`document.querySelector('#navigation a[aria-current]')?.hash==='#ubicacion'`);
fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
await send('Browser.close');ws.close();server.close();
})().catch(e=>{console.error(e);ws?.close();browser?.kill();server.close();process.exitCode=1});

