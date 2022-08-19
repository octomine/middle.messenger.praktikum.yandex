const express = require("express");

const app = express();
const PORT = 80;

app.use(express.static("./dist"));
app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port: ${process.env.PORT || PORT}`);
});
