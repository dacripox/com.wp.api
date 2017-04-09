var participationModel = require('../models/participationModel.js');

/**
 * participationController.js
 *
 * @description :: Server-side logic for managing participations.
 */
module.exports = {
    /**
     * participationController.userIsParticipating()
     */
    userIsParticipating: function (req, res) {

        var userId = req.params.userId;
        var promoId = req.params.promoId;
        participationModel.findOne({ "userId": userId, "promoId": promoId }, function (err, participation) {

            if (err) {
                return res.status(500).json({
                    message: 'Error when getting participation.',
                    error: err
                });
            }
            if (!participation) {
                return res.json({ participating: false });
            }
            return res.json({ participating: true });
        });
    },
  

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
     * participationController.listByPromotion()
     */
    listByPromotion: function (req, res) {
        var promoId = req.params.promoId;
        participationModel.find({ "promoId": promoId }, function (err, participations) {
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
        participationModel.findOne({ _id: id }, function (err, participation) {
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
     * showByUserIdAndPromoId.show()
     */
    showByUserIdAndPromoId: function (req, res) {
        //http://localhost:3000/participation/user/' + userId + '/promotion/' + promoId
        var userId = req.params.userId;
        var promoId = req.params.promoId;
        participationModel.findOne({ "userId": userId, "promoId": promoId }, function (err, participation) {
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
            createdDate: req.body.createdDate,
            promoId: req.body.promoId,
            userId: req.body.userId,
            promotion: req.body.promotion,
            user: req.body.user,
            refFriend: req.body.refFriend,
            refFriendId: req.body.refFriendId,
            friendParticNumber: req.body.friendParticNumber,
            friendVisualNumber: req.body.friendVisualNumber,
            points: req.body.points,
            ip: req.body.ip,
            pushEnabled: req.body.pushEnabled
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
        participationModel.findOne({ _id: id }, function (err, participation) {
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
            participation.promotion = req.body.promotion ? req.body.promotion : participation.promotion;
            participation.user = req.body.user ? req.body.user : participation.user;
            participation.refFriend = req.body.refFriend ? req.body.refFriend : participation.refFriend;
            participation.refFriendId = req.body.refFriendId ? req.body.refFriendId : participation.refFriendId;
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
     * incrementVisualization.update()
     */
    incrementVisualization: function (req, res) {
        var userId = req.params.userId;
        var promoId = req.params.promoId;
        participationModel.findOne({ userId: userId, promoId: promoId }, function (err, participation) {
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

            participation.createdDate = participation.createdDate;
            participation.promoId = participation.promoId;
            participation.userId = participation.userId;
            participation.promotion = participation.promotion;
            participation.user = participation.user;
            participation.refFriend = participation.refFriend;
            participation.refFriendId = participation.refFriendId;
            participation.friendParticNumber = participation.friendParticNumber;
            participation.friendVisualNumber = participation.friendVisualNumber + 1;  //Add visualization
            participation.points = participation.points;
            participation.ip = participation.ip;
            participation.pushEnabled = participation.pushEnabled;

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
      * incrementVisualization.update()
      */
    incrementParticpation: function (req, res) {
        var userId = req.params.userId;
        var promoId = req.params.promoId;
        participationModel.findOne({ userId: userId, promoId: promoId }, function (err, participation) {
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

            participation.createdDate = participation.createdDate;
            participation.promoId = participation.promoId;
            participation.userId = participation.userId;
            participation.promotion = participation.promotion;
            participation.user = participation.user;
            participation.refFriend = participation.refFriend;
            participation.refFriendId = participation.refFriendId;
            participation.friendParticNumber = participation.friendParticNumber + 1; //Add participation
            participation.friendVisualNumber = participation.friendVisualNumber;
            participation.points = participation.points;
            participation.ip = participation.ip;
            participation.pushEnabled = participation.pushEnabled;

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
        * incrementPoints.update()
        */
    incrementPoints: function (req, res) {

        //increment-points/' + userId + '/' + points

        var userId = req.params.userId;
        var promoId = req.params.promoId;
        var points = parseInt(req.params.points);

        participationModel.findOne({ userId: userId, promoId: promoId }, function (err, participation) {
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

            participation.createdDate = participation.createdDate;
            participation.promoId = participation.promoId;
            participation.userId = participation.userId;
            participation.promotion = participation.promotion;
            participation.user = participation.user;
            participation.refFriend = participation.refFriend;
            participation.refFriendId = participation.refFriendId;
            participation.friendParticNumber = participation.friendParticNumber;
            participation.friendVisualNumber = participation.friendVisualNumber;
            participation.points = participation.points + points; //add points
            participation.ip = participation.ip;
            participation.pushEnabled = participation.pushEnabled;

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
