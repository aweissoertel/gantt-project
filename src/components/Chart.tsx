import React, { Component, CSSProperties } from 'react'
import CampaignClass from '../entities/Campaign';
import ContentClass from '../entities/Content';
import Topics from './Topics';
import TopicClass from '../entities/Topic'
import TopicContainer from './TopicContainer'
import Content from '../entities/Content';

import Slider from '@material-ui/core/Slider';

interface IProps {
    topics: Array<TopicClass>;
    campaigns: Array<CampaignClass>;
    contents: Array<ContentClass>;
}

interface IState {
    topics: Array<TopicClass>;
    campaigns: Array<CampaignClass>;
    contents: Array<ContentClass>;
    zoomLevel: number;
}

export default class Chart extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            topics: props.topics,
            campaigns: props.campaigns,
            contents: props.contents,
            zoomLevel: 50
        };
    }

    /**
     * Returns contents with provided topic
     * @param topic provided Topic, can be undefined
     */
    getContentsWithTopic = (topic?: TopicClass) : Content[] => {
        const {campaigns, contents} = this.state;
        let filteredCampaigns = campaigns.filter(campaign => campaign.topic === topic);
        return contents.filter(content => content.campaign ? filteredCampaigns.includes(content.campaign) : false);
    }

    /**
     * Returns a tuple of the earliest item, latest item and timespan (distance between them)
     */
    getMaxTimespan = () : [number,number,number] => {
        const {campaigns, contents} = this.state;
        let earliest: number = Number.MAX_VALUE;
        let latest: number = 0;

        campaigns.forEach((campaign: CampaignClass) => {
            earliest = campaign.startDate.getTime() < earliest ? campaign.startDate.getTime() : earliest;
            latest = campaign.endDate.getTime() > latest ? campaign.endDate.getTime() : latest;
        });

        contents.forEach((content: ContentClass) => {
            const date = content.publishDate.getTime();
            earliest = date < earliest ? date : earliest;
            latest = date > latest ? date : latest;
        });
        
        return [earliest,latest+1000*60*60*24,latest+1000*60*60*24-earliest];
    }

    getTimelineStyle = () : CSSProperties => {
        let [,,timespan] = this.getMaxTimespan();
        timespan = (timespan/20000) * (this.state.zoomLevel/100);
        console.log(timespan);
        return {
            backgroundColor: '#e4e4e4',
            width: `${timespan}px`,
            height: '100%',
            marginLeft: '55px'
        };
    }

    handleZoom = (event: any, newValue: number | number[]) => {
        this.setState({zoomLevel: newValue as number});
    }

    render() {
        const {topics, campaigns} = this.state;
        const [earliest,,] = this.getMaxTimespan();
        let timespanDay = 43.2 * this.state.zoomLevel;
        return (
            <div>
                <div style={container}>
                    <div style={topicStyle}>
                        <Topics topics={topics} campaigns={campaigns} contents={this.getContentsWithTopic}/>
                    </div>
                    <div style={this.getTimelineStyle()}>
                        {/* TopicContainers include everything (campaigns/ contents) belonging to the corresponding topic. They get rendered inside the Component */}
                        {this.state.topics.map((topic: TopicClass, index: number) => (
                             <TopicContainer key={index} campaigns={campaigns.filter(campaign => campaign.topic === topic)} contents={this.getContentsWithTopic(topic)} timeInfo={[timespanDay,earliest]}/>
                        ))}
                        {
                            // default TopicContainter, that has every campaign / content without a topic
                            <TopicContainer key={-1} campaigns={campaigns.filter(campaign => campaign.topic === undefined)} contents={this.getContentsWithTopic()}  timeInfo={[timespanDay,earliest]}/>
                        }
                    </div>
                </div>
                <Slider value={this.state.zoomLevel} onChange={this.handleZoom} aria-labelledby="continuous-slider" />
            </div>
        )
    }
}

const container: CSSProperties = {
    overflowX: 'scroll',
    height: '600px'
}

const topicStyle: CSSProperties = {
    position: 'fixed',
    left: '0',
    height: 'inherit',
    background: '#ffffff',
    zIndex: 2
}
