"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/selectors/authSelector";
import { useRouter } from "next/navigation";
import LoadingPage from "../_components/LoadingPage";

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

  if (init) {
    return (
      <div className="w-screen h-screen flex pt-20 overflow-hidden justify-center bg-[url('https://media.publit.io/file/Philippines-night-G.png')]">
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
        <Tabs defaultValue="login" className="w-[600px] z-[2] ">
          <TabsList className="grid w-full grid-cols-2 gap-4 bg-transparent">
            <TabsTrigger
              value="login"
              className="md:text-xl text-lg backdrop-blur data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="md:text-xl text-lg backdrop-blur data-[state=active]:bg-transparent data-[state=active]:text-primary"
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
