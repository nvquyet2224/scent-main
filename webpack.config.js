const path = require("path");
//const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require("copy-webpack-plugin");

let fs = require("fs");
const svg = fs.readFileSync(__dirname + "/src/_svg.html");
const preload = fs.readFileSync(__dirname + "/src/_preload.html");
const headerComponent = fs.readFileSync(__dirname + "/src/_component-header.html");
const footerComponent = fs.readFileSync(__dirname + "/src/_component-footer.html");

const homeBanner = fs.readFileSync(__dirname + "/src/home-banner.html");
const homeAbout = fs.readFileSync(__dirname + "/src/home-about.html");
const homeFragrance = fs.readFileSync(__dirname + "/src/home-fragrance.html");
const homeService = fs.readFileSync(__dirname + "/src/home-service.html");
const homeInfrastructure = fs.readFileSync(__dirname + "/src/home-infrastructure.html");
const homePopular = fs.readFileSync(__dirname + "/src/home-popular.html");
const homeDiscover = fs.readFileSync(__dirname + "/src/home-discover.html");
const homePractice = fs.readFileSync(__dirname + "/src/home-practice.html");
const homeNew = fs.readFileSync(__dirname + "/src/home-new.html");
const homePartner = fs.readFileSync(__dirname + "/src/home-partner.html");

//const page404 = fs.readFileSync(__dirname + "/src/_page-404.html");

const minifyRules = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: false,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true, 
};

const devMode = true;
const isBack = false;
const copyScript = true; // false -- > min
const minify = false;

module.exports = {
  mode: devMode ? "development" : "production",
  watch: true,
  entry: {
    reload: ["./src/js/reload.js"],
    index: ["./src/js/index.js"],
    home_banner: ["./src/js/home-banner.js"],
    home_about: ["./src/js/home-about.js"],
    home_fragrance: ["./src/js/home-fragrance.js"],
    home_service: ["./src/js/home-service.js"],
    home_infrastructure: ["./src/js/home-infrastructure.js"],
    home_popular: ["./src/js/home-popular.js"],
    home_discover: ["./src/js/home-discover.js"],
    home_practice: ["./src/js/home-practice.js"],
    home_new: ["./src/js/home-new.js"],
    home_partner: ["./src/js/home-partner.js"],
    component_footer: ["./src/js/component-footer.js"],
    header_customize: ["./src/js/header-customize.js"],
  },
  output: {
    publicPath: "../",
    path: path.resolve(__dirname, "html"),
    filename: isBack ? "../../source/plugins/Web/webroot/js/[name].js" : "js/[name].js", // copy to backend
    library: ["[name]", "modules"],
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isBack ? "../../source/plugins/Web/webroot/css/[name].css" : "css/[name].css", // copy to backend
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images", noErrorOnMissing: true },
        { from: "src/js/common.js",
          to: isBack ? "../../source/plugins/Web/webroot/js/common.js" : "js/common.js",
          info: { minimized: copyScript },
          noErrorOnMissing: true,
        },
        //{ from: "src/videos", to: "videos", noErrorOnMissing: true }
      ],
      options: {
        concurrency: 100
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "index.html",
      preload: preload,
      svg: svg,
      header: headerComponent,
      footer: footerComponent,
      banner: homeBanner,
      about: homeAbout,
      fragrance: homeFragrance,
      service: homeService,
      infrastructure: homeInfrastructure,
      popular: homePopular,
      discover: homeDiscover,
      practice: homePractice,
      new: homeNew,
      partner: homePartner,
      template: "src/index.html",
      minify: minify,
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  watchOptions: {
    ignored: "**/node_modules",
    aggregateTimeout: 100,
  },
};