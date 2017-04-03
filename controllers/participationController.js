var participationModel = require('../models/participationModel.js');

/**
 * participationController.js
 *
 * @description :: Server-side logic for managing participations.
 */
module.exports = {

    /**
     * participationController.list()
     */
    list: function (req, res) {
        participationModel.find(function (err, participations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting participation.',
                    error: err
                });
            }
            return res.json(participations);
        });
    },

    /**
     * participationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        participationModel.findOne({_id: id}, function (err, participation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting participation.',
                    error: err
                });
            }
            if (!participation) {
                return res.status(404).json({
                    message: 'No such participation'
                });
            }
            return res.json(participation);
        });
    },

    /**
     * participationController.create()
     */
    create: function (req, res) {
        var participation = new participationModel({
			createdDate : req.body.createdDate,
			promoId : req.body.promoId,
			userId : req.body.userId,
			refFriend : req.body.refFriend,
			friendParticNumber : req.body.friendParticNumber,
			friendVisualNumber : req.body.friendVisualNumber,
			points : req.body.points,
			ip : req.body.ip,
			pushEnabled : req.body.pushEnabled
        });

        participation.save(function (err, participation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating participation',
                    error: err
                });
            }
            return res.status(201).json(participation);
        });
    },

    /**
     * participationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        participationModel.findOne({_id: id}, function (err, participation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting participation',
                    error: err
                });
            }
            if (!participation) {
                return res.status(404).json({
                    message: 'No such participation'
                });
            }

            participation.createdDate = req.body.createdDate ? req.body.createdDate : participation.createdDate;
			participation.promoId = req.body.promoId ? req.body.promoId : participation.promoId;
			participation.userId = req.body.userId ? req.body.userId : participation.userId;
			participation.refFriend = req.body.refFriend ? req.body.refFriend : participation.refFriend;
			participation.friendParticNumber = req.body.friendParticNumber ? req.body.friendParticNumber : participation.friendParticNumber;
			participation.friendVisualNumber = req.body.friendVisualNumber ? req.body.friendVisualNumber : participation.friendVisualNumber;
			participation.points = req.body.points ? req.body.points : participation.points;
			participation.ip = req.body.ip ? req.body.ip : participation.ip;
			participation.pushEnabled = req.body.pushEnabled ? req.body.pushEnabled : participation.pushEnabled;
			
            participation.save(function (err, participation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating participation.',
                        error: err
                    });
                }

                return res.json(participation);
            });
        });
    },

    /**
     * participationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        participationModel.findByIdAndRemove(id, function (err, participation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the participation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
