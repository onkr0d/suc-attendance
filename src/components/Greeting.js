import React from "react";

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {greeting: props.greeting};
        this.state = {userData: props.userData};

        if (props.userData.every(element => element === undefined)) {
            // no data - new user
            console.log("1")
            this.state.greeting = "it looks like you're a new user, let's get you signed up.";
        } else if (props.userData.includes(undefined)) {
            // some data missing - but how lol
            console.log("2")
            this.state.greeting = "it seems we're missing some info about you, let's fill that out";

        } else {
            // all data is present, returning user
            console.log("3")
            this.state.greeting = "welcome back! choose a club to sign in to:";
        }
    }

    render() {
        return (
                <div>
                <br/>
                <p className={"text-white text-3xl font-extralight text-center px-5"}>{this.state.greeting}</p>
            </div>
        );
    }

    /** Desired text:
     * No cookies found: "It looks like you're a new user, let's get you signed in."
     * Some cookies found: "I think we're missing some info about you, let's fill that out"
     * All cookies found: "Welcome back! Choose a club to sign in to:"
     */

}

export default Greeting;