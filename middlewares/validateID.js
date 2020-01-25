const db = require("../data/helpers/projectModel");
const actiondb = require("../data/helpers/actionModel");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  db.get(id)
    .then(post => {
      console.log("post", post);
      if (typeof post === "object") {
        if (!post) {
          return next(`No project exists with the id of ${id}`);
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

function validateActionId(req, res, next) {
  const { id } = req.params;
  actiondb
    .get(id)
    .then(post => {
      console.log("post", post);
      if (typeof post === "object") {
        if (!post) {
          return next(`No project exists with the id of ${id}`);
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

(module.exports = validateProjectId), validateActionId;
