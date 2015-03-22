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
  
  if(doc.src.indexOf('.md') === -1) {
    doc.src += '/index.md';
  }
  var src = path.resolve(__dirname + '/../docs' + doc.src);
  var content;
  var location = path.resolve(__dirname + '/../compiled' + doc.url + '.html');
  var raw = fs.readFileSync(src, 'utf8');

  var re = /\[nav-(prev|next) ([^\]]*)\]/gi;
  var m;
  while (m = re.exec(raw)) {
    if(m[1] === 'next') {
      raw = raw.replace(m[0], goForward(m[2]));
    } else {
      raw = raw.replace(m[0], goBack(m[2]));
    }
    //console.log(m);
  }

  content = marked(raw);
  w(location, content);

  // content += "<div class='doc-nav-link'>";
  // content += goBack(doc) + goForward(doc);
  // content += "</div>";
}
var w = function(location, content) {
  ensureExists(path.dirname(location), '0777', function() {
    fs.writeFileSync(location, content);
  }); 
}

var goBack = function(link) {
  //<span class='desc'>Here is the next page</span>
  return "<a href='/docs" + link + "' class='doc-link-back'><span class='title'>" + link + "</span></a>";
};
var goForward = function(link) {
  //<span class='desc'>Here is the next page</span>
  return "<a href='/docs" + link + "' class='doc-link-forward'><span class='title'>" + link + "</span></a>";
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