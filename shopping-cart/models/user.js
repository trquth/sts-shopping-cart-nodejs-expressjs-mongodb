var mongooes = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongooes.Schema({
    email :{type : String, required : true},
    password : {type : String, required : true}
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongooes.model('User', userSchema);