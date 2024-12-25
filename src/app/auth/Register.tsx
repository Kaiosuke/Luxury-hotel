import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ERole, IUser } from "@/interfaces";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { handleSubmit, formState, register } = useForm<IUser>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      role: ERole.user,
      password: "",
      confirm: "",
    },
  });

  const handleGetData = (data: IUser) => {
    (async () => {})();
  };
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
          <form onSubmit={handleSubmit((data) => handleGetData(data))}>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  placeholder=". . ."
                  {...register("username")}
                  autoComplete="username"
                />
                <span className="text-red-500 text-base">
                  {formState.errors?.username?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder=". . ."
                  {...register("email")}
                  autoComplete="email"
                />
                <span className="text-red-500 text-base">
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
                    {...register("password")}
                    autoComplete="new-password"
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                <span className="text-red-500 text-base">
                  {formState.errors?.password?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={`${confirm ? "text" : "password"}`}
                    placeholder=". . ."
                    {...register("confirm")}
                    autoComplete="new-password"
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg"
                    onClick={() => setConfirm(!confirm)}
                  >
                    {confirm ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                <span className="text-red-500 text-base">
                  {formState.errors?.confirm?.message}
                </span>
              </div>

              <Button type="submit" variant={"four"}>
                Register
              </Button>
            </CardContent>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Register;
