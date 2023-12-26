import { useTranslations } from 'next-intl';
import { Box, useTheme } from '@mui/material';

export const NoRules = () => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Box
      color='neutral.dark'
      sx={{
        width: '100%',
        borderRadius: '1.25rem',
        border: `2px dashed ${theme.palette.neutral.darker}`,
        background: theme.palette.neutral.darkest,
        maxWidth: '19rem',
        height: '14rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {t('module_autoban.NoRules')}
    </Box>
  );
};
