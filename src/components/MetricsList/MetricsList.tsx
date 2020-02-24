import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { Metric } from 'components/Metric/Metric';

import { useStyles } from './MetricsList.style';

type Orientation = 'vertical' | 'horizontal';

export interface IMetric {
  title: React.ReactNode;
  value: string;
  subValue?: React.ReactNode;
}

interface IProps {
  metrics: IMetric[];
  className?: string;
  orientation: Orientation;
  withDividers?: boolean;
}

const dividerOrientation: Record<Orientation, Orientation> = {
  horizontal: 'vertical',
  vertical: 'horizontal',
};

const gridDirection: Record<Orientation, 'column' | 'row'> = {
  horizontal: 'row',
  vertical: 'column',
};

function MetricsList(props: IProps) {
  const { metrics, className, orientation, withDividers } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={className} direction={gridDirection[orientation]}>
      {metrics.map(({ title, value, subValue }, index) => (
        <React.Fragment key={index}>
          {!!index && withDividers && (
            <Grid item className={classes.dividerItem}>
              <Divider orientation={dividerOrientation[orientation]} className={classes.divider} />
            </Grid>
          )}
          <Grid item className={classes.metric}>
            <Metric title={title} value={value} subValue={subValue} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export { MetricsList };
