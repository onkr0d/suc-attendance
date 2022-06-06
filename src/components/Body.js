import React from "react";

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.name = null;
        this.suffolkID = null;
        this.state = {findData: props.findData};
    }

    render() {
        let buttonText = "sign in"
        if (this.props.findData("someDataMissing")) {
            // we need to display inputs only for whatever is missing

            buttonText = "update my info"
        }

        return <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                           htmlFor="studentName">
                        name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                        id="studentName" type="text" placeholder="first and last name"
                        onChange={event => this.name = event.target.value}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                           htmlFor="suffolkID">
                        suffolk id
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-500"
                        id="suffolkID" type={"tel"} maxLength={7} placeholder="1234567"
                        onKeyDown={(event) => {
                            // don't work, but probably doesn't matter
                            let x = event.which || event.key;
                            return x >= 48 && x <= 57;
                        }}
                        onChange={event => this.suffolkID = event.target.value}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:text-gray-200"
                        type="button" onClick={() => {
                        this.props.save(this.name, this.suffolkID)
                    }}>
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    }
}

export default Body;