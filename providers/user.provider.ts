import { ObjectId } from 'bson';

import { getDbClient } from '../data/database/mongodb';
import { UserObject } from '../types/user';

const collectionName = 'users';

type UserDocument = {
  _id: ObjectId;
  email: string;
};

const mapUserDocumentToUserObject = (doc: UserDocument): UserObject => ({
  _id: doc._id,
  email: doc.email,
});

async function findUser(id: string): Promise<UserObject> {
  try {
    const { db } = await getDbClient();

    const user: UserDocument = (await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) })) as UserDocument;

    if (!user) {
      throw new Error('User not found');
    }

    return mapUserDocumentToUserObject(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function handleUserSignIn(email: string): Promise<UserObject> {
  const { db } = await getDbClient();

  const user = await db
    .collection(collectionName)
    .findOneAndUpdate({ email }, { $set: { email } }, { upsert: true });

  if (!user.value) throw new Error('User not found');

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
