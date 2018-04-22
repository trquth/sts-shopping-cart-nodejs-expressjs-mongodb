var mongooes = require('mongoose');

var userSchema = new mongooes.Schema({
    email :{type : String, required : true},
    password : {type : String, required : true}
})

module.exports = mongooes.model('User', userSchema);