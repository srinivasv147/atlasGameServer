//we create a places database for india
// normal loops can not be used with async functions
// as the call stack size gets exceeded very fast
// here the async library makes sure that the
// execution proceeds one after the other
// or parallelly. i.e running each time the callback is called.
// we can use mongo bulk inserts to do the same.
var fileName = '../IN/IN.txt';
var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');
var Place = require('./models/place');
var configDB = require("./config/configDB");
var name_list = ['ADM1','ADM2','PPL'];
var MongoClient = require('mongodb').MongoClient;
var checkCity = function(name,name_list){
  var ret = false;
  for (index in name_list){
    ret = ret || (name === name_list[index])
  }
  return ret;
}
// mongoose.connect(configDB.url);
fs.readFile(fileName,'utf8',function(err,data){
  if(err) throw err;
  var places = data.split("\n");
  var new_places = places.filter(function(val){
    name = val.split("\t");
    return (name[2] && checkCity(name[7],name_list));
  });
  var placeNames = new_places.map(function(val,index,array){
  var name = val.split("\t");
  if (name[2].toLowerCase().indexOf("state of") !== -1){
    name[2] = name[2].substring(9,name[2].length);
  }
  return name[2].toLowerCase();
  });
  var len = placeNames.length;
  console.log(len);
  MongoClient.connect("mongodb://localhost:27017/userData",
  function(err,db){
    var col = db.collection('places');
    var batch = col.initializeUnorderedBulkOp();
    for(var i = 0; i < len;i++ ){
      var tempPlace = {"name" : placeNames[i], "startLetter" : placeNames[i][0]};
      batch.insert(tempPlace);
    }
    batch.execute(function(err,result){
      console.log(err);
      db.close();
    });
  });
});
