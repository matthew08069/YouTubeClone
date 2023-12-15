/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = nextConfig
	process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error);
});

module.exports = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'lh3.googleusercontent.com'
		},
	  ],
	},
  }