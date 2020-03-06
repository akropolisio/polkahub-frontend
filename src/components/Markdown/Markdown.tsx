import React from 'react';
import ReactMarkdown, { MarkdownProps } from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Theme, withStyles, WithStyles, colors, darken } from 'utils/styles';

const styles = (theme: Theme) => ({
  title: {
    borderBottom: `1px solid ${darken(colors.alabaster, 0.1)}`,
  },
  listItem: {
    marginTop: theme.spacing(1),
  },
  pre: {
    padding: theme.spacing(1.5),
    overflow: 'auto',
    backgroundColor: darken(colors.alabaster, 0.08),
    borderRadius: 3,
  },
});

type Props = WithStyles<typeof styles>;

const options: MarkdownProps['options'] = {
  overrides: {
    h1: withStyles(styles)(({ classes, ...props }: Props) => (
      <Typography {...props} className={classes.title} variant="h4" gutterBottom />
    )),
    h2: withStyles(styles)(({ classes, ...props }: Props) => (
      <Typography {...props} className={classes.title} variant="h5" gutterBottom />
    )),
    h3: withStyles(styles)(({ classes, ...props }: Props) => (
      <Typography {...props} className={classes.title} variant="h6" gutterBottom />
    )),
    h4: withStyles(styles)(({ classes, ...props }: Props) => (
      <Typography {...props} className={classes.title} variant="subtitle1" gutterBottom />
    )),
    p: { component: Typography, props: { paragraph: true } },
    a: Link,
    li: withStyles(styles)(({ classes, ...props }: Props) => (
      <li className={classes.listItem}>
        <Typography component="span" {...props} />
      </li>
    )),
    pre: withStyles(styles)(({ classes, ...props }: Props) => (
      <pre {...props} className={classes.pre} />
    )),
  },
};

export function Markdown(props: Omit<MarkdownProps, 'options'>) {
  return <ReactMarkdown options={options} {...props} />;
}
