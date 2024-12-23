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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TabsContent
      value="login"
      className="backdrop-blur motion-translate-x-in-[-95%] motion-translate-y-in-[0%] sm:p-auto p-0"
    >
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center md:text-2xl text-xl">
              Login
            </CardTitle>
          </CardHeader>
          <form>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <span className="text-red-500 ml-10"></span>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder=". . ."
                />
                <span className="text-red-500"></span>
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <span className="text-red-500 ml-10"></span>
                <Input
                  id="password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder=". . ."
                  className="relative"
                />
                <span
                  className="absolute top-8 right-2 cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </CardContent>
            <CardFooter className="mt-4">
              <Button variant={"four"}>Signin</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Login;
