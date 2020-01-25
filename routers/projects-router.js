const express = require("express");

const db = require("../data/helpers/projectModel");

const validateProjectId = require("../middlewares/validateID");
const validator = require("../middlewares/validator");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err =>
      res
        .status(500)
        .json({
          success: false,
          error: "Could not delete projects.",
          errorMessage
        })
    );
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err =>
      res
        .status(500)
        .json({ success: false, error: "Could not get project.", errorMessage })
    );
});

router.post("/", validator("name"), validator("description"), (req, res) => {
  db.insert(req.body)
    .then(project => res.status(200).json({ success: true, project }))
    .catch(err =>
      res
        .status(500)
        .json({ success: false, error: "Could not add project.", errorMessage })
    );
});

router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id, body);
  db.update(id, body)
    .then(project => res.status(201).json({ success: true, project }))
    .catch(err =>
      res
        .status(500)
        .json({
          success: false,
          error: "Could not update project.",
          errorMessage
        })
    );
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removed => res.status(201).json({ success: true, removed }))
    .catch(err =>
      res
        .status(500)
        .json({
          success: false,
          error: "Could not delete project.",
          errorMessage
        })
    );
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res
        .status(500)
        .json({
          success: false,
          error: "Could not get project actions.",
          errorMessage
        })
    );
});

module.exports = router;
