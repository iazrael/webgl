const http = require("http");
const Path = require("path");
const fs = require("fs");
const zlib = require('zlib');
const express = require('express')
const app = express()

app.get('*', (req, res) => {
    const fileName = Path.resolve(__dirname, "." + req.url);
    const extName = Path.extname(fileName).substr(1);
    console.log("req: ", fileName);
    if (!fs.existsSync(fileName)) { //判断本地文件是否存在
        console.log("Not Found: ", fileName);
        res.status(404).end();
        return;
    }
    const state = fs.statSync(fileName);
    if (state.isDirectory()) {
        console.log("Not Support directory: ", fileName);
        res.status(403).end();
        return;
    }
    var mineTypeMap = {
        html: 'text/html;charset=utf-8',
        htm: 'text/html;charset=utf-8',
        xml: "text/xml;charset=utf-8",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        css: "text/css;charset=utf-8",
        txt: "text/plain;charset=utf-8",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        ico: "image/x-icon",
        tif: "image/tiff",
        svg: "image/svg+xml",
        zip: "application/zip",
        ttf: "font/ttf",
        woff: "font/woff",
        woff2: "font/woff2",
        js: "application/x-javascript",

    }
    if (mineTypeMap[extName]) {
        res.setHeader('Content-Type', mineTypeMap[extName]);
    }
    var stream = fs.createReadStream(fileName);
    if (req.headers["accept-encoding"].indexOf("gzip") >= 0 && (extName == "js" || extName == "css" || extName == "html")) {
        res.setHeader('Content-Encoding', "gzip");
        const gzip = zlib.createGzip();
        stream.pipe(gzip).pipe(res);
    } else {
        stream.pipe(res);
    }
})

app.listen(3000, () => {
    console.log('listen on 3000')
})

