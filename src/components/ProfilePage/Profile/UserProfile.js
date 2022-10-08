import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import React, {  useContext,useEffect  } from 'react'
import  { useState } from 'react'
import AuthContext from '../../../store/auth-context';
import axios from 'axios'

const UserProfile = () => {

  const initialState = {
    user: { name: '', email: '' },
    list: []
  }
  const authCtx = useContext(AuthContext)
  const [state, setState] = useState(initialState)
  const baseUrl = 'http://localhost:4005'

      // methods
      useEffect(() => {
        axios(`${baseUrl}/politico/index`).then(resp => {
            setState((prevState) => {
                return {...prevState, list: resp.data }
            })
        })
      },[]);

  const renderRows = () => {
    
    return state.list.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.partido}</td>

            </tr>
        )
    })
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <h1>Seja bem vindo {authCtx.userInf.name} </h1>
      <ProfileForm />

      <table className="table table-striped mt-4">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Partido</th>
            </tr>
        </thead>
        <tbody>
            {renderRows()}
        </tbody>
        </table>
    </section>
    
  );
};

export default UserProfile;
