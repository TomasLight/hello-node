const http = require('http');
const fs = require('fs');

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * */
function simpleResponse(request, response) {
    console.log(`Url: ${request.url}`);
    console.log(`Тип запроса: ${request.method}`);
    console.log(`User-Agent: ${request.headers['user-agent']}`);
    console.log(`Все заголовки`);
    console.log(request.headers);

    response.setHeader('UserId', 12);
    response.setHeader('Content-Type', 'text/html; charset=utf-8;');

    response.write(`<h2>hello world</h2>`);
    response.write(`<p>Url: ${request.url}</p>`);
    response.write(`<p>Тип запроса: ${request.method}</p>`);
    response.write(`<p>User-Agent: ${request.headers['user-agent']}</p>`);

    response.write(`<h3>Все заголовки</h3>`);

    const headers = Object.keys(request.headers);
    const headerValues = headers.map(headerName => `<p><b>${headerName}:</b> ${request.headers[headerName]}</p>`);
    response.write(headerValues.join(''));

    response.end();
}

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * */
function fileResponse(request, response) {
    const filePath = `./public${request.url}`;

    /** @param {boolean} hasReadAccess - has read access to requested file or not*/
    function createResponse(hasReadAccess) {
        if (hasReadAccess) {
            fs.createReadStream(filePath).pipe(response);
            return;
        }

        response.statusCode = 404;
        response.end('Resourse not found!');
    }

    fs.access(filePath, fs.constants.R_OK, (error) => createResponse(!error));
}

const httpServer = http.createServer((request, response) => {
    // simpleResponse(request, response);
    fileResponse(request, response);
});

httpServer.listen(3000, '127.0.0.1', () => {
    console.log('Сервер начал прослушивание запросов на порту 3000');
})
