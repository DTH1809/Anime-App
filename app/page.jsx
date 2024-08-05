"use client"

import { useState } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col hide-scrollbar">
      <Feed />
    </div>
  );
}
