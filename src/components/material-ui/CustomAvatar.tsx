import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

interface IProps {
    size: string,
    children: Object
}

export default function CustomAvatar({size, children}: IProps) {
  const classes = useStyles();

  if (size === 'small') {
      return (
        <Avatar className={classes.small} >
            {children}
        </Avatar>
      );
  }
  else if (size === 'large') {
      return (
        <Avatar className={classes.large} >
            {children}
        </Avatar>
      );
  }
  else {
      return (
        <Avatar>
            {children}
        </Avatar>
      );
  }
}
