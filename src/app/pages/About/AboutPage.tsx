import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { Markdown, Typography, Button } from 'components';
import { routes } from 'app/routes';
import { makeStyles, Theme } from 'utils/styles';

const useStyles = makeStyles((theme: Theme) => ({
  exploreButton: {
    minWidth: theme.spacing(30),
  },
}));

export function AboutPage() {
  const classes = useStyles();

  return (
    <>
      <Typography paragraph>
        Discover parachains by the leading projects in the Web3 ecosystem. All this data is
        immediately available for querying using substrate RPC API.
      </Typography>
      <Typography paragraph align="center">
        <Button
          component={RouterLink}
          size="large"
          variant="contained"
          color="primary"
          to={routes.projects.getRedirectPath()}
          className={classes.exploreButton}
        >
          Explore
        </Button>
      </Typography>
      <Typography paragraph>
        If you are developer, you can run or deploy any Substrate-based parachain with one command
        line. Check our{' '}
        <Link component={RouterLink} to={`${routes.about.getRedirectPath()}#quick-start`}>
          Quick Start
        </Link>{' '}
        tutorial.
      </Typography>
      <Markdown>{content}</Markdown>
    </>
  );
}

const content = `
# What is PolkaHub

1. Polkahub is a fast, scalable blockchain infrastructure component for Substrate parachains.
1. Polkahub provides parachain developers with the ability to launch and manage network infrastructure using our command line utility and the ability to provide public node access.
1. PolkaHub gives users the opportunity to get free cloud access to the diverse Polkadot ecosystem.
1. Polkahub provides developers with a unified standard for packaging and deploying applications to cloud infrastructure. 
1. Polkahub provides the functionality to track and control the parachain’s versions. So in the event of critical bugs arising, developers can update or roll back the version of the parachain using simple commands (via running specific commands in a command line). 
1. Polkahub supports Substrate node deployment to remote servers or cloud infrastructure via git. 
1. Polkahub infrastructure is based on Docker Container Services such as Kubernetes.
1. Docker provides high-level interfaces for isolated environments within the node's execution. Easily scaled, managed and updated.
1. No need to rely on DevOps and System Administration for managing parachain’s infrastructure - thanks to PolkaHub. You only need git, command line and a simple web-interface. 

# Quick Start

## Install CLI (MacOS / Linux)

You can just use bash script:

\`\`\`
$ bash <(curl http://get.polkahub.org/ -L)
\`\`\`

This will install polkahub binary in your /usr/local/bin(MacOS) or /usr/bin(Linux) directory.
Then you can use it:

\`\`\`
$ polkahub <action> [ARGS]
\`\`\`

Or use docker image like this:

\`\`\`
$ mkdir $HOME/.polkahub
$ docker run --rm -ti -v $HOME/.polkahub:/tmp/home -e POLKAHUB_HOME=/tmp/home registry.polkahub.org/polkahub-cli:v3 <action> [ARGS]
\`\`\`

## Usage CLI

### Authentication

\`\`\`bash
$ polkahub auth
Email: user@example.com
Password:

Login user with email user@example.com
 ⠂⠂⠂
done
\`\`\`

Use email and password created via https://polkahub.org or create new email and password via CLI (see Registration section)

### Registration

\`\`\`bash
$ polkahub register
Email: user@example.com
Password:
Confirm Password:

Registration new user with email user@example.com
 ⡀⡀⡀
done
\`\`\`

### Create a new project

\`\`\`bash
$ polkahub create akropolisos
 
 ⠁⠁⠁
done
https     -> "https://steadfast-surprise-6647-akropolisos-rpc.polkahub.tech"
ws        -> "wss://steadfast-surprise-6647-akropolisos.polkahub.tech"
remote  -> "https://git.polkahub.org/steadfast-surprise-6647-akropolisos.git"
\`\`\`

Then you can add **remote** to your project, push it and it will automatically start CI build.

### Find a project

\`\`\`bash
$ polkahub find akropolisos
 
Looking for akropolisos project
 ⠁⠁⠁
steadfast-surprise-6647/akropolisos@0.8.2
steadfast-surprise-6647/akropolisos@v1
steadfast-surprise-6647/akropolisos@v2
\`\`\`

### Install a exists project

\`\`\`bash
$ polkahub install steadfast-surprise-6647/akropolisos@0.8.2 -a alexander 
 
Deploying akropolisos project with version 0.8.2
 ⠁⠁⠁
done
https  -> "https://frightened-brick-8071-alexander-rpc.polkahub.tech"
ws     -> "wss://frightened-brick-8071-alexander.polkahub.tech"
\`\`\`
`;
