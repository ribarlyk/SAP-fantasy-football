// import React, { useState } from 'react';
// import { Button, TextField, Stack, Avatar, Input, Box, FormControl } from '@mui/material';

// const UserProfile = () => {
//   const [inputValues, setInputValues] = useState({ name: '', surname: '', favoriteTeam: '' });
//   const [savedValues, setSavedValues] = useState({ name: '', surname: '', favoriteTeam: '' });
//   const [isSaved, setIsSaved] = useState(false);
//   const [imageURL, setImageURL] = useState('');

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;
//       const validImageTypes = ['image/jpeg', 'image/png'];
//       if (validImageTypes.includes(fileType)) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setImageURL(e.target.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert('Please upload a PNG or JPG image.');
//       }
//     }
//   };

//   const handleSave = () => {
//     setSavedValues(inputValues);
//     setIsSaved(true);
//   };

//   const handleRedo = () => {
//     setInputValues(savedValues);
//   };

//   return (
//     <Stack spacing={2}>
//       <FormControl>
//         <Input
//           id="avatar-input"
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleImageChange}
//           inputProps={{ display: 'none' }}
//         />
//         <label htmlFor="avatar-input">
//           <Box component="span" sx={{ cursor: 'pointer' }}>
//             <Avatar sx={{ width: 100, height: 100 }} src={imageURL} />
//           </Box>
//         </label>
//       </FormControl>
//       <TextField
//         name="name"
//         label="Name"
//         variant="outlined"
//         value={inputValues.name}
//         onChange={handleInputChange}
//       />
//       <TextField
//         name="surname"
//         label="Surname"
//         variant="outlined"
//         value={inputValues.surname}
//         onChange={handleInputChange}
//       />
//       <TextField
//         name="favoriteTeam"
//         label="Favorite Team"
//         variant="outlined"
//         value={inputValues.favoriteTeam}
//         onChange={handleInputChange}
//       />
//       <Button variant="contained" onClick={handleSave}>
//         Save
//       </Button>
//       {isSaved && (
//         <Button variant="contained" onClick={handleRedo}>
//           Redo
//         </Button>
//       )}
//     </Stack>
//   );
// };

// export default UserProfile;





// import React, { useState } from 'react';
// import { Container, Grid, TextField, Avatar, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeProfilePic, changeUserName } from './store/profileSlice';
// import './Profile.scss';

// const ProfilePage = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [sex, setSex] = useState('');
//   const profilePic = useSelector(state => state.profile.profilePic);
//   const username = useSelector(state => state.profile.username);

//   const dispatch = useDispatch();

//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       const base64String = reader.result;
//       dispatch(changeProfilePic(base64String));
//     };

//     reader.onerror = (error) => {
//       console.error('Error converting file to base64:', error);
//     };
//   };

//   return (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={6}>
//           <label htmlFor="hiddenFileInput" style={{ cursor: 'pointer' }}>
//             <Avatar
//               alt="Profile"
//               src={profilePic}
//               sx={{ width: 150, height: 150 }}
//               className="profilePic"
//             />
//             <input
//               type="file"
//               id="hiddenFileInput"
//               onChange={handleFileInputChange}
//               style={{ display: 'none' }}
//             />
//           </label>
//           <TextField
//             label="Email"
//             value={username}
//             onChange={(e) => dispatch(changeUserName(e.target.value))}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="Date of Birth"
//             type="date"
//             value={dateOfBirth}
//             onChange={(e) => setDateOfBirth(e.target.value)}
//             fullWidth
//           />
//           <FormControl fullWidth>
//             <InputLabel>Sex</InputLabel>
//             <Select
//               value={sex}
//               onChange={(e) => setSex(e.target.value)}
//             >
//               <MenuItem value="">
//                 <em>Select...</em>
//               </MenuItem>
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, TextField, Avatar, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePic } from '../store/profileSlice';
import './Profile.scss';
import { ProfileProvider } from '../LiftingStates/ProfileContext';
import { useProfileContext } from '../LiftingStates/ProfileContext';




