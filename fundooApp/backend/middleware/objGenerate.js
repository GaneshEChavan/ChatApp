module.exports = {
   async createObj(params) {
        return elastiData = {
            "title": params.title,
            "description": params.description ? params.description : null,
            "color": params.color ? params.color : null,
            "labelName": []
        }
    }
}