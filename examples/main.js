function getHistory() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/GetHistory/08806555018611/180914579188/r036191/2021-07-07T00:00:00.000Z",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "d1d1c56e-de63-74cd-cacd-11761b8cec32"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log($('#getHistResponse').text(JSON.stringify(response)));
    });
}

$(document).ready(function () {
    getHistory();

});
