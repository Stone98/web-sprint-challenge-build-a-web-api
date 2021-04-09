const Project = require("../projects/projects-model"); // import projects model functions

// checks to see if project exists based on the id given
const validateProjectId = async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id); // searches for project
    if (!project) {
      // if project doesn't exists, sends error
      res.status(404).json({ message: "project not found" });
    } else {
      // if project exists, sets project to req.project and moves on
      req.project = project;
      next();
    }
  } catch (err) {
    // send error if there is an issue in the try
    next(err);
  }
};

// check to see if the correct req.body is sent to either insert or update a project
const validateProject = (req, res, next) => {
  if (!req.body) {
    // sends error if nothing provided in the req.body
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.description || !req.body.description.trim()) {
    // sends error if no description or description is not trimmed
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.name || !req.body.name.trim()) {
    // sends error if no name or name is not trimmed
    res.status(400).json({ message: "missing required name field" });
  } else {
    // moves on if all the above are true
    next();
  }
};

module.exports = {
  validateProjectId,
  validateProject,
};
