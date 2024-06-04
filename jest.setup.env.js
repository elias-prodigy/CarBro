const { server } = require("./tests/server");

beforeAll(() => server.start());
afterAll(() => server.stop());
