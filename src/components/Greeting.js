import React from "react";

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userData: props.userData, updateMissingData: props.updateMissingData};

        if (props.userData.every(element => element === undefined)) {
            // no data - new user
            this.state.greeting = "it looks like you're a new user, let's get you signed up.";
            props.updateMissingData("allDataMissing", true);
        } else if (props.userData.includes(undefined)) {
            // some data missing - but how lol
            this.state.greeting = "it seems we're missing some info about you, let's fill that out";
            props.updateMissingData("someDataMissing", true);
            props.updateMissingData("nameMissing", props.userData[0] === undefined);
            props.updateMissingData("suffolkIDMissing", props.userData[1] === undefined)
        } else {
            // all data is present, it's a returning user
            this.state.greeting = "nice to see you again! please choose a club to sign in to:";
            // we're not modular with clubs yet lol
            props.updateMissingData("nothingMissing", true);
        }
    }

    render() {
        return (<div>
            <p className={"text-white text-3xl font-extralight text-center"}>{this.state.greeting}</p>
        </div>);
    }

}

export default Greeting;