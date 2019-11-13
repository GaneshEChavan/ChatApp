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
        console.log("Elasticsearch cluster is set");
    }
})

class Elastic {

    /**
     * @description: create index
     * @param {*} indexName 
     */
    initIndex() {
        /**
         * @description: An index consists of one or more Documents, and a Document consists of one or more Fields
         */
        return elasticClient.indices.create({
            index: process.env.INDEXNAME
        })
    }

    /**
     * @description: check if index exists
     */
    indexExists() {
        return elasticClient.indices.exists({
            index: process.env.INDEXNAME
        })
    }

    /**
     * @description: prepare index and its mapping
     * @param {*} indexName
     * @param {*} payload 
     */
    initMapping(indexName, payload) {

        return elasticClient.indices.putMapping({
            index: indexName,
            body: payload
        })
    }

    /**
     * @description: add new document
     * @param {*} payload 
     */
    addDocument(payload) {

        return elasticClient.index({
            index: process.env.INDEXNAME,
            body: payload
        })
    }

    /**
     * @description: updates the document
     * @param {*} indexName 
     * @param {*} id  
     * @param {*} payload 
     */
    updateDocument(id, payload) {
        console.log("------------->74", id, payload);

        return elasticClient.update({
            index: process.env.INDEXNAME,
            id: id,
            body: { doc: payload }
        })
    }

    /**
     * @description: search for document
     * @param {*} indexName
     * @param {*} payload 
     */
    searchDocument(indexName, payload) {

        return elasticClient.search({
            index: indexName,
            body: payload
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
    deleteDocument(id) {

        return elasticClient.delete({
            index:process.env.INDEXNAME,
            id
        })

    }

    deleteAll() {
        elasticClient.indices.delete({
            index: '_all'
        }, function (err, resp) {
            if (err) {
                console.log(err)
            } else {
                console.log("all indices are deleted");
            }
        })
    }
}
let dlt = new Elastic()
// dlt.deleteAll()
// dlt.indexExists().then(res=>{console.log("exists")}).catch(err=>{console.log("doesn't exist")})
// dlt.initIndex()
module.exports = new Elastic()
