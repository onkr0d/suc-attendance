import React from "react"
import SingleClub from "./SingleClub";

class Clubs extends React.Component {


    render() {
        return <div className={"text-white font-extrabold"}>
            <ol className={"space-y-[5%]"}>
                <li><SingleClub clubName={"Example Club"} description={"Description"}
                                imageSource={"https://i.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8"}></SingleClub></li>
                <li><SingleClub></SingleClub></li>
                <li><SingleClub></SingleClub></li>
                <li><SingleClub></SingleClub></li>
            </ol>
        </div>
    }
}

export default Clubs;