import { makeStyles, Theme, gradients } from 'utils/styles';

const ghLinkSize = 86;

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    borderRadius: 4,
    background: gradients.purple,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 2, 3, 5),
    color: '#fff',
  },

  backButton: {
    color: '#fff',
  },

  title: {
    fontWeight: 600,
  },

  infoIcon: {
    position: 'relative',
    top: '0.1em',
  },

  ghLink: {
    position: 'relative',
    top: 1,
    right: 1,
    color: theme.palette.primary.main,
    width: ghLinkSize,
    height: ghLinkSize,
    display: 'inline-flex',
    alignItems: 'flex-end',
    borderTop: `${ghLinkSize / 2}px solid white`,
    borderRight: `${ghLinkSize / 2}px solid white`,
    borderLeft: `${ghLinkSize / 2}px solid transparent`,
    borderBottom: `${ghLinkSize / 2}px solid transparent`,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  ghLinkIcon: {
    fontSize: 34,
  },
}));
