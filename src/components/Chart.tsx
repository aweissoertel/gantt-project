import React, { Component, CSSProperties } from 'react'
import CampaignClass from '../entities/Campaign';
import ContentClass from '../entities/Content';
import Topics from './Topics';
import TopicClass from '../entities/Topic'
import TopicContainer from './TopicContainer'
import Content from '../entities/Content';
import {getItems, setItems} from '../misc/FakeServer'

import Slider from '@material-ui/core/Slider';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { Grid } from '@material-ui/core';

interface IProps {
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
            topics: [],
            campaigns: [],
            contents: [],
            zoomLevel: 7
        };
    }

    componentDidMount() {
        //getItems() is a simulated Backend Access
        getItems().then(response => {
            this.setState({
                topics: response.topics,
                campaigns: response.campaigns,
                contents: response.contents
            });
        });
    }

    /**
     * Returns contents with provided topic
     * @param topic provided Topic, can be undefined
     */
    getContentsWithTopic = (topic?: TopicClass) : Content[] => {
        const {campaigns, contents} = this.state;
        let filteredCampaigns: Array<CampaignClass>
        if (topic) {
            filteredCampaigns = campaigns.filter((campaign: CampaignClass) => campaign.topics && campaign.topics.some((topic2: TopicClass) => topic2.id === topic.id));
        } else {
            filteredCampaigns = campaigns.filter(campaign => !campaign.topics);
        }
        // so this line kind of escalated, but the idea is that we filter out the contents that don't have a campaign with the given topic or else if we are looking at the default topic, just return every content that is not in any campaign
        return contents.filter(content => content.campaigns ? content.campaigns.some((campaign: CampaignClass) => filteredCampaigns.includes(campaign)) : (topic ? false : true));
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

    /**
     * Helper function that sets the style of the timeline (including width in dependent on zoomlevel)
     */
    getTimelineStyle = () : CSSProperties => {
        let [,,timespan] = this.getMaxTimespan();
        timespan = (timespan/20000) * (this.state.zoomLevel/100);
        return {
            backgroundColor: '#e4e4e4',
            width: `${timespan}px`,
            height: '100%',
            marginLeft: '75px'
        };
    }

    /**
     * Callback function for the zoom slider
     * @param event 
     * @param newValue 
     */
    handleZoom = (event: any, newValue: number | number[]) => {
        this.setState({zoomLevel: (newValue as number)});
    }

    /**
     * Function that updates the time properties of the given element (campaign/content) so that they match the offset
     * @param elem Element to update: CampaignClass | ContentClass
     * @param val Offset in pixels
     */
    updateElem = (elem: CampaignClass | ContentClass, val: number) => {
        const timespanDay = 43.2 * this.state.zoomLevel;
        const delta = (val/timespanDay) * 1000*60*60*24;
        //set publish/start Date to += delta
        if (this.isCampaign(elem)) {
            const oldStart = elem.startDate.getTime();
            const oldEnd = elem.endDate.getTime();
            this.setState({
                campaigns: this.state.campaigns.map((campaign: CampaignClass) => {
                    if (campaign.id === elem.id) {
                        campaign.startDate = new Date(oldStart+delta);
                        campaign.endDate = new Date(oldEnd+delta);
                    }
                    return campaign;
                })
            });
        } else {
            const publish = elem.publishDate.getTime();
            this.setState({
                contents: this.state.contents.map((content: ContentClass) => {
                    if (content.id === elem.id) {
                        content.publishDate = new Date(publish+delta);
                    }
                    return content;
                })
            })
        }
        const {topics, campaigns, contents} = this.state;
        setItems({topics, campaigns, contents});
    }

    /**
     * Helper function to determine if Element is Type Campaign or Content
     * @param elem Element to check
     */
    isCampaign(elem: CampaignClass | ContentClass): elem is CampaignClass {
        return (elem as CampaignClass).startDate !== undefined;
    }

    render() {
        const {topics, campaigns} = this.state;
        const [earliest,,] = this.getMaxTimespan();
        const timespanDay = 43.2 * this.state.zoomLevel;
        return (
            <div>
                <div style={container}>
                    <div style={topicStyle}>
                        <Topics topics={topics} campaigns={campaigns} contents={this.getContentsWithTopic}/>
                    </div>
                    <div style={this.getTimelineStyle()}>
                        {/* TopicContainers include everything (campaigns/ contents) belonging to the corresponding topic. They get rendered inside the Component */}
                        {this.state.topics.map((topic: TopicClass) => (
                             <TopicContainer key={topic.id} campaigns={campaigns.filter(campaign => campaign.topics && campaign.topics.some((topic2: TopicClass) => topic2.id === topic.id))} contents={this.getContentsWithTopic(topic)} timeInfo={[timespanDay,earliest]} updateElem={this.updateElem}/>
                        ))}
                        {
                            // default TopicContainer, that has every campaign / content without a topic
                            <TopicContainer key={-1} campaigns={campaigns.filter(campaign => campaign.topics === undefined)} contents={this.getContentsWithTopic()}  timeInfo={[timespanDay,earliest]} updateElem={this.updateElem}/>
                        }
                    </div>
                </div>
                
                <Grid container spacing={2} style={{width: '100%'}}>
                    <Grid item>
                        <ZoomOutIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider value={this.state.zoomLevel} onChange={this.handleZoom} aria-labelledby="continuous-slider" min={1} max={50}/>
                    </Grid>
                    <Grid item>
                        <ZoomInIcon />
                    </Grid>
                </Grid>
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
    zIndex: 2,
    width: '75px'
}
