import {v4 as uuid} from 'uuid';

interface Topic {
    id: string;
    title: string;
}

class Topic implements Topic {
    constructor(title: string) {
        this.id = uuid();
        this.title = title;
    }
}

export default Topic;
