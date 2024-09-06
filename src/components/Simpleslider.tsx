"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";

export function Simpleslider() {
  const images = [
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",

    "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L21vdGFybzdfcGhvdG9fb2ZfYV9wbGFudF9ncm93aW5nX2luX2dhcmRlbl9uYXR1cmFsX2xpZ2h0aW5nX3BsYV9lZGQwZDdhMi1hNWU4LTQxNmQtYmQzYi1iZWQ4YzY4OThiNDdfMS5qcGc.jpg",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className=" flex flex-col justify-center items-center brightness-200 mt-10 "
      ></motion.div>
    </ImagesSlider>
  );
}
