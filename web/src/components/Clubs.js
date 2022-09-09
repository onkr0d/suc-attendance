import React from "react"
import SingleClub from "./SingleClub";
import ky from 'ky';

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
        // clubs are composed of an image source, a description, a name, and it's activation status.
        // let's assemble those now.
        let imageSources = ["/assets/mock-trial.jpeg", "/assets/computer-science.jpeg", "/assets/volleyball.jpeg"]
        // the reason why we have images stored on the client is because we want to avoid long load times.

        // since we have the image sources, let's request the remaining:
        // descriptions, names and activation status from the server
        let response = await ky.get("https://us-central1-suvba-354520.cloudfunctions.net/app/api/clubs");
        let clubs = JSON.parse(await response.text());
        let descriptions = [];
        let clubNames = [];
        let activationStatus = [];

        // now that we have those, we can assemble the clubs
        imageSources.forEach((imageSource) => {
            clubs.forEach((club) => {
              if (imageSource.includes(club.name)) {
                descriptions.push(club.description);
                clubNames.push(club.name);
                activationStatus.push(club.activated);
              }
            })
        });

        this.setState({
            imageSources: imageSources,
            descriptions: descriptions,
            clubNames: clubNames,
            activated: activationStatus
        });
        // also? side note? i hate this. it's o(n^2) to connect CLUBS to IMAGES. i hate it.
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