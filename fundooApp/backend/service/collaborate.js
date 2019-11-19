const collaborateModel = require("../model/collaborate");

class ServiceCollaborate {

    colabAdd(colaborator) {
        return new Promise((res, rej) => {
            collaborateModel.create(colaborator).then( data => {
                res(data);
            }).catch(err => {
                rej(err);
            });
        });
    }

    colabRead(colab) {
        return new Promise((res, rej) => {
            let query = { "userID": colab.userID, "collaboratorID": colab.collaboratorID };
            collaborateModel.read(query).then( data => {
                res(data);
            }).catch(err => {
                rej(err);
            });
        });
    }

}

module.exports = new ServiceCollaborate();