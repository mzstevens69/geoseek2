[![Maintainability](https://api.codeclimate.com/v1/badges/8651f9cbb6925a1a2baa/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/geoseek-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8651f9cbb6925a1a2baa/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/geoseek-be/test_coverage)

# API Documentation

## Backend delpoyed at 😈HEROKU (https://geoseek-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Backend framework

- Express is a quick framework of Nodejs and was used for a quick start so that the app could get released to users as soon as possible for feedback as well as it's adaptability and accessibility to middleware.
- PostgreSQl was used for scalibility  and built in features for data integrity and fault tolerant at any dataset size.
- Knex was used as our query builder as it couples with Express nodejs well and would allow for quick deployment to amp up the release of app to users for feedback.

## Endpoints

### Use before all Endpoints   (https://geoseek-be.herokuapp.com/) 

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/api/users/register`        | all guests/users           | Creates a new user, id auto increments               |
| POST    | `/api/users/login`    | users with a created account | Expects a user object to compare with database             |
| GET    | `/api/users`        | users | Returns a list of all users' id and usernames.                    |
| GET   | `/api/users/:id` | users                | Returns the user with the specified id |
| DELETE | `/api/users/:userId`        | users | Deletes the user with the specified id                                          |

#### Gem Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/gems` | all guests/users      | Creates a new gem |
| POST    | `/api/gems/findNearby` | all guests/users      | Finds Gems near you accepting a Longitude, Latitude and Threshold |
| GET    | `/api/gems` | all guests/users         | Returns a list of all the gems             |
| GET | `/api/gems/:id` | all guests/users         | Returns a gem with the specified id  
| GET | `/api/gems/byUser/:id` | users         | Returns a gem with the specified users id                    |
| PUT | `/api/gems/:id` | users         | Expects an id along with a changed object.  Updates gem with specified id                      |
| DELETE | `/api/gems/:id` | users         | Deletes the gem with the specified id                      |

#### Completed Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/completed` | users must be logged in     | Marks a gem as completed, expects a completed object |
| GET    | `/api/completed` | users must be logged in        | Returns a list of all the completed gems             |
| GET | `/api/completed/:id` | users must be logged in        | Returns a completed gem with the specified id                      |
 GET | `/api//completedByUser/:id` | users  must be logged in       | Returns a completed gems by user id                       |
  GET | `/api/completed/completedByGemId/:id` | users must be logged in        | Returns  completed gems by Gem id                      |
| DELETE | `/api/completed/:id` | users must be logged in        | Deletes the completed gem with the specified id                      |

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

```{
    id: auto incrementing
    username: STRING
    email: STRING
    password: STRING
  
```

## Gems

---

```{
    id: auto incrementing
    created_by_user: INTEGER
    longitude: FLOAT
    latitude: FLOAT
    difficulty: INTEGER
    description: TEXT
  
```

## Completed

---

```{
    id: auto incrementing
    gem_id: INTEGER
    completed_at: timestamped
    completed_by: INTEGER
    difficulty: INTEGER
    comments: TEXT
  
```

## Photo Clues

---

```{
      id: auto incrementing
      name: STRING
      description: STRING
      gem_id: INTEGER
      photo_url: STRING
  
```

# Information About Constraints

```{
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
```

## Actions

`find()` --> Returns User with Id, username, email

`findById(id)` --> Returns a single user by Id

`add()` --> Returns the created user

`findBy(filter)` --> Update an organization by Id

`remove(id)` --> Delete a user by Id
<br>
<br>
<br>

`addGem()` --> if no param all users

`updateGem(Id)` --> Passed an object it updates object by it's Id

`findGems()` --> Returns all Gems

`findById(Id)` --> Finds a gem by the Id

`findGemsByUserId()` --> Returns gems that were created by the User Id.

`findGemsByDistance()` --> Returns gems that are closest to user by a threshold

`deleteGem(Id)` --> deletes gem
<br>
<br>
<br>

`insert()` --> add a completed gem

`findById(Id)` --> finds a completed by completed Id

`getCompleted()` --> all completed in the completed table

`getCompletedByUser(Id)` --> Gets Completed Gems by specific User

`getCompletedByGemId(Id)` --> Gets Completed Gems by Id

`remove(Id)` --> deletes completed gem

<br>
<br>
<br>

`findPhotoByGem(Id)` --> Returns photo by gem Id

`createPhoto()` --> adds a photo to a gem

`findAll()` --> returns all photos in the table

`editPhoto()` --> Passed an object it updates object by it's Id

`destroy()` --> deletes a photo

## Environment Variables

In order for the app to function correctly, the user ✏️ must set up their own environment variables.

create a .env file that includes the following:

```{
      HOST
      DATABASE
      USER
      PASSWORD
      NODE_ENV - set to "development" until ready for "production"

```

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

See [Frontend Documentation](https://github.com/Lambda-School-Labs/geoseek-fe/blob/master/README.md) for details on the fronend of our project.
See [IOS Documentation](https://github.com/Lambda-School-Labs/geoseek-iOS/blob/master/README.md) for details on the IOS project.
