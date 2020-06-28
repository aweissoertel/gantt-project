import React, { Component } from 'react'
import CampaignClass from '../entities/Campaign'
import ContentClass from '../entities/Content';
import '../App.css';
import Draggable, { DraggableData, DraggableEventHandler, ControlPosition } from 'react-draggable';
import {v4 as uuid} from 'uuid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CustomAvatar from './material-ui/CustomAvatar';

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
    myRef: any;
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

    dropped: DraggableEventHandler = (e: any, data: DraggableData): void => {
        const style = getComputedStyle(this.myRef.current);
        //getPropertyValue returns a string 🤬, looks like this: "matrix(1, 0, 0, 1, X, 0)"
        let str = style.getPropertyValue('transform');
        //i only want the X
        str = str.split('matrix(1, 0, 0, 1, ')[1];
        str = str.split(',')[0];
        // resetting the key forces a reset of <Draggable>, which resets its offset (i want to start from scratch after the new time period is set)
        //this.setState({key: uuid()});
        //probably the better solution, keeping the old one here however
        this.setState({position: {x: 0, y:0}});
        this.props.updateElem(this.props.campaign, Number(str));
    }

    drag: DraggableEventHandler = (e: any, data: DraggableData): void => {
        this.setState({
            position: undefined
        });
    }

    render() {
        //const nodeRef = React.useRef(null);
        const {campaign, timeInfo} = this.props;
        const [dayLength, firstEvent] = timeInfo;
        const translate: number = ((campaign.startDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;
        const campaignLength: number = ((campaign.endDate.getTime() - campaign.startDate.getTime()) / (1000*60*60*24) +1) * dayLength;
        const startEnd: [string, string] = [campaign.startDate.toLocaleDateString(), campaign.endDate.toLocaleDateString()];

        return (
            <Draggable axis="x" onStart={this.drag} onStop={this.dropped} grid={[dayLength,0]} nodeRef={this.myRef} key={this.state.key} position={this.state.position}>
                <div style={{position: "absolute", left: translate+'px', width: campaignLength+'px', maxHeight: 'inherit'}}  ref={this.myRef}>
                    <Card style={{height:'100%', width:'100%', maxHeight: 'inherit', overflowY: 'auto'}} className={"scrollBar"}>
                        <CardHeader
                            avatar={
                                <CustomAvatar style={{backgroundColor: campaign.color}} >
                                    {campaign.title.charAt(0)}
                                </CustomAvatar>
                            }
                            title={campaign.title}
                            subheader={startEnd[0] + ' - \n' + startEnd[1]}
                        />
                    </Card>
                </div>
            </Draggable>
        )
    }
}
