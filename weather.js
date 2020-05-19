$(document).ready(function(){

  var api_key="OyZAYsIy1ImRTeDLLP3w6FJUIr0DZOPHImKWE2he";
  var url = "https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=" + api_key;

  var template = $(".weather-card-wrapper");

  $.get(url, function(data, status){
    data["sol_keys"].forEach((sol, i) => {
      console.log(sol+" : "+data[sol]);

      templateClone = template.clone().removeClass("d-none").appendTo(template.parent());

      //date
      templateClone.find(".weather-date").text(data[sol]["First_UTC"].split("T")[0]);
      templateClone.find(".weather-sol").text("Sol: " + sol);

      //temperature
      templateClone.find(".weather-at-av").text("avg: " + parseFloat(data[sol]["AT"]["av"]).toFixed(2));
      templateClone.find(".weather-at-mn").text("min: " + parseFloat(data[sol]["AT"]["mn"]).toFixed(2));
      templateClone.find(".weather-at-mx").text("max: " + parseFloat(data[sol]["AT"]["mx"]).toFixed(2));

      //wind
      templateClone.find(".weather-hws-av").text("avg: " + parseFloat(data[sol]["HWS"]["av"]).toFixed(2));
      templateClone.find(".weather-hws-mn").text("min: " + parseFloat(data[sol]["HWS"]["mn"]).toFixed(2));
      templateClone.find(".weather-hws-mx").text("max: " + parseFloat(data[sol]["HWS"]["mx"]).toFixed(2));

      //pressure
      templateClone.find(".weather-pre-av").text("avg: " + parseFloat(data[sol]["PRE"]["av"]).toFixed(2));
      templateClone.find(".weather-pre-mn").text("min: " + parseFloat(data[sol]["PRE"]["mn"]).toFixed(2));
      templateClone.find(".weather-pre-mx").text("max: " + parseFloat(data[sol]["PRE"]["mx"]).toFixed(2));

    });


  });


});
