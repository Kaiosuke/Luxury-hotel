import {
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 587,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const sendMailController = {
  sendInfo: async (req, res) => {
    try {
      const { email, user } = req.body;
      const info = await transporter.sendMail({
        from: "Luxury Hotel <noreply@luxuryhotel.com>",
        to: email,
        subject: "Booking Hotel success",
        text: `Hello ${user}, your booking was successful!`,
        html: `
      <div>
        <p>Dear Mr/Mrs. ${user}</p>
        <p>Hope this message finds you well.</p>
        <p>I’m CEO, from Luxury Hotel reservation department</p>
        <p>Thank you for your reservation.</p>
        <p>If you have any questions, please do not hesitate to contact us at <a href="mailto:trongleele@gmail.com">trongleele@gmail.com</a></p>
          <div>
            <img src="https://res-console.cloudinary.com/dyjvnhq5s/media_explorer_thumbnails/5ccbfe131e1a3ff6b79f89f127a90509/detailed" style="max-width: auto; height: 100px; border-radius: 8px; " />
            <img src="https://res-console.cloudinary.com/dyjvnhq5s/media_explorer_thumbnails/6cbdf910210fc79600c7446df4982cb5/detailed" style="max-width: auto; height: 100px; border-radius: 8px;" />
        </div>
        </div>
      `,
      });
      return handleSuccess200(res, info);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default sendMailController;
