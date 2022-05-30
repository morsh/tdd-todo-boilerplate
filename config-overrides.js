module.exports = {
  webpack: function(config, env) {
    return {
      ...config,
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      }
    };
  }
};
