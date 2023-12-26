'use client';
import { AnnouncementsCarousel } from '#components/dashboard/announcements';
import { ModuleSelector } from '#components/dashboard/moduleSelector/moduleSelector';
import { Box } from '@mui/material';
import React from 'react';
import { DashboardGreeting } from './dashboardGreeting';

export const Dashboard: React.FC = () => (
	<Box>
		<AnnouncementsCarousel />
		<DashboardGreeting />
		<ModuleSelector />
	</Box>
);
