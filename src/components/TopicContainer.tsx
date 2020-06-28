import React, { Component } from 'react'
import CampaignClass from '../entities/Campaign'
import ContentClass from '../entities/Content'
import Campaign from './Campaign'
import Content from './Content';
import { Divider } from '@material-ui/core';

interface IProps {
    campaigns: Array<CampaignClass>,
    contents: Array<ContentClass>,
    timeInfo: number[],
    updateElem: (elem: CampaignClass | ContentClass, val: number) => void
}

export default class TopicContainer extends Component<IProps, {}> {
    containerHeight(): number {
        // some value that needs to be calculated based on the max number of stacked items
        const calculationDummy = 160;
        return Math.max(150,calculationDummy);
    }

    render() {
        const {campaigns, contents} = this.props;
        return (
            <div>
            <table style={{width: 100+'%'}}>
                <tbody>
                {campaigns.map((campaign) => (
                    <tr style={{height: '75px'}}  key={campaign.id}>
                        <td style={{width: 100+'%', position: 'relative', verticalAlign: 'top', maxHeight: '75px'}}>
                            <Campaign updateElem={this.props.updateElem} campaign={campaign} timeInfo={this.props.timeInfo}/>
                        </td>
                    </tr>
                ))}
                {contents.map((content) => (
                    <tr style={{height: '75px'}} key={content.id}>
                        <td style={{width: 100+'%', position: 'relative', verticalAlign: 'top', maxHeight: '75px'}}>
                            <Content updateElem={this.props.updateElem} content={content} timeInfo={this.props.timeInfo}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Divider variant={'fullWidth'}/>
            </div>
        )
    }
}
