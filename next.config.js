const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'd205bpvrqc9yn1.cloudfront.net',
        pathname: '/**.gif',
      },
    ],
  },
});
