import Script from 'next/script';

const GoogleTagManagerScript = () => (
	<Script id='google-tag-manager' strategy='afterInteractive'>
		{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_ID}');`}
	</Script>
);

const GoogleTagManagerNoScript = () => (
	<noscript
		dangerouslySetInnerHTML={{
			__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
		}}
	/>
);

const GooglePublisherTag = () => (
	<>
		<Script id='google-publisher' src='https://www.googletagservices.com/tag/js/gpt.js' strategy='lazyOnload'></Script>
		<Script id='google-publisher-config'>{/* ad config goes here */}</Script>
	</>
);

export { GoogleTagManagerScript, GoogleTagManagerNoScript, GooglePublisherTag };
