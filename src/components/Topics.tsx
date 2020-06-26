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
    return (
        <div>
            {topics.map((topic: TopicClass, index: number) => (
                <Topic  key={index}
                        topic={topic}
                        numItems={campaigns.filter(campaign => campaign.topic === topic).length
                                    + contents(topic).length}
                />
            ))}
            <Topic  key={-1}
                    topic={new TopicClass('Default Topic')}
                    numItems={campaigns.filter(campaign => campaign.topic === undefined).length + contents().length} />
        </div>
    )
}
