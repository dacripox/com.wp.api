var promotionModel = require('../models/promotionModel.js');
var partcipationController = require('../controllers/participationController.js');
var promotionController = require('../controllers/promotionController.js');
var raffleAlgorithm = require('../helpers/raffleAlgorithm.js');

var participationModel = require('../models/participationModel.js');
var winnerModel = require('../models/winnerModel.js');

async function getParticipants(promoId) {
    /*    participationModel.find({promoId: promoId}, function (err, participations) {
             if (err) {
                return {};
            }
            if (!participations) {
                return {};
            }
            return participations;
        });*/

    participationModel.find({ promoId: promoId })
        .populate({
            path: 'user'
        })
        .exec(function(err,participations) {
            if (err) comsole.log(err);
            return participations;
        })
}


async function getPromotion(promoId) {
    promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
        if (err) {
            return {};
        }
        if (!promotion) {
            return {};
        }
        return promotion;
    });
}

async function endPromotion(promoId) {
    promotionModel.findById({ promoId: promoId }, function (err, promotion) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.

            promotion.promoEnded = true;

            // Save the updated document back to the database
            promotion.save(function (err, promotion) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(promotion);
            });
        }
    });
}

async function createWinner(promoId, userId, points,displayName,profileImg,contact) {

    var winner = new winnerModel({
        promoId: promoId,
        userId: userId,
        points: points,
        displayName: displayName,
        profileImg: profileImg,
        contact: contact
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
}

async function makeRaffleAndEndPromotion(promoId) {
    let participants = await getParticipants(promoId);
    let promotion = await getPromotion(promoId);
    let winners = await raffleAlgorithm.getFirstNElements(promotion.winnersNumber, participants);
   
    for (var i = 0; i < winners.length; i++) {
        let displayName = (winner.user.firstName + winner.user.lastName ) || winner.user.firstName || winner.user.email || winner.user.phone;
        let contact = partcipant.user.email || winner.user.phone;
        await createWinner(winner.promoId, winner.userId, winner.user.points, displayName,contact);   
    }

    let endPromo = await endPromotion(promoId);
    return winners;
};


/**
 * promotionController.js
 *
 * @description :: Server-side logic for managing promotions.
 */
module.exports = {

    /**
     * promotionController.list()
     */
    list: function (req, res) {
        promotionModel.find(function (err, promotions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting promotion.',
                    error: err
                });
            }
            return res.json(promotions);
        });
    },

    /**
     * promotionController.listPromotionsByCompanyId()
     */
    listPromotionsByCompanyId: function (req, res) {
        let companyId = req.params.companyId;
        promotionModel.find({companyId:companyId},function (err, promotions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting promotion.',
                    error: err
                });
            }
            return res.json(promotions);
        });
    },

    /**
     * promotionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        promotionModel.findOne({ _id: id }, function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting promotion.',
                    error: err
                });
            }
            if (!promotion) {
                return res.status(404).json({
                    message: 'No such promotion'
                });
            }
            return res.json(promotion);
        });
    },
    /**
     * promotionController.showByPromoId()
     */
    showByPromoId: function (req, res) {
        var promoId = req.params.promoId;
        promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting promotion.',
                    error: err
                });
            }
            if (!promotion) {
                return res.status(404).json({
                    message: 'No such promotion'
                });
            }
            return res.json(promotion);
        });
    },
    /**
     * promotionController.available()
     */
    idAvailable: function (req, res) {
        var name = req.params.name;
        promotionModel.findOne({ promoId: name }, function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting availability.',
                    error: err
                });
            }
            if (!promotion) {
                return res.status(200).json({
                    available: true
                });
            } else {
                return res.status(200).json({
                    available: false
                });
            }
        });
    },

    /**
    * promotionController.endPromotion()
    */
    endPromotion: function (req, res) {
        var promoId = req.params.promoId;

        promotionModel.findById({ promoId: promoId }, function (err, promotion) {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.

                promotion.promoEnded = true;

                // Save the updated document back to the database
                promotion.save(function (err, promotion) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(promotion);
                });
            }
        });
    },


    /**
    * promotionController.endPromotion()
    */
    endPromoWithRaffle: function (req, res) {
        var promoId = req.params.promoId;

        return makeRaffleAndEndPromotion(promoId);

    },


    /**
     * promotionController.create()
     */
    create: function (req, res) {
        var promotion = new promotionModel({
            promoId: req.body.promoId,
            promoType: req.body.promoType,
            promoEnabled: req.body.promoEnabled,
            promoEnded: req.body.promoEnded,
            createdDate: req.body.createdDate,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            promoTitle: req.body.promoTitle,
            promoDescription: req.body.promoDescription,
            promoLegalCond: req.body.promoLegalCond,
            promoContactDetails: req.body.promoContactDetails,
            promoImage: req.body.promoImage,
            socialImage: req.body.socialImage,
            participNumber: req.body.participNumber,
            totalPoints: req.body.totalPoints,
            shareMessages: req.body.shareMessages,
            winnersNumber: req.body.winnersNumber,
            priceItemAvg: req.body.priceItemAvg,
            showLocalization: req.body.showLocalization,
            lat: req.body.lat,
            lng: req.body.lng,
            postalCode: req.body.postalCode,
            fullAddress: req.body.fullAddress,
            companyId: req.body.companyId,
            trollNumber: req.body.trollNumber,
            facebookTrackingPixel: req.body.facebookTrackingPixel,
            googleTrackingPixel: req.body.googleTrackingPixel
        });

        promotion.save(function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating promotion',
                    error: err
                });
            }
            return res.status(201).json(promotion);
        });
    },

    /**
     * promotionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        promotionModel.findOne({ _id: id }, function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting promotion',
                    error: err
                });
            }
            if (!promotion) {
                return res.status(404).json({
                    message: 'No such promotion'
                });
            }

            promotion.promoId = req.body.promoId ? req.body.promoId : promotion.promoId;
            promotion.promoType = req.body.promoType ? req.body.promoType : promotion.promoType;
            promotion.promoEnabled = req.body.promoEnabled ? req.body.promoEnabled : promotion.promoEnabled;
            promotion.promoEnded = req.body.promoEnded ? req.body.promoEnded : promotion.promoEnded;
            promotion.createdDate = req.body.createdDate ? req.body.createdDate : promotion.createdDate;
            promotion.startDate = req.body.startDate ? req.body.startDate : promotion.startDate;
            promotion.endDate = req.body.endDate ? req.body.endDate : promotion.endDate;
            promotion.promoTitle = req.body.promoTitle ? req.body.promoTitle : promotion.promoTitle;
            promotion.promoDescription = req.body.promoDescription ? req.body.promoDescription : promotion.promoDescription;
            promotion.promoLegalCond = req.body.promoLegalCond ? req.body.promoLegalCond : promotion.promoLegalCond;
            promotion.promoContactDetails = req.body.promoContactDetails ? req.body.promoContactDetails : promotion.promoContactDetails;
            promotion.promoImage = req.body.promoImage ? req.body.promoImage : promotion.promoImage;
            promotion.socialImage = req.body.socialImage ? req.body.socialImage : promotion.socialImage;
            promotion.participNumber = req.body.participNumber ? req.body.participNumber : promotion.participNumber;
            promotion.totalPoints = req.body.totalPoints ? req.body.totalPoints : promotion.totalPoints;
            promotion.shareMessages = req.body.shareMessages ? req.body.shareMessages : promotion.shareMessages;
            promotion.winnersNumber = req.body.winnersNumber ? req.body.winnersNumber : promotion.winnersNumber;
            promotion.priceItemAvg = req.body.priceItemAvg ? req.body.priceItemAvg : promotion.priceItemAvg;
            promotion.showLocalization = req.body.showLocalization ? req.body.showLocalization : promotion.showLocalization;
            promotion.lat = req.body.lat ? req.body.lat : promotion.lat;
            promotion.lng = req.body.lng ? req.body.lng : promotion.lng;
            promotion.postalCode = req.body.postalCode ? req.body.postalCode : promotion.postalCode;
            promotion.fullAddress = req.body.fullAddress ? req.body.fullAddress : promotion.fullAddress;
            promotion.companyId = req.body.companyId ? req.body.companyId : promotion.companyId;
            promotion.trollNumber = req.body.trollNumber ? req.body.trollNumber : promotion.trollNumber;
            promotion.facebookTrackingPixel = req.body.facebookTrackingPixel ? req.body.facebookTrackingPixel : promotion.facebookTrackingPixel;
            promotion.googleTrackingPixel = req.body.googleTrackingPixel ? req.body.googleTrackingPixel : promotion.googleTrackingPixel;

            promotion.save(function (err, promotion) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating promotion.',
                        error: err
                    });
                }

                return res.json(promotion);
            });
        });
    },

    /**
     * promotionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        promotionModel.findByIdAndRemove(id, function (err, promotion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the promotion.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};