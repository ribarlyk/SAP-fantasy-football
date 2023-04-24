import { useState, useEffect } from 'react';

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.team = null;
    this.league = [];
    this.fixtures = null;
    this.leagueResults = null;
    this.count = 0;
    this.profile = null;
    this.profilePic = null;
  }
}

const useUserManager = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || [
      new User('Pavkata', 'samolevski'),
      new User('DLG', 'samolitex'),
    ],
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      const foundUser = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (foundUser) {
        setLoggedUser(foundUser);
        localStorage.setItem('loggedUser', JSON.stringify(foundUser));
        resolve(foundUser);
      } else {
        reject('Wrong credentials');
      }
    });
  };

  const register = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      const foundUser = users.find((user) => user.username === username);

      if (!foundUser) {
        const newUser = new User(username, password);
        setUsers([...users, newUser]);
        resolve(newUser);
      } else {
        reject('Username already taken');
      }
    });
  };

  const isNameTaken = (username) => {
    const names = users.map((obj) => obj.username);
    return !names.includes(username.toLowerCase());
  };

  return { loggedUser, users, login, register, isNameTaken };
};

export default useUserManager;
