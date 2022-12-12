import { ObjectId } from 'bson';

import { getDbClient } from '../data/database/mongodb';
import { UserObject } from '../types/user';

const collectionName = 'users';

const mapUserDocumentToUserObject = (doc): UserObject => ({
  _id: doc._id,
  email: doc.email,
});

async function findUser(id: string): Promise<UserObject> {
  try {
    const { db } = await getDbClient();

    const user = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error('User not found');
    }

    return mapUserDocumentToUserObject(user);
  } catch (error) {
    console.log(error);
    throw new error();
  }
}
async function handleUserSignIn(email: string): Promise<UserObject> {
  const { db } = await getDbClient();

  const user = await db
    .collection(collectionName)
    .findOneAndUpdate({ email }, { $set: { email } }, { upsert: true });

  return { _id: user.value._id, email: user.value.email };
}

async function saveUser(user: UserObject): Promise<UserObject> {
  try {
    const { db } = await getDbClient();

    await db.collection(collectionName).insertOne(user);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('User not found');
  }
}

export { saveUser, findUser, handleUserSignIn };
