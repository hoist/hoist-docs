var p = new Function();
p.prototype.newMethod = function(request, response) {
  console.log(request);
  console.log(response);
};