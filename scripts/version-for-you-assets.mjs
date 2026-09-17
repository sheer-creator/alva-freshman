import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const root=new URL('../public/demo/for-you-feed/',import.meta.url);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex').slice(0,16);
const snapshot=await readFile(new URL('snapshot.json',root));
const dataName=`releases/snapshot.${hash(snapshot)}.json`;
const source=await readFile(new URL('app.js',root),'utf8');
if(!source.includes("fetch('snapshot.json')"))throw Error('Missing snapshot fetch to version');
const app=source.replace("fetch('snapshot.json')",`fetch('${dataName}')`);
const appName=`releases/app.${hash(app)}.js`;
await mkdir(new URL('releases/',root),{recursive:true});
// Keep older releases so cached HTML can still load its matching data and code.
await writeFile(new URL(dataName,root),snapshot);
await writeFile(new URL(appName,root),app);
const html=await readFile(new URL('index.html',root),'utf8');
const updated=html.replace(/<script src="(?:app\.js|releases\/app\.[a-f0-9]+\.js)"><\/script>/,`<script src="${appName}"></script>`);
if(updated===html&&!html.includes(appName))throw Error('Missing script entry to version');
await writeFile(new URL('index.html',root),updated);
console.log(`For You assets: ${appName}, ${dataName}`);
