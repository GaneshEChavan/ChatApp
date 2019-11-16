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
        // console.log("------------->74", id, payload);

        return elasticClient.update({
            index: process.env.INDEXNAME,
            id: id,
            body: {
                doc: {
                    mappings: {
                        title: payload.title,
                        description: payload.description,
                        color: payload.color,
                        labelName: {
                            properties: {
                                labelName: payload.labelName
                            }
                        }
                    }
                }
            }
        })
    }

    /**
     * @description: search for document
     * @param {*} payload 
     */
    searchDocument(req, res) {
        let payload = req.param
        return elasticClient.search({
            index: process.env.INDEXNAME,
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                regexp: {
                                    title: `.*${payload}.*`
                                }
                            }, {
                                regexp: {
                                    description: `.*${payload}.*`
                                }
                            }, {
                                regexp: {
                                    color: `.*${payload}.*`
                                }
                            }, {
                                regexp: {
                                    labelName: `.*${payload}.*`
                                }
                            }
                        ]
                    }
                }
            }
        })
    }

    /**
     * @description: delete a document from index
     * @param {*} _id  
     */
    deleteDocument(id) {

        return elasticClient.delete({
            index: process.env.INDEXNAME,
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
// dlt.deleteDocument("5ct2bW4BzeHBWV4xVhyW")
// dlt.updateDocument("fp1HdG4BohhJD8kDRZa3",{title:"ganesh",description:"chavan",color:"orange",labelName:"ganuuuuuuuu"}).then(res=>{console.log("search result",res)}).catch(err=>{console.log("not found",err)})
// dlt.searchDocument("ll").then(res=>{console.log("search result",res.hits.hits)}).catch(err=>{console.log("not found",err)})
module.exports = new Elastic()

// match_all : {}