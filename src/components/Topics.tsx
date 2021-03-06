import React from 'react'
import TopicClass from '../entities/Topic'
import Topic from './Topic'
import CampaignClass from '../entities/Campaign'
import ContentClass from '../entities/Content'

interface IProps {
    topics: Array<TopicClass>,
    campaigns: Array<CampaignClass>,
    contents: (Topic?: TopicClass) => Array<ContentClass>
}

export default function Topics({topics, campaigns, contents}: IProps) {
    const itemsDef: number = campaigns.filter(campaign => campaign.topics === undefined).length + contents().length;

    // only show default topic if there are any items in it
    let defaultTopic: JSX.Element = <></>;
    if (itemsDef > 0) {
        defaultTopic = <Topic  key={-1} topic={new TopicClass('Default Topic')} numItems={itemsDef} />
    }
    return (
        <div style={{backgroundColor:'#ffffff'}}>
            {topics.map((topic: TopicClass) => (
                <Topic  key={topic.id}
                        topic={topic}
                        numItems={campaigns.filter((campaign: CampaignClass) => campaign.topics && campaign.topics.some((topic2: TopicClass) => topic2.id === topic.id)).length
                                    + contents(topic).length}
                />
            ))}
            {defaultTopic}
        </div>
    )
}
