const router = require("express").Router(); // sets up router
const Project = require("./projects-model"); // imports projects model functions
const mw = require("../middleware/projects-middlewares"); // imports projects middlewares using a named import

// route to GET all projects
router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

// route to GET a project by its id
router.get("/:id", mw.validateProjectId, (req, res) => {
  res.json(req.project);
});

// route to POST a new project
router.post("/", mw.validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

// route to PUT/UPDATE an existing project by using its id to find it
router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProject,
  (req, res, next) => {
    Project.update(req.params.id, req.body)
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
);

// route to DELETE an existing project by using its id to find it
router.delete("/:id", mw.validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

// route to GET all the actions of an existing project by using its id to find them
router.get("/:id/actions", mw.validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

// error handling middleware for errors that occur in projects router
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the projects router",
  });
});

module.exports = router;
