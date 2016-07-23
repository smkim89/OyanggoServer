'use strict';

// Tasks routes
var Joi = require('joi');

exports.register = function(server, options, next) {
    // Setup the controller

    // Binds all methods
    // similar to doing `tasksController.index.bind(tasksController);`
    // when declaring handlerss


    // Declare routes
    server.route([
      {
          method: 'GET',
          path: '/{path*}',
          handler: {
         		directory: {
                    path: './public',
                    listing: false,
                    index: true
                }
            }
        }
      ]);
      next();
}

exports.register.attributes = {
    name: 'routes-main',
    version: '1.0.1'
};
