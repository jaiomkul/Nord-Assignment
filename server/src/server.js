require("dotenv").config();

const app = require("./index");

const connect = require("./configs/db");
const port = process.env.PORT || 4040;

app.listen(port, async function () {
  await connect();
  console.log(`Listing on port ${port}`);
});
