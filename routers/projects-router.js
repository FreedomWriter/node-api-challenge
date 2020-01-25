const express = require("express");

const db = require("../data/helpers/projectModel");
const actionsDb = require("../data/helpers/actionModel");

const validateProjectId = require("../middlewares/validateID");
const validator = require("../middlewares/validator");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err =>
      res.status(500).json({
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
      res.status(500).json({
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
      res.status(500).json({
        success: false,
        error: "Could not delete project.",
        errorMessage
      })
    );
});

//nested route to get actions for a project
router.get("/:id/actions", validateProjectId, (req, res) => {
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
router.post(
  "/:id/actions",
  validator("notes"),
  validator("description"),
  (req, res) => {
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
  }
);

//nested route to get actions to a project
router.get("/:id/actions", validateProjectId, (req, res) => {
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
router.put("/:id/actions/:actionsId", validateProjectId, (req, res) => {
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

router.delete("/:id/actions/:actionsId", validateProjectId, (req, res) => {
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
