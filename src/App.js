import './App.css';
import {useCookies} from "react-cookie";
import React, {useEffect} from "react";
import Greeting from "./components/Greeting"

function App() {

    const [cookies, setCookie, removeCookie] = useCookies(['firstName', 'lastName', 'suffolkID']);

    console.log("first name " + cookies.firstName);
    console.log("last name " + cookies.lastName);
    console.log("suffolk id " + cookies.suffolkID);

    useEffect(() => {
        console.log("we rendered! nonce: " + Math.random())
    }, [])

    function submit() {
        console.log("Saving user data to cookies")
        window.close();
    }

    return (<div
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen flex flex-col justify-center items-center">
        <h1 className={"text-white text-5xl py-3 font-extralight p-20 text-center"}>welcome!</h1>
        <Greeting userData={[cookies.firstName, cookies.lastName, cookies.suffolkID]}/>
        <br/>
        <br/>


        <br/>
        <br/>

        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
                        name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="studentName" type="text" placeholder="first and last name"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="suffolkID">
                        suffolk id
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="suffolkID" type={"tel"} maxLength={7} placeholder="1234567"
                        onKeyDown={(event) => {
                            let x = event.which || event.keyword;
                            return x >= 48 && x <= 57;
                        }}
                    >
                    </input>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onSubmit={submit}>
                        Sign In
                    </button>
                </div>
            </form>
        </div>

    </div>);
}

export default App;
