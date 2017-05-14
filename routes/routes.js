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

  app.get('/profile',isLoggedIn,function(req,res){
    res.render('../public/profile.ejs')
  });

  app.get('/auth/google',passport.authenticate('google',{'scope':['profile','email']}));

  app.get('/auth/google/callback',passport.authenticate(
    'google',{
      successRedirect : '/profile',
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
  console.log(req.isAuthenticated.toString());
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
