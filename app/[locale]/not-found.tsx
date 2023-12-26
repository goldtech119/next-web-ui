'use client';

import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<Grid container alignContent="center" direction="column">
			<Grid item container justifyContent="center" spacing={0}>
				<Typography variant="h3">That page couldn&apos;t be found</Typography>
			</Grid>
			<Grid item container justifyContent="center" spacing={0}>
				<Button onClick={() => router.back()}>Go Back</Button>
			</Grid>
			<Grid item container justifyContent="center" spacing={0}>
				<Image alt="404 image" src="/error-images/404.gif" width={640} height={452} />
			</Grid>
		</Grid>
	);
};

export default NotFoundPage;
