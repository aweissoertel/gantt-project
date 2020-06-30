import React from 'react';
// broken on material-uis side. see: https://github.com/mui-org/material-ui/issues/13394
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import CampaignClass from '../../entities/Campaign';
import InfoIcon from '@material-ui/icons/Info';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

interface IProps {
    campaigns: Array<CampaignClass>;
    className: string;
}

export default function ContentInfo({campaigns}: IProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} color="primary" onClick={handleClick} style={{padding: '0'}}>
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.typography}>
            This content belongs to the following campaign(s): 
            {campaigns.map((campaign: CampaignClass) => (
                <div key={campaign.id}>• {campaign.title}</div>
            ))}
        </div>
      </Popover>
    </div>
  );
}
