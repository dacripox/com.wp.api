var winnerModel = require('../models/winnerModel.js');

/**
 * winnerController.js
 *
 * @description :: Server-side logic for managing winners.
 */
module.exports = {

    /**
     * winnerController.list()
     */
    list: function (req, res) {
        winnerModel.find(function (err, winners) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting winner.',
                    error: err
                });
            }
            return res.json(winners);
        });
    },

    /**
     * winnerController.listByPromotion()
     */
    listByPromotion: function (req, res) {
        var promoId = req.params.promoId;
        winnerModel.find({promoId: promoId},function (err, winners) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting winner.',
                    error: err
                });
            }
            return res.json(winners);
        });
    },

    /**
     * winnerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        winnerModel.findOne({_id: id}, function (err, winner) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting winner.',
                    error: err
                });
            }
            if (!winner) {
                return res.status(404).json({
                    message: 'No such winner'
                });
            }
            return res.json(winner);
        });
    },

    /**
     * winnerController.create()
     */
    create: function (req, res) {
        var winner = new winnerModel({
			promoId : req.body.promoId,
			userId : req.body.userId,
			createdDate : req.body.createdDate,
			points : req.body.points,
			displayName : req.body.displayName,
			profileImg : req.body.profileImg,
			contactWay : req.body.contactWay
        });

        winner.save(function (err, winner) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating winner',
                    error: err
                });
            }
            return res.status(201).json(winner);
        });
    },

    /**
     * winnerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        winnerModel.findOne({_id: id}, function (err, winner) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting winner',
                    error: err
                });
            }
            if (!winner) {
                return res.status(404).json({
                    message: 'No such winner'
                });
            }

            winner.promoId = req.body.promoId ? req.body.promoId : winner.promoId;
			winner.userId = req.body.userId ? req.body.userId : winner.userId;
			winner.createdDate = req.body.createdDate ? req.body.createdDate : winner.createdDate;
			winner.points = req.body.points ? req.body.points : winner.points;
			winner.displayName = req.body.displayName ? req.body.displayName : winner.displayName;
			winner.profileImg = req.body.profileImg ? req.body.profileImg : winner.profileImg;
			winner.contactWay = req.body.contactWay ? req.body.contactWay : winner.contactWay;
			
            winner.save(function (err, winner) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating winner.',
                        error: err
                    });
                }

                return res.json(winner);
            });
        });
    },

    /**
     * winnerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        winnerModel.findByIdAndRemove(id, function (err, winner) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the winner.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
