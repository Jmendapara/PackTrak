/**
 * Created by gopinath on 3/9/19.
 */


 var markers = [];





function getHistory() {

  deleteMarkers();

  var gtin1 = document.getElementById("gtin").value;
  var serial1 = document.getElementById("serial").value;
  var lot1 = document.getElementById("lot").value;
  var expiry1 = document.getElementById("expiry").value;

  var fullurl = "/GetHistory/"+gtin1+"/"+serial1+"/"+lot1+"/"+expiry1;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": fullurl,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "d1d1c56e-de63-74cd-cacd-11761b8cec32"
        }
    }



    $.ajax(settings).done(function (response) {
        console.log(response);

       if(response.data.products==null){
         alert("Sorry! The product you searched for is not avaliable.")
        }

        else{

        for (var i = 0; i < response.data.products.length; i++) {


            var myLatLng = {lat:parseFloat(response.data.products[i].product.latitude), lng: parseFloat(response.data.products[i].product.longitude)};
            var content1 =

            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+response.data.products[i].timestamp+'</h1>'+
            '<div id="bodyContent">'+
            '<ul>'+
            '<li><b>Country:</b> '+response.data.products[i].product.country+'</li>'+
            '<li><b>Logistic Status:</b> '+response.data.products[i].product.logisticStatus+'</li>'+
            '<li><b>Trade Item Description:</b> '+response.data.products[i].product.tradeItemDesc+'</li>'+


            '</ul>'+

            '</div>'+
            '</div>';

            addMarker(myLatLng, i, content1);

        }

      }

    });




 }



 // Adds a marker to the map and push to the array.
     function addMarker(location, i, content1) {

       var infowindow = new google.maps.InfoWindow({
          content: content1
        });


       var marker = new google.maps.Marker({
         position: location,
         map: map,
         label: i+1+'',

       });

       marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

       markers.push(marker);

     }




 function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
