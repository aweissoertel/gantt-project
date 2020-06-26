import React from 'react'
import CampaignClass from '../entities/Campaign'
import '../App.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

interface IProps {
    campaign: CampaignClass,
    timeInfo: number[]
}

export default function Campaign({campaign, timeInfo: [dayLength,firstEvent]}: IProps) {
    const translate: number = ((campaign.startDate.getTime() - firstEvent) / (1000*60*60*24)) * dayLength;
    const campaignLength: number = ((campaign.endDate.getTime() - campaign.startDate.getTime()) / (1000*60*60*24) +1) * dayLength;
    const startEnd: [string, string] = [campaign.startDate.toLocaleDateString(), campaign.endDate.toLocaleDateString()];
    return (
        <div style={{position: "absolute", left: translate+'px', width: campaignLength+'px', maxHeight: 'inherit'}}>
            <Card style={{height:'100%', width:'100%', maxHeight: 'inherit', overflowY: 'auto'}} className={"scrollBar"}>
                <CardHeader
                    avatar={
                        <Avatar style={{backgroundColor: campaign.color}} >
                            {campaign.title.charAt(0)}
                        </Avatar>
                    }
                    title={campaign.title}
                    subheader={startEnd[0] + ' - \n' + startEnd[1]}
                />
            </Card>
        </div>
    )
}
