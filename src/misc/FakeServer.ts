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

let c1 = new Campaign('best Campaign', 'blue', 1592179200000, 1592438400000, [t1]);
let c2 = new Campaign('short Campaign','green', 1592611200000, 1592611200000, [t2]);
let c3 = new Campaign('i dont know', 'pink', 1592784000000, 1593475200000);

let co1 = new Content('beschde content', new Date().setUTCHours(0,0,0,0), [c1]);
let co2 = new Content('cool cool cool cool cool', 1593216000000, [c1]);
let co3 = new Content('no topic :(', 1593388800000, [c3]);

let topics: Topic[] = [
    t1,
    t2
];

let campaigns: Campaign[] = [
    c1,
    c2,
    c3
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
