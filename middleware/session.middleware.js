const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessions').push({ id: sessionId}).write();
    }
    next();
}