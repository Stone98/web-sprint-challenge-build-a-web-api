const router = require("express").Router();
const Project = require("./projects-model");
const mw = require("../middleware/projects-middlewares");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", mw.validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", mw.validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

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

router.delete("/:id", mw.validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.get("/:id/actions", mw.validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the projects router",
  });
});

module.exports = router;
