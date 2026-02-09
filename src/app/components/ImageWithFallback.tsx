"use client";

import Image from "next/image";
import React, { useState } from "react";
import { prisma } from "../../../lib/prisma";

const ImageWithFallback = (props: {
  src: string;
  alt: string;
  className: string;
  id:string;
}) => {
  const [imgSrc, setImgSrc] = useState(props.src);

  async function deleteMovieFromDB() {
  await fetch("/api/delete-movie", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: props.id }),
  });
}


  return (
    <img
      width={200}
      height={350}
      {...props}
      src={imgSrc}
      onError={() => {
        // deleteMovieFromDB()
        setImgSrc(
          "https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg"
        );
      }}
    />
  );
};

export default ImageWithFallback;
