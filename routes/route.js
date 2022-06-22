const controller = require('../controllers/controller');
module.exports = (app) => {
    app.route("/chat-bot")
        .post(controller.sendText)
}
