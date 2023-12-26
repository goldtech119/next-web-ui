export type User = {
	id: string;
	createdAt: number;
	accentColor: number;
	avatar: string;
	banner?: string;
	bot: boolean;
	discriminator: string;
	publicFlags: number;
	system: boolean;
	username: string;
	isPremium?: boolean;
};
