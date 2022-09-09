import React from "react"
import SingleClub from "./SingleClub";
import ky from 'ky';
import { MagnifyingGlass } from  'react-loader-spinner'

class Clubs extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            descriptions: [], imageSources: [], clubNames: [], loaded: false
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
                clubNames.push(club.name.replace("-", " "));
                activationStatus.push(club.isActivated);
              }
            })
        });

        this.setState({
            imageSources: imageSources,
            descriptions: descriptions,
            clubNames: clubNames,
            activated: activationStatus,
            loaded: true
        });
        // also? side note? i hate this. it's o(n^2) to connect CLUBS to IMAGES. i hate it.
    }

    render() {
        const {clubNames, descriptions, imageSources, activated} = this.state;

        let clubs = [];

        if (!this.state.loaded) {
            return <div>
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    glassColor = '#c0efff'
                    color = '#e15b64'
                    className={"flex items-center justify-center h-screen"}
                />
                <p className={"text-white text-center flex items-center justify-center"}>Retrieving clubs...</p>
            </div>
        }

        for (let i = 0; i < imageSources.length; i++) {
            clubs.push(<li key={i}>
                <SingleClub clubName={clubNames[i]}
                            description={descriptions[i]}
                            imageSource={imageSources[i]}
                            activated={activated[i]}
                />
            </li>)
        }

        return <div className={"text-white"}>
            <ol className={"space-y-[5%]"}>
                {clubs}
            </ol>
            <div className={"py-[3%]"}/>
            <p className={"text-center"}>Want this for all your clubs? Tell your club leaders today!</p>
            <div className={"py-[3%]"}/>
        </div>
    }
}

export default Clubs;