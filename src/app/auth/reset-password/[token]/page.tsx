"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import LoadingPage from "@/app/_components/LoadingPage";
import { resetPassword } from "@/app/api/authRequest";
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
import { useToast } from "@/hooks/use-toast";
import { authSelector } from "@/redux/selectors/authSelector";
import { useAppDispatch } from "@/redux/store";
import { ResetPassword } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLongArrowAltLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

const page = () => {
  const [init, setInit] = useState(false);

  const { token }: { token: string } = useParams();

  const { currentUser } = useSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      key: "snow",
      name: "Snow",
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        number: {
          value: 1000,
          density: {
            enable: true,
          },
        },
        color: {
          value: "#fff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 1,
        },
        size: {
          value: 10,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "bottom",
          straight: true,
        },
        wobble: {
          enable: true,
          distance: 10,
          speed: 10,
        },
        zIndex: {
          value: {
            min: 0,
            max: 100,
          },
          opacityRate: 10,
          sizeRate: 10,
          velocityRate: 10,
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, []);

  if (currentUser) {
    return <LoadingPage />;
  }

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<{
    newPassword: string;
    confirm: string;
  }>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      newPassword: "",
      confirm: "",
    },
  });

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleChangePassword = async (data: { newPassword: string }) => {
    try {
      await dispatch(resetPassword({ token, data })).unwrap();

      toast({
        variant: "success",
        title: "Successfully!",
        description: `Reset Password success`,
      });
      router.push("/auth");
      return reset();
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage,
      });
    }
  };

  if (init) {
    return (
      <div className="w-screen h-screen flex pt-20 overflow-hidden justify-center bg-[url('https://media.publit.io/file/Philippines-night-G.png')]">
        <div className="fixed top-10 left-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary text-size-2xl animation-normal underline underline-offset-4 data-[state=active] hover:text-primary-textOpacity"
          >
            <FaLongArrowAltLeft />
            Home
          </Link>
        </div>
        <Particles id="tsparticles" options={options} />
        <Tabs defaultValue="change-password" className="w-[600px] z-[2] ">
          <TabsContent
            value="change-password"
            className="backdrop-blur motion-translate-x-in-[-95%] motion-translate-y-in-[0%] sm:p-auto p-0"
          >
            <Card className="bg-transparent text-primary">
              <CardContent>
                <CardHeader>
                  <CardTitle className="text-center md:text-2xl text-xl">
                    Reset Password
                  </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={`${showNewPassword ? "text" : "password"}`}
                          placeholder=". . ."
                          autoComplete="newPassword"
                          {...register("newPassword")}
                        />
                        <span
                          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                      </div>
                      <span className="text-red-500 text-sm">
                        {formState.errors?.newPassword?.message}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirm">Confirm new password</Label>
                      <div className="relative">
                        <Input
                          id="confirm"
                          type={`${showConfirm ? "text" : "password"}`}
                          placeholder=". . ."
                          autoComplete="confirm"
                          {...register("confirm")}
                        />
                        <span
                          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                      </div>
                      <span className="text-red-500 text-sm">
                        {formState.errors?.confirm?.message}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-4">
                    <Button variant={"four"}>Confirm</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
};

export default page;
