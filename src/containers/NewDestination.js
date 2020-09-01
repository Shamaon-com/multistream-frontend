import "./Home.css";
import React, { useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import youtube from "../img/platformIcons/youtube.svg";
import facebook from "../img/platformIcons/facebook.svg";
import instagram from "../img/platformIcons/instagram.svg";

export default function NewDestination(props) {


    const destinations = [
        {'name': 'youtube', 'icon': youtube, 'description': 'this is a test'},
        {'name': 'facebook', 'icon': facebook, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
        {'name': 'instagram', 'icon': instagram, 'description': 'this is a test'},
    ]

    const [didChoose, setDidChoose ] = useState(false);

    const appGrid = () => {
        console.log(destinations)
        return destinations.map((destination, i) =>
            <div className="destinationItem">
                <div>
                    <img className="destiantionIcon" src={destination.icon} />
                </div>
                <div>
                    {destination.name}
                </div>
            </div>
            
        );
    };


    return (
        <>
            <div className="destinationGrid">
                {appGrid()}
            </div>
        </>
    );
}