module.exports = function validateId() {
  return (req, res, next) => {
    db.get(req.params.id)
      .then(project => {
        if (project) {
          //   res.status(200).json(project);
          // assigning the value returned from the promise (project) to a key value pair on the req object (req.project = project)
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch(error => {
        // log error to server
        res.status(500).json({
          message: "Error retrieving the Project",
          error: error.message
        });
      });
  };
};
