var docsStructure = require('../structure.json');
var _ = require('lodash');
var marked = require('marked');
var fs = require('fs');
var path = require('path');


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return code;
  }
});

var write = function(doc) {
  
  if(doc.src.indexOf('.') === -1) {
    doc.src += '/index.md';
  }
  var src = path.resolve(__dirname + '/../docs' + doc.src);
  var location = path.resolve(__dirname + '/../compiled' + doc.url + '.html');
  var raw = fs.readFileSync(src, 'utf8');

  var re = /\[nav-(prev|next) ([^\s\]]*) '([^']*)' '([^']*)'\]/gi;
  var m;

  raw = raw.replace('[links]', "<div class='doc-nav-link'>");
  raw = raw.replace('[/links]', "</div>");

  while (m = re.exec(raw)) {
    if(m[1] === 'next') {
      raw = raw.replace(m[0], goForward(m));
    } else {
      raw = raw.replace(m[0], goBack(m));
    }
  }

  if(src.indexOf('.md') !== -1) {
    w(location, marked(raw));
  }
  // if(src.indexOf('.apib') !== -1) {
  //   aglio.render(raw, 'default', function (err, html, warnings) {
  //     w(location, html);
  //   });
  // }

};

var w = function(location, content) {
  ensureExists(path.dirname(location), '0777', function() {
    fs.writeFileSync(location, content);
  }); 
}

var goBack = function(details) {
  return "<a href='/docs" + details[2] + "' class='doc-link-back'><span class='title'>" + details[3] + "</span><span class='desc'>" + details[4] + "</span></a>";
};
var goForward = function(details) {
  return "<a href='/docs" + details[2] + "' class='doc-link-forward'><span class='title'>" + details[3] + "</span><span class='desc'>" + details[4] + "</span></a>";
};

var loop = function(docs) {

  _.each(docs, function(doc) {
    write(doc);
    if(doc.docs) {
      loop(doc.docs);
    }
  })

};

write(docsStructure);
loop(docsStructure.docs);

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}