const teams = [
    { name: 'Arsenal', logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUQ42UcCuWB0vWYBhSN0cKgoK0DkyZCCYp8_IGEeWPw&s" },
    { name: 'Liverpool', logo: "https://www.freepnglogos.com/uploads/liverpool-logo-0.png" },
    { name: 'Manchester United', logo: "https://www.freepnglogos.com/uploads/manchester-united-logo-png/manchester-united-logo-manchester-united-wallpapers-wallpaper-cave-0.png" },
    { name: 'Newcastle', logo: "https://1000logos.net/wp-content/uploads/2021/05/Newcastle-United-logo.png" },
    { name: "Aston Villa ", logo: "https://logodownload.org/wp-content/uploads/2019/10/aston-villa-logo-0.png" },
    { name: "Leeds United", logo: "https://cdn.freebiesupply.com/logos/large/2x/leeds-united-afc-3-logo-png-transparent.png" },
    { name: "Chelsea", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwkkXH94svbGmL_kg4nYyxTH2bp7qVv0Dj5uBMNm1gA&s" },
    { name: "Everton", logo: "https://logodownload.org/wp-content/uploads/2019/04/everton-logo-escudo-0.png" },
    { name: "Leicester City", logo: "https://logodownload.org/wp-content/uploads/2019/05/leicester-city-logo-2.png" },
    { name: "Nottingham Forest", logo: "https://cdn.freebiesupply.com/logos/large/2x/nottingham-forest-fc-logo-png-transparent.png" },
    { name: "Southampton", logo: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c4ea.png" },
    { name: "West Ham United", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MG4a241NMGspPFDAJeoFI9TrfPcTqdYVw2VErwGJ&s" },
    { name: "Crystal Palace", logo: "https://www.clipartmax.com/png/middle/327-3279028_free-crystal-palace-f-c-logo-png-transparent-images-logo-png-crystal.png" },
    { name: "Brighton", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbFh-dDnHgGbYK_jdBDTicoFc_VnWK7jVP8kJJ115yQ&s" },
    { name: "Wolverhampton Wanderers", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-l3w4i6_jrSZWwWDEEzKseZsQhmPP9w04CqtgBr-qw&s" },
    { name: "Manchester City", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Nw_R-JJ-sDdmthEyMlJvpyDHwlRrOCo5RNkxRdX3XA&s" },
    { name: "Fulham", logo: "https://logos-download.com/wp-content/uploads/2018/09/FC_Fulham_Logo.png" },
    { name: "Bournemouth", logo: "https://logodownload.org/wp-content/uploads/2019/10/bournemouth-fc-logo-0.png" },
    { name: "Brentford", logo: "https://logodownload.org/wp-content/uploads/2022/09/brentford-fc-logo-1.png" },
    { name: "Tottenham Hotspur", logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4ee.png" }

];

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState('');
    const [favoriteTeamLogo, setFavoriteTeamLogo] = useState('');
    const [isEditing, setIsEditing] = useState(JSON.parse(localStorage.getItem("loggedUser"))?.profile?.isEditing ? true : false);
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedUser")));
    const [profilePic, setProfilePic] = useState(loggedInUser?.profilePic || '');
    const [favoriteTeamMatches, setFavoriteTeamMatches] = useState([]);
    const [userFavoriteTeam, setUserFavoriteTeam] = useState('');
    const [filter, setFilter] = useState('all');
    const [filteredMatches, setFilteredMatches] = useState(favoriteTeamMatches);
    const [{ loggedUser, setLoggedUser, updateProfilePic }] = useProfileContext();
    const [tempProfilePic, setTempProfilePic] = useState('');


    // const [lastRoundMatches, setLastRoundMatches] = useState([]);



    useEffect(() => {
        const userTeamName = loggedInUser?.team?.name;

        if (userTeamName) {
            setUserFavoriteTeam(userTeamName);

            const matches = JSON.parse(sessionStorage.getItem('seasonHistory'));

            if (matches) {
                const allRoundsFilteredMatches = matches.reduce((acc, round) => {
                    const filteredMatches = round.filter(
                        (match) =>
                            match.homeTeam === userTeamName || match.awayTeam === userTeamName
                    );
                    return [...acc, ...filteredMatches];
                }, []);

                setFavoriteTeamMatches(allRoundsFilteredMatches);
            }
        }
        console.log("logwam2");

    }, []);

    // const removeDuplicates = (matches, favoriteTeam) => {
    //     const uniqueMatches = [];
    //     const matchKeys = new Set();

    //     matches.forEach((match) => {
    //         const matchKey = `${match.homeTeam}-${match.awayTeam}-${match.homeGoals}-${match.awayGoals}`;

    //         if (!matchKeys.has(matchKey) && (match.homeTeam === favoriteTeam || match.awayTeam === favoriteTeam)) {
    //             uniqueMatches.push(match);
    //             matchKeys.add(matchKey);
    //         }
    //     });

    //     return uniqueMatches;
    // };


    useEffect(() => {
        const filterMatches = () => {
            const teamName = loggedInUser.team.name;
            switch (filter) {
                case 'wins':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName && match.homeGoals > match.awayGoals) ||
                        (match.awayTeam === teamName && match.awayGoals > match.homeGoals)
                    ));
                    break;
                case 'draws':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName || match.awayTeam === teamName) && match.homeGoals === match.awayGoals
                    ));
                    break;
                case 'losses':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName && match.homeGoals < match.awayGoals) ||
                        (match.awayTeam === teamName && match.awayGoals < match.homeGoals)
                    ));
                    break;
                default:
                    setFilteredMatches(favoriteTeamMatches);
            }
            console.log("logwam");
        };
        filterMatches();
    }, [filter, favoriteTeamMatches, loggedInUser]);
    

    // useEffect(() => {
    //     const storedMatches = JSON.parse(localStorage.getItem("seasonHistory")) || [];
    //     const uniqueMatches = removeDuplicates(storedMatches, userFavoriteTeam);
    //     localStorage.setItem("matches", JSON.stringify(uniqueMatches));

    //     const filteredMatches = filterMatches(uniqueMatches, filter, userFavoriteTeam);
    //     setFilteredMatches(filteredMatches);
    // }, [filter, userFavoriteTeam]);
    
    



    // const profilePic = useSelector(state => state.profile.profilePic);

    const dispatch = useDispatch();

    // const handleFileInputChange = (event) => {
    //     const file = event.target.files[0];

    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     reader.onload = () => {
    //         const base64String = reader.result;
    //         // dispatch(changeProfilePic(base64String)); // Remove this line
    //         setProfilePic(base64String); // Add this line

    //         // Save the profile picture in the loggedInUser object
    //         const updatedLoggedInUser = { ...loggedInUser, profilePic: base64String };
    //         setLoggedInUser(updatedLoggedInUser);

    //         // Save the updatedLoggedInUser object in the local storage
    //         localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));
    //     };

    //     reader.onerror = (error) => {
    //         console.error('Error converting file to base64:', error);
    //     };
    // };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setTempProfilePic(e.target.result);

                // Updating the loggedInUser object
                const updatedLoggedInUser = { ...loggedInUser, profilePic: reader.result };
                setLoggedInUser(updatedLoggedInUser);
    
                // Saving the updatedLoggedInUser object in the local storage
                localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));
    
                // Updating the "users" array in local storage
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map(user => {
                    if (user.username === loggedInUser.username) {
                        // Update the user with the profile picture
                        return updatedLoggedInUser;
                    }
                    return user;
                });
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            };
            reader.readAsDataURL(file);
        }
    };
    

    const handleSaveEdit = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        const updateUserData = () => {

            const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

            setLoggedInUser(loggedUser);
            setFirstName(loggedUser?.profile?.firstName);
            setLastName(loggedUser?.profile?.lastName);
            setDateOfBirth(loggedUser?.profile?.dateOfBirth);
            setFavoriteTeam(loggedUser?.profile?.favoriteTeam);
            setFavoriteTeamLogo(teams?.find((team) => team?.name === loggedUser?.profile?.favoriteTeam)?.logo || '');
            //   setIsEditing(loggedInUser?.profile?.isEditing);

            const isProfileComplete = loggedInUser?.profile?.firstName &&
                loggedInUser?.profile?.lastName &&
                loggedInUser?.profile?.dateOfBirth &&
                loggedInUser?.profile?.favoriteTeam &&
                loggedInUser?.profilePic;

            setIsEditing(!isProfileComplete);

        };

        updateUserData()
        console.log(isEditing);
    }, [profilePic]);

    const handleSave = () => {
        // debugger;
        // handleSaveEdit();
        setIsEditing(false);
        console.log(isEditing);

        if (tempProfilePic) {
            setProfilePic(tempProfilePic);
            updateProfilePic(loggedInUser.username, tempProfilePic);
        }

        const updatedProfile = {
            firstName,
            lastName,
            dateOfBirth,
            favoriteTeam,
            isEditing: false
        };

        // Updating the loggedInUser object
        const updatedLoggedInUser = { ...loggedInUser, profile: updatedProfile };
        setLoggedInUser(updatedLoggedInUser);
        setFirstName(updatedLoggedInUser?.profile?.firstName);
        setLastName(updatedLoggedInUser?.profile?.lastName);
        setDateOfBirth(updatedLoggedInUser?.profile?.dateOfBirth);
        setFavoriteTeam(updatedLoggedInUser?.profile?.favoriteTeam);
        setFavoriteTeamLogo(teams?.find((team) => team?.name === updatedLoggedInUser?.profile?.favoriteTeam)?.logo || '');


        // Saving the updatedLoggedInUser object in the local storage
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));

        // Updating the "users" array in local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(user => {
            if (user.username === loggedInUser.username) {
                // Update the user with the profile picture
                return { ...updatedLoggedInUser, profilePic: profilePic };
            }
            return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };


    const handleEdit = () => {
        setIsEditing(true);

        const updatedProfile = {
            firstName,
            lastName,
            dateOfBirth,
            favoriteTeam,
            isEditing: true
        };

        // Updating the loggedInUser object
        const updatedLoggedInUser = { ...loggedInUser, profile: updatedProfile };


        // Saving the updatedLoggedInUser object in the local storage
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));
    };

    const handleTeamChange = (event) => {
        const team = teams.find(t => t.name === event.target.value);
        setFavoriteTeam(team.name);
        setFavoriteTeamLogo(team.logo);
    };

    return (
        <Container className='profile-main-container'>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', }}>
                <Grid item xs={6} /* className="profile-card" */>
                    <Grid container spacing={3} className="profile-card" sx={{ width: "100%", minHeight: "100%" }}>
                        <Grid item xs={12}>
                            <label htmlFor="hiddenFileInput" style={{ cursor: 'pointer' }}>
                                <Avatar
                                    alt="Profile"
                                    src={profilePic}
                                    sx={{ width: 150, height: 150 }}
                                    className="profilePic"
                                />
                                <input
                                    type="file"
                                    id="hiddenFileInput"
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </Grid>
                        {isEditing ? (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '20px' }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '20px' }}
                                    />
                                    <TextField
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '20px' }}
                                    />
                                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                                        <InputLabel>Favorite Team</InputLabel>
                                        <Select label="Favorite Team" value={favoriteTeam} onChange={handleTeamChange}>
                                            <MenuItem value="">
                                                <em>Select...</em>
                                            </MenuItem>
                                            {teams.map((team) => (
                                                <MenuItem key={team.name} value={team.name}>
                                                    {team.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12}>
                                    <h2>First-name: {firstName}</h2>
                                    <h2>Last-name: {lastName}</h2>
                                    <h2>Dat-of-birth: {dateOfBirth}</h2>
                                    <h2> Favourite team: {favoriteTeam}</h2>
                                    <img src={favoriteTeamLogo} alt={favoriteTeam} width="100" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={6} className="profile-card">
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel>Filter</InputLabel>
                            <Select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                label="Filter"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="wins">Wins</MenuItem>
                                <MenuItem value="draws">Draws</MenuItem>
                                <MenuItem value="losses">Losses</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="history-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <h3>Matches involving {userFavoriteTeam}:</h3>
                            {filteredMatches.length ? (
                                <ul>
                                    {filteredMatches.map((match, index) => (
                                        <li key={index} className="history-matches">
                                            {match.homeTeam} {match.homeGoals} - {match.awayGoals} {match.awayTeam}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No matches found for {userFavoriteTeam}.</p>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage


