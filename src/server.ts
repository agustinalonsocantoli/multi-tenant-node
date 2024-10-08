import express, { Express } from 'express';
import { env } from './config/env';
import expressLoader from './config/loader';
import sequelizeInit from './app/services/SequelizeInit';

async function startServer() {
    const app: Express = express();

    await sequelizeInit()

    await expressLoader(app);

    app.listen(env.port, () => {
        const serverAddress = `Server address: ${`http://127.0.0.1:${env.port}`}`;

        const boxWidth = Math.max(serverAddress.length) + 4;

        console.log('┌' + '─'.repeat(boxWidth) + '┐');
        console.log('│' + ' '.repeat(boxWidth) + '│');
        console.log('│ ' + serverAddress + ' '.repeat(boxWidth - serverAddress.length - 2) + ' │')
        console.log('│' + ' '.repeat(boxWidth) + '│');
        console.log('└' + '─'.repeat(boxWidth) + '┘');
    });
}

startServer();