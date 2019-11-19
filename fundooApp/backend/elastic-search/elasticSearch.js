const elasticsearch = require("elasticsearch");
const logger = require("../../logger/logger");
let elasticClient = new elasticsearch.Client({
    host: process.env.ELASTIC_PORT,
    log: "error"
});

elasticClient.ping({
    requestTimeout: 30000
}, (error) => {
    if (error) {
        console.log("Elasticsearch cluster is down!");
    } else {
        console.log("Elasticsearch cluster is set");
    }
});

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
        });
    }

    /**
     * @description: check if index exists
     */
    indexExists() {
        return elasticClient.indices.exists({
            index: process.env.INDEXNAME
        });
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
        });
    }

    /**
     * @description: add new document
     * @param {*} payload 
     */
    addDocument(payload) {

        return elasticClient.index({
            index: process.env.INDEXNAME,
            body: payload
        });
    }

    /**
     * @description: updates the document
     * @param {*} indexName 
     * @param {*} id  
     * @param {*} payload 
     */
    updateDocument(id, payload) {

        return elasticClient.update({
            index: process.env.INDEXNAME,
            id: id,
            body: {
                doc: {
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
        });
    }

    /**
     * @description: search for document 
     * @param {*contains search value}req 
     * @param {*gives values to user on search basis}res 
     */
    searchDocument(/*req, res*/) {

        let payload = "si"/*req.params.value;*/
        /**
 * @description: contains fields index and body. for searching the boolean query is used and passed to the search body, body contains should operator which is similar to
 *               OR operator , wildcard patterns (.*) are used to match values in either title, description, color.
 */
     return elasticClient.search({
            index: process.env.INDEXNAME,
            body: {
                query: {
                    bool: {
                        should: [
                            /**
                             * @description: [parsing_exception] [regexp] query doesn't support multiple fields, hence written seperate regexp query to each field
                             */
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
        // .then(response => {
        //     return res.status(200).send(response.hits.hits);
        // }).catch(err => {
        //     logger.info(err);
        // });
    }

    /**
     * @description: delete a document from index
     * @param {*} _id  
     */
    deleteDocument(id) {

        return elasticClient.delete({
            index: process.env.INDEXNAME,
            id
        });

    }

    deleteAll() {
        elasticClient.indices.delete({
            index: "_all"
        }, function (err, resp) {
            if (err) {
                console.log(err);
            } else {
                console.log("all indices are deleted");
            }
        });
    }
}
let dlt = new Elastic();
// dlt.deleteAll()
// dlt.indexExists().then(res=>{console.log("exists")}).catch(err=>{console.log("doesn't exist")})
// dlt.initIndex()
// dlt.deleteDocument("5ct2bW4BzeHBWV4xVhyW")
// dlt.updateDocument("fp1HdG4BohhJD8kDRZa3",{title:"ganesh",description:"chavan",color:"orange",labelName:"ganuuuuuuuu"}).then(res=>{console.log("search result",res)}).catch(err=>{console.log("not found",err)})
// dlt.searchDocument().then(res=>{console.log("search result",res.hits.hits)}).catch(err=>{console.log("not found",err)})
module.exports = new Elastic();

// match_all : {}
