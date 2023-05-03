import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  context: path.join(__dirname, "./src"),
  mode: "development",
  devtool: false,
  entry: {
    main: "./index.tsx",
  },
  output: {
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "file.[name].[hash].js",
    chunkFilename: "chunk.[name].[hash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["module", "browser", "main"],
  },
  module: {
    rules: isRunningWebpack
      ? [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFile: "tsconfigWebpack.json",
                  transpileOnly: true,
                },
              },
            ],
          },
        ]
      : [],
  },
  target: "web",
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        largeVendors: {
          test: /[\\/]node_modules[\\/](zrender|moment).*$/,
          name: "largeVendors",
          chunks: "all",
          reuseExistingChunk: true,
        },
        chartVendors: {
          test: /[\\/]node_modules[\\/][^@echart|echart]/,
          name: "chartVendors",
          chunks: "all",
          reuseExistingChunk: true,
        },
        separateOut: {
          test: /[\\/]separateOut[\\/]/,
          name: "separateOut",
          chunks: "all",
          reuseExistingChunk: true,
        },
      },
    },
  },
};

export default config;
