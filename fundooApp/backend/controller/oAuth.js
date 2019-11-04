const oAuthService = require("../service/oAuth")


class ControllerAuth {
    googleLogin(req, res) {
        try {
            // console.log(req.user);

            let responce = {};
            let googleInfo = {
                firstName: req.user.name.givenName,
                lastName: req.user.name.familyName,
                userName: req.user.emails[0].value,
                password: null,
                active: true,
                googleID: req.user.id,
                googleLogin: true
            }
            oAuthService.googleService(googleInfo).then((data) => {
                responce.status = true;
                responce.message = "logged in with google";
                responce.data = data;
                return res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "User Already Exists";
                responce.error = err;
                return res.status(500).send(responce)
            })
        } catch (err) {
            return res.status(422).send(err)
        }
    }

    facebookLogin(req, res) {
        try {
            // console.log("controller--->196", req.user);

            let responce = {};
            let facebookInfo = {
                firstName: req.user.name.givenName,
                lastName: req.user.name.familyName,
                userName: req.user.emails[0].value,
                password: null,
                active: true,
                facebookID: req.user.id,
                facebookLogin: true
            }
            oAuthService.facebookService(facebookInfo).then((data) => {
                responce.status = true;
                responce.message = "logged in with facebook";
                responce.data = data;
                return res.status(200).send(responce)
            }).catch((err) => {
                responce.status = false;
                responce.message = "User Already Exists";
                responce.error = err;
                return res.status(500).send(responce)
            })
        } catch (err) {
            return res.status(422).send(err)
        }
    }
}

module.exports = new ControllerAuth()