/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
	testEnvironment: "node",
	fakeTimers: {
		timerLimit: 100,
	},
	testTimeout: 180000,
	workerIdleMemoryLimit: "1GB",
	rootDir: __dirname,
	preset: "ts-jest",
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				isolatedModules: true,
				diagnostics: false,
			},
		],
	},
	modulePathIgnorePatterns: ["/node_modules/"],
	testPathIgnorePatterns: ["/node_modules/"],
	testMatch: ["**/tests/**/*.spec.ts"],
	setupFilesAfterEnv: ["./jest.setup.env.js"],
};
