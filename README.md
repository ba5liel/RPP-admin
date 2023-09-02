<p align="center">
  <h3 align="center">R-master Admin panel</h3>
  <p align="center">
  Let Bridge the gap!
  </p>
</p>

<br>
<br>

#### Step 1: Clone the repo

Fork the repository. then clone the repo locally by doing -

```sh
git clone https://github.com/rohitbakoliya/sieve.ai.git
```

#### Step 2: Install Dependencies

Install dependenices for Web-App

```sh
cd web-app/api
yarn install

cd ../client
yarn install
```
#### Step 3: Setup .env

To run the server you will also need to provide the `.env` variables

- create a new file .env in the root
- open [.env.EXAMPLE](./webapp/api/.env.example)
- copy the contents and paste it to the .env with valid keys
#### And you are good to go

```sh
cd web-app/api
yarn dev
```
## Technologies used

- Node
- Express
- MongoDB
- Typescript
- React
- Redux
- Ant Design
- Docker
