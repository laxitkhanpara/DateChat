import { useState, useEffect, useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
// import process from "process";
// import axios from "axios";
// import Logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext)
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={registerUser}>
          <div className="brand">
            <img src="" alt="logo" />
            <h1>DatingChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
          />
          <Form.Select aria-label="gender" name="gender" className="select" onChange={(e) => updateRegisterInfo({ ...registerInfo, gender: e.target.value })}>
            <option>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Guy">Guy</option>
            <option value="Lasbian">Lasbian</option>
            <option value="Other">Other</option>
          </Form.Select>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => updateRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
          />
          <button type="submit">{isRegisterLoading ? "Createing your account" : 'Create Account'}</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
          {
            registerError?.error && (<Alert variant='danger'><p>{registerError?.message}</p></Alert>)
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
