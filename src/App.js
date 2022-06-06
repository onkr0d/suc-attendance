import './App.css';
import {useCookies} from "react-cookie";
import React from "react";
import Greeting from "./components/Greeting"
import Body from "./components/Body"

function App() {

    const [cookies, setCookie] = useCookies(['name', 'suffolkID']);

    console.log("name " + cookies.name);
    console.log("suffolk id " + cookies.suffolkID);

    let missingDataMap = [];

    function updateMissingData(key, value) {
        missingDataMap[key] = value;
    }

    function findData(key) {
        return missingDataMap[key];
    }

    function saveCookies(name, suffolkID) {
        console.log("Saving user data to cookies")
        // do we need more logic for names? can names have numbers? idk
        // at the very least our back-end needs to normalize names somehow

        // don't save empty or null data
        if (name !== null && name.trim() !== '') {
            setCookie("name", name);
        }

        if (suffolkID !== null && suffolkID.trim() !== '') {
            setCookie("suffolkID", suffolkID);
        }
    }

    return (<div
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-700 dark:to-fuchsia-700 min-h-screen flex flex-col justify-center items-center">
        <h1 className={"text-white text-5xl py-[3%] font-extralight p-20 text-center"}>welcome!</h1>
        <div className={"py-[1%]"}></div>
        <Greeting userData={[cookies.name, cookies.suffolkID]} updateMissingData={updateMissingData}/>
        <div className={"py-[5%]"}></div>
        {/*Need to programmatically switch between these two elements*/}
        <Body save={saveCookies} findData={findData}/>
        {/*<Clubs></Clubs>*/}
    </div>);
}

export default App;
