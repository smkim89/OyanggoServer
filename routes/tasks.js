'use strict';

// Tasks routes
var Joi = require('joi');
var TasksController = require('../controllers/Tasks');

exports.register = function(server, options, next) {
    // Setup the controller
    var tasksController = new TasksController(options.database);

    // Binds all methods
    // similar to doing `tasksController.index.bind(tasksController);`
    // when declaring handlers
    server.bind(tasksController);

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/tasks',
            config: {
                handler: tasksController.index,
                validate: {
                    query: Joi.object().keys({
                        start: Joi.number().min(0),
                        limit: Joi.number().min(1)
                    })
                }
            }
        },
        {
            method: 'GET',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.show,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/tasks',
            config: {
                handler: tasksController.store,
                validate: {
                    payload: Joi.object().length(1).keys({
                        task: Joi.string().required().min(1).max(60)
                    })
                }
            }
        },
        {
            method: 'PUT',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.update,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    },
                    payload: Joi.object().length(1).keys({
                        task: Joi.string().required().min(1).max(60)
                    })
                }
            }
        },
        {
            method: 'DELETE',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.destroy,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    }
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes-tasks',
    version: '1.0.1'
};
