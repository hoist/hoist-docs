'use strict';
var Hapi = require('hapi');
var docs = require('./lib');
var handlebars = require('handlebars');

var server = new Hapi.Server();
server.connection({ port: 3000 });


server.register(require('vision'), function (err) {

  handlebars.registerHelper('ifCond', function (origin, test, options) {
    if (origin === test) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  server.views({
    engines: {
      handlebars: handlebars
    },
    isCached: false,
    relativeTo: __dirname,
    path: './static',
  });

});

server.register(require('inert'), function(err) {
   server.route({
    method: 'GET',
    path: '/css/style.css',
    handler: function (request, reply) {
      reply.file('./static/style.css');
    }
  });
})

server.route(
  {
    method: 'GET', 
    path: '/docs/{parts*}', 
    handler: function(request, reply) {
      var docsViewParams = {
        showDocsBreadcrumb: true,
        isDocs: true,
        docs: docs(request)
      };
      reply.view(
        'view',
        docsViewParams
      );
    }
  }
);

server.start(function () {

});
