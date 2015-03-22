var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var docsStructure = require('../structure.json');
var generate = require('./generate');

generate();

module.exports = function(request) {

  if(!request.params.parts) {
    request.params.parts = '';
  }
  var parts = request.params.parts.split('/');

  return {
    content: fs.readFileSync(path.resolve(__dirname + '/../compiled/' + request.params.parts + '.html')),
    links: linkLoop(docsStructure.docs, '/' + request.params.parts),
    root: parts[0]
  };

};

var linkLoop = function(docs, active) {
  
  var result = "<ul>";
  _.each(docs, function(d) {
    
    result += "\t<li " + (d.url === active ? 'class=\'active\'' : '') + "><a href='/docs" + d.url + "'>" + d.name + "</a>";

    if(d.docs) {
      result += "<ul>\r\n";
      result += linkLoop(d.docs, active);
      result += "</ul>\r\n";
    }

    result += "</li>\r\n";
  });
  result += "</ul>";
  return result;

}