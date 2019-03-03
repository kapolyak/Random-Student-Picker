const ModelsRoot = require('../../models');

let Models = null;
let db = null;
let classContainer = {};

// TODO:PUSH:
classContainer.readOne = async (id) => {
  try {
    let record = await Models.class.findOne({
      where: { id: id }
    });

    if (record instanceof Error) throw record;

    return record;
  } catch (error) {
    return error;
  }
};

// TODO:PUSH:
classContainer.writeOne = async (data) => {
  try {
    let record = await Models.class.create(data);

    if (record instanceof Error) throw new Error('Record must be complete');

    return record;
  } catch (error) {
    return error;
  }
};

// TODO:PUSH:
classContainer.updateOne = async (data, id, method) => {
  try {
    let record = await classContainer.readOne(id);

    if (method === 'PUT') {
      if (!record) {
        record = await classContainer.writeOne(data);

        return record;
      }

      let containsAllKeys = Object.keys(record.dataValues).every((recKey) => {
        return Object.keys(data).includes(recKey);
      });

      if (!containsAllKeys) throw new Error(`Record must be complete`);
    }

    let updated = await Models.class.update(data, {
      where: { id: id }
    });

    return updated;
  } catch (error) {
    return error;
  }
};

// TODO:PUSH:
classContainer.deleteOne = async (id) => {
  try {
    let record = await classContainer.readOne(id);

    if (record instanceof Error) throw record;

    if (!record) throw new Error(`Error processing provided record ${id}`);

    let removed = await record.destroy({
      where: { id: id }
    });

    return removed;
  } catch (error) {
    return error;
  }
};

module.exports = (_db) => {
  Models = ModelsRoot(_db, false);
  db = _db;
  return classContainer;
};
