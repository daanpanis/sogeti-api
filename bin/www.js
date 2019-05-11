#!/usr/bin/env node
"use strict";

var httpPort = normalizePort(process.env.PORT || 8080);

var server = require("../dist/server");
server.bootstrap(httpPort).then(value => {
    console.log('Started!');
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}