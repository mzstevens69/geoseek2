const router = require("express").Router();
const Completed = require("./completed-model");

// GET all completed gems by Completed_by

router.get("/completedByUser/:id", (req, res) => {
  Completed.getCompletedByUser(req.params.id)
    .then(completeUser => {
      if (!completeUser) {
        res.status(404).json({
          Errormessage: "🔷 User hasn't completed any gems 🔹"
        });
      } else {
        res.status(200).json(completeUser);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "🤪Error retrieving the completed gems 🔹 by User❗."
      });
    });
});

// GET Completed gems by gem_id

router.get("/completedByGemId/:id", (req, res) => {
  Completed.getCompletedByGemId(req.params.id)
    .then(completeGem => {
      if (!completeGem) {
        res
          .status(404)
          .json({ Errormessage: " The gem has not been completed" });
      } else {
        res.status(200).json(completeGem);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "🤪Error retrieving the gem by id❗."
      });
    });
});

//GETS all completed gems

router.get("/", (req, res) => {
  Completed.getCompleted(req.query)
    .then(completes => {
      res.status(200).json(completes);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "🤪 Error retrieving the completed gems 🔹."
      });
    });
});

// GET a completed gem by  Id

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Completed.findById(id)
    .then(complete => {
      if (complete) {
        res.status(200).json(complete);
      } else {
        res.status(404).json({
          message:
            "The completed 🥺 gem with the specified ID does not exist❗️."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The gem 🔹 information could not be retrieved❗️."
      });
    });
});

//POST creates a completed gem

router.post("/", (req, res) => {
  Completed.insert(req.body)
    .then(ins => {
      res.status(201).json(ins);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message:
          "There was an error while saving the completed gem to the database."
      });
    });
});

//DELETE removes the completed gem with secific ID

router.delete("/:id", (req, res) => {
  Completed.remove(req.params.id)
    .then(remove => {
      if (remove) res.status(200).json(remove);
      else
        res.status(404).json({
          message: "The completed gem with the specified ID does not exist."
        });
    })
    .catch(error => {
      // log error in database
      console.log(error);
      res.status(500).json({
        error: "The completed gem could not be removed⚠️"
      });
    });
});

module.exports = router;
