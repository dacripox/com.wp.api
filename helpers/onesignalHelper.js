'use strict';
var https = require('https');

//OneSignal credentials
const app_id = "8821d4e1-cbef-499a-8f8f-c8d3e3db506f";
const rest_key = "OWU5YTY4YTQtZDZiZi00M2NlLWIwMWYtNTA1ODgyNDViZmEx";

var sendNotification = function (data) {

    return new Promise((resolve, reject) => {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic " + rest_key
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };


        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
                resolve(JSON.parse(data));
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
            reject(e);
        });

        req.write(JSON.stringify(data));
        req.end();


    });
};



module.exports = {
    sendNotificationToOnesignalId: async (message, onesignalId) => {
        var onesignalMessage = {
            app_id: app_id,
            contents: { "en": message },
            include_player_ids: [onesignalId],
        };
        let notificationSent = await sendNotification(onesignalMessage);
        return res.status(200).json({
            message: 'Push successfully sent',
            details: 'Response: ' + notificationSent
        });
    },
    sendNotificationToUserId: async (message, userId) => {
        var onesignalMessage = {
            app_id: app_id,
            contents: { "en": message },
            filters: [
                { "field": "tag", "key": "userId", "relation": "=", "value": userId }
            ]
        };

        let notificationSent = await sendNotification(onesignalMessage);
        return res.status(200).json({
            message: 'Push successfully sent',
            details: 'Response: ' + notificationSent
        });
    },

    sendNotificationPromoId: async (title,subtitle,message, promoId) => {

        var onesignalMessage = {
            app_id: app_id,
               headings: { "en": "title" },
            subtitle: { "en": "subtitle" },
            contents: { "en": "message" },
            chrome_web_icon: "https://whatspromo.com/wp/wp-content/uploads/2017/05/android-chrome-192x192.png",
            firefox_icon: "https://whatspromo.com/wp/wp-content/uploads/2017/05/android-chrome-192x192.png",
            chrome_web_image: "https://iapp.whatspromo.com/public/images/promo/promo_fbb6dded-b01f-467b-8a32-769762f7a395.jpg",
            url: "https://whatspromo.com/"+promoId,
            priority: 10,
            filters: [
                { "field": "tag", "key": "promoId", "relation": "=", "value": promoId }
            ]
        };

        let notificationSent = await sendNotification(onesignalMessage);
        return res.status(200).json({
            message: 'Push successfully sent',
            details: 'Response: ' + notificationSent
        });
    },

    testSendNotificationToAll: async (req, res) => {

        var onesignalMessage = {
            app_id: app_id,
            headings: { "en": "title" },
            subtitle: { "en": "subtitle" },
            contents: { "en": "message" },
            chrome_web_icon: "https://whatspromo.com/wp/wp-content/uploads/2017/05/android-chrome-192x192.png",
            firefox_icon: "https://whatspromo.com/wp/wp-content/uploads/2017/05/android-chrome-192x192.png",
            chrome_web_image: "https://iapp.whatspromo.com/public/images/promo/promo_fbb6dded-b01f-467b-8a32-769762f7a395.jpg",
            url: "https://whatspromo.com/wp/blog",
            priority: 10,
            included_segments: ["All"],

        };

        let notificationSent = await sendNotification(onesignalMessage);
        return res.status(200).json({
            message: 'Push successfully sent',
            details: 'Response: ' + JSON.stringify(notificationSent)
        });
    }
}