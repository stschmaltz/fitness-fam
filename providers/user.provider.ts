import { ObjectId } from 'bson';

import { getDbClient } from '../data/database/mongodb';
import { UserObject } from '../types/user';

const collectionName = 'users';

const mapUserDocumentToUserObject = (doc): UserObject => ({
  _id: doc._id,
  email: doc.email,
  passwordHash: doc.passwordHash,
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

async function verifyUserSignIn(
  email: string,
  passwordHash: string
): Promise<UserObject | undefined> {
  try {
    const { db } = await getDbClient();
    const user = await db.collection(collectionName).findOne({ email });

    if (!user) {
      // TODO: add toast
      console.log("User doesn't exist");

      return;
    }

    if (user.passwordHash !== passwordHash) {
      // TODO: add toast
      console.log('Password incorrect');

      return;
    }

    return {
      _id: user._id,
      email: user.email,
      passwordHash: user.passwordHash,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
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

export { saveUser, findUser, verifyUserSignIn };
