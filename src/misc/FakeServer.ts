import Topic from "../entities/Topic";
import Campaign from "../entities/Campaign";
import Content from "../entities/Content";

interface Response {
    topics: Topic[],
    campaigns: Campaign[],
    contents: Content[]
}

let t1 = new Topic('first Topic');
let t2 = new Topic('second Topic');

let c1 = new Campaign('Best Campaign', 'blue', 1592179200000, 1592438400000, [t1]);
let c2 = new Campaign('Short campaign','green', 1592611200000, 1592611200000, [t2]);
let c3 = new Campaign('Long campaign', 'pink', 1592344800000, 1593475200000, [t2]);
let c4 = new Campaign('Without topic','orange',1592517600000, 1592776800000)

let co1 = new Content('beschde content', 1592194500000, [c1]);
let co2 = new Content('Content in 2 campaigns', 1592242200000, [c1,c2]);
let co3 = new Content('no topic :(', 1592760000000, [c4]);

let topics: Topic[] = [
    t1,
    t2
];

let campaigns: Campaign[] = [
    c1,
    c2,
    c3,
    c4
]

let contents: Content[] = [
    co1,
    co2,
    co3
]

let store = {
    topics: topics,
    campaigns: campaigns,
    contents: contents
}


export function getItems(): Promise<Response> {
    return new Promise(resolve => {resolve(store)});
}

export function setItems(items: any) {
    return new Promise(resolve => {
        store = items;
        console.log('"Server store updated:');
        console.log(store);
        resolve()});
}
