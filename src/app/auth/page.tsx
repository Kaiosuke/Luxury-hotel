"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";
import { FaLongArrowAltLeft, FaRegEye } from "react-icons/fa";
import Register from "./Register";
import Login from "./Login";
import Link from "next/link";

const page = () => {
  const [init, setInit] = useState(false);

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

  if (init) {
    return (
      <div className="w-screen h-screen flex pt-52 justify-center bg-[url('https://media.publit.io/file/Philippines-night-G.png')]">
        <div className="fixed top-10 left-10">
          <Link
            href="/home"
            className="flex items-center gap-2 text-primary text-size-2xl animation-normal underline underline-offset-4 data-[state=active] hover:text-primary-textOpacity"
          >
            <FaLongArrowAltLeft />
            Home
          </Link>
        </div>
        <Particles id="tsparticles" options={options} />
        <Tabs defaultValue="login" className="w-[600px] z-[2] text-primary">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger
              value="login"
              className="md:text-xl text-lg backdrop-blur animation-normal opacity-50 data-[state=active]:opacity-100 hover:opacity-100"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="md:text-xl text-lg backdrop-blur animation-normal opacity-50 data-[state=active]:opacity-100 hover:opacity-100"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <Login />
          <Register />
        </Tabs>
      </div>
    );
  }
};

export default page;
