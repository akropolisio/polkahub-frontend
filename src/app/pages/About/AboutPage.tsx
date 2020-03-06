/* eslint-disable prettier/prettier */
import * as React from 'react';
import Link from '@material-ui/core/Link';

import { Typography, Button } from 'components';
import { makeStyles, Theme } from 'utils/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1200,
    margin: `${theme.spacing(3)}px auto ${theme.spacing(3)}px`,
  },
  button: {
    margin: `${theme.spacing(3)}px 0`,
    minWidth: theme.spacing(30),
  },
  paragraph: {
    fontSize: theme.typography.h6.fontSize,
  },
  subTitle: {
    fontSize: theme.typography.h6.fontSize,
    fontStyle: 'italic',
  },
}));

export function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" paragraph>
        Discover parachains by the leading projects in the Web3 ecosystem.
        <br />
        Deploy your own node in no time, with one command line.
      </Typography>
      <Typography align="center" paragraph>
        <Button
          className={classes.button}
          size="large"
          color="primary"
          variant="contained"
          href="https://github.com/akropolisio/polkahub-monorepo/wiki/Quick-Start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutorial
        </Button>
      </Typography>
      <Typography className={classes.paragraph} paragraph>
        Polkahub is a fast, scalable cloud infrastructure for Substrate based chains, a
        “Platform-as-a-Service (PaaS) for Substrate Nodes”. It provides parachain developers with
        the ability to launch and manage network infrastructure using our command line utility and
        the ability to provide public node access. Polkahub received a grant from Web3 Foundation,
        please read more{' '}
        <Link
          href="https://medium.com/akropolis/polkahub-scalable-blockchain-infrastructure-5d5696fc0d60"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </Link>
        .
      </Typography>
    </div>
  );
}
