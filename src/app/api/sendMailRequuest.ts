import { IUser } from "@/interfaces";
import axios from "axios";

const sendMail = async ({ user }: { user: IUser }) => {
  try {
    const response = await axios.post("/api/sendMail", {
      email: user.email,
      user: user.username,
    });

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendMail;
