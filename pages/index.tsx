import Image from "next/image";
import { Hero } from "../components/Hero";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEarthAmerica,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { idContext } from "./_app";

export function Home() {
  const { idHolder, setIdHolder } = useContext(idContext);

  const [filterTitle, setFilterTitle] = useState("Beef");

  const { push } = useRouter();

  const { data: catData } = useQuery(["catData"], () =>
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.data)
  );

  const { data: filterData, isLoading: filterLoading } = useQuery(
    [{ filterTitle }],
    () =>
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterTitle}`
        )
        .then((res) => res.data),
    { enabled: filterTitle.length > 0 }
  );

  const { data: randomFood, refetch } = useQuery(["randomFood"], () =>
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.data)
  );

  const handleCategoriesClick = (i: any) => {
    setFilterTitle(i.target.innerText);
  };

  const handleRefreshRandomClick = () => {
    refetch();
  };

  const handleCountryClick = (i: any) => {
    push(
      i.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText
    );
  };

  const handleAddToCartClick = (i: any) => {
    let foodId = i.target.previousElementSibling.innerText.substr(9);

    
    

    if (idHolder) {
      setIdHolder((prevState:any) => [...prevState, foodId]);
    } else {
      setIdHolder(foodId);
    }
  };

  return (
    <>
      <div className="flex bg-primary justify-center pt-24">
        <Hero />
      </div>
      <h1 className="text-center text-secondary text-4xl font-medium mt-20">
        CATEGORIES
      </h1>
      <div className="grid grid-cols-6 mt-10 mb-14">
        <div className="col-span-1"></div>
        <div className="col-span-4 grid grid-cols-1 sm:grid-cols-4 px-3 bg-secondary py-2 rounded-md">
          <button
            className={
              filterTitle === "Beef"
                ? "text-3xl border-b-4 border-white sm:border-r-2 text-white font-semibold"
                : "text-white text-2xl font-semibold py-2 sm:p-0 sm:border-r-2 border-b-2 sm:border-b-0 border-white"
            }
            onClick={handleCategoriesClick}
          >
            {catData?.meals[0]?.strCategory}
          </button>
          <button
            className={
              filterTitle === "Breakfast"
                ? "text-3xl border-b-4 border-white sm:border-r-2 text-white font-semibold"
                : "text-white text-2xl font-semibold py-2 sm:p-0 sm:border-r-2 border-b-2 sm:border-b-0 border-white"
            }
            onClick={handleCategoriesClick}
          >
            {catData?.meals[1]?.strCategory}
          </button>
          <button
            className={
              filterTitle === "Chicken"
                ? "text-3xl border-b-4 border-white sm:border-r-2 text-white font-semibold"
                : "text-white text-2xl font-semibold py-2 sm:p-0 sm:border-r-2 border-b-2 sm:border-b-0 border-white"
            }
            onClick={handleCategoriesClick}
          >
            {catData?.meals[2]?.strCategory}
          </button>
          <button
            className={
              filterTitle === "Dessert"
                ? "text-3xl border-b-4 border-white text-white font-semibold"
                : "text-white text-2xl font-semibold py-2 sm:p-0 border-b-2 sm:border-b-0 border-white"
            }
            onClick={handleCategoriesClick}
          >
            {catData?.meals[3]?.strCategory}
          </button>
        </div>
        <div className="basis-2/12"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 py-10 border-y-8 border-secondary/20 justify-items-center">
        {filterData?.meals?.map((meal: any, index: number) => {
          if (index < 4) {
            return (
              <div
                key={meal.idMeal}
                className="bg-white rounded-lg border border-gray-200 shadow-md md:mb-7"
              >
                <Image
                  src={meal.strMealThumb}
                  alt="restaurant"
                  width="400"
                  height="400"
                  // layout="responsive"
                />
                <div className="p-5">
                  <p className="mb-2 overflow-hidden truncate w-80 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {meal.strMeal}
                  </p>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    Price : {meal.idMeal}{" "}
                    <span className="font-semibold text-green-600 -mt-1">
                      $
                    </span>
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    IDMeal : {meal.idMeal}
                  </p>
                  <button
                    onClick={handleAddToCartClick}
                    className="bg-secondary py-1 mt-5 w-full"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>

      <h1 className="text-center text-secondary text-4xl font-medium mt-20 ">
        CHOOSE A COUNTRY
      </h1>
      <div className="grid grid-cols-6 mt-20">
        <div className="md:col-span-1"></div>
        <div className="col-span-full md:col-span-4">
          <div className="grid grid-cols-1 xl:grid-cols-3">
            <div>
              <Image
                src="/images/main1.jpg"
                alt="restaurant"
                width="100%"
                height="90%"
                layout="responsive"
              />
            </div>
            <div className="bg-white py-9">
              <h1 className="font-medium text-xl mt-20 text-center">ITALY</h1>
              <p className="text-center mt-2 text-gray-400">
                Lorem ipsum dolor
              </p>
              <p className="text-center text-gray-400">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="grid mt-20">
                <button
                  onClick={handleCountryClick}
                  className="bg-secondary rounded-sm justify-self-center py-2 px-10"
                >
                  SEE MORE
                </button>
              </div>
            </div>
            <div>
              <Image
                src="/images/main2.jpg"
                alt="restaurant"
                width="100%"
                height="90%"
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-1"></div>
      </div>
      <div className="grid grid-cols-6">
        <div className="md:col-span-1"></div>
        <div className="col-span-full md:col-span-4">
          <div className="grid grid-cols-1 xl:grid-cols-3">
            <div className="bg-white py-9">
              <h1 className="font-medium text-xl mt-20 text-center">
                AMERICAN
              </h1>
              <p className="text-center mt-2 text-gray-400">
                Lorem ipsum dolor
              </p>
              <p className="text-center text-gray-400">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="grid mt-20">
                <button
                  onClick={handleCountryClick}
                  className="bg-secondary rounded-sm justify-self-center py-2 px-10"
                >
                  SEE MORE
                </button>
              </div>
            </div>
            <div>
              <Image
                src="/images/main3.png"
                alt="restaurant"
                width="100%"
                height="90%"
                layout="responsive"
              />
            </div>
            <div className="bg-white py-9">
              <h1 className="font-medium text-xl mt-20 text-center">CHINES</h1>
              <p className="text-center mt-2 text-gray-400">
                Lorem ipsum dolor
              </p>
              <p className="text-center text-gray-400">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="grid mt-20">
                <button
                  onClick={handleCountryClick}
                  className="bg-secondary rounded-sm justify-self-center py-2 px-10"
                >
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1"></div>
      </div>
      <div>
        <h1 className="text-center text-secondary text-4xl font-medium mt-20">
          OUR OFFER TODAY
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-6">
          <div className="col-span-full md:col-span-1"></div>
          <div className="col-span-full md:col-span-10 xl:col-span-4 grid justify-items-center">
            <div className="mt-20  md:w-7/12 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <Image
                src={randomFood?.meals[0].strMealThumb}
                alt="restaurant"
                width="100%"
                height="90%"
                layout="responsive"
              />
              <div className="p-5 grid justify-items-stretch">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {randomFood?.meals[0].strMeal}
                </h5>
                <p className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400">
                  <FontAwesomeIcon className="mr-3" icon={faEarthAmerica} />
                  {randomFood?.meals[0].strArea}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <FontAwesomeIcon className="mr-3" icon={faHashtag} />
                  {randomFood?.meals[0].strTags}
                </p>
                <p className="text-justify">
                  {randomFood?.meals[0].strInstructions}
                </p>
                <FontAwesomeIcon
                  onClick={handleRefreshRandomClick}
                  className="justify-self-end cursor-pointer text-secondary mt-5 text-3xl"
                  icon={faArrowsRotate}
                />
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-1"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
