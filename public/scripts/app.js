console.log("Sanity Check: JS is working!");

var vacationSpot= [];
var personalInfo = [];

$(document).ready(function(){

// your code
$.ajax({
  method: 'GET',
  url: 'api/profile',
  success: function succ(json){
    console.log(json)
    $("#myName").append(`${json.name}`)
    $("#githubLink").append(`<a href="${json.githubLink}">Click Here</a>`)
    $("#personalSite").append(`<a href="${json.personalSiteLink}">My Personal Site</a>`)
    $("#cityNow").append(`${json.currentCity}`)
  },
  error: function err(){
    console.log("show profile broken")
  }
})

});
