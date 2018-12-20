var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');

var admin = {};

admin.create = function(req, res, next) {
    db.one("INSERT INTO admin(username, fname, lname, phone_number, email, password_digest) VALUES ($1,$2,$3,$4,$5,$6) RETURNING username;",
    [req.body.username.toLowerCase(), req.body.fname, req.body.lname, req.body.phone_number, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10)])
    .then(function (result){
        req.session.admin = result;
        res.locals.adminUsername = result.username;
        next();
    })
    .catch(function (error) {
        console.log('Admin Create Function', error);
        next();
      })
};

admin.find = function(req, res, next) {
    db.one("SELECT * FROM admin WHERE username=$1;", [req.params.username])
    .then(function (result){
        res.locals.admin = result;
        next();
    })
    .catch(function (error) {
        console.log('Admin Find Function', error);
        next();
      })
};

admin.update = function(req, res, next) {
    db.one("UPDATE admin SET fname=$1, lname=$2, phone_number=$3, email=$4, password_digest=$5 WHERE username=$6 RETURNING username;",
    [req.body.fname, req.body.lname, req.body.phone_number, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10), req.params.username])
    .then(function (result){
        res.locals.adminUsername = result.username;
        next();
    })
    .catch(function (error) {
        console.log('Admin update Function', error);
        next();
      })
};


admin.findReservation = function (req, res, next) {
    db.manyOrNone("SELECT reservations.date, reservations.time, reservations.id , restaurents.name, restaurents.img, customers.username, customers.fname, customers.lname, customers.email, customers.phone_number FROM reservations, customers, restaurents WHERE reservations.customer_id=customers.id AND reservations.restaurent_id=restaurents.id;")
        .then(function (result) {
            res.locals.reservations = result;
            console.log(res.locals.reservations)
            next();
        })
        .catch(function (error) {
            console.log('admin findReservation Function', error);
            next();
        })
};

admin.deleteReservation = function (req, res, next) {
    db.one("DELETE FROM reservations WHERE id=$1;",
    [req.params.id])
    .then(function () {
        next();
    })
    .catch(function (error) {
        console.log('admin deleteReservation Function', error);
        next();
    })
}

module.exports = admin;