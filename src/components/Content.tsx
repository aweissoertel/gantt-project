import React from 'react'
import ContentClass from '../entities/Content'
import '../App.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CustomAvatar from './material-ui/CustomAvatar';

interface IProps {
    content: ContentClass,
    timeInfo: number[]
}

export default function Content({content, timeInfo: [dayLength,firstEvent]}: IProps) {
    const translate = ((content.publishDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;
    return (
        <div style={{width: dayLength+'px', position: "absolute", left: translate+'px', maxHeight: 'inherit'}}>
            <Card style={{height:'100%', width:'100%', maxHeight: 'inherit', overflowY: 'auto'}} className={"scrollBar"}>
                <CardHeader
                    avatar={
                        <CustomAvatar size={'small'}>
                            <AssignmentOutlinedIcon fontSize={'small'} />
                        </CustomAvatar>
                      }
                    title={content.title}
                    subheader={content.publishDate.toLocaleDateString()}
                />
            </Card>
        </div>
    )
}
