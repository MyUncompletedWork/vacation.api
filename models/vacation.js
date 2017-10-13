var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var vacationSchema = new Schema({
  country: String,
  city: String,
  cost: Number,
  image: String,
})

var Vacation = mongoose.model('vacation', vacationSchema);

module.exports = Vacation
