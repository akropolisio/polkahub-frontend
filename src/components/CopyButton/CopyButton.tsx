import React, { useState, useCallback, useRef } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopy from '@material-ui/icons/FileCopyOutlined';

import { useTheme } from 'utils/styles';

type Props = ButtonProps & { content: string };

export function CopyButton({ content, ...buttonProps }: Props) {
  const theme = useTheme();

  const [tooltipTitle, setTooltipTitle] = useState<'copy' | 'copied!'>('copy');
  const closeTimeout = useRef(0);

  const handleCopy = useCallback(() => {
    setTooltipTitle('copied!');
  }, []);

  const handleTooltipClose = useCallback(() => {
    if (tooltipTitle !== 'copy') {
      closeTimeout.current = window.setTimeout(
        () => setTooltipTitle('copy'),
        theme.transitions.duration.shorter,
      );
    }
  }, [tooltipTitle]);

  const handleTooltipOpen = useCallback(() => {
    clearTimeout(closeTimeout.current);
  }, [tooltipTitle]);

  return (
    <Tooltip
      title={tooltipTitle}
      onClose={handleTooltipClose}
      onOpen={handleTooltipOpen}
      placement="bottom"
    >
      <CopyToClipboard text={content} onCopy={handleCopy}>
        <Button {...buttonProps} endIcon={<FileCopy />} />
      </CopyToClipboard>
    </Tooltip>
  );
}
