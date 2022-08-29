import React from "react";
import toast, {Toaster} from 'react-hot-toast';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.enteredName = null;
        this.enteredSuffolkID = null;
        this.state = {userInfo: props.userInfo};
    }

    render() {
        let buttonText = "sign up";
        let nameField = null, IDField = null;
        let newUser = this.props.userInfo.newUser;
        if (!this.props.userInfo.oldUser || newUser) {
            if (this.props.userInfo.name === undefined || newUser) {
                nameField = <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                           htmlFor="studentName">
                        name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                        id="studentName" type="text" placeholder="first and last name"
                        onChange={event => this.enteredName = event.target.value}/>
                </div>;
            }

            if (this.props.userInfo.id === undefined || newUser) {
                IDField = <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                           htmlFor="suffolkID">
                        suffolk id
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                        id="suffolkID" type="tel" maxLength={7} placeholder="1234567"
                        onChange={event => this.enteredSuffolkID = event.target.value}
                    />
                </div>
            }

            if (!newUser) {
                buttonText = "update my info"
            }
        }

        return <div className="w-full max-w-xs">
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
                        if (this.enteredName === null || this.enteredSuffolkID === null || this.enteredName.trim() === "" || this.enteredSuffolkID.trim() === "" || !/^\d+$/.test(this.enteredSuffolkID) || this.enteredSuffolkID.length !== 7) {
                            // User messed up
                            toast.error("Invalid credentials entered. Please try again!")
                            event.preventDefault();
                            return;
                        }
                        this.props.save(this.enteredName, this.enteredSuffolkID)
                    }}>
                        {buttonText}
                    </button>
                    <Toaster/>
                </div>
            </form>
        </div>
    }
}

export default SignUp;