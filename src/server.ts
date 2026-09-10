import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.cjs";
import historyApiFallback from "connect-history-api-fallback";

const HOST: string = process.env.SERVER_HOST as string;
const PORT: number = Number(process.env.SERVER_PORT);

const app = express();

//Logging middleware
app.use((req, res, next) => {
	console.log("--------------------");
	console.log(`Request: ${req.method} ${req.url}`);
	return next();
});

const compiler = webpack(webpackConfig); // Gets webpack compilor

app.use(
	historyApiFallback({
		verbose: true,
		rewrites: [
			{
				from: /^\/api\/*$/,
				to: (context) => context.parsedUrl.path || "/index.html",
			},
		],
	}),
); // Middleware to handle client-side routing

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath, // where this middleware will serve the files from
	}),
);
app.use(webpackHotMiddleware(compiler, {}));

// Returns a JSON response for the /api/contact route
const ApiRouter = express.Router();
ApiRouter.get("/contact", (req, res) => {
	return res.json({ message: "Contact API route works!" });
});

ApiRouter.get("/", (req, res) => {
	return res.json({ message: "Home API route works!" });
});

// Uses the ApiRouter for all routes starting with /api
app.use("/api", ApiRouter);

app.listen(PORT, HOST, () => {
	console.log(`Server listening on ${HOST}:${PORT}`);
});
