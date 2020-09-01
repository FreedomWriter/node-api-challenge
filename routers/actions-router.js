const express = require("express");

const actionsDb = require("../data/helpers/actionModel");
const db = require("../data/helpers/projectModel");

const validateProjectId = require("../middlewares/validateID");
const validator = require("../middlewares/validator");

const router = express.Router({
  mergeParams: true
});

//nested route to get actions for a project
router.get("/", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res.status(500).json({
        success: false,
        error: "Could not get project actions.",
        errorMessage
      })
    );
});

//nested route to add actions to a project
router.post("/", validator("notes"), validator("description"), (req, res) => {
  const { id } = req.params;
  actionsDb
    .insert({ ...req.body, project_id: id })
    .then(project => res.status(200).json({ success: true, project }))
    .catch(err =>
      res.status(500).json({
        success: false,
        error: "Could not add project.",
        errorMessage
      })
    );
});

//nested route to get actions to a project
router.get("/", validateProjectId, (req, res) => {
  const { id } = req.params;
  actionsDb
    .get(id)
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res
        .status(500)
        .json({ success: false, errorMessage: "Could not get actions", err })
    );
});

//nested route to update actions on a project
router.put("/:actionsId", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { actionsId } = req.params;
  console.log(id, body, actionsId);
  actionsDb
    .update(actionsId, { ...req.body, project_id: id })
    .then(project => res.status(201).json({ success: true, project }))
    .catch(err =>
      res.status(500).json({
        success: false,
        error: "Could not update actions.",
        errorMessage
      })
    );
});

//nested route to delete actions on a project

router.delete("/:actionsId", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { actionsId } = req.params;
  console.log(id, body, actionsId);
  actionsDb
    .remove(actionsId)
    .then(project => res.status(201).json({ success: true, project }))
    .catch(err =>
      res.status(500).json({
        success: false,
        error: "Could not delete action.",
        errorMessage
      })
    );
});

module.exports = router;
