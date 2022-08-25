import React from "react"
import SingleClub from "./SingleClub";

class Clubs extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            descriptions: [], imageSources: [], names: []
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

        // just have two arrays, items at n are related
        let imageSources = ["/assets/fencing.jpeg", "/assets/rowing.jpeg", "/assets/soccer.jpeg", "/assets/volleyball.jpeg"]
        let names = ["fencing", "rowing", "soccer", "volleyball"];
        let descriptions = ["Fencing is a group of three related combat sports. The three disciplines in modern fencing are the foil, the épée, and the sabre; winning points are made through the weapon's contact with an opponent.", "Rowing, sometimes called crew in the United States, is the sport of racing boats using oars. It differs from paddling sports in that rowing oars are attached to the boat using oarlocks, while paddles are not connected to the boat. Rowing is divided into two disciplines: sculling and sweep rowing.", "Soccer is a team sport played between two teams of eleven players with a spherical ball. The ball is usually spherical, but may be flat or cylindrical. The game is played on a rectangular field with a goal at each end. The object of the game is to score by getting the ball into the opposing goal. The game ends when the ball is no longer in play, or when one of the teams has won.", "Volleyball is a team sport played between two teams of eleven players with a spherical ball. The ball is usually spherical, but may be flat or cylindrical. The game is played on a rectangular field with a goal at each end. The object of the game is to score by getting the ball into the opposing goal. The game ends when the ball is no longer in play, or when one of the teams has won."]

        this.setState({isLoaded: true})
        this.setState({imageSources: imageSources, descriptions: descriptions, names: names});
    }

    render() {
        const {imageSources, descriptions, names} = this.state;

        let clubs = [];

        for (let i = 0; i < imageSources.length; i++) {
            clubs.push(<li key={i}>
                <SingleClub clubName={names[i]}
                            description={descriptions[i]}
                            imageSource={imageSources[i]}
                />
            </li>)
        }

        return <div className={"text-white font-extrabold"}>
            <ol className={"space-y-[5%]"}>
                {clubs}
            </ol>
        </div>
    }
}

export default Clubs;