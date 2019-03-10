var express = require('express');
var router = express.Router();
var request = require('request');
var base_url = process.env.BASE_URL || 'https://mercklab-poc-sl-api.mybluemix.net/api';

function getApiToken(cb) {

    var payload = {
        url: base_url + '/user/login',
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        json: {
            "email": "tester@merck.com",
            "password": "testing123"
        },
        proxy: '',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    };

    request(payload, function (err, body, response) {
        if (err) {
            cb(err, null);
        } else {
            var result = null;
            if (typeof response === 'string') {
                result = JSON.parse(response);
            } else
                result = response;
            if (result.message === 'Authorization sucessful') {
                cb(null, result.token);
            } else {
                cb(result.message, null);
            }
        }
    });
}

function getHistData(gs1, cb) {


    getApiToken(function (err, token) {
        if (err) {
            console.log(err);
            cb(err);

        } else {
            var payload = {
                url: base_url + '/products/gethistory/' + gs1.gtin + '/serialNumber/' + gs1.serialNumber + '/lotNumber/' + gs1.lotNumber + '/expiryDate/' + gs1.exprDate,
                method: 'GET',
                header: {
                    "Content-Type": "application/json"
                },
                auth: {
                    'bearer': token
                },
                proxy: '',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            };

            request(payload, cb)

        }
    });

}
function getData(gs1, cb) {


    getApiToken(function(err, token) {
        if (err) {
            console.log(err);
            cb(err);

        } else {
            let payload = {
                url: base_url + '/products/' + gs1.gtin + '/serialNumber/' + gs1.serialNumber + '/lotNumber/' + gs1.lotNumber + '/expiryDate/' + gs1.exprDate,
                method: 'GET',
                header: {
                    "Content-Type": "application/json"
                },
                auth: {
                    'bearer': token
                },
                proxy:'',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            };

            request(payload, cb)

        }
    });

}


router.get('/GetSingle/:1/:2/:3/:4', function (req, res, next) {
    console.log(req.path);
    var values = req.path.split('/');
    var gs1 = {
        gtin: values[2],
        serialNumber: values[3],
        lotNumber: values[4],
        exprDate: values[5]  // Note Date should be string
    };
    getData(gs1, function (err, body, response) {
        if (err) {
            console.log(err);
            res.json({status:500, data:err});
        }
        else {
            var resp = response;
            if (typeof(response) == 'string')
                resp = JSON.parse(response);
            res.json({status:200, data:resp});
        }
    });

});

/* GET home page. */
router.get('/GetHistory/:1/:2/:3/:4', function (req, res, next) {
    console.log(req.path);
    var values = req.path.split('/');
    var gs1 = {
        gtin: values[2],
        serialNumber: values[3],
        lotNumber: values[4],
        exprDate: values[5]  // Note Date should be string
    };
    getHistData(gs1, function (err, body, response) {
        if (err) {
            console.log(err);
            res.json({status:500, data:err});
        }
        else {
            var resp = response;
            if (typeof(response) == 'string')
                resp = JSON.parse(response);
            res.json({status:200, data:resp});
        }
    });

});

module.exports = router;
