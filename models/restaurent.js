var db = require('../db/dbconfig');

var restaurent = {};

restaurent.getAll = function (req, res, next){
    db.manyOrNone("SELECT * FROM restaurents;")
    .then(function (result){
        res.locals.restaurents = result;
        next();
    })
    .catch(function(error){
        console.log('This restaurents getAll function', error);
        next();
      })
}

restaurent.find = function (req, res, next){
    db.one("SELECT * FROM restaurents WHERE id=$1;",
          [req.params.id])
    .then(function (result){
        res.locals.restaurent = result;
        next();
    })
    .catch(function(error){
        console.log('This restaurents find function', error);
        next();
      })
}

restaurent.create = function (req, res, next){
    db.one("INSERT INTO restaurents(name, cuisines, hours_of_operation, phone_number, img) VALUES($1,$2,$3,$4,$5) RETURNING id;",
          [req.body.name, req.body.cuisines, req.body.hours_of_operation, req.body.phone_number, req.body.img])
    .then(function (result){
        res.locals.restaurentId = result.id;
        next();
    })
    .catch(function(error){
        console.log('This restaurents create function', error);
        next();
      })
}

restaurent.update = function (req, res, next) {
    db.one("UPDATE restaurents SET name=$1, cuisines=$2, hours_of_operation=$3, phone_number=$4, img=$5 RETURNING id;",
          [req.body.name, req.body.cuisines, req.body.hours_of_operation, req.body.phone_number, req.body.img])
    .then(function(result){
              res.locals.restaurentId = result.id;
              next();
    })
    .catch(function(error){
        console.log('This restaurents update function', error);
        next();
      })
}

restaurent.delete = function (req, res, next) {
    db.none("DELETE FROM restaurents WHERE id=$1;", [req.params.id])
    .then(function(){
        next();
    })
    .catch(function (error) {
        console.log('This restaurents delete function', error);
        next();
      })
}

module.exports = restaurent;