import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";

import sendMail from "../helper/Email";

const emailService = async () => {
  ejs.renderFile(
    "./template/registration.ejs",
    { name: "Dennis" },
    async (error, data) => {
      const mailoptions = {
        from: process.env.EMAIL as string,
        to: "beliorotich@gmail.com",
        subject: "Test Sending Email",
        text: "Hello from Server Side!",
        html: data,
      };
      try {
        await sendMail(mailoptions);
        console.log("Successs");
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export default emailService;
