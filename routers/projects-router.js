const express = require("express");

const db = require("../data/helpers/projectModel");

// const validateId = require("../middlewares/validateID");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err: err.message }));
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err: err.message }));
});

function validateId(req, res, next) {
  const { id } = req.params;
  db.get(id)
    .then(post => {
      console.log("post", post);
      if (typeof post === "object") {
        if (!post) {
          return next("No project exists");
        }
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: "Invalid  ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Invalid  ID", err });
    });
}
module.exports = router;
