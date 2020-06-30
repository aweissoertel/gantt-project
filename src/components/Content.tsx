import React, { Component, CSSProperties } from 'react'
import ContentClass from '../entities/Content'
import CampaignClass from '../entities/Campaign'
import '../App.css';
import {v4 as uuid} from 'uuid';
import Draggable, { DraggableEventHandler, DraggableData, ControlPosition } from 'react-draggable';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ContentInfo from './material-ui/ContentInfo';

interface IProps {
    content: ContentClass,
    timeInfo: number[],
    updateElem: (elem: CampaignClass | ContentClass, val: number) => void
}

interface IState {
    key: string,
    position: ControlPosition | undefined
}

export default class Content extends Component<IProps, IState> {
    myRef: any; // necessary for the Draggable component
    content: ContentClass;

    constructor(props: IProps) {
        super(props);
        this.state = {
            key: uuid(),
            position: {x: 0, y:0}
        };
        this.myRef = React.createRef();
        this.content = props.content;
    }

    /**
     * Callback function for when content gets dropped.
     * The offset gets fetched somewhat laborious bc the draggable stuff doesn't work
     * Then the computed offset gets reset and the passed updateElem function gets called to update this content
     */
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
        this.props.updateElem(this.content, Number(str));
        this.setState({position: {x: 0, y:0}});
    }

    getContainerStyle(translate: number, length: number): CSSProperties {
        return {
            left: translate+'px',
            width: length+'px',
            position: 'absolute',
            maxHeight: 'inherit'
        }
    }
    
    render() {
        const {timeInfo: [dayLength,firstEvent]} = this.props;
        const content = this.content;
        const translate = ((content.publishDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;

        return (
            <Draggable axis="x" onStop={this.dropped} grid={[dayLength/(24*60),0]} nodeRef={this.myRef} key={this.state.key} position={this.state.position} cancel="button, .MuiPopover-root">
                <div style={this.getContainerStyle(translate,dayLength)} ref={this.myRef}>
                    <Card className={"scrollBar cardStyle"}>
                        <CardHeader
                            avatar={
                                <ContentInfo campaigns={content.campaigns as CampaignClass[]} className={"dontDrag"}/>
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
