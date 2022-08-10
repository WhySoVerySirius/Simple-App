import './HomePage.css';
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import { selectHomeData } from "../../../features/homeData/homeDataSlice";
import { useNavigate } from "react-router-dom";
import FullUserInfo from "./FullUserInfo";
import HomePageProjects from "./HomePageProjects";
import HomePageTeams from "./HomePageTeams";
import HomePageMessages from './HomePageMessages';

export default function HomePage()
{
    const navigate = useNavigate();

    return (
        <>
        <div className="grid-container">
            <div className="full-user-info">
                <FullUserInfo/>
            </div>
            <div className="homepage-projects">
                <div className="homepage-block-title">Assigned projects:</div>
                <HomePageProjects/>
            </div>
            <div className="homepage-teams">
                <div className="homepage-block-title">Assigned teams:</div>
                <HomePageTeams/>
            </div>
            <div className="homepage-messages">
                <div className="homepage-block-title">Unread messages:</div>
                <HomePageMessages/>
            </div>
        </div>
    </>
    )
}