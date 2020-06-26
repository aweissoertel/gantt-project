import React, { CSSProperties } from 'react'
import TopicClass from '../entities/Topic'
import { Divider } from '@material-ui/core';

interface IProps {
    topic: TopicClass,
    numItems: number
}

function getTopicStyle(numItems: number) : CSSProperties {
    return ({
        writingMode: 'vertical-rl',
        transform: 'rotate(-180deg)',
        margin: '0px 16px',
        height: numItems * 78 + 'px',
        textAlign: 'center'
    });
}

export default function Topic({topic: {title}, numItems}: IProps) {
    return (
        <div>
        <div style={getTopicStyle(numItems)}>
            {title}
        </div>
        <Divider variant={"fullWidth"}/>
        </div>
    )
}
