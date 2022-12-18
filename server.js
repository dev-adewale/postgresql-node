/* Import express */
const express = require("express");

/* Import router */
const router = require("./routes/router");

/* Initialize express instance */
const app = express();

/* Parse incoming POST request */
app.use(express.json());

/* Route requests */
app.use("/", router);

/* Listen to server on localhost */
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
