import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  SxProps,
  Theme,
  PaginationItem,
  Box,
} from '@mui/material';
import React from 'react';
import { useTranslations } from 'next-intl';

export interface PaginationProps extends MuiPaginationProps {
  setCurrentPage?: any;
}

const ButtonFirstLast = ({ onClick, title, disabled }: any) => (
  <Box
    onClick={onClick}
    sx={{
      border: (t) => `1px solid ${t.palette.neutral.dark}`,
      color: (t) => t.palette.neutral.lightest,
      borderRadius: '5px',
      padding: '7px 17px',
      fontSize: '14px',

      opacity: disabled ? 1 : 0.38,

      '&:hover': {
        background: (t) => t.palette.neutral.darkest,
        cursor: 'pointer',
      },
    }}
  >
    {title}
  </Box>
);

export const Pagination: React.FC<PaginationProps> = ({ ..._props }) => {
  const t = useTranslations();
  const props: PaginationProps = { ..._props };
  const { setCurrentPage, count, page, ...rest } = props;

  return (
    <MuiPagination
      count={count}
      page={page}
      renderItem={(item) => {
        if (item.type === 'first') {
          return (
            <ButtonFirstLast
              onClick={() => setCurrentPage(1)}
              title={t('commons.First')}
              disabled={page !== 1}
            />
          );
        }

        if (item.type === 'last') {
          return (
            <ButtonFirstLast
              onClick={() => setCurrentPage(count)}
              title={t('commons.Last')}
              disabled={page !== count}
            />
          );
        }

        return <PaginationItem {...item} />;
      }}
      {...rest}
      sx={paginationToSx(props)}
    />
  );
};

const paginationToSx = (props: PaginationProps): SxProps<Theme> => {
  const sx: SxProps<Theme> = {
    '.MuiPaginationItem-root': {
      borderRadius: '5px',
      border: (t) => `1px solid ${t.palette.neutral.dark}`,
      minWidth: '38px',
      height: '38px',
    },

    '.MuiPaginationItem-page': {
      border: (t) => `1px solid ${t.palette.primary.dark}`,
    },

    '.MuiPaginationItem-root.Mui-selected': {
      backgroundColor: (t) => t.palette.primary.main,
    },
  };

  return { ...sx, ...props.sx };
};
