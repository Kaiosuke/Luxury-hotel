import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <TabsContent
      value="register"
      className="backdrop-blur motion-translate-x-in-[95%] motion-translate-y-in-[0%] sm:p-auto p-0"
    >
      <Card className="bg-transparent text-primary">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center md:text-2xl text-xl">
              Register
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="username" name="username" placeholder=". . ." />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="email" name="email" placeholder=". . ." />
            </div>
            <div className="space-y-1 relative">
              <Label htmlFor="password">Password</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder=". . ."
              />
              <span
                className="absolute top-1/2 right-2 cursor-pointer text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            <div className="space-y-1 relative">
              <Label htmlFor="confirm">Confirm Password</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="confirm"
                name="confirm"
                type={`${confirm ? "text" : "password"}`}
                placeholder=". . ."
              />
              <span
                className="absolute top-1/2 right-2 cursor-pointer text-lg"
                onClick={() => setConfirm(!confirm)}
              >
                {confirm ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button variant={"four"}>Register</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Register;
