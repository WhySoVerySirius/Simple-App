import React from "react";
import AdminProjects from "./AdminProjects";
import AdminTeams from "./AdminTeams";
import AdminUsers from "./AdminUsers";

export default function AdminActionWindow({selected})
{
    if (selected && selected === 'teams') {
        return <AdminTeams/>
    }
    if (selected && selected === 'projects') {
        return <AdminProjects/>
    }
    if (selected && selected === 'users') {
        return <AdminUsers/>
    }
    return (
        <>
            No actions selected
        </>
    )
}