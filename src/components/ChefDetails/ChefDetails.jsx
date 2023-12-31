import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import LazyLoad from "react-lazy-load";
import { useParams } from "react-router-dom";
import { showSuccessMessage } from "../../utils/Notification";
import Loading from "../shared/Loading";

const ChefDetails = () => {
    const [chef, setChef] = useState();
    const [recipes, setRecipes] = useState([]);
    const [fav, setFav] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        fetch(`https://lunchbox-server.vercel.app/api/v1/chef/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setChef(data);
                setRecipes(data.recipes);
            });
    }, [name]);

    const toggleReadMoreLess = () => {
        setIsShowMore(!isShowMore);
    };

    //! fix set favorite
    const handleFavourite = (id) => {
        setFav(!fav);
        showSuccessMessage("🧾 Recipe is added to your favorites list!");
        // const except = fav.filter((s) => s.id !== id);

        // const selected = fav.find((s) => s.id === id);
        // console.log(selected, except);
        // if (!selected) {
        //     setFav([
        //         ...except,
        //         {
        //             id,
        //             favorite: true,
        //         },
        //     ]);
        // }
    };

    if (!chef) {
        return <Loading />;
    }

    return (
        <div className="">
            <div className="">
                <LazyLoad>
                    <div className="bg-slate-600 bg-blend-soft-light bg-cover bg-no-repeat bg-center  w-full h-80 bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)]">
                        <img className=" " src="" alt="" />
                        <h2 className="flex justify-center items-center h-full text-4xl md:text-5xl text-center text-white">
                            Welcome to {name}'s kitchen
                        </h2>
                    </div>
                </LazyLoad>
                <div className="pt-6 pb-12 ">
                    <div id="card" className="">
                        <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
                            About Chef
                        </h2>
                        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
                            <div
                                // v-for="card in cards"
                                className="flex flex-col md:flex-row overflow-hidden
                                        bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2 text-base"
                            >
                                <div className="h-64 w-auto md:w-1/2">
                                    <LazyLoad>
                                        <img
                                            className="inset-0 h-full w-full object-cover object-center"
                                            src={chef.image}
                                        />
                                    </LazyLoad>
                                </div>
                                <div className="w-full p-5 text-gray-800 flex flex-col justify-between">
                                    <h3 className="font-semibold text-xl leading-tight truncate">
                                        {chef.name}
                                    </h3>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold ">
                                        {chef.cusine}
                                    </p>
                                    <p className="mt-2">{chef.description}</p>
                                    <div className="badge text-xl gap-2 p-3 my-2">
                                        <p>
                                            {chef.experience} Years Experience
                                        </p>
                                    </div>
                                    <div className="badge text-xl gap-2 p-3">
                                        <p> {chef.likes}k Likes on Instagram</p>
                                    </div>
                                    <div className="badge text-xl gap-2 p-3 my-2">
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            readOnly
                                            orientation="horizontal"
                                            value={chef.rating}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
            <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
                About Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 container mx-auto">
                {recipes?.map((recipe) => {
                    return (
                        <div key={recipe.id} className="p-10">
                            <div className=" rounded overflow-hidden shadow-lg">
                                <LazyLoad>
                                    <img
                                        className="w-full"
                                        src={recipe.img}
                                        alt="Mountain"
                                    />
                                </LazyLoad>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        {recipe.recipe_name}
                                    </div>
                                    <div className="text-gray-700 text-base ">
                                        <div onClick={toggleReadMoreLess}>
                                            {isShowMore ? (
                                                <span className="">
                                                    {recipe.cooking_method}
                                                    <button className="btn btn-sm">
                                                        Read Less
                                                    </button>
                                                </span>
                                            ) : (
                                                <span>
                                                    {recipe.cooking_method.slice(
                                                        0,
                                                        150
                                                    )}
                                                    <button className="btn btn-sm">
                                                        Read More
                                                    </button>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        {recipe.ingredients?.map((ing) => {
                                            return (
                                                <li
                                                    key={ing}
                                                    className="flex space-x-3 mt-2"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>
                                                            Check icon
                                                        </title>
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                                        {ing}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="px-6 pt-4 pb-2 flex justify-between">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-2xl font-semibold text-gray-700 mr-2 mb-2">
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            readOnly
                                            orientation="horizontal"
                                            value={recipe.rating}
                                        />
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleFavourite(recipe.id)
                                        }
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-2xl font-semibold text-gray-700 mr-2 mb-2"
                                    >
                                        {fav ? (
                                            <div
                                                className="text-red-500 cursor-pointer"
                                                title="Remove from Favorites"
                                            >
                                                <MdOutlineFavorite />
                                            </div>
                                        ) : (
                                            <div
                                                className=" cursor-pointer"
                                                title="Added to Favourites"
                                            >
                                                <MdOutlineFavoriteBorder />
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChefDetails;
