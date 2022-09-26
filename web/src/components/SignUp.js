import React, {useState} from "react";
import toast, {Toaster} from 'react-hot-toast';

function SignUp(props) {

    let [enteredSuffolkID, setEnteredSuffolkID] = useState('');
    let [enteredName, setEnteredName] = useState('');

    // basically, nameField and IDField may not need to exist - we don't need to ask for something we already know.
    // let's see if we know it:
    let nameField = null;
    if (props.userInfo.name === undefined) {
        nameField = <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                   htmlFor="studentName">
                name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                id="studentName" type="text" placeholder="first and last name"
                onChange={event => setEnteredName(event.target.value)}/>
        </div>;
    }
    let IDField = null;
    if (props.userInfo.id === undefined) {
        IDField = <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                   htmlFor="suffolkID">
                suffolk id
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                id="suffolkID" type="tel" maxLength={7} placeholder="1234567"
                onChange={event => setEnteredSuffolkID(event.target.value)}
            />
        </div>
    }

    let buttonText = props.userInfo.newUser ? 'sign up' : 'update my info';

    return <div className="w-full max-w-xs">
        <Toaster/>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <div className="mb-4">
                {nameField}
            </div>
            <div className="mb-6">
                {IDField}
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:text-gray-200"
                    type="submit" onClick={(event) => {
                    if (checkInputAndAlert(enteredName, enteredSuffolkID)) {
                        props.save(enteredName, enteredSuffolkID)
                    } else {
                        event.preventDefault();
                    }
                }}>
                    {buttonText}
                </button>
            </div>
        </form>
    </div>
}


/**
 * Check the user's input to see if it's valid, and alert the user if it's not.
 * @param enteredName The name the user entered.
 * @param enteredSuffolkID The Suffolk ID the user entered.
 */
function checkInputAndAlert(enteredName, enteredSuffolkID) {
    // before there can be issues with the input, let's make sure an input exists.
    if (enteredName.trim() === '' && enteredSuffolkID === '') {
        toast.error("please enter a name and suffolk id.");
        return false;
    } else if (enteredName.trim() === '') {
        toast.error("please enter your name.");
        return false;
    } else if (enteredSuffolkID === '') {
        toast.error("please enter a suffolk id.");
        return false;
    }
    // error checking is only for suffolkID, because names can't be wrong.
    let errorMessage = undefined;
    if (enteredSuffolkID.length !== 7) {
        errorMessage = "your suffolk id must be 7 digits long.";
    }
    if (!/^\d+$/.test(enteredSuffolkID)) {
        errorMessage = "your suffolk id must contain only numbers.";
    }
    if (enteredSuffolkID.trim() === '') {
        errorMessage = "please enter your suffolk id.";
    }
    if (errorMessage) {
        // User messed up
        toast.error(errorMessage);
        return false;
    }
    return true;
}

export default SignUp;