var companyModel = require('../models/companyModel.js');

/**
 * companyController.js
 *
 * @description :: Server-side logic for managing companys.
 */
module.exports = {

    /**
     * companyController.list()
     */
    list: function (req, res) {
        companyModel.find(function (err, companys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company.',
                    error: err
                });
            }
            return res.json(companys);
        });
    },

    /**
     * companyController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        companyModel.findOne({_id: id}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company.',
                    error: err
                });
            }
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }
            return res.json(company);
        });
    },


    /**
     * companyController.showByEmail()
     */
    showByEmail: function (req, res) {
        var companyEmail = req.params.companyEmail;
        companyModel.findOne({email: companyEmail}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company.',
                    error: err
                });
            }
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }
            return res.json(company);
        });
    },
    /**
     * companyController.create()
     */
    create: function (req, res) {
        var company = new companyModel({
			cif : req.body.cif,
			name : req.body.name,
			logo : req.body.logo,
			email : req.body.email,
			phone : req.body.phone,
			lat : req.body.lat,
			lng : req.body.lng,
			postCode : req.body.postCode,
			webPage : req.body.webPage,
			fullAddress : req.body.fullAddress,
			twitter : req.body.twitter,
			facebook : req.body.facebook,
			linkedin : req.body.linkedin,
            tollNumber : req.body.tollNumber
        });

        company.save(function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating company',
                    error: err
                });
            }
            return res.status(201).json(company);
        });
    },

    /**
     * companyController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        companyModel.findOne({_id: id}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company',
                    error: err
                });
            }
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }

            company.cif = req.body.cif ? req.body.cif : company.cif;
			company.name = req.body.name ? req.body.name : company.name;
			company.logo = req.body.logo ? req.body.logo : company.logo;
			company.email = req.body.email ? req.body.email : company.email;
			company.phone = req.body.phone ? req.body.phone : company.phone;
			company.lat = req.body.lat ? req.body.lat : company.lat;
			company.lng = req.body.lng ? req.body.lng : company.lng;
			company.postCode = req.body.postCode ? req.body.postCode : company.postCode;
			company.webPage = req.body.webPage ? req.body.webPage : company.webPage;
			company.fullAddress = req.body.fullAddress ? req.body.fullAddress : company.fullAddress;
			company.twitter = req.body.twitter ? req.body.twitter : company.twitter;
			company.facebook = req.body.facebook ? req.body.facebook : company.facebook;
			company.linkedin = req.body.linkedin ? req.body.linkedin : company.linkedin;
            company.trollNumber = req.body.trollNumber ? req.body.trollNumber : company.trollNumber;
			
            company.save(function (err, company) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating company.',
                        error: err
                    });
                }

                return res.json(company);
            });
        });
    },

    /**
     * companyController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        companyModel.findByIdAndRemove(id, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the company.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
