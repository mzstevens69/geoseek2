const router = require('express').Router()
const Completed = require('./completed-model')

//GETS all completed gems

router.get("/", (req, res) => {
    Completed.getCompleted(req.query)
        .then(completes => {
            res.status(200).json(completes);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "🤪Error retrieving the completed gems❗️."
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
                  message: "The completed 🥺 gem with the specified ID does not exist❗️."
              });
          }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be retrieved❗️."
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
                message: "There was an error while saving the completed gem to the database."
            });
        })

});

//DELETE removes the completed gem with secific ID

router.delete('/:id', (req, res) => {
    Completed.remove(req.params.id)
    .then(remove => {
      if (remove)
        res.status(200).json(remove);
       else 
        res.status(404).json({ message: "The completed gem with the specified ID does not exist." });
      
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