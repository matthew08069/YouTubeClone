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
		  hostname: 'lh3.googleusercontent.com',
		  port: '',
		  pathname: '/a/ACg8ocLa0qUWrdyuW52gGlhRttZMlP-eJT2CA3sRlKUp8FbJzuY=s96-c',
		},
	  ],
	},
  }