import React from "react";
import {useDispatch} from 'react-redux';
import useFetch from "../../../services/useFetch";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AssignedTeams from "./AssignedTeams";
import ProjectFiles from "./ProjectFiles";
import ProjectMessages from "./ProjectMessages";
import SelectedTeam from "./SelectedTeam";
import TeamMessages from "./TeamMessages";
import TeamProjects from "./TeamProjects";
import { setAllTeamsData } from "../../../features/teamData/teamDataActions";
import './Teams.css';

export default function Teams()
{
    const dispatch = useDispatch();
    const {data, error, isLoading} = useFetch('http://localhost/api/teams/all');
    if (error) <h1>Ooops something went wrong...</h1>;
    if (isLoading) <h1>Please wait...</h1>
    if (data) {
        dispatch(setAllTeamsData(data.data))
        return (
            <div className="teams-grid-container">
            <PopOutContainer passedClass={'span-two-columns'}>
                <AssignedTeams/>
            </PopOutContainer>
            <PopOutContainer passedClass={'top-right'}>
                <SelectedTeam/>
            </PopOutContainer>
            <PopOutContainer passedClass={'span-75'}>
                <TeamProjects/>
            </PopOutContainer>
            <PopOutContainer passedClass={'span-half-row'}>
                <TeamMessages/>
            </PopOutContainer>
            <PopOutContainer passedClass={'span-half-row'}>
                <ProjectMessages/>
            </PopOutContainer>
            <PopOutContainer passedClass={'span-row'}>
                <ProjectFiles/>
            </PopOutContainer>
        </div>
      )
    }
}