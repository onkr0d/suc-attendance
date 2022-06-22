import React, {useState} from "react";
import ky from 'ky';
import {useCookies} from "react-cookie";

/**
 * This class represents a single club.
 */
function SingleClub(props) {
    useState({clubName: props.clubName, description: props.description, imageSource: props.imageSource});

    const [cookies] = useCookies(['name', 'suffolkID']);

    async function submit() {
        console.log("submitting data:");
        console.log(cookies.name)
        console.log(cookies.suffolkID)

        // https://expressjs.com/en/guide/writing-middleware.html
        // according to the above we can send cookies as part of the
        // request explicitly, no need to put them in a body
        // unfortunately this won't make it into the MVP LOL
        const response = await ky.post("http://localhost:8080/api/update", {
            json: {
                name: cookies.name, id: cookies.suffolkID
            }
        }).json()
        console.log(response)
    }

    return <button type={"submit"} onClick={submit}
                   className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full h-96 rounded md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
             src={props.imageSource} alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {props.clubName}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
        </div>
    </button>

}

export default SingleClub;