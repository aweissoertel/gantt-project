import Campaign from './Campaign';
import {v4 as uuid} from 'uuid';

interface Content {
    id: string;
    title: string;
    publishDate: Date;
    campaign?: Campaign;
}

class Content implements Content{
    constructor(title: string, publishDate: number | Date, campaign?: Campaign) {
        this.id = uuid();
        this.title = title;
        if (typeof publishDate === "number") {
            this.publishDate = new Date(publishDate);
        } else {
            this.publishDate = publishDate;
        }
        this.campaign = campaign;
    }
}

export default Content;
