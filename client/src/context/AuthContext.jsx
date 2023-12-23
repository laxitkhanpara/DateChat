import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest,baseUrl } from "../utils/services";


export const AuthContext = createContext()
export const AuthContectProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        profilepic: "",
        password: "",
        gender: ""
    });
     
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    //for get the data in user from the local storage 
    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, []);

    //for update the info which is updated in input field
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, []);


    // it will be go to the services and go to the backend
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/register`, JSON.stringify(registerInfo))
        setIsRegisterLoading(false)
        if (response.error) {
            return setRegisterError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]);


    const loginUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/login`, JSON.stringify(loginInfo))
        setIsLoginLoading(false)
        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[loginInfo]);
    //for the LogOut
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null)
    },[])

    // first bracket for come out from jsx and second one for object in {{user}}
    return <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser,loginInfo,loginUser,updateLoginInfo,isLoginLoading,loginError }}>
        {children}
    </AuthContext.Provider>
}