const expressSession = require("express-session");

const checkLogin = (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    res.json({'loggedIn': 'false'});
};

module.exports = { checkLogin };