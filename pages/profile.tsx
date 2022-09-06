import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import { idContext } from "./_app";

export default function Profile() {
  const { idHolder } = useContext(idContext);

  let sum = 0;

  idHolder.map((num) => {
    let number = parseInt(num);
    sum = sum + number;
  });

  return (
    <div className="flex justify-center mt-56 items-center">
      <div className="bg-white w-full justify-center items-center pb-5 overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
        <div className="relative h-40">
          <Image
            className="blur-sm"
            src="/images/bgprofile.webp"
            alt="restaurant"
            layout="fill"
          />
        </div>
        <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <Image
            src="/images/profile.jpeg"
            alt="restaurant"
            width="100%"
            height="100%"
            // layout="responsive"
          />
        </div>
        <div className="mt-16 px-5">
          <h1 className="text-3xl text-center font-semibold">Arian</h1>
          <p className="text-sm text-center pb-5">Rahmani</p>
          <hr />
          <div className="grid justify-items-start">
            <p className="text-sm text-gray-600 text-center pt-3">
              Total purchases : {idHolder.length}
            </p>
            <p className="text-sm text-gray-600 text-center pt-3">
              Total price : {sum} <span className="font-semibold text-green-600 -mt-1">$</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
