import mongoose from 'mongoose';
import { getSchema } from '@risingstack/graffiti-mongoose';

import { database } from '../config';
import { UserModel, PostModel, CommentModel } from '../domain'

const { name, username, password, host, port } = database;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${name}`);

export default getSchema([UserModel, PostModel, CommentModel]);
