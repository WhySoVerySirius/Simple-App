import React ,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTeamData } from "../../../features/teamData/teamDataSlice";
import { setProjectFiles, setProjectMessages, setSelectedProject } from "../../../features/UsersProjectData/usersSelectedProjectActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SingleProject from "./SingleProject";
import './css/TeamProjects.css';


export default function TeamProjects()
{
    const team = useSelector(selectTeamData);
    const [clicked, setClicked] = useState();
    const dispatch = useDispatch();

    const fetchMessages = async() => {
        const response = await fetch(
            'http://localhost/api/teams/selected/project/messages',
            {
                method: "POST",
                headers: {
                    api_token: sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({project_id:clicked})
            }
        )
        const data = await response.json();
        if (data.status === 'success') {
            dispatch(setProjectMessages(data.data));
            dispatch(setSelectedProject(clicked));
        }
    }

    const fetchFiles = async() => {
        const response = await fetch(
            'http://localhost/api/project/files',
            {
                method: "POST",
                headers: {
                    api_token: sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({project_id:clicked})
            }
        )
        const data = await response.json();
        if (data.status === 'success') {
            dispatch(setProjectFiles(data.data));
            dispatch(setSelectedProject(clicked));
        }
    }

    useEffect(()=>{
        if (clicked) {
            fetchMessages();
            fetchFiles();
        }
    },[clicked])

    if ( team.selectedTeam && Object.keys(team.selectedTeam).length > 0) {
        const projects = team.selectedTeam.projects;
        return (
            <div className="selected-team-projects-container">
                <div className="title">
                    {Object.keys(projects).length === 0?'No active projects':'Projects:'}
                </div>
                <div className="selected-team-projects-inner-container">
                    {projects && projects.map(project=>
                        <SingleProject project={project} clickHandle={setClicked} clicked={clicked} key={project.project_id}/>
                    )}
                    
                </div>
            </div>
        )
    }
    return (
        <PopOutContainer>
            <p>No team selected</p>
        </PopOutContainer>
    )
}