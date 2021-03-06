'use strict';

var Database = require('./database');
var Hapi = require('hapi');

var database = new Database();
var server = new Hapi.Server({debug: {request: ['info', 'error']}});

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// Create server
server.connection({
    host: process.env.IP || "0.0.0.0",
    port: process.env.PORT || 3000
});

// Add routes
var plugins = [
    {
        register: require('./routes/main.js'),
        options: {
            database: database
        }
    },
    {
        register: require('./routes/tasks.js'),
        options: {
            database: database
        }
    }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        server.start(function(err) {
            if (err) { throw err; }

            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
