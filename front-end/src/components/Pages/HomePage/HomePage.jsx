import './HomePage.css';
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import { selectHomeData } from "../../../features/homeData/homeDataSlice";
import { useNavigate } from "react-router-dom";
import FullUserInfo from "./FullUserInfo";
import HomePageProjects from "./HomePageProjects";
import HomePageTeams from "./HomePageTeams";

export default function HomePage()
{
    const navigate = useNavigate();

    return (
        <>
        <div className="grid-container">
            <div className="full-user-info">
                <FullUserInfo/>
            </div>
            <div className="projects">
                <HomePageProjects/>
            </div>
            <div className="teams">
                <HomePageTeams/>
            </div>
        </div>
    </>
    )
}