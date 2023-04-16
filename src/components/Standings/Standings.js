import "./Standings.scss";
import {teamGenerator} from "../Models/LeagueModel/LeagueManager";
import { useState, useEffect } from "react";

export default function Standings() {
    const [teams, setTeams] = useState(
        JSON.parse(localStorage.getItem("teams")) || []
    );

    useEffect(() => {
        async function fetchTeams() {
            try {
                const team = await teamGenerator.generateTeam();
                setTeams(team);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeams();
    }, []);

    localStorage.setItem("teams", JSON.stringify(teams));

    const onClickHandler = () => {};
    return (
        <div className="standings-container">
            <h1>STANDINGS TABLE</h1>
        </div>
    );
}
