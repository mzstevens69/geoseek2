const router = require("express").Router();
const Users = require("./users-model");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registers a user
router.post("/register", async(req, res) => {
  let { username, email, password } = req.body;

  try {

  const hash = bc.hashSync(password, 10);
  password = hash;

  const saved = await Users.add({
    username,
    email,
    password
  })
  
      res.status(201).json(saved);

  }  catch(error) {
      
      res.status(500).json(error);

  }
    
});

// logs in a user
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = generateToken(user);
        const user_id = user.id;
        const email = user.email;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, token, user_id, email });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

// Gets all users
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get all users" });
    });
});

// Gets user by id
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get user" });
    });
});

// Removes a user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete the user" });
    });
});

// Generates JWT
function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.JWT_SECRET || "letsQuest", options);
}

module.exports = router;
