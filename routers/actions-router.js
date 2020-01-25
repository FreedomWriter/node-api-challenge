const express = require("express");

const db = require("../data/helpers/actionModel");

const validateActionsId = require("../middlewares/validateID");
const validateProjectId = require("../middlewares/validateID");
const validator = require("../middlewares/validator");

const router = express.Router();

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res
        .status(500)
        .json({ success: false, errorMessage: "Could not get actions", err })
    );
});

router.post("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  db.insert(body)
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res
        .status(500)
        .json({ success: false, errorMessage: "Could not add action", err })
    );
});

module.exports = router;
// const { id } = req.params;
// { ...req.body, user_id: id }
