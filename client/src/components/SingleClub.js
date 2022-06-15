import React from "react";

/**
 * This class represents a single club.
 */
class SingleClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clubName: props.clubName, description: props.description, imageSource: props.imageSource};
    }

    render() {
        return <button type={"submit"}
                  className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                 src={this.state.imageSource} alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {this.state.clubName}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{this.state.description}</p>
            </div>
        </button>
    }
}

export default SingleClub;