import { Test } from "@nestjs/testing";

import {AppModule} from "../src/app.module";

export const server = {
    async start() {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        })
            .setLogger(console)
            .compile();

        const app = moduleFixture.createNestApplication();
        try {
            await app.init();
            this.app = app;
            this.http = app.getHttpServer();
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    },
    async stop() {
        await this.app.close();
        await this.http.close();
        this.http = null;
        this.app = null;
    },
    app: null,
    http: null,
};
