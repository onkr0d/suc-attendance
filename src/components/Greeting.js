import React from "react";

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: props.userInfo};

        if (props.userInfo.newUser) {
            this.state.greeting = "it looks like you're a new user, let's get you signed up.";
        } else if (props.userInfo.missingData) {
            // shouldn't be possible unless cookie is manually removed
            this.state.greeting = "it seems we're missing some info about you, let's fix that.";
        } else {
            // all data is present, it's a returning user
            this.state.greeting = "nice to see you again! please choose a club to sign in to:";
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.greeting === this.state.greeting) {
            return;
        }
        if (this.props.userInfo.newUser) {
            this.setState({greeting: "it looks like you're a new user, let's get you signed up."})
        } else if (this.props.userInfo.missingData) {
            this.setState({greeting: "it seems we're missing some info about you, let's fix that."})
        } else {
            this.setState({greeting: "nice to see you again! please choose a club to sign in to:"})
        }
    }

    render() {
        return (<div>
            <p className={"text-white text-3xl font-extralight text-center"}>{this.state.greeting}</p>
        </div>);
    }

}

export default Greeting;