import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function Hero() {
  const [nextHero, setNextHero] = useState(0);
  const [heroImg, setHeroImg] = useState("");

  const handleNextHero = () => {
    setNextHero(nextHero + 1);
  };

  useEffect(() => {
    switch (nextHero) {
      case 0:
        setHeroImg("/images/hero.png");
        break;
      case 1:
        setHeroImg("/images/hero2.jpg");
        break;
      case 2:
        setHeroImg("/images/hero3.png");
    }
  }, [nextHero]);

  useEffect(() => {
    if (nextHero === 3) {
      setNextHero(0);
    }
  }, [nextHero]);

  return (
    <div className="flex mt-20">
      <div className="basis-7/12">
        <h1 className="text-secondary text-center sm:text-start text-6xl sm:text-9xl font-light">
          DRINFOOD
        </h1>
        <h1 className="text-center sm:text-start text-xl sm:text-2xl font-extralight mt-5 sm:ml-16">
          A food website.
        </h1>
        <h1 className="text-center sm:text-start text-xl sm:text-2xl font-extralight  sm:ml-16 mt-2">
          With allot of countries recipes.
        </h1>
        <div className="grid mt-10 pb-10 xl:mt-32">
          <div className="hidden lg:inline">
            <button
              onClick={handleNextHero}
              className="bg-white py-5 px-7 rounded-full ml-44"
            >
              <FontAwesomeIcon
                className="text-3xl ml-0.5 mt-0.5"
                icon={faAngleRight}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="basis-5/12 hidden lg:inline">
        <Image src={heroImg} width={800} height={800} alt="hero image" />
      </div>
    </div>
  );
}
