/* eslint-disable react/no-unescaped-entities */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";

const ChefsSection = () => {
    const [chefs, setChefs] = useState([]);

    useState(() => {
        fetch("https://lunchbox-server.vercel.app/api/v1/chefs")
            .then((res) => res.json())
            .then((data) => setChefs(data));
    }, []);

    return (
        <>
            <h2 className="text-center mt-12 font-serif  uppercase text-4xl xl:text-5xl">
                Chefs Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 justify-items-center container mx-auto my-12">
                {chefs.map((chef) => (
                    <div
                        key={chef.id}
                        className="w-full p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="flex items-center">
                            <LazyLoad>
                                <img
                                    className="w-16 h-16 mb-3 rounded-full shadow-lg mr-5"
                                    src={chef.image}
                                    alt="Bonnie image"
                                />
                            </LazyLoad>
                            <div>
                                <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
                                    {chef.name}
                                </h5>
                                <span className="badge text-sm text-white dark:text-gray-400">
                                    {chef.cusine}
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="flex justify-between my-5">
                            <div className="text-center text-base">
                                <p className="mb-2 text-xl">
                                    {chef.experience} Year's
                                </p>{" "}
                                Experience
                            </div>
                            <div className="text-center text-base">
                                <p className="mb-2 text-xl">{chef.likes} K</p>{" "}
                                Likes
                            </div>
                            <div className="text-center text-base">
                                <div className="mb-2 text-xl">
                                    <div>
                                        <Rating
                                            style={{ maxWidth: 100 }}
                                            readOnly
                                            orientation="horizontal"
                                            value={chef.rating}
                                        />
                                    </div>
                                </div>{" "}
                                Rating
                            </div>
                        </div>
                        <hr />
                        <div className="flex mt-3 space-x-3 ">
                            <Link
                                to={`chefs/${chef.name}`}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                View Recipies
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChefsSection;
