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
        var day = req.params.day;
        var month = req.params.month;
        var year = req.params.year;
        participationModel.aggregate([
            // Project pipeline
            {
                $project: { 
                    hour: {$hour: "$createdDate"},
                    day: {$dayOfMonth: "$createdDate"},
                    month: {$month: "$createdDate"},
                    year: {$year: "$createdDate"}
                }
            },// Match pipeline
            {
                $match: { 
                    promoId: promoId,
                    day: day,
                    month: month,
                    year: year
                }
            }, // Grouping pipeline
            { 
                $group: { 
                    _id: {hour:"$hour",day:"$day",month:"$month",year:"$year"}, 
                    friendVisualNumber: {$sum: "$friendVisualNumber"},
                    friendParticNumber: {$sum: 1}
                }
            },
            // Sorting pipeline
            { "$sort": { "_id": 1 } }
                
        ],function (err, stats) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barChart stats.',
                    error: err
                });
            }
            return res.json(stats);
        });
    },

    /**
     * statsController.general()
     */
    general: function (req, res) {
        var promoId = req.params.promoId;
        participationModel.aggregate([
            // Match pipeline
            {
                $match: { 
                    promoId: promoId
                }
            }, // Grouping pipeline
            { 
                $group: { 
                    _id: {promoId:"$promoId"}, 
                    friendVisualNumber: {$sum: "$friendVisualNumber"}, //visualizations
                    participantsNumber: {$sum: 1},
                    points: {$sum: "$points"}, //visualizations
                }
            }
                
        ],function (err, stats) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting general stats.',
                    error: err
                });
            }
            return res.json(stats);
        });
    }



};
