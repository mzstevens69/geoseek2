[![Maintainability](https://api.codeclimate.com/v1/badges/8651f9cbb6925a1a2baa/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/geoseek-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8651f9cbb6925a1a2baa/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/geoseek-be/test_coverage)

# API Documentation

## Backend delpoyed at 😈HEROKU (https://geoseek-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## Endpoints

### Use before all Endpoints  🤡 (https://geoseek-be.herokuapp.com/) 🤡

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/api/users/register`        | all guests/users           | Creates a new user, id auto increments               |
| POST    | `/api/users/login`    | users with a created account | Expects a user object to compare with database             |
| GET    | `/api/users`        | all guests/users | Returns a list of all users' id and usernames.                    |
| GET   | `/api/users/:id` | all guests/users                | Returns the user with the specified id |
| DELETE | `/api/users/:userId`        | all guests/users | Deletes the user with the specified id                                          |

#### Gem Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/gems` | all guests/users      | Creates a new gem |
| POST    | `/api/gems/findNearby` | all guests/users      | Finds Gems near you accepting a Longitude, Latitude and Threshold |
| GET    | `/api/gems` | all guests/users         | Returns a list of all the gems             |
| GET | `/api/gems/:id` | all guests/users         | Returns a gem with the specified id                      |
| PUT | `/api/gems/:id` | all guests/users         | Expects an id along with a changes object.  Updates gem with specified id                      |
| DELETE | `/api/gems/:id` | all guests/users         | Deletes the gem with the specified id                      |

#### Completed Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/completed` | all guests/users      | Marks a gem as completed, expects a completed object |
| GET    | `/api/completed` | all guests/users         | Returns a list of all the completed gems             |
| GET | `/api/completed/:id` | all guests/users         | Returns a completed gem with the specified id                      |
 GET | `/api//completedByUser/:id` | all guests/users         | Returns a completed gems by user id                       |
  GET | `/api/completed/completedByGemId/:id` | all guests/users         | Returns  completed gems by Gem id                      |
| DELETE | `/api/completed/:id` | all guests/users         | Deletes the completed gem with the specified id                      |

#### Photo Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/photo/add/:gemId` | all guests/users      | Adds a photo based on the gemId |
| GET    | `/api/photo` | all guests/users         | Returns all the photo that as uploaded             |
| GET    | `/api/photo/:gemId` | all guests/users         | Returns the photo url based on the gemId           |
| PUT | `/api/photo/edit` | all guests/users         |  Updates name, description, and photo_url               |
| DELETE | `/api/photo/delete/:id` | all guests/users         | Deletes the photo with the specified id                      |

# Data Model

## Users

---

```
{
  id: auto incrementing
  username: STRING
  email: STRING
  password: STRING
}
```



## Gems

---

```
{
  id: auto incrementing
  created_by_user: INTEGER
  longitude: FLOAT
  latitude: FLOAT
  difficulty: INTEGER
  description: TEXT
}
```

## Completed

---

```
{
  id: auto incrementing
  gem_id: INTEGER
  completed_at: timestamped
  completed_by: INTEGER
  difficulty: INTEGER
  comments: TEXT
}
```

## Photo Clues

---

```
{
  id: auto incrementing
  name: STRING
  description: STRING
  gem_id: INTEGER
  photo_url: STRING
}
```

# Information About Constraints

        USERS
        username: is required and unique       
        email: is required
        password: is required

        GEMS
        title: is required 255 max characters    
        createdByUser: is required and foreign key to users table
        longitude: is required
        latitude: is required
        difficulty: is required
        description: 150 max characters


        PHOTO CLUES
        name: is not required 255 max characters
        description: is not required 255 max characters     
        gemId: is required foreign key to gems
        photoUrl: is required

        COMPLETED GEM
        gemId: is required foreign key to gems
        completedAt: adds timestamp
        completedBy:  is required foreign key to users
        comments: not required 150 max characters

## Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getUsers()` -> Returns all Users

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>

`getUsers(Id)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user ✏️ must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app

    * Postgres local deployed .env variables database.
      HOST
      DATABASE
      USER
      PASSWORD

    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.

Making a change.
