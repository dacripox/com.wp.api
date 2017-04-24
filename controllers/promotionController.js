var promotionModel = require('../models/promotionModel.js');
var partcipationController = require('../controllers/participationController.js');
var promotionController = require('../controllers/promotionController.js');
var raffleAlgorithm = require('../helpers/raffleAlgorithm.js');

var participationModel = require('../models/participationModel.js');
var winnerModel = require('../models/winnerModel.js');

let getParticipants = function (promoId) {
    /*    participationModel.find({promoId: promoId}, function (err, participations) {
             if (err) {
                return {};
            }
            if (!participations) {
                return {};
            }
            return participations;
        });*/


    return new Promise((resolve, reject) => {
        participationModel.find({ promoId: promoId })
            .populate({
                path: 'user'
            })
            .exec(function (err, participations) {
                if (err) reject(err);
                resolve((JSON.parse(JSON.stringify(participations))));
            })
    });
}

function getPromotion(promoId) {
    return new Promise((resolve, reject) => {
        promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
            if (err) {
                reject(err);
            }
            if (!promotion) {
                reject();
            }
            resolve((JSON.parse(JSON.stringify(promotion))));
        });
    });
}
/**
   * promotionController.endPromotion()
   */
let endPromotionHelper = function (promoId) {
    return new Promise((resolve, reject) => {

        promotionModel.findOne({ promoId: promoId }, function (err, promotion) {
            // Handle any possible database errors
            if (err) {
                reject(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.

                promotion.promoId = promotion.promoId;
                promotion.promoType = promotion.promoType;
                promotion.promoEnabled = promotion.promoEnabled;
                promotion.promoEnded = true; // end promotion
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

                // Save the updated document back to the database
                promotion.save(function (err, promotion) {
                    if (err) {
                        reject(err)
                    }
                    resolve(promotion);
                });
            }
        });
    });
}
function createWinner(promo_id, promoId, userId, points, displayName, profileImg, contact) {
    return new Promise((resolve, reject) => {
        var winner = new winnerModel({
            promo_id: promo_id,
            promoId: promoId,
            userId: userId,
            points: points,
            displayName: displayName,
            profileImg: profileImg,
            contact: contact
        });


        winner.save(function (err, winner) {
            if (err) {
                reject(err);
            }
            resolve(winner);
        });
    });


}

let makeRaffleAndEndPromotion = async (promoId) => {
    let promoEnded = await endPromotionHelper(promoId);

    let participants = await getParticipants(promoId);
    let promotion = await getPromotion(promoId);

    if (promotion) {

        let winners = await raffleAlgorithm.getFirstNElements(promotion.winnersNumber, participants);

        let allWinnersCreated = false;
        for (var i = 0; i < winners.length; i++) {
            let winner = winners[i];
            let displayName = (winner.user.firstName && winner.user.lastName) ? winner.user.firstName + ' ' + winner.user.lastName: undefined || (winner.user.email).substr(-7) + '******' || (winner.user.phone).substr(-3) + '***';
            let contact = winner.user.email || winner.user.phone;
            let winnerCreated = await createWinner(promotion._id, promoId, winner.user._id, winner.points, displayName, winner.user.profileImg, contact);

            if (i >= winners.length -1) allWinnersCreated = true;
        }


        if (allWinnersCreated) {
            return winners;
        } else {
            return;
        }
    }
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
        promotionModel.find({ companyId: companyId }, function (err, promotions) {
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

                promotion.promoId = promotion.promoId;
                promotion.promoType = promotion.promoType;
                promotion.promoEnabled = true; // end promotion
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
    endPromoWithRaffle: async function (req, res) {
        var promoId = req.params.promoId;

        let winners = await makeRaffleAndEndPromotion(promoId);

        if (winners) {
            return res.send(winners);
        } else {
            return res.status(500).json({
                message: 'Error when making raffle and ending promotion',
                error: err
            });
        }

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