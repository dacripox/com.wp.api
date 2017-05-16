
var emailHelper = require('../helpers/emailHelper.js');
var promotionModel = require('../models/promotionModel.js');
var companyModel = require('../models/companyModel.js');

let getPromotion = (promoId) => {
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

let getCompany = (company_id) => {
  return new Promise((resolve, reject) => {
    companyModel.findOne({ _id: company_id }, function (err, company) {
      if (err) {
        reject(err);
      }
      if (!company) {
        reject();
      }
      resolve((JSON.parse(JSON.stringify(company))));
    });
  });
}

let getCompanyEmail = async (promoId) => {

  let promotion = await getPromotion(promoId);
  let company = await getCompany(promotion.companyId);

  return company.email;


}



/**
  * .js
  *
  * @description :: .
  */

module.exports = {



  sendEmailWithWinnersToCompany: async (promoId, winners) => {

    let email = await getCompanyEmail(promoId);
    console.log('Company email to send winners is: ' + email);

    let winnersHTMLTable = "";

    winnersHTMLTable += '<table  border="1" cellpadding="0" cellspacing="0">';
    winnersHTMLTable += "<tr> <td>Nombre</td> <td>Contacto</td> <td>Puntos</td> </tr>";
    let winnersJSON = JSON.parse(winners);
    winnersJSON.forEach(function (winner) {
      winnersHTMLTable += '<tr> <td>' + winner.displayName + '</td> <td>' + winner.contact + '</td> <td>' + winner.points + '</td> </tr>';
    }, this);
    winnersHTMLTable += "</table>";

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"WhatsPromo - Mensaje automático" <no-contestar@whatspromo.com>', // sender address
      to: email, // list of receivers
      bcc: 'bot@whatspromo.com',
      subject: 'Ganadores promoción (' + promoId + ') - WhatsPromo ', // Subject line
      text: 'Estos son los ganadores de tu promoción (' + promoId + ') ' + winnersHTMLTable, // plain text body
      html: '<b>Estos son los ganadores de tu promoción (' + promoId + ')</b><br>' + winnersHTMLTable // html body
    };

    return await emailHelper.sendEmail(mailOptions);


  },
  sendNotificationAndEmailToWinners: () => {
    //TODO
  }


}