# My Code Library

## Description

<br>

Code library creation for organization and easy reuse of code created in other projects in different programming languages.

<hr>
<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage to log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add my code files.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **edit user** - As a user I want to be able to create, edit and delete my files.
- **result** - As a user I want to see the list of code files filter by my programming languages.

<hr>
<br>

## Server Routes (Back-end):

| **Method** | **Route**           | **Description**                                                                | Request - Body                             |
| ---------- | ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| `GET`      | `/`                 | Main page route. Renders home `index` view.                                    |                                            |
| `GET`      | `/login`            | Renders `login` form view.                                                     |                                            |
| `POST`     | `/login`            | Sends Login form data to the server.                                           | { email, password }                        |
| `GET`      | `/signup`           | Renders `signup` form view.                                                    |                                            |
| `POST`     | `/signup`           | Sends Sign Up info to the server and creates user in the DB.                   | { username, email, password }              |
| `GET`      | `/workspace`        | Private route. Renders `workspace` form view.                                  |                                            |
| `POST`     | `/workspace`        | Private route. Sends workspace info to server and updates user codeFile in DB. | { language, title, code, image }           |
| `GET`      | `/createCode`       | Private route. Renders /viewCode` view.                                        |                                            |
| `POST`     | `/createCode`       | Private route. Adds a new CodeFile for the current user.                       | { language, title, code, image }           |
| `DELETE`   | `/viewCode/:codeId` | Private route. Deletes the existing CodeFile from the current user.            |                                            |
| `GET`      | `/editCode`         | Renders `workspace` view.                                                      |                                            |
| `POST`     | `/editCode`         | Private route. Edit a current CodeFile.                                        | { language, title, code, image }           |
| `GET`      | `/viewCode/:codeId` | Renders `viewCode` view for the particular codeFile.                           |                                            |
| `GET`      | `/profile`          | Renders `profile` view for the particular user.                                | { username, profession, interests, image } |
| `POST`     | `/profileEdit`      | Private route. Edit the profile for the current user.                          | { language, title, code, image }           |

## Models

User model

```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
  }
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address']
  }
  password: {
    type: String,
    required: true,
  }
  image: {
   type: String,
   default: '',
}
```

codeFile model

```javascript
{
  language: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: [id],
    required: true,
  },
  image: {
    type: [String],
    default: '',
  },
}
```

compile model

```javascript
{
  language: {
    type: [String],
    required: true,
  },
  code: {
    type: [id],
    required: true,
  }
}
```

## API's

## Packages

ExpressJS

NodeJS

MongoDB

## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)

## Links

## Git

The url to your repository and to your deployed project

https://github.com/LippoKo/Project2

https://codelibrary2.herokuapp.com/

## Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

## Contributors

Luiz Lima - https://github.com/LippoKo - https://www.linkedin.com/in/luiz-limm/

Adriana Leitão - https://github.com/AdrianaLeitao - https://www.linkedin.com/in/adriana-cbleitao
