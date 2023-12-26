import * as Sentry from '@sentry/nextjs';
import NextErrorComponent, { ErrorProps } from 'next/error';
import { NextPage, NextPageContext } from 'next/types';

const CustomErrorComponent: NextPage<ErrorProps> = ({ statusCode }) => <NextErrorComponent statusCode={statusCode} />;

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
	await Sentry.captureUnderscoreErrorException(contextData);
	return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
