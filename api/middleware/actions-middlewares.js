const Action = require("../actions/actions-model"); // import action model functions

// checks to see if action exists based on the id given
const validateActionId = async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id); // searches for action
    if (!action) {
      // if action doesn't exists, sends error
      res.status(404).json({ message: "action not found" });
    } else {
      // if action exists, sets action to req.action and moves on
      req.action = action;
      next();
    }
  } catch (err) {
    // send error if there is an issue in the try
    next(err);
  }
};

// check to see if the correct req.body is sent to either insert or update an action
const validateAction = (req, res, next) => {
  if (!req.body) {
    // sends error if nothing in req.body
    res.status(400).json({ message: "missing action data" });
  } else if (!req.body.description || !req.body.description.trim()) {
    // sends error if no description or description is not trimmed
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.notes || !req.body.notes.trim()) {
    // sends error if no notes or notes are not trimmed
    res.status(400).json({ message: "missing required notes field" });
  } else if (!req.body.project_id) {
    // sends error if there is no project_id provided
    res.status(400).json({ message: "missing required project_id field" });
  } else {
    // moves on if all the above are true
    next();
  }
};

module.exports = {
  validateActionId,
  validateAction,
};
