"use client";
import { Button } from "@/utils";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Navbar: FC = () => {
  const datamenu = ["Overview", "Features", "Customers", "Pricing"];
  const router = useRouter();

  const [hashValue, setHashValue] = useState("");

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    setHashValue(
      window.location.hash === ""
        ? "#overview"
        : window.location.hash.toLowerCase()
    );
    handleClickScroll("");
  }, []);

  const [device, setDevice] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Android/i)) {
      setDevice("Android");
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      setDevice("iOS");
    } else if (userAgent.match(/Windows/i)) {
      setDevice("Windows");
    } else if (userAgent.match(/Mac/i)) {
      setDevice("Mac");
    } else {
      setDevice("Unknown");
    }
  }, []);

  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const info = {
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform,
        language: window.navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      };
      setDeviceInfo(info);
    };

    fetchData();
  }, []);

  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const platform = window.navigator.platform;
      setDeviceName(platform);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const hash = hashValue.substring(1);
    if (hash) {
      const element = document.getElementById("id_" + hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [hashValue]);

  return (
    <nav
      className='w-full max-h-min px-1 flex flex-row items-center justify-between 
    overflow-clip gap-2 border-b-[0px] border-gray-300 absolute  
    backdrop-filter backdrop-blur-lg  z-10'>
      <div
        className='flex flex-col items-start space-y-[-10px] text-lg cursor-pointer  '
        onClick={() => {
          router.push("/");
        }}>
        <span>TTT |</span>
        <span className='nowrap'>| Tic Tac Toe</span>
      </div>

      {/* <div className='flex items-baseline pb-1 flex-grow self-end relative'>
        <div className='flex items-baseline space-x-[0.5rem] px-[1rem] flex-grow self-end'>
          {datamenu?.map((section, i) => (
            <a
              key={i}
              href={`#${section.toLowerCase()}`}
              className={`w-[6rem] ${
                hashValue === `#${section.toLowerCase()}`
                  ? " text-[#0077ff] text-shadow-blue"
                  : " text-[#878787] border-[#FFFFFF00] hover:text-white hover:border-white hover:scale-102 text-shadow-hover-white"
              }  text-lg font-medium text-center`}
              onClick={() => {
                setHashValue(`#${section.toLowerCase()}`);
              }}>
              {section}
            </a>
          ))}
        </div>
        <motion.div
          animate={{
            x: `${
              1 +
              datamenu
                ?.map((info) => "#" + info?.toLocaleLowerCase())
                ?.indexOf(hashValue) *
                6.5
            }rem`,
          }}
          style={{
            width: "6rem",
            height: "2px",
            display: "flex",
            background: "#0077ff",
            position: "absolute",
            left: 0,
            bottom: 2,
            boxShadow: "0px 0px 2px 1px #0077ff", //
          }}
        />
      </div> */}

      <div className='flex items-start text-lg pr-1'>
        <button
          className='cursor-pointer relative group text-center overflow-hidden pb-1 border-2 w-[6rem] border-[#0077ff] rounded hover:scale-105 active:scale-95'
          onClick={() => {
            // router.push("/login", { scroll: false });
            router.push("/login");
          }}>
          <span className='font-bold text-white text-sm relative z-10 group-hover:text-[#0077ff] duration-500 text-shadow-blue hover:border-white'>
            ON LINE
          </span>
          <span className='absolute top-0 left-0 w-full bg-[#0077ff] duration-500 group-hover:-translate-x-full h-full'></span>
          <span className='absolute top-0 left-0 w-full bg-[#0077ff] duration-500 group-hover:translate-x-full h-full'></span>
          <span className='absolute top-0 left-0 w-full bg-[#0077ff] duration-500 delay-300 group-hover:-translate-y-full h-full'></span>
          <span className='absolute delay-300 top-0 left-0 w-full bg-[#0077ff] duration-500 group-hover:translate-y-full h-full'></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
