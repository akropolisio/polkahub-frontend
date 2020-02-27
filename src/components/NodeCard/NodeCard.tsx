import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { LendIcon } from '../icons';
import { Metric } from '../Metric/Metric';
import { CopyButton } from '../CopyButton/CopyButton';
import { ActivitiesCard } from '../ActivitiesCard/ActivitiesCard';
import { useStyles } from './NodeCard.style';

const tKeys = tKeysAll.components.nodeCard;

interface IProps {
  name: string;
  updatedAt: number;
  createdAt: number;
  description: string | null;
  httpUrl: string;
  owner?: string;
  repoUrl?: string;
  version: string;
  wsUrl: string;
}

const NodeCard = memo(function NodeCard(props: IProps) {
  const {
    createdAt,
    description,
    httpUrl,
    owner,
    name,
    updatedAt,
    version,
    wsUrl,
    repoUrl,
  } = props;

  const classes = useStyles();
  const { t } = useTranslate();

  const metricsList = React.useMemo(
    () =>
      [
        <Metric
          title={t(tKeys.name.getKey())}
          value={name}
          icon={<LendIcon className={classes.lendIcon} />}
        />,
        <Metric title={t(tKeys.version.getKey())} value={version} />,
        owner && <Metric title={t(tKeys.owner.getKey())} value={owner} />,
        <Metric
          title={t(tKeys.createdAt.getKey())}
          value={new Date(createdAt * 1000).toLocaleDateString()}
        />,
        <Metric
          title={t(tKeys.updatedAt.getKey())}
          value={new Date(updatedAt * 1000).toLocaleDateString()}
        />,
      ].filter(Boolean),
    [t, name, version, owner, createdAt, updatedAt],
  );

  const commonButtonProps = {
    variant: 'outlined',
    color: 'primary',
    fullWidth: true,
  } as const;

  const asideContent = React.useMemo(
    () => (
      <Grid container spacing={2} justify="center" direction="column">
        <Grid item>
          <CopyButton content={wsUrl} {...commonButtonProps}>
            {t(tKeys.buttons.copyWs.getKey())}
          </CopyButton>
        </Grid>
        <Grid item>
          <CopyButton content={httpUrl} {...commonButtonProps}>
            {t(tKeys.buttons.copyHttp.getKey())}
          </CopyButton>
        </Grid>
        {repoUrl && (
          <Grid item>
            <Button
              component="a"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              {...commonButtonProps}
            >
              {t(tKeys.buttons.repo.getKey())}
            </Button>
          </Grid>
        )}
      </Grid>
    ),
    [t, wsUrl, httpUrl, repoUrl],
  );

  return (
    <ActivitiesCard
      metricsList={metricsList}
      expansionPanelDetails={description}
      asideContent={asideContent}
    />
  );
});

export { NodeCard };
