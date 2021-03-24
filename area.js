var fs = require('fs');
var Vector3 = require('vector-3');

const file = process.argv.slice(2).toString()

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(data);
})