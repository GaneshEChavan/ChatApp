const elasticsearch = require("elasticsearch")

let elasticClient = new elasticsearch.Client({
    host: process.env.ELASTIC_PORT,
    log: 'error'
})

elasticClient.ping({
    requestTimeout: 30000
}, (error) => {
    if (error) {
        console.log("Elasticsearch cluster is down!");
    } else {
        console.log("Elasticsearch cluster is set and ready to work");
    }
})

class Elastic {

    /**
     * @description: create index
     * @param {*} req 
     * @param {*} res 
     * @param {*} indexName 
     */
    initIndex(req, res, indexName) {
        elasticClient.indices.create({
            index: indexName
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }, function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: check if index exists 
     * @param {*} req 
     * @param {*} res 
     * @param {*} indexName 
     */
    indexExists(req, res, indexName) {
        elasticClient.indices.exists({
            index: indexName
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }, function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: prepare index and its mapping
     * @param {*} req 
     * @param {*} res 
     * @param {*} indexName 
     * @param {*} docType 
     * @param {*} payload 
     */
    initMapping(req, res, indexName, docType, payload) {

        elasticClient.indices.putMapping({
            index: indexName,
            type: docType,
            body: payload
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }).catch(function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: add/Update document
     * @param {*} req 
     * @param {*} res 
     * @param {*} indexName 
     * @param {*} _id 
     * @param {*} doctype 
     * @param {*} payload 
     */
    addDocument(req, res, indexName, _id, doctype, payload) {

        elasticClient.index({
            index: indexName,
            type: doctype,
            _id: _id,
            body: payload
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }).catch(function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: updates the document
     * @param {} req 
     * @param {*} res 
     * @param {*} index 
     * @param {*} _id 
     * @param {*} docType 
     * @param {*} payload 
     */
    updateDocument(req, res, index, _id, docType, payload) {

        elasticClient.update({
            index: index,
            type: docType,
            id: _id,
            body: payload
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }).catch(function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: search for document
     * @param {*} req 
     * @param {*} res 
     * @param {*} indexName 
     * @param {*} doctype 
     * @param {*} payload 
     */
    searchDocument(req, res, indexName, doctype, payload) {

        elasticClient.search({
            index: indexName,
            type: doctype,
            body: payload
        }).then(function (resp) {
            res.status(200)
            return res.json(resp)
        }).catch(function (err) {
            res.status(500)
            return res.json(err)
        })
    }

    /**
     * @description: delete a document from index
     * @param {*} req 
     * @param {*} res 
     * @param {*} index 
     * @param {*} _id 
     * @param {*} docType 
     */
    deleteDocument(req, res, index, _id, docType) {

        elasticClient.delete({
            index: index,
            type: docType,
            id: _id
        }, function (err, resp) {
            if (err) {
                return res.json(err)
            } else {
                return res.json(resp)
            }
        })

    }

    deleteAll(req, res) {
        elasticClient.indices.delete({
            index: '_all'
        }, function (err, resp) {
            if (err) {
                console.log(err)
            } else {
                console.log("all indices are deleted");
                return res.json(resp)
            }
        })
    }
}

module.exports = new Elastic()
