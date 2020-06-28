import React, { Component } from 'react'
import ContentClass from '../entities/Content'
import CampaignClass from '../entities/Campaign'
import '../App.css';
import {v4 as uuid} from 'uuid';
import Draggable, { DraggableEventHandler, DraggableData } from 'react-draggable';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CustomAvatar from './material-ui/CustomAvatar';

interface IProps {
    content: ContentClass,
    timeInfo: number[],
    updateElem: (elem: CampaignClass | ContentClass, val: number) => void
}

interface IState {
    key: string
}

export default class Content extends Component<IProps, IState> {
    myRef: any;
    content: ContentClass;

    constructor(props: IProps) {
        super(props);
        this.state = {
            key: uuid()
        };
        this.myRef = React.createRef();
        this.content = props.content;
    }

    dropped: DraggableEventHandler = (e: any, data: DraggableData): void => {
        const style = getComputedStyle(this.myRef.current);
        //getPropertyValue returns a string 🤬, looks like this: "matrix(1, 0, 0, 1, X, 0)"
        let str = style.getPropertyValue('transform');
        //i only want the X
        str = str.split('matrix(1, 0, 0, 1, ')[1];
        str = str.split(',')[0];
        // resetting the key forces a reset of <Draggable>, which resets its offset (i want to start from scratch after the new time period is set)
        this.setState({key: uuid()});
        this.props.updateElem(this.content, Number(str));
    }
    
    render() {
        const {timeInfo: [dayLength,firstEvent]} = this.props;
        const content = this.content;
        const translate = ((content.publishDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;

        return (
            <Draggable axis="x" onStop={this.dropped.bind(this)} grid={[dayLength/(24*60),0]} nodeRef={this.myRef} key={this.state.key}>
                <div style={{width: dayLength+'px', position: "absolute", left: translate+'px', maxHeight: 'inherit'}} ref={this.myRef}>
                    <Card style={{height:'100%', width:'100%', maxHeight: 'inherit', overflowY: 'auto'}} className={"scrollBar"}>
                        <CardHeader
                            avatar={
                                <CustomAvatar size={'small'}>
                                    <AssignmentOutlinedIcon fontSize={'small'} />
                                </CustomAvatar>
                            }
                            title={content.title}
                            subheader={content.publishDate.toLocaleDateString() + ', ' + content.publishDate.toLocaleTimeString()}
                        />
                    </Card>
                </div>
            </Draggable>
        )
    }
}
