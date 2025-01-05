import { IUser } from "@/interfaces";
import axios from "axios";

const sendMail = async ({ user }: { user: IUser }) => {
  try {
    const res = await axios.post("/api/sendMail", {
      email: user.email,
      user: user.username,
    });
    return res;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendMail;
