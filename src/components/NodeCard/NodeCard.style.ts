import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  lendIcon: {
    fontSize: theme.spacing(2.5),
    display: 'block',
  },

  highlightedMetric: {
    color: colors.royalPurple,
  },
}));
