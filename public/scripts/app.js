console.log("Sanity Check: JS is working!");

var vacationSpot = [];
var personalInfo = [];

$(document).ready(function() {

    // your code
    function getLocationHTML(vacation) {
        return `
          <div class="row locations">
          <image class="col-md-6" src="${vacation.image}"/>
          <div class="col-md-6">
          <p>Country: ${vacation.country}</p>
          <p>City: ${vacation.city}</p>
          <p>Estimated Cost of Traveling: $${vacation.cost}</p>
          <button type="button" name="button" class="deleteBtn btn btn-success" data-id=${vacation._id}>Accomplish</button>
          </div>
          </div>`
    }

    function getLocationData(vacation) {
        return vacation.map(getLocationHTML)
    }

    function reload() {
        $("#showVacaSpot").empty();
        $("#showVacaSpot").append(getLocationData(vacationSpot))
    }

    $.ajax({
        method: 'GET',
        url: 'api/profile',
        success: function succ(json) {
            $("#myName").append(`${json.name}`)
            $("#githubLink").append(`<a href="${json.githubLink}">Click Here</a>`)
            $("#personalSite").append(`<a href="${json.personalSiteLink}">My Personal Site</a>`)
            $("#cityNow").append(`${json.currentCity}`)
            $("#photoMe").append(`<image class="col-md-12" id="myPhoto" src="${json.githubProfileImage}"/>`)
        },
        error: function err() {
            console.log("show profile broken")
        }
    })

    $.ajax({
        method: 'GET',
        url: 'api/vacation',
        success: function vacation(json) {
            console.log(json);
            vacationSpot = json;
            $("#showVacaSpot").append(getLocationData(vacationSpot));
            reload();
        },
        error: function(a, b, c) {
            console.log(a, b, c)
        }
    })

    $("#showVacaSpot").on('click', '.deleteBtn', function() {
        $.ajax({
            method: "DELETE",
            url: 'api/vacation/' + $(this).attr('data-id'),
            success: function deleteLocation(json) {
                console.log(json)
                for (var i = 0; i < vacationSpot.length; i++) {
                    if (vacationSpot[i]._id === json._id) {
                        vacationSpot.splice(i, 1);
                        break;
                    }
                }
                reload()
            },
            error: function(a, b, c) {
                console.log(a, b, c)
            }
        })
    })

    //create new visiting locations
    $("#vacaForm").on('submit', function(event){
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/vacation',
        data: $(this).serialize(),
        success: function success(json){
          vacationSpot.push(json);
          reload();
        },
        error: function(a, b, c){console.log(a, b, c)}
      })
    })

});
