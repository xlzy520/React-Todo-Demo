import React, {useEffect, useState} from 'react';

import {fetchLogout, fetchTheme, updateTheme} from '../services';
import Modal from './Modal'

const Nav = ({ user, onLogout, changeCount }) => {
  const logout = () => {
        fetchLogout().then( () => onLogout() );
    };
  
  const [theme, setTheme] = useState('');
  const [radio, setRadio] = useState('');
  const [visible, setVisible] = useState(false);
  
  
  const handleRadio = (e)=>{
    const value = e.target.value
    setRadio(value)
  }
  
  
  const handleUpdateTheme = () =>{
    updateTheme(user.username, radio).then(res=>{
      setTheme(radio)
      document.body.className = radio
    }).finally(()=>{
      setVisible(false)
    })
  }
  
  useEffect(() => {
    const username = user.username;
    if (username) {
      fetchTheme(username)
        .then(({data}) => {
          setTheme(data)
          document.body.className = data
          setRadio(data)
        })
    }
  }, [theme, user]);
  
  return (
      <div className="nav">
        <Modal title="Change Theme" onCancel={()=>setVisible(false)}
               onOk={handleUpdateTheme} visible={visible}>
          <div className="theme-radios">
            {
              ['dark', 'light', 'colorful'].map(v=>{
                return (
                  <label key={v}>
                    <input name="theme" checked={radio === v}
                           type="radio" value={v} onChange={handleRadio} />{v}
                  </label>

                )
              })
            }
          </div>
        </Modal>
        <div className='welcome'>
          { user.username && <h2>Welcome to the Todo List, <span className="username">{user.username}</span></h2> }
          { user.isLoggedIn &&
            <div className="nav-btns">
              <div>current Theme: <span className="theme-name">{theme}</span></div>
              <button
                className="theme funky-btn funky-btn-primary funky-btn-dangerous"
                onClick={()=>setVisible(true)}
              >Change Theme</button>
              <button
                className="logout action funky-btn funky-btn-primary funky-btn-dangerous"
                onClick={logout}
              >Logout</button>
            </div>
          }
        </div>
      </div>
      
    );
};

export default Nav;
