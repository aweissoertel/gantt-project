import React, { Component } from 'react'
import CampaignClass from '../entities/Campaign'
import ContentClass from '../entities/Content'
import Campaign from './Campaign'
import Content from './Content';
import { Divider } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface IProps {
    campaigns: Array<CampaignClass>,
    contents: Array<ContentClass>,
    timeInfo: number[],
    updateElem: (elem: CampaignClass | ContentClass, val: number) => void
}

export default class TopicContainer extends Component<IProps, {}> {
    render() {
        const {campaigns, contents} = this.props;
        let divider: JSX.Element = campaigns.length > 0 ? <Divider variant={'fullWidth'}/> : <></>;

        return (
            <div>
                <table style={tableStyle}>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr style={rowStyle}  key={campaign.id}>
                                <td style={cellStyle}>
                                    <Campaign updateElem={this.props.updateElem} campaign={campaign} timeInfo={this.props.timeInfo}/>
                                </td>
                            </tr>
                        ))}
                        {contents.map((content) => (
                            <tr style={rowStyle} key={content.id}>
                                <td style={cellStyle}>
                                    <Content updateElem={this.props.updateElem} content={content} timeInfo={this.props.timeInfo}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {divider}
            </div>
        )
    }
}

const tableStyle: CSSProperties = {
    width: '100%'
}

const rowStyle: CSSProperties = {
    height: '75px'
}

const cellStyle: CSSProperties = {
    width: '100%',
    position: 'relative',
    verticalAlign: 'top',
    maxHeight: '75px'
}
