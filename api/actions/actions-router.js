const router = require("express").Router();
const Action = require("./actions-model");
const mw = require("../middleware/actions-middlewares");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", mw.validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", mw.validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", mw.validateActionId, mw.validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", mw.validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the actions router",
  });
});

module.exports = router;
