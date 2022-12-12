import { Document } from 'mongodb';

const mapId = (doc: Document) => {
  return {
    ...doc,
    id: doc._id,
  };
};

export { mapId };
