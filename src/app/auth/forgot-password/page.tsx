"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import LoadingPage from "@/app/_components/LoadingPage";
import { forgotPassword } from "@/app/api/authRequest";
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
import { ForgotPassword } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const page = () => {
  const [init, setInit] = useState(false);

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

  const { register, handleSubmit, formState, reset } = useForm<{
    email: string;
  }>({
    resolver: zodResolver(ForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: `Please check your email`,
      });
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
            href="/auth"
            className="flex items-center gap-2 text-primary text-size-2xl animation-normal underline underline-offset-4 data-[state=active] hover:text-primary-textOpacity"
          >
            <FaLongArrowAltLeft />
            Login
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
                    Forgot Password
                  </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(handleForgotPassword)}>
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
                  </CardContent>
                  <CardFooter className="mt-4">
                    <Button variant={"four"}>Send</Button>
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
