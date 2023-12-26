import { SvgIconComponent } from '@mui/icons-material';
import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

interface ModuleSidebarProps extends React.PropsWithChildren {
    action?: {
        Icon: SvgIconComponent,
        title: string,
        action: () => {},
        sx?: SxProps<Theme>,
    };
	sx?: SxProps<Theme>;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ action, sx, children }) => (
    <Box 
        sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }} 
        className='module-sidebar'
    >
        { action && 
            <Box>
                <Button sx={{
                        px: 5, 
                        py: 2, 
                        borderRadius: 3, 
                        background: t => t.palette.primary.dark, 
                        color: t => t.palette.neutral.lightest
                    }}
                >
                    <action.Icon sx={{ mr: 1 }}/>
                    <Typography sx={{ fontSize: 16, lineHeight: 1.5 }}>{action?.title}</Typography>
                </Button>
            </Box>
        }
        <Box sx={{
                width: '100%',
                minHeight: 300,
                my: 5,
                padding: 1,
                borderRadius: 5,
                background: t => t.palette.neutral.darkest
            }}
        >
            {children}
        </Box>
    </Box>
)
