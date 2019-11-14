module.exports = {
   async createObj(params) {
        return elastiData = {
            "title": params.title,
            "description": params.description ? params.description : null,
            "color": params.color ? params.color : null,
            "isArchive": params.isArchive ? params.isArchive : false,
            "isPinned": params.isPinned ? params.isPinned : false,
            "isTrashed": params.isTrashed ? params.isTrashed : false,
            "image": params.image ? params.image : null,
            "Reminder": params.Reminder ? params.Reminder : false,
            "RemindTime": params.RemindTime ? params.RemindTime : null,
            "labelName": []
        }
    }
}