const http = require('http')
const fs = require('fs')
const path = require('path')
// const url = require('url')
const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {

    let pathname = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    let extname = path.extname(pathname)

    let contentType = 'text.html'

    // find content type
    switch(extname){
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
    }

    // server request from user
    fs.readFile(pathname, (err, content) => {
        // on error
        if (err) {
            if (err.code === 'ENOENT') {
                // page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                // some other error
                res.writeHead(500)
                res.end(`The server encountered an unexpected error: ${err}`)
            }
        } else {
            // file successfully received
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content, 'utf8')
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})