import { useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginInfo,loginUser,updateLoginInfo,isLoginLoading,loginError } = useContext(AuthContext)
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={loginUser}>
          <div className="brand">
            <img src="" alt="logo" />
            <h1>DatingChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => updateLoginInfo({ ...loginInfo, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
          />
          <button type="submit">{isLoginLoading ? "Log in...." : 'Log in'}</button>
          <span>
            Don`t have an account ? <Link to="/register">Register</Link>
          </span>
          {
            loginError?.error && (<Alert variant='danger'><p>{loginError?.message}</p></Alert>)
          }
        </form>
      </FormContainer>
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

.select{
   background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    option{
      color: black;
      background-color:  #997af0;
      border: 0.1rem solid #4e0eff;
    }
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
}
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;