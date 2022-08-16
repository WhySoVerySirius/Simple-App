import React from "react";
import { useState } from "react";
import {useSelector} from 'react-redux';
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AdminTeamsActions from "./AdminTeamsActions";
import AdminTeamsSingleTeam from "./AdminTeamsSingleTeam";
import './css/AdminTeams.css';


export default function AdminTeams()
{
    const [open, setOpen] = useState();
    const actions = [open, setOpen];

    const {teamData, dataStatus} = useSelector(selectAdminData);
    if (teamData.length > 0) {
        return (
            <div className="admin-teams-grid">
                <div className="admin-teams-actions">
                    <AdminTeamsActions actions={actions}/>
                </div>
                <div className="admin-teams-display">
                    {
                        teamData && teamData.map(team=><AdminTeamsSingleTeam team={team} actions={actions} key={team.team_id}/>)
                    }
                </div>
            </div>
        )
    }
    if (dataStatus == 'loading') {
        return (
            <div className="">
                <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"/>
            </div>
        )
    }
    return (
        <PopOutContainer>
            Please wait...
        </PopOutContainer>
    )
}