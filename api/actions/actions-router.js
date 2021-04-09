const router = require("express").Router();
const Action = require("./actions-model");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", (req, res) => {
  res.json(req.action);
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
