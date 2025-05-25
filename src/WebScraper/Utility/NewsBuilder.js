const { STATUS } = require("../../Features/Database/Enums/Statuses");
class NewsBuilder{
    constructor(){
        this.news = {
            title: '',
            description: '',
            status: STATUS.NEW.text,
            targetsite: '',
            fromsite: '',
            directlink: ''

        };
    }

    setTitle(title){
        this.news.title = title.replace(/'/g, "''").replace(/"/g, "");
        return this;
    }

    setDescription(description){
        this.news.description = description.replace(/'/g, "''").replace(/"/g, "");
        return this;
    }

    setTargetSite(link){
        this.news.targetsite = link;
        return this;
    }

    setFromSite(source){
        this.news.fromsite = source;
        return this;
    }

    setDirectLink(link){
        this.news.directlink = link;
        return this;
    }

    setStatus(status){
        if (!Object.values(STATUS).some(item => item.text === status)) {
            throw new Error(`Invalid status: ${status}`);
        }
        this.news.status = status;
        return this;
    }

    build(){
        return this.news;
    }
}

module.exports = { NewsBuilder };