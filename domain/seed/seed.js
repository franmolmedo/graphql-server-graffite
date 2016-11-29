import seeder from 'mongoose-seeder';
import mongoose from 'mongoose';

// Mandatory import (define moongose schemas)
import {} from '../models';

import { database } from '../../config'
import seedData from './seed.data.json';

const { name, username, password, host, port } = database;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${name}`);

function seedError(error) {
  mongoose.connection.close();
  console.log(`Seed finished with errors: ${error}`);
  process.exit(1); //eslint-disable-line
}

seeder.seed(seedData, {dropDatabase: false})
.then((dbData) => {
  const { users, posts, comments} = dbData;
  const { usera, userb, userc } = users;
  const { posta, postb, postc, postd } = posts;
  const { commenta, commentb, commentc, commentd,
          commente, commentf, commentg } = comments;

  usera.posts.push(...[posta, postb]);
  usera.comments.push(...[commenta, commentb, commentc, commentd]);
  userb.posts.push(postc);
  userb.comments.push(...[commente, commentf]);
  userc.posts.push(postd);
  userc.comments.push(commentg);
  posta.author = usera;
  posta.comments.push(...[commenta, commentb, commentf]);
  postb.author = usera;
  postb.comments.push(...[commentc, commentd, commente]);
  postc.author = userb;
  postc.comments.push(commentg);
  postd.author = userc;

  Promise.all([
    Object.keys(posts).map((post) => posts[post].save()),
    Object.keys(users).map((user) => users[user].save())
  ]).then(() => {
    mongoose.connection.close();
    console.log('Seed finished OK!');
    process.exit(0); //eslint-disable-line
  }).catch((error) => seedError(error));
}).catch((error) => seedError(error));
