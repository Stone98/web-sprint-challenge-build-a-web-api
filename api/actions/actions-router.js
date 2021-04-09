const router = require("express").Router(); // sets up actions router
const Action = require("./actions-model"); // imports actions model functions
const mw = require("../middleware/actions-middlewares"); // imports actions middlewares using a named import

// route to GET all actions
router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

// route to GET a action by its id
router.get("/:id", mw.validateActionId, (req, res) => {
  res.json(req.action);
});

// route to POST a new action
router.post("/", mw.validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

// route to PUT/UPDATE an existing action by using its id to find it
router.put("/:id", mw.validateActionId, mw.validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

// route to DELETE an existing action by using its id to find it
router.delete("/:id", mw.validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

// error handling middleware for errors that occur in actions router
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "something went wrong in the actions router",
  });
});

module.exports = router;
