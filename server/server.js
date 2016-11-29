import express from 'express';
import graffiti from '@risingstack/graffiti';
import { json } from 'body-parser';

import schema  from '../graphql';
import { server } from '../config';

const app = express();

app.use(json());
app.use(graffiti.express({schema}));

app.listen(server.port, () => { console.log(`App listen on ${server.port}`) });
