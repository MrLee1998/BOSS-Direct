const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String
  }
  
}, { collection: 'password', versionKey: false});

module.exports = mongoose.model('password', PasswordSchema);
