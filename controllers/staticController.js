var jsonQuery = require('json-query');
var fs = require('fs'),
    path = require('path');

var postalCodesFile = "postal-codes.json";
/**
 * statsController.js
 *
 * @description :: Server-side logic for managing stats.
 */
module.exports = {


    /**
     * statsController.postalCodes()
     */
    postCodes: function (req, res) {
        var query = req.params.query;

        var postalCodes = JSON.parse(fs.readFileSync(postalCodesFile, 'utf8'));

        var postalCodesJSON = jsonQuery('people[*country=' + query + ']', { data: postalCodes });

        return res.json(postalCodesJSON);
    }



};
