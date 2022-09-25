import React, {useState} from "react";
import ky from 'ky';
import {useCookies} from "react-cookie";
import toast, {Toaster} from 'react-hot-toast';
import LoadingOverlay from 'react-loading-overlay-ts';

/**
 * This class represents a single club.
 */
function SingleClub(props) {
    const [cookies] = useCookies(['name', 'suffolkID']);
    let [inProgress, setInProgress] = useState(false);

    async function submit() {
        // if (!props.activated) {
        //     toast.error('This club is not currently activated. Contact club leaders for more information.')
        //
        //     // I wanna see who tries to sign up :>
        //     // this is an endpoint just to log who tries to sign up for a club that isn't activated
        //     ky.post("https://us-central1-suvba-354520.cloudfunctions.net/app/api/signindemo/club", {
        //         json: {
        //             name: cookies.name, id: cookies.suffolkID, clubName: props.clubName
        //         }
        //     })
        //     return;
        // }

        // https://expressjs.com/en/guide/writing-middleware.html
        // according to the above we can send cookies as part of the
        // request explicitly, no need to put them in a body
        // unfortunately this won't make it into the MVP LOL
        setInProgress(true)
        // is not having internet an edge case? how did user even get to this situation??
        try {
            // this is a prod endpoint
            // i wonder if we need some more error handling here.
            await ky.post("http://localhost:5001/suvba-354520/us-central1/app/api/fakeupdate", {
                json: {
                    name: cookies.name, id: cookies.suffolkID, clubName: props.clubName.toLowerCase().replace(" ", "-")
                }
            }).json()
        } catch (error) {
            console.error(error);
            toast.error('something went wrong! please try again later.')
            return;
        }

        // whoops haha there's no signed in screen :)
        toast.success("signed in successfully! you may now close this tab.", {
            style: {textAlign: 'center',}
        });
        // this is deprecated :C
        setInProgress(false);
    }

    return <div>
        <Toaster/>
        <LoadingOverlay active={inProgress} spinner text='signing in...' styles={{
            overlay: base => ({
                ...base, borderRadius: '.75rem', // even rounding this shit like the components it overlays below still leaves it too fucking long >:(
            }),
        }}>
            <button type={"submit"} onClick={submit}
                    className="hover:bg-gray-200 max-w-md mx-auto bg-white rounded-xl border shadow-md overflow-hidden md:max-w-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-48 object-scale-down"
                             src={props.imageSource}
                             alt="Club Icon"/>
                    </div>
                    <div className="p-8">
                        <div
                            className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{props.clubName}</div>
                        <div className={"py-[1%]"}/>
                        <p className="text-black font-normal dark:text-gray-400">{props.description}</p>
                    </div>
                </div>
            </button>
        </LoadingOverlay>
    </div>
}

export default SingleClub;