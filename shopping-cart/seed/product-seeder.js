var Product = require('./../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', err => {
  console.log('ERROR SEEDER-->', err)
});

var products = []

for (let i = 0; i < 7; i++) {
    products.push(new Product({
        imagePath: `https://picsum.photos/200/300?image=${910 + i}`,
        title: 'Lorem ipsum dolor sit amet',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. Duis aute irure dolor 
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident,
         sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        price: 100 * i
    }))
}


var done = 0
for (let i = 0; i < products.length; i++) {
    products[i].save((err, result) => {
        done++;
        if(done === products.length){
            mongoose.disconnect();
        }
    });
}