var express = require('express');
var router = express.Router();
var Product = require('./../models/product');
var csurf = require('csurf');
var passport = require('passport');

var csurfProtection = csurf();
router.use(csurfProtection);
/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find((err, docs) => {
    var productChunks = [];
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
  })

});

router.get('/user/signup', (req, res, next) => {
  var messages = req.flash('error')
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length ? true : false})
})

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

router.get('/user/profile', (req, res, next) => {
  return res.render('user/profile');
})
router.get('/user/signin', (req, res, next) => {
  return res.render('user/signin');
})

router.get('/user/siginin', (req, res, next) => {
  var messages = req.flash('error')
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length ? true : false})
})

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/signup',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

module.exports = router;
