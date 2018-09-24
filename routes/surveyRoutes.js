const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post(
        'api/surveys', requireLogin, (res,req) => {
            
    });
};