import React from 'react';

import { AdSlot } from '#components/common/ads/adSlot';
import { FavoriteModulesWidget } from '#components/dashboard/widgets/favoriteModules/widget';
import { UpdatesWidget } from '#components/dashboard/widgets/updates/widget';
import { LayoutGuildDashboard } from '#components/layouts/guildDashboard';
import { Dashboard } from '#components/pages/dashboard';
import '#styles/globals.css';

export default function DashboardPage() {
	return (
		<LayoutGuildDashboard
			title="General"
			sidebar={[
				<AdSlot id="1" key="ad" type="square" />,
				<FavoriteModulesWidget key="favorites" />,
				<UpdatesWidget key="updates" />,
			]}
		>
			<Dashboard />;
		</LayoutGuildDashboard>
	);
}
