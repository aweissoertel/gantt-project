import Topic from './Topic';
import {v4 as uuid} from 'uuid';

interface Campaign {
    id: string;
    title: string;
    color: string;
    startDate: Date;
    endDate: Date;
    topic?: Topic;
}

class Campaign implements Campaign {
    constructor(title: string, color: string, startDate: number | Date, endDate: number | Date, topic?: Topic) {
        this.id = uuid();
        this.title = title;
        this.color = color;
        if (typeof startDate === "number") {
            this.startDate = new Date(startDate);
        } else {
            this.startDate = startDate;
        }
        if (typeof endDate === "number") {
            this.endDate = new Date(endDate);
        } else {
            this.endDate = endDate;
        }
        if (topic) {this.topic = topic};
    }
}

export default Campaign;
