const User = require("../models/user"); 


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Registration Successfull");
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
        
    }
};

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to UNIBIC");
    let redirectedUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectedUrl);
};

module.exports.logout =  (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        } else{
            req.flash("success", "You have been Logged out");
            res.redirect("/listings")
        }
    });
};