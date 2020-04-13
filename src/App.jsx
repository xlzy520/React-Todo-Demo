import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchLoginStatus, fetchLogout, fetchLogin} from "./services";

import Nav from './components/Nav';
import Login from "./Login";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";
// import Todo from "./components/Todo";

const App = () => {
  const [userState, setUserState] = useState({isLoggedIn: false});
  const [count, setCount] = useState();

  useEffect( () => {
    fetchLoginStatus()
        .then(data => {
          setUserState( {
            isLoggedIn: true,
            username: data.data.username
          });
        });
  }, [count]);

  const login = (username) => {
    fetchLogin(username).then(res=>{
      setUserState ( {
        isLoggedIn: true,
        username: res.data.username,
      });
    })
  };

  const logout = () => {
    fetchLogout().then(res=>{
      setUserState( {
        isLoggedIn: false
      });
    })
  };

  let content = [];

  if (userState.isLoggedIn) {
    content = (
      <div className="content">
        <AddTask changeCount={(newCount) => setCount(newCount) } user={userState}/>
        <TodoList user={userState} trigger={count} />
        {/*<Todo user={userState}/>*/}
      </div>
      )
  } else {
    content = <Login onLogin={ login }/>;
  }

  return (
      <div className="app">
        <Nav user={userState} changeCount={(newCount) => setCount(newCount) } onLogout={logout}/>
        {content}
      </div>
  );

};

export default App;
