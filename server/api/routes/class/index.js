const express = require('express');
const classControl = require('../../controllers/class');

module.exports = (sqlite) => {
  const router = express.Router();
  const classes = classControl(sqlite.db);

  router.delete('/:id', (req, res) => {
    let { id } = req.params;
    classes
      .deleteOne(id)
      .then((result) => {
        if (result instanceof Error) throw result;
        res.send({ Response: `Record #${id} Deleted` });
      })
      .catch((err) => {
        // TODO: This needs to be configured better
        res.send(err.message);
      });
  });

  router.post('/', (req, res) => {
    // res.send({ Express: 'Class Post Route`' });
    let data = req.body;

    classes
      .writeOne(data)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get('/', (req, res) => {
    res.send({ Class: 'This is the Class root route' });
  });

  router.get('/:classId', async (req, res) => {
    let { classId } = req.params;

    let result = await classes.findOne(classId);

    if (result) res.send(result);
    else res.status(500).send('ERROR');
  });

  return router;
};
