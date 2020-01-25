const express = require("express");

const db = require("../data/helpers/projectModel");

const validateProjectId = require("../middlewares/validateID");
const validator = require("../middlewares/validator");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err: err.message }));
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err: err.message }));
});

router.post("/", validator("name"), validator("description"), (req, res) => {
  db.insert(req.body)
    .then(project => res.status(200).json({ success: true, project }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id, body);
  db.update(id, body)
    .then(project => res.status(201).json({ success: true, project }))
    .catch(err => res.status(500).json({ success: false, error: err }));
});
module.exports = router;
