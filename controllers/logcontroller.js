const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const log = require('../db').import('../models/log');


router.get('/practice', validateSession, function (req, res) {
  res.send('Hey! This is a test route')
});




router.post('create', validateSession, (req, res) => {
  const logEntry = {
    title: req.body.log.title,
    date: req.body.log.date,
    entry: req.body.log.entry,
    owner: req.user.id
  }
  Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
});

router.get("/", (req, res) => {
  Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/mine', validateSession, (req, res) => {
  let userid = req.user.id
  Logs.findAll({
    where: { owner: userid }
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/:title', function (req, res) {
  let title = req.params.title;

  Log.findAll({
    where: { title: title }
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateLogEntry = {
    title: req.body.log.title,
    date: req.body.log.date,
    entry: req.body.log.entry
  };

  const query = {
    where: { id: req.params.entryId, owner: req.user.id }
  };
  Log.update(updateLogEntry, query)
    .then((Logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;