import { hexToRgba } from '#helpers/colorHelper';
import { LinkRounded, UploadFileRounded } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

export interface ImageUploadProps {
  name: string;
  acceptedTypes?: string[];
  /**
   * Expects number in bytes
   */
  sizeLimit?: number;
  onDrop?: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	name,
	acceptedTypes = ['.jpg', '.png', '.gif'],
	sizeLimit = 4000000,
	onDrop = console.log,
}) => {
	const t = useTranslations();

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr max-content 1fr',
				alignItems: 'center',
				gap: 2,
			}}
		>
			<DropArea
				name={name}
				acceptedTypes={acceptedTypes}
				sizeLimit={sizeLimit}
				onDrop={onDrop}
			/>
			<Typography textAlign='center'>{t('commons.Or')}</Typography>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<LinkRounded />
						</InputAdornment>
					),
				}}
				placeholder={t('commons.EnterAnImageURL')}
			/>
		</Box>
	);
};

interface DropAreaProps extends Required<ImageUploadProps> {}

const DropArea: React.FC<DropAreaProps> = ({
	acceptedTypes,
	sizeLimit,
	onDrop,
}) => {
	const t = useTranslations();
	const handleDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			onDrop(acceptedFiles, rejectedFiles);
		},
		[onDrop],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleDrop,
		maxSize: sizeLimit,
		accept: {
			'image/*': acceptedTypes,
		},
	});

	return (
		<Box
			sx={{
				borderRadius: 1.5,
				border: t => `1px dashed ${t.palette.neutral.dark}`,
				background: t =>
					isDragActive
						? hexToRgba(t.palette.primary.light, 0.25)
						: t.palette.neutral.darkest,
				minHeight: 100,
				minWidth: 195,
				display: 'grid',
				placeContent: 'center',
				textAlign: 'center',
				gap: 1,
				cursor: isDragActive ? 'copy' : 'pointer',
				'& svg': {
					marginX: 'auto',
				},
			}}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<UploadFileRounded htmlColor='neutral.lightest' />
			<Typography fontSize={12} fontWeight={600} color='neutral.lightest'>
				{isDragActive
					? t('form.ImageUpload.drop')
					: t('form.ImageUpload.label')}
			</Typography>
			<Typography fontSize={10} color='neutral.dark'>
				{`${acceptedTypes
					.map(t => t.substring(1).toUpperCase())
					.join('. ')}.`}{' '}
        &bull; {t('form.ImageUpload.message', { number: sizeLimit / 1000000 })}
			</Typography>
		</Box>
	);
};
