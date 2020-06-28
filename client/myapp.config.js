module.exports = {
    apps : [{
      name       : "myapp-client",
      script     : "./server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }],
    plugins: [
      {
        plugin: require('craco-plugin-scoped-css'),
      },
    ],
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx)$/,
          loader: require.resolve('babel-loader'),
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
            { loader: 'scoped-css-loader' },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
  }