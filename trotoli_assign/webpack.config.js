var webpack = require('webpack');
var path = require('path');
console.log("path", path.join(__dirname,'/build'));
module.exports={
  devtool :'inline-source-map',
  entry : ['webpack-dev-server/client?http://127.0.0.1:8000',
  'webpack/hot/only-dev-server',
  './src'
  ] ,
  output :{
    path : path.join(__dirname,'/build'),
    fileName : 'build/bundle.js'
  },
  resolve:{
    modulesDirectories : ['node_modules','src'],
    extensions : ['','.js']
  },
  module : {
    loaders :[
      {
        test : /\.jsx?$/,
        exclude : /node_modules/,
        loaders :['react-hot','babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
      }
    ]
  },
  plugins :[new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
