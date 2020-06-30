import React, { Component } from 'react'
import CampaignClass from '../entities/Campaign'
import ContentClass from '../entities/Content';
import '../App.css';
import Draggable, { DraggableEventHandler, ControlPosition } from 'react-draggable';
import {v4 as uuid} from 'uuid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CustomAvatar from './material-ui/CustomAvatar';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface IProps {
    campaign: CampaignClass,
    timeInfo: number[],
    updateElem: (elem: CampaignClass | ContentClass, val: number) => void
}

interface IState {
    key: string,
    position: ControlPosition | undefined
}

export default class Campaign extends Component<IProps, IState> {
    myRef: any; // necessary for the Draggable component
    campaign: CampaignClass;

    constructor(props: IProps) {
        super(props);
        this.state = {
            key: uuid(),
            position: {x: 0, y:0}
        };
        this.myRef = React.createRef();
        this.campaign = props.campaign;
    }

    /**
     * Callback function for when campaign gets dropped.
     * The offset gets fetched somewhat laborious bc the draggable stuff doesn't work
     * Then the computed offset gets reset and the passed updateElem function gets called to update this campaign
     */
    dropped: DraggableEventHandler = (): void => {
        const style: CSSStyleDeclaration = getComputedStyle(this.myRef.current);
        //getPropertyValue returns a string 🤬, looks like this: "matrix(1, 0, 0, 1, X, 0)"
        let str: string = style.getPropertyValue('transform');
        //i only want the X
        str = str.split('matrix(1, 0, 0, 1, ')[1];
        str = str.split(',')[0];
        // resetting the key forces a reset of <Draggable>, which resets its offset (i want to start from scratch after the new time period is set)
        //this.setState({key: uuid()});
        //probably the better solution, keeping the old one here however
        this.setState({position: {x: 0, y:0}});
        this.props.updateElem(this.campaign, Number(str));
    }

    getContainerStyle(): CSSProperties {
        const {timeInfo: [dayLength,firstEvent]} = this.props;
        const campaign: CampaignClass = this.campaign;
        const translate: number = ((campaign.startDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;
        const campaignLength: number = ((campaign.endDate.getTime() - campaign.startDate.getTime()) / (1000*60*60*24) +1) * dayLength;

        return {
            left: translate+'px',
            width: campaignLength+'px',
            position: 'absolute',
            maxHeight: 'inherit'
        }
    }

    getSubHeader(): string {
        const startEnd: [string, string] = [this.campaign.startDate.toLocaleDateString(), this.campaign.endDate.toLocaleDateString()];
        return `${startEnd[0]} - ${startEnd[1]}`
    }

    render() {
        const {timeInfo: [dayLength,]} = this.props;
        const campaign: CampaignClass = this.campaign;

        return (
            <Draggable axis="x" onStop={this.dropped} grid={[dayLength,0]} nodeRef={this.myRef} key={this.state.key} position={this.state.position}>
                <div style={this.getContainerStyle()} ref={this.myRef}>
                    <Card className={"scrollBar cardStyle"}>
                        <CardHeader
                            avatar={
                                <CustomAvatar style={{backgroundColor: campaign.color}} >
                                    {campaign.title.charAt(0)}
                                </CustomAvatar> }
                            title={campaign.title}
                            subheader={this.getSubHeader()}
                        />
                    </Card>
                </div>
            </Draggable>
        )
    }
}
