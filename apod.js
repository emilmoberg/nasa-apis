
$(document).ready(function(){

  // With a more sensitive data api, I would do API calls on the server side, or using authorization e.g. OAuth.


  var api_key = "OyZAYsIy1ImRTeDLLP3w6FJUIr0DZOPHImKWE2he";
  const firstDate = new Date("1995-06-16");
  var today = new Date();
  var selectedDate = today;

  //DOM
  var btnPrevious = $(".btn.previous");
  var btnNext = $(".btn.next");
  var btnToday = $(".btn.today");


  //APOD
  updateAPOD(selectedDate);
  updateButtons(selectedDate);

  $(".btn.previous").click(function(){
    selectedDate = addToDate(selectedDate, -1);
    updateAPOD(selectedDate);
    updateButtons(selectedDate);
  })

  btnNext.click(function(){
    selectedDate = addToDate(selectedDate, 1);
    updateAPOD(selectedDate);
    updateButtons(selectedDate);
  })

  $(".btn.today").click(function(){
    selectedDate = today;
    updateAPOD(selectedDate);
    updateButtons(selectedDate);
  })


  function updateAPOD(date){
    
    if (firstDate <= date <= today){

      var url = "https://api.nasa.gov/planetary/apod?api_key="+api_key;
      if (date!="today"){
        isoDate = date.toISOString().split('T')[0];
        url+="&date="+isoDate;
      }
      $.get(url, function(data, status){

        //image
        var img_url = data["url"];
        if (img_url){
          $(".bg-apod").css({
            "background-image": "url(" + img_url + ")"
          });
          $(".img-apod").attr("src", img_url);
        }
        else {
          alert("Data: " + img_url + "\nStatus: " + status);
        }

        //tite
        var title = data["title"];
        if (title){
          $(".title-apod").text(title);
        }

        //explanation
        var explanation = data["explanation"];
        if (title){
          $(".explanation-apod").text(explanation);
        }

        //date
        var isoDate = data["date"];
        if (title){
          $(".date-apod").text(isoDate);
        }

        //copyright
        var copyright = data["copyright"];
        if (title){
          $(".copyright-apod").text("Copyright: " + copyright);
        }



      });
    }
  }


  function addToDate(currentDate, days){
    var addedDate = new Date();
    addedDate.setDate(currentDate.getDate() + days);
    return addedDate;
  }

  function updateButtons(date) {

    //next and today
    if (date >= today) {
      btnNext.attr("disabled", true);
      btnToday.attr("disabled", true);

    }else {
      btnNext.attr("disabled", false);
      btnToday.attr("disabled", false);

      //previous
      if (date <= firstDate){
        btnPrevious.attr("disabled", true);
      }else {
        btnPrevious.attr("disabled", false);
      }
    }

  }




});
