// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var vacationSpots = [
  {
    country: "Taiwan",
    city: "Kaohsiung",
    cost: 763,
    image: "https://c1.staticflickr.com/8/7082/7014029817_5e02f56bc6_b.jpg"
  },
  {
    country: "Japan",
    city: "Kyoto",
    cost: 603,
    image: "http://static5.businessinsider.com/image/5818c9bbdd08956c5a8b47b1/19-photos-that-show-why-kyoto-and-tokyo-were-voted-the-best-cities-in-the-world.jpg"
  },
]
db.Vacation.remove({}, function(err, success){
  if(err){console.log("seed.js err line 34")};
  db.Vacation.create(vacationSpots, function(err, spots){
    if(err){
      return console.log(err);
    }
    console.log(spots);
    process.exit();
  })

})
