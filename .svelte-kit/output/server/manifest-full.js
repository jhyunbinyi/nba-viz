export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "nba-vis/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BV8mx4M6.js","app":"_app/immutable/entry/app.Dq8FV3nq.js","imports":["_app/immutable/entry/start.BV8mx4M6.js","_app/immutable/chunks/entry.Dq2grDf7.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.Dq8FV3nq.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.DBEyUX1_.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
