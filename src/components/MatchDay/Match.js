import "./Match.scss";
import MatchSimulator from "./simulatorBeta";
import { Team, Statistic } from "./simulatorBeta";
import { useState, useEffect, useRef, useCallback } from "react";
import { useResultsContext } from "../LiftingStates/ResultContext";
import Button from "@mui/material/Button";
import Table from "../Standings/Table";
import Confet from "./Confetti/Confetti";
import { useNavigate } from "react-router-dom";
import WinnerPodium from "./WinnerPodium/WinnerPodium";



export default function MatchDay() {
    const getCountFromLocalStorage = useCallback(() => {
        let count = JSON.parse(localStorage.getItem("loggedUser")).count;
        const savedCount = count ?? 0;
        return savedCount > 8 ? 0 : savedCount;
    });
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchStatistic, setMatchStatistic] = useState(null);
    const [count, setCount] = useState(getCountFromLocalStorage());
    const [showFinishButton, setShowFinishButton] = useState(false);
    const [round, setRound] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.fixtures?.[count] ||
        JSON.parse(sessionStorage.getItem("loggedUser"))?.fixtures[count]
    );
    const [legOne, setLegOne] = useState(round?.slice(0, 5));
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [awayTeamName, setAwayTeamName] = useState("");
    const [awayCorners, setAwayCorners] = useState(0);
    const [awayFouls, setAwayFouls] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);
    const [awayPossession, setAwayPossession] = useState(0);
    const [awayRedCards, setAwayRedCards] = useState(0);
    const [awayShotsOnTarget, setAwayShotsOnTarget] = useState(0);
    const [awayThrowIns, setAwayThrowIns] = useState(0);
    const [awayYellowCards, setAwayYellowCards] = useState(0);
    const [homeTeamName, setHomeTeamName] = useState("");
    const [homeCorners, setHomeCorners] = useState(0);
    const [homeFouls, setHomeFouls] = useState(0);
    const [homeGoals, setHomeGoals] = useState(0);
    const [homePossession, setHomePossession] = useState(0);
    const [homeRedCards, setHomeRedCards] = useState(0);
    const [homeShotsOnTarget, setHomeShotsOnTarget] = useState(0);
    const [homeThrowIns, setHomeThrowIns] = useState(0);
    const [homeYellowCards, setHomeYellowCards] = useState(0);
    const [matchSimulator, setMatchSimulator] = useState(null);
    const [logs, setLogs] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [fixtures, setFixtures] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).fixtures
    );
    const [userTeam, setUserTeam] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );
    const [showNextRoundButton, setShowNextRoundButton] = useState(false);
    const [showMatchInfo, setShowMatchInfo] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);
    const [league, setLeague] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).leagueResults ||
        JSON.parse(localStorage.getItem("loggedUser")).league ||
        []
    );
    const [leagueResults, setleagueResults] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).leagueResults || []
    );
    const [results, setResults, navBoolean, setNavBoolean] = useResultsContext();
    const [test, setTest] = useState([]);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [homeLogo, setHomeLogo] = useState("");
    const [awayLogo, setAwayLogo] = useState("");
    const [myMatchStats, setMyMatchStats] = useState([]);
    const navigate = useNavigate();
    const [history, setHistory] = useState(
        JSON.parse(sessionStorage.getItem("myHistory")) || []
    );
    const [showConfet, setShowConfet] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [matchCreated, setMatchCreated] = useState(false);
    const scrollContainerRef = useRef(null);


    useEffect(() => {
        if (!showStartButton && showNextRoundButton && count >= 9) {
            setShowConfet(true);
            setTimeout(() => setShowConfet(false), 20000);
        }
    }, [showStartButton, showNextRoundButton, count]);

    useEffect(() => {
        setRound(
            JSON.parse(localStorage.getItem("loggedUser"))?.fixtures?.[count] ||
            JSON.parse(sessionStorage.getItem("loggedUser"))?.fixtures[
            count
            ]
        );
    }, [count]);




    const findUserAndOpponent = (fixtures, userObject) => {
        for (let i = count; i < fixtures.length; i++) {
            for (let j = 0; j < fixtures[i].length; j++) {
                const currentUserIndex = fixtures[i][j].findIndex(
                    (obj) => obj.name === userObject.team.name
                );

                if (currentUserIndex !== -1) {
                    const opponentIndex = currentUserIndex === 0 ? 1 : 0;
                    if (
                        fixtures[i][j][opponentIndex].hasOwnProperty("team") &&
                        fixtures[i][j][opponentIndex].hasOwnProperty("venue")
                    ) {
                        return {
                            userPosition: [i, j, currentUserIndex],
                            opponentPosition: [i, j, opponentIndex],
                        };
                    }
                }
            }
        }
    };

    const updateLoggedUserCount = () => {
        if (count <= 8) {
            setCount(count + 1);
        } else {
            setCount(0);
        }

        const updatedUserTeam = { ...userTeam, count: count + 1 };
        setUserTeam(updatedUserTeam);
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((user) => {
            if (user.username === userTeam.username) {
                return updatedUserTeam;
            } else {
                return user;
            }
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUserTeam));
    };

    const setNextRoundTeams = (userPosition, opponentPosition) => {
        console.log("s")
        const nextHomeTeam =
            fixtures[userPosition[0]][userPosition[1]][userPosition[2]];
        const nextAwayTeam =
            fixtures[opponentPosition[0]][opponentPosition[1]][
            opponentPosition[2]
            ];

        setHomeLogo(nextHomeTeam?.team?.logo || nextHomeTeam?.logo);
        setAwayLogo(nextAwayTeam?.team?.logo || nextAwayTeam?.logo);

        setHomeTeam(
            new Team(
                nextHomeTeam?.team?.name || nextHomeTeam?.name,
                nextHomeTeam?.team?.players?.slice(0, 11) ||
                nextHomeTeam?.players?.slice(0, 11)
            )
        );
        setAwayTeam(
            new Team(
                nextAwayTeam?.team?.name || nextAwayTeam?.name,
                nextAwayTeam?.team?.players?.slice(0, 11) ||
                nextAwayTeam?.players?.slice(0, 11)
            )
        );
    };

    const getUserTeamAndOpponent = () => {
        let userMatch = findUserAndOpponent(fixtures, userTeam);

        if (userMatch) {
            const isUserAway = userMatch.userPosition[2] === 1;

            if (isUserAway) {
                setNextRoundTeams(
                    userMatch.opponentPosition,
                    userMatch.userPosition
                );
            } else {
                setNextRoundTeams(
                    userMatch.userPosition,
                    userMatch.opponentPosition
                );
            }

            setShowNextRoundButton(false);
        } else {
            console.log("User match not found");
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [logs]);

    const handleNextRound = () => {
        window.scrollTo({
            top: 0,
        });

        setShowNextRoundButton(false);
        setShowMatchInfo(false);
        setMatchStarted(false);
        setMatchStatistic(null);
        setLogs([]);
        getUserTeamAndOpponent();
    };

    useEffect(() => {
        setAwayCorners(matchSimulator?.matchStatistic.awayCornerKicks);
        setAwayFouls(matchSimulator?.matchStatistic.awayFouls);
        setAwayGoals(matchSimulator?.matchStatistic.awayGoals);
        setAwayPossession(matchSimulator?.matchStatistic.awayPossession);
        setAwayRedCards(matchSimulator?.matchStatistic.awayRedCards);
        setAwayShotsOnTarget(matchSimulator?.matchStatistic.awayShotsOnTarget);
        setAwayTeamName(matchSimulator?.matchStatistic.awayTeam);
        setAwayYellowCards(matchSimulator?.matchStatistic.awayYellowCards);
        setHomeCorners(matchSimulator?.matchStatistic.homeCornerKicks);
        setHomeFouls(matchSimulator?.matchStatistic.homeFouls);
        setHomeGoals(matchSimulator?.matchStatistic.homeGoals);
        setHomePossession(matchSimulator?.matchStatistic.homePossession);
        setHomeRedCards(matchSimulator?.matchStatistic.homeRedCards);
        setHomeShotsOnTarget(matchSimulator?.matchStatistic.homeShotsOnTarget);
        setHomeTeamName(matchSimulator?.matchStatistic.homeTeam);
        setHomeYellowCards(matchSimulator?.matchStatistic.homeYellowCards);
        setHomeThrowIns(matchSimulator?.matchStatistic.homeThrowIns);
        setAwayThrowIns(matchSimulator?.matchStatistic.awayThrowIns);
        setMyMatchStats(matchSimulator?.matchStatistic);
    }, [
        matchSimulator?.matchStatistic.awayGoals,
        matchSimulator?.matchStatistic.homeGoals,
        matchSimulator?.matchStatistic.awayCornerKicks,
        matchSimulator?.matchStatistic.awayFouls,
        matchSimulator?.matchStatistic.awayGoals,
        matchSimulator?.matchStatistic.awayPossession,
        matchSimulator?.matchStatistic.awayRedCards,
        matchSimulator?.matchStatistic.awayShotsOnTarget,
        matchSimulator?.matchStatistic.awayTeam,
        matchSimulator?.matchStatistic.awayYellowCards,
        matchSimulator?.matchStatistic.homeThrowIns,
        matchSimulator?.matchStatistic.awayThrowIns,
        timerActive,
    ]);

    const simulateAllGamesFromTheLeg = () => {
        let results = [];
        let match;
        const myTeamName = userTeam.team.name;
        let legOne = (
            JSON.parse(localStorage.getItem("loggedUser"))?.fixtures?.[count] ||
            JSON.parse(sessionStorage.getItem("loggedUser"))?.fixtures[count]
        ).slice(0, 5);
        for (let i = 0; i < legOne.length; i++) {
            if (
                (legOne[i][0]?.team?.name || legOne[i][0].name) ===
                myTeamName ||
                (legOne[i][1]?.team?.name || legOne[i][1].name) === myTeamName
            ) {
                continue;
            }

            const homeTeam = new Team(
                legOne[i][0]?.team?.name || legOne[i][0].name,
                legOne[i][0]?.team?.players || legOne[i][0].players
            );
            const awayTeam = new Team(
                legOne[i][1]?.team?.name || legOne[i][1].name,
                legOne[i][1]?.team?.players || legOne[i][0].players
            );

            match = new MatchSimulator(homeTeam, awayTeam);
            const stats = match?.matchStatistic;
            results.push(stats);
        }

        setAllResults((prev) => [...prev, results]);

        return results;
    };

    const handleStartMatch = () => {
        setNavBoolean(true)
        let timerId = setInterval(() => {
            setTimer((prev) => {
                if (prev >= 90) {
                    clearInterval(timerId);
                    return prev;
                }
                return prev + 1;
            });
        }, 200);

        sessionStorage.removeItem("loggedUser");
        setTimer(0);
        setTimerActive(true);
        setMatchStarted(true);
        setShowMatchInfo(true);
        setShowFinishButton(true);
        setTest(simulateAllGamesFromTheLeg());
        updateLoggedUserCount();
        // setMatchCreated(true)

        const logCallback = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
        };

        setMatchSimulator((prevState) => {
            const matchSim = new MatchSimulator(
                homeTeam,
                awayTeam,
                logCallback
            );

            setMatchStatistic(matchSim.matchStatistic);
            return matchSim;
        });

        return () => {
            clearInterval(timerId);
        };
    };
    const logCallback = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
    };

    useEffect(() => {
        getUserTeamAndOpponent();

    }, []);

    useEffect(() => {
        if (isMounted && matchCreated) {
            const prevHistory =
                JSON.parse(sessionStorage.getItem("myHistory")) || [];
            const updatedHistory = [...prevHistory, results];
            sessionStorage.setItem("myHistory", JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
            setMatchCreated(false);
        } else {
            setIsMounted(true);
        }
    }, [results, matchCreated]);

    function handleFinishMatch() {
        setNavBoolean(false)

        updateTable(test, myMatchStats);

        if (homeTeam && awayTeam) {
            const updatedHomeTeam = {
                ...homeTeam,
                points: homeTeam.points + 1,
            };

            const updatedAwayTeam = {
                ...awayTeam,
                points: awayTeam.points + 1,
            };

            setHomeTeam(updatedHomeTeam);
            setAwayTeam(updatedAwayTeam);
            setShowFinishButton(false);
            setShowStartButton(false);
            setShowNextRoundButton(true);
            setTimerActive(false);
            setMatchCreated(true);
        } else {
            console.log("HomeTeam or AwayTeam is null");
        }
    };



    function updateTable(testa, myMatchStats) {
        testa = [...testa, myMatchStats];
        setResults(testa);

        let leagueTeamsToBeExportedToLocalStorage = league?.slice();
        for (let i = 0; i < testa.length; i++) {
            let homeTeam = testa[i].homeTeam;
            let awayTeam = testa[i].awayTeam;
            let homeGoalsa = Number(testa[i].homeGoals);
            let awayGoalsa = Number(testa[i].awayGoals);
            for (let j = 0; j < league.length; j++) {
                let team =
                    leagueTeamsToBeExportedToLocalStorage[j]?.team ||
                    leagueTeamsToBeExportedToLocalStorage[j];
                if (homeTeam === (team?.name || team) && homeTeam) {
                    team.conceededgoals += awayGoalsa;
                    team.scoredgoals += homeGoalsa;
                } else if (awayTeam === (team?.name || team) && awayTeam) {
                    team.conceededgoals += homeGoalsa;
                    team.scoredgoals += awayGoalsa;
                }

                if (
                    homeGoalsa > awayGoalsa &&
                    homeTeam === (team?.name || team)
                ) {
                    team.wins += 1;
                    team.points += 3;
                } else if (
                    homeGoalsa < awayGoalsa &&
                    homeTeam === (team?.name || team)
                ) {
                    team.loses += 1;
                } else if (
                    homeGoalsa === awayGoalsa &&
                    homeTeam === (team?.name || team)
                ) {
                    team.draws += 1;
                    team.points += 1;
                }

                if (
                    awayGoalsa > homeGoalsa &&
                    awayTeam === (team?.name || team)
                ) {
                    team.wins += 1;
                    team.points += 3;
                } else if (
                    awayGoalsa < homeGoalsa &&
                    awayTeam === (team?.name || team)
                ) {
                    team.loses += 1;
                } else if (
                    awayGoalsa === homeGoalsa &&
                    awayTeam === (team?.name || team)
                ) {
                    team.draws += 1;
                    team.points += 1;
                }
            }
        }

        setleagueResults(leagueTeamsToBeExportedToLocalStorage);
        const updateLeagueResults = {
            ...userTeam,
            leagueResults: leagueTeamsToBeExportedToLocalStorage,
        };

        setUserTeam(updateLeagueResults);
        localStorage.setItem("loggedUser", JSON.stringify(updateLeagueResults));
    }

    const handleMySeason = () => {
        const user = JSON.parse(localStorage.getItem("loggedUser"));

        window.scrollTo({
            top: 0,
        });

        user.fixtures = null;
        user.league = [];
        user.team.conceededgoals = 0;
        user.team.draws = 0;
        user.team.loses = 0;
        user.team.points = 0;
        user.team.scoredgoals = 0;
        user.team.wins = 0;
        user.leagueResults = null;
        user.count = 0;
        setCount(0);

        sessionStorage.setItem(
            "loggedUser",
            JSON.stringify(JSON.parse(localStorage.getItem("loggedUser")))
        );

        localStorage.setItem("loggedUser", JSON.stringify(user));

        navigate("/my-season");
    };

    return (
        <div className="match-container">
            {!matchStarted && (
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartMatch}
                >
                    Start Match
                </Button>
            )}
            {matchSimulator?.matchStatistic && showMatchInfo && (
                <>
                    <div className="result-teams-container">
                        <h4 className="match-timer">
                            {timer < 90 ? (
                                <>
                                    <div >Time: {timer} minutes</div>
                                    <br/>
                                    <div>Round {count}</div>
                                </>
                            ) : (
                                "Match Finished"
                            )}
                        </h4>

                        <div className="result-teams-container-wrapper">
                            <div className="home-team-container">
                                <img
                                    width="100"
                                    height="100"
                                    src={homeLogo}
                                    alt="logo"
                                ></img>
                                <h2>{homeTeamName}</h2>
                                <h2>{homeGoals}</h2>
                            </div>
                            <span>-</span>
                            <div className="away-team-container">
                                <h2>{awayGoals}</h2>

                                <h2>{awayTeamName}</h2>
                                <img
                                    width="100"
                                    height="100"
                                    src={awayLogo}
                                    alt="logo"
                                ></img>
                            </div>
                        </div>
                    </div>

                    <div className="tableContainer">
                        <table className="table-match">
                            <thead>
                                <tr>
                                    <th>HOME</th>
                                    <th>STAT</th>
                                    <th>AWAY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{awayCorners}</td>
                                    <td>Corners</td>
                                    <td>{homeCorners}</td>
                                </tr>
                                <tr>
                                    <td>{awayFouls}</td>
                                    <td>Fouls</td>
                                    <td>{homeFouls}</td>
                                </tr>
                                <tr>
                                    <td>{homePossession}</td>
                                    <td>Possession</td>
                                    <td>{awayPossession}</td>
                                </tr>
                                <tr>
                                    <td>{awayYellowCards}</td>
                                    <td>YellowCards</td>
                                    <td>{homeYellowCards}</td>
                                </tr>
                                <tr>
                                    <td>{awayRedCards}</td>
                                    <td>RedCards</td>
                                    <td>{homeRedCards}</td>
                                </tr>
                                <tr>
                                    <td>{awayShotsOnTarget}</td>
                                    <td>Shots</td>
                                    <td>{homeShotsOnTarget}</td>
                                </tr>
                                <tr>
                                    <td>{awayThrowIns}</td>
                                    <td>ThrowIns</td>
                                    <td>{homeThrowIns}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="logs-container" ref={scrollContainerRef}>
                            <h3>Comments:</h3>
                            <ul>
                                {logs.map((log, index) => (
                                    <li key={index} >{log}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
            {showFinishButton && matchStarted && (
                <Button variant="contained" onClick={handleFinishMatch} disabled={timer < 90}>
                    Finish Match
                </Button>
            )}
            {!showStartButton && showNextRoundButton && count < 9 && (
                <Button variant="contained" onClick={handleNextRound}>
                    Next Round
                </Button>
            )}
            {!showStartButton &&
                showNextRoundButton &&
                (count < 9 ? null : (
                    <div className="season-end-container">
                        <h1>Championship Over</h1>
                        <h2>Final Standings</h2>
                        <div className="wrapper-table-podium">
                            <Table
                                leagueResults={leagueResults.sort(
                                    (a, b) =>
                                        (b?.team?.points ||
                                            0 ||
                                            b?.points ||
                                            0) -
                                        (a?.team?.points || 0 || a?.points || 0)
                                )}
                            />
                            <WinnerPodium
                                className="team-badges-podium-container"
                                leagueResults={leagueResults
                                    .sort(
                                        (a, b) =>
                                            (b?.team?.points ||
                                                0 ||
                                                b?.points ||
                                                0) -
                                            (a?.team?.points ||
                                                0 ||
                                                a?.points ||
                                                0)
                                    )
                                    .slice(0, 3)}
                            />
                        </div>

                        <div className="btn-container-matchday">
                            <Button
                                className="my-season-btn"
                                variant="contained"
                                onClick={handleMySeason}
                            >
                                My Season
                            </Button>
                            {showConfet && <Confet />}
                        </div>
                    </div>
                ))}
        </div>
    );
}
