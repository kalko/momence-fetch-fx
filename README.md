# Momence fetch FX

## Overview

Simple REST API which can be used to fetch FX rates published by CNB.
Application is persisting the rates into database.

Application is currently available here: `https://momence-fetch-fx.up.railway.app`

- **Endpoints:**

Applications provides following endpoints to 'fetch & store', 'get' the rates:

- `POST /update/latest`: Updates current day rates => fetches and stores the data.
- `POST /update/:date`: Updates rates for specified date => fetches and stores the data.
- `GET /rates`: List all rates.
- `GET /rates/:date`: List rates for sepcified date.

- **Exemples:**

  - `https://momence-fetch-fx.up.railway.app/rates/`
  - `https://momence-fetch-fx.up.railway.app/rates/2024-10-11`

## Usage

- To update the rates use postmant or curl on any other tool capable of making POST requsts.
- To list the rates use any web browser or any other tool capable of making GET requetes.

## Setup

To use and run the application do the following :

- git clone `https://github.com/kalko/momence-fetch-fx.git`
- cd momence-fetch-fx
- docker-compose up --build or npm start (make sure your docker is running or you have mongodb installed localy)

Application is now running `http://localhost:3010`
