'use client';

import React from 'react';
import { DashboardSection } from '#components/common/dashboard/section';
import { TabProvider } from '#components/contexts/tabContext';
import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';

export default function AutoBanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModuleSettingsWrapper moduleId='autoban'>
      <TabProvider>
        <DashboardSection sx={{ padding: 0 }}>{children}</DashboardSection>
      </TabProvider>
    </ModuleSettingsWrapper>
  );
}
