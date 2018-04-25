var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');

router.get('/register-account', (req, res, next) => {
    res.render('auth/register-account')
})

router.post('/register-account', (req, res, next) => {
    if (req.xhr || req.accepts('json,html') === 'json') {
        res.send({ success: true })
    } else {
        res.redirect('/register-account')
    }
})

router.get('/register-account/form-handle', (req, res, next) => {
    res.render('auth/form-handle-register-account')
})

router.post('/register-account/form-handle', (req, res, next) => {
    res.redirect('/auth/register-account/form-handle')
})

router.get('/register-account/upload-file', (req, res, next) => {
    res.render('auth/upload-file-register-account')
})

router.post('/register-account/upload-file', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.redirect('/auth/register-account/upload-file')
        }
    })
    res.redirect('/auth/register-account/upload-file')
})

router.use('/upload', (req, res, next) => {
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: () => {
            return __dirname + '/public/uploads/' + now
        },
        uploadUrl: () => {
            return '/uploads/' + now
        }
    })
})

module.exports = router;
