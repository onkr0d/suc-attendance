import React from "react"
import SingleClub from "./SingleClub";

class Clubs extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            descriptions: [], imageSources: [], clubNames: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    /**
     * Prepare club data.
     */
    async getData() {
        // well, this is shit but it works. instead of programmatically creating the list of clubs, 
        // i just manually create all of them :)

        // just have arrays, items at n are related
        let imageSources = ["/assets/suffolk-default.png", "/assets/sucsc.jpeg", "/assets/volleyball.jpeg"]

        // FIXME we're gonna have to request this from the server
        let clubNames = ["mock trial", "computer science", "volleyball"];
        let descriptions = ["Join SUMTT! We are back and better than ever, are you ready to live out your Elle Woods dreams?", "Interested in Computer Science? Join the computer science club for workshops, homework help, internship opportunities, and much more!", "We love playing volleyball! Whether you play competitively or have never played before, all are welcome. Join us every Saturday in Ridgeway for our open court nights!"]
        let activated = [true, false, false];
        this.setState({isLoaded: true})
        this.setState({imageSources: imageSources, descriptions: descriptions, clubNames: clubNames, activated: activated});
    }

    render() {
        const {clubNames, descriptions, imageSources, activated} = this.state;

        let clubs = [];

        for (let i = 0; i < imageSources.length; i++) {
            clubs.push(<li key={i}>
                <SingleClub clubName={clubNames[i]}
                            description={descriptions[i]}
                            imageSource={imageSources[i]}
                            activated={activated[i]}
                />
            </li>)
        }

        return <div className={"text-white font-extrabold"}>
            <ol className={"space-y-[5%]"}>
                {clubs}
            </ol>
            <div className={"py-[3%]"}/>
        </div>
    }
}

export default Clubs;