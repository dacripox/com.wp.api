var participationModel = require('../models/participationModel.js');
var promotionModel = require('../models/promotionModel.js');

/**
 * participationController.js
 *
 * @description :: Server-side logic for managing participations.
 */

let incrementPromotionTotalPoints = function (promoId, points, cb) {

    promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
        if (err) {
            cb(false);
        }
        if (!promotion) {
            cb(false);
        }

        promotion.promoId = promotion.promoId;
        promotion.promoType = promotion.promoType;
        promotion.promoEnabled = promotion.promoEnabled;
        promotion.promoEnded = promotion.promoEnded;
        promotion.createdDate = promotion.createdDate;
        promotion.startDate = promotion.startDate;
        promotion.endDate = promotion.endDate;
        promotion.promoTitle = promotion.promoTitle;
        promotion.promoDescription = promotion.promoDescription;
        promotion.promoLegalCond = promotion.promoLegalCond;
        promotion.promoContactDetails = promotion.promoContactDetails;
        promotion.promoImage = promotion.promoImage;
        promotion.socialImage = promotion.socialImage;
        promotion.participNumber = promotion.participNumber;
        promotion.totalPoints = promotion.totalPoints + points;  //increment points
        promotion.shareMessages = promotion.shareMessages;
        promotion.winnersNumber = promotion.winnersNumber;
        promotion.priceItemAvg = promotion.priceItemAvg;
        promotion.showLocalization = promotion.showLocalization;
        promotion.lat = promotion.lat;
        promotion.lng = promotion.lng;
        promotion.postalCode = promotion.postalCode;
        promotion.fullAddress = promotion.fullAddress;
        promotion.companyId = promotion.companyId;
        promotion.trollNumber = promotion.trollNumber;
        promotion.facebookTrackingPixel = promotion.facebookTrackingPixel;
        promotion.googleTrackingPixel = promotion.googleTrackingPixel;

        promotion.save(function (err, promotion) {
            if (err) {
                cb(false);
            }

            cb(true);
        });
    });

}



var incrementPromotionPaticipations = function (promoId, cb) {

    promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
        if (err) {
            cb(false);
        }
        if (!promotion) {
            cb(false);
        }

        promotion.promoId = promotion.promoId;
        promotion.promoType = promotion.promoType;
        promotion.promoEnabled = promotion.promoEnabled;
        promotion.promoEnded = promotion.promoEnded;
        promotion.createdDate = promotion.createdDate;
        promotion.startDate = promotion.startDate;
        promotion.endDate = promotion.endDate;
        promotion.promoTitle = promotion.promoTitle;
        promotion.promoDescription = promotion.promoDescription;
        promotion.promoLegalCond = promotion.promoLegalCond;
        promotion.promoContactDetails = promotion.promoContactDetails;
        promotion.promoImage = promotion.promoImage;
        promotion.socialImage = promotion.socialImage;
        promotion.participNumber = promotion.participNumber + 1;  // increment by one
        promotion.totalPoints = promotion.totalPoints;
        promotion.shareMessages = promotion.shareMessages;
        promotion.winnersNumber = promotion.winnersNumber;
        promotion.priceItemAvg = promotion.priceItemAvg;
        promotion.showLocalization = promotion.showLocalization;
        promotion.lat = promotion.lat;
        promotion.lng = promotion.lng;
        promotion.postalCode = promotion.postalCode;
        promotion.fullAddress = promotion.fullAddress;
        promotion.companyId = promotion.companyId;
        promotion.trollNumber = promotion.trollNumber;
        promotion.facebookTrackingPixel = promotion.facebookTrackingPixel;
        promotion.googleTrackingPixel = promotion.googleTrackingPixel;

        promotion.save(function (err, promotion) {
            if (err) {
                cb(false);
            }

            cb(true);
        });
    });

}
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


            // return incrementPromotionPaticipations(req.body.promoId, function (status) {
            //     if (status) {
            //         return incrementPromotionTotalPoints(req.body.promoId, 5, function (status) {
            //             if (status) {
            return res.status(201).json(participation);
            //            } else {
            //                 return res.status(500).json({
            //                     message: 'Error when updating participation.',
            //                     error: err
            //                 });
            //             }
            //         });
            //     } else {
            //         return res.status(500).json({
            //             message: 'Error when creating participation',
            //             error: err
            //         });
            //     }
            // });



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
     * participationController.incrementVisualization()
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
      * participationController.incrementParticipation()
      */
    incrementParticipation: function (req, res) {
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

                /*     return incrementPromotionPaticipations(promoId, function (status) {
                         if (status) {
                             return res.json(participation);
                         } else {
                             return res.status(500).json({
                                 message: 'Error when updating participation.',
                                 error: err
                             });
                         }
                     });*/

                // return res.status(500).json({
                //     message: 'Error when updating participation.',
                //     error: err
                // });

                //return res.json(participation);
            });
        });
    },
    /**
      * participationController.incrementParticipation()
      */
    incrementParticipationPromo: function (req, res) {
        var promoId = req.params.promoId;
        if (!promoId) {
            return res.status(500).json({
                message: 'Error when incrementing participation (promotion total)',
                error: err
            });
        }


        return incrementPromotionPaticipations(promoId, function (status) {
            if (status) {
                return res.json({ incrementParticipationStatus: "ok" });
            } else {
                return res.status(500).json({
                    message: 'Error when incrementing participation (promotion total)',
                    error: err
                });
            }
        });


    },
    /**
        * participationController.incrementPoints()
        */
    incrementPoints: function (req, res) {

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

                incrementPromotionTotalPoints(promoId, points, function (status) {
                    if (status) {

                        return res.json(participation);
                    } else {
                        return res.status(500).json({
                            message: 'Error when updating participation.',
                            error: err
                        });
                    }
                });

                // return res.status(500).json({
                //     message: 'Error when updating participation.',
                //     error: err
                // });

                // return res.json(participation);
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
