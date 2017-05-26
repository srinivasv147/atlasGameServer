//the purpose of this file is to remove /static from
// the generated play.ejs.
var fs = require('fs');

function readWriteSync() {
  var data = fs.readFileSync(__dirname+'/public/play.ejs', 'utf-8');

  var newValue = data.replace('static/', '');

  fs.writeFileSync(__dirname+'/public/play.ejs', newValue, 'utf-8');

  console.log('readFileSync complete');
}

readWriteSync();
