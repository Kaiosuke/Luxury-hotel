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
import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/interfaces";

import { useAppDispatch } from "@/redux/store";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login } from "../api/authRequest";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<IUser>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleLogin = async (data: IUser) => {
    try {
      await dispatch(login(data)).unwrap();
      router.push("/");
      return toast({
        variant: "success",
        title: "Successfully!",
        description: `Login success`,
      });
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    }
  };

  return (
    <TabsContent
      value="login"
      className="backdrop-blur motion-translate-x-in-[-95%] motion-translate-y-in-[0%] sm:p-auto p-0"
    >
      <Card className="bg-transparent text-primary">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center md:text-2xl text-xl">
              Login
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(handleLogin)}>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=". . ."
                  autoComplete="email"
                  {...register("email")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors?.email?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder=". . ."
                    autoComplete="password"
                    {...register("password")}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                <span className="text-red-500 text-sm">
                  {formState.errors?.password?.message}
                </span>
              </div>

              <Link
                href="#!"
                className="text-sm underline underline-offset-2 italic hover:text-primary-textOpacity"
              >
                Forgot your password?
              </Link>
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
