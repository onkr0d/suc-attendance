import './App.css';
import {useCookies} from "react-cookie";
import React, {useEffect} from "react";
import Greeting from "./components/Greeting"
import Body from "./components/Body"

function App() {

    const [cookies, setCookie] = useCookies(['name', 'suffolkID']);
    let name = '';
    let suffolkID = '';

    console.log("name " + cookies.name);
    console.log("suffolk id " + cookies.suffolkID);

    useEffect(() => {
        console.log("we rendered! nonce: " + Math.random())
    }, [])

    function submit() {
        console.log("Saving user data to cookies")
        // do we need more logic for names? can names have numbers? idk
        // at the very least our back-end needs to normalize names somehow

        // putting a whitespace as these values will make our app think
        // there is valid user data. definitely need logic against that.
        if (name.trim() !== '') {
            setCookie("name", name);
        }
        if (suffolkID.trim() !== '') {
            setCookie("suffolkID", suffolkID);
        }

        // lol
        // window.close();
    }

    return (<div
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen flex flex-col justify-center items-center">
        <h1 className={"text-white text-5xl py-3 font-extralight p-20 text-center"}>welcome!</h1>
        <Greeting userData={[cookies.name, cookies.suffolkID]}/>
        <div className={"py-[5%]"}></div>
        <Body suffolkID={suffolkID} name={name} submit={submit} />


    </div>);
}

export default App;
