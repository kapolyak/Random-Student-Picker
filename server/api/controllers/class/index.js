const ModelsRoot = require('../../models');

let Models = null;
let db = null;
let container = {};

container.readOne = async (id) => {
  try {
    return await Models.class.findOne({
      where: { id: id }
    });
  } catch (error) {
    return error;
  }
};

container.writeOne = async (data) => {
  try {
    return await Models.class.create(data);
  } catch (error) {
    return error;
  }
};

container.updateOne = async (data) => {
  try {
    return await Models.class.update(data, {
      where: { id: data.id }
    });
  } catch (error) {
    return error;
  }
};

container.deleteOne = async (id) => {
  try {
    return await container.readOne({ where: { id: id } }).then((hrClass) => {
      if (hrClass instanceof Error) {
        throw hrClass;
      }
      hrCass.destroy({
        where: { id: id }
      });
    });
  } catch (error) {
    return error;
  }
};

module.exports = (_db) => {
  Models = ModelsRoot(_db, false);
  db = _db;
  return container;
};
