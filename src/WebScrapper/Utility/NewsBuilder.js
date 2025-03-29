class NewsBuilder{
    constructor(){
        this.news = {
            title: '',
            description: '',
            link: '',
            source: ''
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

    setLink(link){
        this.news.link = link;
        return this;
    }

    setSource(source){
        this.news.source = source;
        return this;
    }

    build(){
        return this.news;
    }
}

module.exports = { NewsBuilder };