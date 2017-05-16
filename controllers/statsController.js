var participationModel = require('../models/participationModel.js');

/**
 * statsController.js
 *
 * @description :: Server-side logic for managing stats.
 */
module.exports = {


    /**
     * statsController.barChart()
     */
    barChart: function (req, res) {
        var promoId = req.params.promoId;
        var dayZ = parseInt(req.params.day);
        var monthZ = parseInt(req.params.month);
        var yearZ = parseInt(req.params.year);


        participationModel.aggregate(

            // Pipeline
            [
                // Stage 1
                {
                    $match: { "promoId": promoId }
                },

                // Stage 2
                {
                    $project: {
                        hour: { $hour: "$createdDate" },
                        day: { $dayOfMonth: "$createdDate" },
                        month: { $month: "$createdDate" },
                        year: { $year: "$createdDate" },
                        friendVisualNumber: 1,
                    }
                },

                // Stage 3
                {
                    $match: {
                        day: dayZ,
                        month: monthZ,
                        year: yearZ
                    }
                },

                // Stage 4
                {
                    $group: {
                        "_id": { "hour": "$hour", "day": "$day", "month": "$month", "year": "$year" },
                        "friendVisualNumber": { $sum: "$friendVisualNumber" },
                        "friendParticNumber": { $sum: 1 }
                    }
                },

                // Stage 5
                {
                    $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 }
                },

            ]


            , function (err, stats) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting barChart stats.',
                        error: err
                    });
                }


                let preArray = [];
                for (var hourFigure in stats) {
                    if (stats.hasOwnProperty(hourFigure)) {
                        var hourFigure = stats[hourFigure];
                        let obj = {
                            friendVisualNumber: hourFigure.friendVisualNumber,
                            friendParticNumber: hourFigure.friendParticNumber
                        }
                        preArray[hourFigure._id.hour] = obj;

                    }
                }

                let postArray = [];
                for (var i = 0; i < 24; i++) {
                    if (preArray[i]) {
                        let obj = {
                            friendVisualNumber: preArray[i].friendVisualNumber,
                            friendParticNumber: preArray[i].friendParticNumber
                        };
                        postArray[i] = obj;
                    } else {
                        let obj = {
                            friendVisualNumber: 0,
                            friendParticNumber: 0
                        }
                        postArray[i] = obj;
                    }
                }

                //Custom output (separated arrays)
                let friendVisualNumber = [];
                let friendParticNumber = [];
                for (var i = 0; i < postArray.length; i++) {
                    friendVisualNumber[i] = postArray[i].friendVisualNumber;
                    friendParticNumber[i] = postArray[i].friendParticNumber;
                }

                return res.json({ friendVisualNumber, friendParticNumber });
            });
    },

    /**
     * statsController.general()
     */
    general: function (req, res) {
        var promoId = req.params.promoId;
        participationModel.aggregate(

            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        promoId: promoId
                    }
                },

                // Stage 2
                {
                    $lookup: {
                        "from": "promotions",
                        "localField": "promotion",
                        "foreignField": "_id",
                        "as": "promotion"
                    }
                },

                // Stage 3
                {
                    $group: {
                        _id: { promoId: "$promoId" },
                        friendVisualNumber: { $sum: "$friendVisualNumber" }, //visualizations
                        participantsNumber: { $sum: 1 },
                        points: { $sum: "$points" }, //visualizations
                        winnersNumber: { $first: "$promotion.winnersNumber" }
                    }
                },

            ]

            , function (err, stats) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting general stats.',
                        error: err
                    });
                }

                //Custom response

                let obj = {};

                if (stats.length > 0) {
                    obj.friendVisualNumber = stats[0].friendVisualNumber;
                    obj.participantsNumber = stats[0].participantsNumber;
                    obj.points = stats[0].points;
                    obj.winnersNumber = stats[0].winnersNumber[0];
                } else {
                    obj.friendVisualNumber = "No disponible";
                    obj.participantsNumber = "No disponible";
                    obj.points = "No disponible";
                    obj.winnersNumber = "No disponible";
                }


                return res.json(obj);
            });
    },
    /**
     * statsController.generalAllPromotions()
     */
    generalAllPromotions: function (req, res) {
        participationModel.aggregate(

            // Pipeline
            [
                // Stage 1
                {
                    $group: {
                        _id: { promoId: "$promoId" },

                        participants: { $sum: 1 },
                        totalPoints: { $sum: "$points" },

                        visualizations: { $sum: "$friendVisualNumber" },
                        visualizationAvg: { $avg: "$friendVisualNumber" },

                        participationsFromRefFriend: { $sum: "$friendParticNumber" },
                        participationAvg: { $avg: "$friendParticNumber" },


                    }
                },

            ], function (err, stats) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting general stats for all promotions.',
                        error: err
                    });
                }

                //Custom response

                let obj = {};

                if (stats.length > 0) {
                    obj.friendVisualNumber = stats[0].friendVisualNumber;
                    obj.participantsNumber = stats[0].participantsNumber;
                    obj.points = stats[0].points;
                    obj.winnersNumber = stats[0].winnersNumber[0];
                } else {
                    obj.friendVisualNumber = "No disponible";
                    obj.participantsNumber = "No disponible";
                    obj.points = "No disponible";
                    obj.winnersNumber = "No disponible";
                }


                return res.json(obj);
            });
    },





};
