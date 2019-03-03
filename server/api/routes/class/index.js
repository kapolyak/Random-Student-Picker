const express = require('express');
const classControl = require('../../controllers/class');

let tryCatchResponse = async (res, param, desc, func, ...opt) => {
  try {
    const Record = await func(param, ...opt);

    if (Record instanceof Error) throw Record;

    res.send({
      Message: `Record ${desc}`,
      Record
    });
  } catch (error) {
    res.status(400).send({
      Error: {
        Message: error.message
      }
    });
  }
};

module.exports = (sqlite) => {
  const router = express.Router();
  const classes = classControl(sqlite.db);

  router.get('/', (req, res) => {
    res.send({ Class: 'This is the Class root route' });
  });

  router.get('/:classId', async (req, res) => {
    let { classId } = req.params;

    await tryCatchResponse(res, classId, 'found', classes.readOne);
  });

  router.post('/', async (req, res) => {
    let data = req.body;

    await tryCatchResponse(res, data, 'created', classes.writeOne);
  });

  // TODO:FIXME:NOTE: Put and Patch are very different. While both are
  // considered idempotent, they do very differnt things.  Put will
  // replace the entire object if, and only if, all fields are provided,
  // while patch will replace only the provided field or fields.
  // Put additionally will create the record if none exists.
  router.put('/:classId', async (req, res) => {
    let data = req.body;
    let { classId } = req.params;
    let method = req.method;

    await tryCatchResponse(
      res,
      data,
      'updated',
      classes.updateOne,
      classId,
      method
    );
  });

  // TODO:FIXME:NOTE: Read note above PUT request.
  router.patch('/:classId', async (req, res) => {
    let data = req.body;
    let { classId } = req.params;
    let method = req.method;

    await tryCatchResponse(
      res,
      data,
      'updated',
      classes.updateOne,
      classId,
      method
    );
  });

  router.delete('/:classId', async (req, res) => {
    let { classId } = req.params;

    await tryCatchResponse(res, classId, 'deleted', classes.deleteOne);
  });

  return router;
};
