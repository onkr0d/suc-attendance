import './App.css';
import {useCookies} from "react-cookie";
import React from "react";
import Greeting from "./components/Greeting"
import SignUp from "./components/SignUp"
import Clubs from "./components/Clubs";

function App() {

    const [cookies, setCookie] = useCookies(['name', 'suffolkID']);

    console.log("name " + cookies.name);
    console.log("suffolk id " + cookies.suffolkID);

    let userInfo = new userInformation(cookies.name, cookies.suffolkID);

    function saveCookies(name, suffolkID) {
        console.log("Saving user data to cookies")
        // do we need more logic for names? can names have numbers? idk
        // at the very least our back-end needs to normalize names somehow

        // don't save empty or null data
        if (name !== null && name.trim() !== '') {
            console.log("Saving name");
            setCookie("name", name.trim());
        }

        if (suffolkID !== null && suffolkID.trim() !== '') {
            console.log("Saving id");
            setCookie("suffolkID", suffolkID.trim());
        }
    }

    let body;

    if (userInfo.missingData) {
        body = <SignUp save={saveCookies} userInfo={userInfo}/>;
    }

    if (userInfo.oldUser) {
        body = <Clubs></Clubs>;
    }

    return (<div
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-700 dark:to-fuchsia-700 min-h-screen flex flex-col justify-center items-center">
        <h1 className={"text-white text-5xl py-[3%] font-extralight p-20 text-center"}>welcome!</h1>
        <div className={"py-[1%]"}></div>
        <Greeting userData={[cookies.name, cookies.suffolkID]} userInfo={userInfo}/>
        <div className={"py-[5%]"}></div>
        {body}
    </div>);
}

export default App;

class userInformation {

    /**
     * Represents the user's data. newUser and oldUser are not mutually exclusive; if
     * only either id or name is missing, then missingData is true, and both newUser and oldUser are false.
     * @param name The name of the user.
     * @param id The users' id.
     */
    constructor(name, id) {
        this.newUser = name === undefined && id === undefined;
        this.oldUser = name !== undefined && id !== undefined;
        this.missingData = name === undefined || id === undefined;
        this.name = name;
        this.id = id;
    }
}