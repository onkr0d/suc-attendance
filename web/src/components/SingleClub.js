import React, {useState} from "react";
import ky from 'ky';
import {useCookies} from "react-cookie";
import toast, {Toaster} from 'react-hot-toast';

/**
 * This class represents a single club.
 */
function SingleClub(props) {
    useState({
        clubName: props.clubName,
        description: props.description,
        imageSource: props.imageSource,
        activated: props.activated
    });

    const [cookies] = useCookies(['name', 'suffolkID']);

    async function submit() {
        if (!props.activated) {
            toast.error('This club is not currently activated. Contact club leaders for more information.')

            // I wanna see who tries to sign up :>
            // this is an endpoint just to log who tries to sign up for a club that isn't activated
            ky.post("https://us-central1-suvba-354520.cloudfunctions.net/app/api/signindemo/club", {
                json: {
                    name: cookies.name, id: cookies.suffolkID, clubName: props.clubName
                }
            })
            return;
        }

        // https://expressjs.com/en/guide/writing-middleware.html
        // according to the above we can send cookies as part of the
        // request explicitly, no need to put them in a body
        // unfortunately this won't make it into the MVP LOL

        // is not having internet an edge case? how did user even get to this situation??
        let response;
        try {
            // this is a prod endpoint
            response = await ky.post("https://us-central1-suvba-354520.cloudfunctions.net/app/api/update", {
                json: {
                    name: cookies.name, id: cookies.suffolkID, clubName: props.clubName.toLowerCase().replace(" ", "-")
                }
            }).json()
        } catch (e) {
            console.error("Something went wrong!")
            return;
        }

        console.log(response)
        // whoops haha there's no signed in screen :)
        toast.success("Signed in successfully! You may now close this tab.")
    }

    return <button type={"submit"} onClick={submit}
                   className="hover:bg-gray-200 max-w-md mx-auto bg-white rounded-xl border shadow-md overflow-hidden md:max-w-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="md:flex">
            <div className="md:shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48 object-scale-down" src={props.imageSource}
                     alt="Club Icon"/>
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{props.clubName}</div>
                <div className={"py-[1%]"}/>
                <p className="text-black font-normal dark:text-gray-400">{props.description}</p>
            </div>
        </div>
        <Toaster/>
    </button>
}

export default SingleClub;