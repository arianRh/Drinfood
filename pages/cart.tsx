import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { idContext } from "./_app";

export default function Cart() {
  const { idHolder, setIdHolder } = useContext(idContext);
  const [btnShow, setBtnShow] = useState(false);

  useEffect(() => {
    if (idHolder.length <= 0) {
      setBtnShow(false);
    } else {
      setBtnShow(true);
    }
  }, [idHolder]);

  const queries = idHolder.map((id) => {
    return {
      queryKey: ["product", id],
      queryFn: () =>
        axios
          .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.data),
    };
  });

  const handleDeleteClick = () => {
    setIdHolder([]);
  };

  const results = useQueries({
    queries,
  });

  let sum = 0;

  idHolder.map((num) => {
    let number = parseInt(num);
    sum = sum + number;
  });

  return (
    <div className="flex flex-col justify-center mt-48 items-center">
      <div className="shadow-md bg-white rounded-lg overflow-y-auto h-96 scrollbar pb-8 px-5">
        {idHolder.length > 0 ? (
          results.map((i) => {
            return (
              <div
                key={i.data?.meals[0].idMeal}
                className="px-5 grid grid-cols-12 border-b-2 border-gray-200 py-5"
              >
                <div className="col-span-2">
                  <Image
                    className="rounded-full"
                    src={i.data?.meals[0].strMealThumb}
                    alt="restaurant"
                    width="100%"
                    height="90%"
                    layout="responsive"
                  />
                </div>
                <div className="col-span-10 flex items-center">
                  <div className="pl-10">
                    <h1 className="text-lg overflow-hidden truncate w-60">
                      {i.data?.meals[0].strMeal}
                    </h1>
                    <p className="text-sm font-light">
                      {i.data?.meals[0].idMeal} $
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-5 sm:px-56 ">
            <div className="flex">
              <h5 className="text-3xl sm:text-6xl mt-44 sm:mt-36 font-medium text-gray-900/40 dark:text-white">
                Card is empty
              </h5>
            </div>
          </div>
        )}

        {btnShow === true ? (
          <>
            <div className="grid justify-items-start mt-3">
              <p className="text-sm text-gray-600 text-center pt-3">
                Total purchases : {idHolder.length}
              </p>
              <p className="text-sm text-gray-600 text-center pt-1.5">
                Total price : {sum}{" "}
                <span className="font-semibold text-green-600 -mt-1">$</span>
              </p>
            </div>
            <div className="flex justify-between px-14 mt-6">
              <div>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg"
                >
                  DELETE
                </button>
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg">
                  ACCEPT
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
