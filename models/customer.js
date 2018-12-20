var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');

var customer = {};

customer.create = function (req, res, next) {
    db.one("INSERT INTO customers(username, fname, lname, phone_number, email, password_digest) VALUES ($1,$2,$3,$4,$5,$6) RETURNING username;",
        [req.body.username.toLowerCase(), req.body.fname, req.body.lname, req.body.phone_number, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10)])
        .then(function (result) {
            req.session.customer = result;
            res.locals.customerUsername = result.username;
            next();
        })
        .catch(function (error) {
            console.log('Customer Create Function', error);
            next();
        })
};

customer.find = function (req, res, next) {
    db.one("SELECT * FROM customers WHERE username=$1;", [req.params.username])
        .then(function (result) {
            res.locals.customer = result;
            next();
        })
        .catch(function (error) {
            console.log('Customer Find Function', error);
            next();
        })
};

customer.addReservation = function (req, res, next) {
    console.log(req.session.customer.id);
    db.one("INSERT INTO reservations(date, time, customer_id, restaurent_id) VALUES($1,$2,$3,$4) RETURNING customer_id;",
    [req.body.date, req.body.time, req.session.customer.id, req.params.id])
    .then(function (result){
        res.locals.customer = result;
        next();
    })
    .catch(function (error) {
        console.log('Add reservation Function', error);
        next();
      })
};


customer.update = function (req, res, next) {
    db.one("UPDATE customers SET fname=$1, lname=$2, phone_number=$3, email=$4, password_digest=$5 WHERE username=$6 RETURNING *;",
        [req.body.fname, req.body.lname, req.body.phone_number, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10), req.params.username])
        .then(function (result) {
            res.locals.customerUsername = result.username;
            next();
        })
        .catch(function (error) {
            console.log('Customer update Function', error);
            next();
        })
};


customer.findReservation = function (req, res, next) {
    db.manyOrNone("SELECT reservations.date, reservations.time, restaurents.name, restaurents.img FROM reservations, customers, restaurents WHERE reservations.customer_id=customers.id AND reservations.restaurent_id=restaurents.id AND customers.username=$1;",
        [req.session.customer.username])
        .then(function (result) {
            res.locals.reservations = result;
            console.log(res.locals.reservations)
            next();
        })
        .catch(function (error) {
            console.log('Customer findReservation Function', error);
            next();
        })
};

module.exports = customer;