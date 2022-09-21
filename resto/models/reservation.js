const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    name: String,
    email: String,
    phoneNumber: Number,
    datetimepicker: String,
    time: String,
    selectPerson: Number, 
    message: String
    
});


module.exports = mongoose.model('Post', schema);

