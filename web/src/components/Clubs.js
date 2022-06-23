import React from "react"
import SingleClub from "./SingleClub";
import ky from 'ky';

class Clubs extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null, isLoaded: false, descriptions: [], imageSources: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await ky.get("http://localhost:8080/api/clubs");
        const values = JSON.parse(JSON.parse(await response.text()))
        console.log("server responded with values:");
        console.log(values);

        // just have two arrays, items at n are related
        let imageSources = []
        let descriptions = []

        for (const val of values) {
            if (!val.toString().endsWith(".txt")) {
                // this file is an image link :)
                imageSources.push(val.toString())
            } else {
                // this file is a description, we want it.
                let response = await ky.get("http://localhost:8080/" + val);
                let responseText = await response.text()
                descriptions.push(responseText)
            }
        }
        this.setState({isLoaded: true})
        this.setState({imageSources: imageSources, descriptions: descriptions});
    }

    render() {
        const {error, isLoaded, imageSources, descriptions} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }

        let clubs = [];

        for (let i = 0; i < imageSources.length; i++) {
            let val = imageSources[i];
            clubs.push(<li key={i}>
                <SingleClub clubName={val.charAt(0).toUpperCase() + val.trim().replace(/\.[^/.]+$/, "").slice(1)}
                            description={descriptions[i]}
                            imageSource={'http://localhost:8080/' + imageSources[i]}
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