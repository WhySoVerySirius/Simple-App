import './css/HomePage.css';
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import { useNavigate } from "react-router-dom";
import FullUserInfo from "./FullUserInfo";
import HomePageProjects from "./HomePageProjects";
import HomePageTeams from "./HomePageTeams";
import HomePageMessages from './HomePageMessages';
import PopOutContainer from '../../commonComponents/PopOutContainer';

export default function HomePage()
{
    const navigate = useNavigate();
    const {data} = useSelector(selectLoginData);

    useEffect(()=>{
        if (Object.keys(data).length === 0) {
            navigate('/login');
        }
    },[data])

    return (
        <>
        <div className="grid-container">
            <PopOutContainer passedClass={'span2'}>
                <div className="full-user-info">
                    <FullUserInfo/>
                </div>
            </PopOutContainer>
            <PopOutContainer>
                <div className="homepage-projects">
                    <div className="homepage-block-title">Assigned projects:</div>
                    <HomePageProjects/>
                </div>
            </PopOutContainer>
            <PopOutContainer>
                <div className="homepage-teams">
                    <div className="homepage-block-title">Assigned teams:</div>
                    <HomePageTeams/>
                </div>
            </PopOutContainer>
            <PopOutContainer passedClass={'span2'}>
                <div className="homepage-messages">
                    <div className="homepage-block-title">Unread messages:</div>
                    <HomePageMessages/>
                </div>
            </PopOutContainer>
        </div>
    </>
    )
}