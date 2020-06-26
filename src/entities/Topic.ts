import Campaign from './Campaign'

interface Topic {
    title: string;
    campaign?: Campaign;
}

class Topic implements Topic {
    constructor(title: string) {
        this.title = title;
    }
}

export default Topic;
