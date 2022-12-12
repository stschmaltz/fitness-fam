import { ObjectId } from 'bson';

export interface UserObject {
  _id: ObjectId;
  email: string;
}
