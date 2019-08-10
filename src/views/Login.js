import React, { useState } from "react";
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Navbar from "../components/Navbar";
import Input from '../components/Input';


const LOGIN = gql`
mutation LogUser($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
    }
}

`;

function Login({history}) {
    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [ sendLogin ] = useMutation(LOGIN)

    const handleSubmit = async(event) => {
        event.preventDefault()

        const result =  await sendLogin({variables:{email,password}}).catch(error =>  alert(error.message) )
        const { data, errors } = result;
        if(data){
            localStorage.setItem('mapToken',data.login.token)
            history.push('/');
        }
        if(errors){
            alert(errors)
        }
    }

  return (
    <>
      <Navbar />
      <div className="container my-5 py-5 text-center">
        <h4>Login</h4>
        <form action="" onSubmit={handleSubmit} >
          <div className="row justify-content-center">
            <div className="form-group col-10">
              <Input
                label="Email: "
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group col-10">
             <Input 
              label="Password: "
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
             />
            </div>
            <div className="col-10">
              <button type="submit" className="btn bg-dark text-light btn-lg">Login</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
