var Place = require('../models/place.js');
var User = require('../models/user.js')

module.exports = function(app,passport){
  console.log("function executed");

  app.get('/',function(req,res){
    console.log("got request");
    res.render('../public/index.ejs');
  });

  app.get('/login',function(req,res){
    res.render('../public/login.ejs')
  });

  // app.post('/login',function(req,res){
  //   //here we get login info.
  // });

  app.get('/play',isLoggedIn,function(req,res){
    res.render('../public/play.ejs')
  });

  app.post('/play',isLoggedIn,function(req,res){
    var rec = req.body.place[req.body.place.length - 1].toLowerCase();
    var input = req.body.place.toLowerCase();
    Place.findOne({name : input},function(err,ret){
      if(err){
        res.render('../views/error.ejs');
      }
      if(!ret){
        res.json({error : "no place called "+input+" in our database"});
      }
      else{
        // console.log(req.user);
        User.findOne({'google.id' : req.user.google.id},function(err,pres_user){
          if(err){
            res.render('../views/error.ejs');
          }
          // console.log(pres_user);
          var latest = pres_user.played[pres_user.played.length - 1];
          if(pres_user.played.indexOf(input) !== -1){
            res.json({error : "sorry the place "+input+" has already been played"});
          }
          else if(input[0] !== latest[latest.length - 1]){
            res.json(
              {error :
                "your place "
                +input+" does not start with "+latest[latest.length - 1]+
                " the last letter of "+latest
              });
          }
          else{
            pres_user.played.push(input);
            // console.log(pres_user.played);
            Place.findOne({startLetter : rec , name : {"$nin" : pres_user.played}},
              function(err,new_place){
              if(err){
                res.render('../views/error.ejs');
              }
              pres_user.played.push(new_place.name);
              pres_user.save(function(err,done){
                if(err){
                  res.render('../views/error.ejs');
                }
              });
              res.json({place : new_place.name});
            });
          }
        });
      }
    });
  });

  app.get('/auth/google',passport.authenticate('google',{'scope':['profile','email']}));

  app.get('/auth/google/callback',passport.authenticate(
    'google',{
      successRedirect : '/play',
      failureRedirect : '/'
    }
  ));

  app.get('/logout',isLoggedIn,function(req,res){
    req.logout();
    res.render('/');
  });
  // console.log(app);
};

function isLoggedIn (req,res,next){
  // console.log(req.isAuthenticated.toString());
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

// function isRun(req,res,err){
//   console.log("callback is run");
//   return next();
// }
