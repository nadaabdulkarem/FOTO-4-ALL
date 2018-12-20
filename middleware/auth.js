var auth = {};

auth.restrict = function(req, res, next){
  if(req.session.customer){
    next();
  }else{
    res.redirect('/login');
  }
}

auth.onlyUser = function(req, res, next) {
  if (req.session.customer) {
    if(req.params.username == req.session.customer.username){
      next();
    }else{
      res.redirect(`/customers/${req.session.customer.username}`)
    }
  } else {
    res.redirect('/login');
  }
}

auth.adminRestrict = function(req, res, next){
  if(req.session.admin){
    next();
  }else{
    res.redirect('/admin');
  }
}

auth.onlyAdmin = function(req, res, next) {
  if (req.session.admin) {
    if(req.params.username == req.session.admin.username){
      next();
    }else{
      res.redirect(`/admin/${req.session.admin.username}`)
    }
  } else {
    res.redirect('/admin');
  }
}

module.exports = auth;