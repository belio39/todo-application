import express from "express";

const app = express();

import emailService from "./emailServices/email";

const run = async () => {
  await emailService();
};
run();
app.listen(7050, () => {
  console.log("App listening to the server");
});
