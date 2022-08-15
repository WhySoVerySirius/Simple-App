import React from "react";
import { useState } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AdminTeamsSingleMember from "./AdminTeamsSingleMember";
import SimpleButton from '../../commonComponents/SimpleButton';
import { useEffect } from "react";
import AdminTeamsAddUser from "./AdminTeamsAddUser";
import { useDispatch } from "react-redux";
import { updateAdminTeamMembers } from "../../../features/adminData/adminDataActions";
import AdminTeamsSingleProject from "./AdminTeamsSingleProject";

export default function AdminTeamsSingleTeam({team, actions})
{
    const [open, setOpen] = actions;
    const [openMembers, setOpenMembers] = useState(false);
    const [openProjects, setOpenProjects] = useState(false);
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedUserPosition, setSelectedUserPosition] = useState('developer');
    const dispatch = useDispatch();
    const handlers = [setSelectedUser, setAddMemberOpen];
    console.log(team.projects);

    useEffect(()=>{
        if (selectedUser) {
            addMemberFetch();
            setSelectedUser();
        }
    }, [selectedUser])

    const addMemberFetch = () => {
        fetch(
            `http://localhost/api/admin/team/${team.team_id}/user/add`,
            {
                method: 'POST',
                headers: {
                    api_token: sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token'),
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({user_id: selectedUser.id, position: selectedUserPosition})
            }
        )
        .then(res=>res.json())
        .then(res=>{
            if (res.status === 'success') {
                dispatch(updateAdminTeamMembers({team_id: team.team_id, user:selectedUser}))
            }
        });
    }

    if (open === team.team_id) {
        return (
            <PopOutContainer passedStyle={{height: 'fit-content'}} passedClass={'clicked'}>
                <div className="">Team : {team.team_title} / Teamlead : {team.team_leader.name}</div>
                <PopOutContainer passedClass={'hovered'}>
                    <div className="" onClick={()=>setOpenMembers(!openMembers)}>Members</div>
                    {   openMembers
                            ?team.members && team.members.map(member=><AdminTeamsSingleMember team={team.team_id} data={member}/>)
                            :null
                    }
                    {
                        openMembers && !addMemberOpen
                            ?<SimpleButton type={'button'} value={'add a team member'} clickHandle={()=>setAddMemberOpen(true)}/>
                            :null
                    }
                    {
                        openMembers && addMemberOpen
                            ?<AdminTeamsAddUser team={team} changeHandle={setSelectedUserPosition} clickHandle={handlers}/>
                            :null
                    }
                </PopOutContainer>
                <PopOutContainer passedClass={'hovered'}>
                    <div className="" onClick={()=>setOpenProjects(!openProjects)}>Projects</div>
                    {
                        openProjects && team.projects
                            ?team.projects && team.projects.map(project=><AdminTeamsSingleProject data={project}/>)
                            :null
                    }
                    {
                        openProjects && !team.projects
                            ?<PopOutContainer>No projects assigned</PopOutContainer>
                            :null
                    }
                </PopOutContainer>
            </PopOutContainer>
        )
    }
    return (
        <PopOutContainer passedStyle={{height: 'fit-content'}} clickHandle={()=>setOpen(team.team_id)} passedClass={'hovered'}>
            <div className="">Team : {team.team_title} / Teamlead : {team.team_leader.name}</div>
        </PopOutContainer>
    )
}