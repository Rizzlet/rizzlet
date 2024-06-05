# Rizzlet
[![CI](https://github.com/Rizzlet/rizzlet/actions/workflows/ci.yaml/badge.svg)](https://github.com/Rizzlet/rizzlet/actions/workflows/ci.yaml)
[![Frontend](https://github.com/Rizzlet/rizzlet/actions/workflows/azure-static-web-apps-icy-rock-018e11d1e.yml/badge.svg)](https://github.com/Rizzlet/rizzlet/actions/workflows/azure-static-web-apps-icy-rock-018e11d1e.yml)
[![Backend](https://github.com/Rizzlet/rizzlet/actions/workflows/main_rizzlet.yml/badge.svg)](https://github.com/Rizzlet/rizzlet/actions/workflows/main_rizzlet.yml)

Check out our [Deployed Frontend](https://icy-rock-018e11d1e.5.azurestaticapps.net/)! And here is our [Backend](https://rizzlet.azurewebsites.net/)

### Design

Technical Spec - [Link](https://docs.google.com/document/d/1pt8KaxrR4H4lkDkm3iwLrpPXjrTpsPzHESjQOSDFHxA/edit?usp=sharing)

## Contributing

### Install Dependencies

In both `frontend/` and `backend/` run:

```
npm install
```

### Run Locally

The environment variables must be set in order for Rizzlet to function. In both `backend/` and `frontend/` please copy .env.sample to .env and
fill out the variables. This involves creating a Google project to enable Oauth and deploying a MongoDB instance. As well as getting the URL to
the backend/frontend.

In `frontend/` run:

```
npm start
```

In `backend/` run:

```
npm start
```

### Testing

To run the unit tests, run in both `frontend/` and `backend/`: 
```
yarn test
```

### Code Style

Please install the recommended VSCode extensions to automatically style the code.

Go to the extensions tab on the left, scroll down and install all workspace recommended extensions
