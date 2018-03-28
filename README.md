# Git Server

This project features a simple git server and API built around it that allows users
to create, push, pull and read information about the repo.

## Gettings started

1.  Install dependecies `yarn`
2.  Start server `yarn start` (or alternatively start in devmode with `yarn dev`)

## Routes

### Git

Git repos are accessed via http on `/:user/:repo.git`

### Browse API

* `POST /api/:user/:repo` - create a new repo for the user
* `GET /api/:user` - list the user's repos
* `GET /api/:user/:repo` - list commits on the repo
* `GET /api/:user/:repo/:path` - list files at path

### View file contents

* `GET /raw/:user/:repo/:commit/:path` - View/download the file contents

## License

MIT
