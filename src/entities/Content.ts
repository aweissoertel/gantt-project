import Campaign from './Campaign';
import {v4 as uuid} from 'uuid';

interface Content {
    id: string;
    title: string;
    publishDate: Date;
    campaigns?: Array<Campaign>;
}

class Content implements Content{
    constructor(title: string, publishDate: number | Date, campaigns?: Array<Campaign>) {
        this.id = uuid();
        this.title = title;
        if (typeof publishDate === "number") {
            this.publishDate = new Date(publishDate);
        } else {
            this.publishDate = publishDate;
        }
        this.campaigns = campaigns;
    }
}

export default Content;
