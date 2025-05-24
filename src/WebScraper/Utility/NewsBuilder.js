// TODO - poprawić model by wpasował się do bazy danych
class NewsBuilder{
    constructor(){
        this.news = {
            title: '',
            description: '',
            targetsite: '',
            fromsite: '',
            directlink: ''

        };
    }

    setTitle(title){
        this.news.title = title;
        return this;
    }

    setDescription(description){
        this.news.description = description;
        return this;
    }

    setTargetLink(link){
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
    
    build(){
        return this.news;
    }
}

module.exports = { NewsBuilder };