import { useState, useContext } from "react";
// import UserChat from "./UserChat";
import "./UsersShowBox.css"
import { BiMaleSign, BiFemaleSign } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi"
import UserChat from "../UserChat";
import { ChatContext } from "../../../context/chatContext"
import { AuthContext } from "../../../context/AuthContext"

export default function UsersShowBox() {
    const { user } = useContext(AuthContext)
    const { potentialChart, createChat, onlineUser } = useContext(ChatContext)
    // const [selectedOption, setSelectedOption] = useState('');
    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    return (

        <>
            <div className="container m-3">
                <div className="row showbox d-flex justify-content-center-important">
                    <div className="rating-container">

                        <div className="rating">
                            <form className="rating-form">

                                <label htmlFor="super-sad">
                                    <input type="radio" name="rating" className="super-sad" id="super-sad" value="super-sad" />
                                    <HiUserGroup />
                                </label>
                                <label htmlFor="super-happy">
                                    <input type="radio" name="rating" className="super-happy" id="super-happy" value="super-happy" />
                                    <BiMaleSign />
                                </label>

                                <label htmlFor="neutral">
                                    <input type="radio" name="rating" className="neutral" id="neutral" value="neutral" />
                                    <BiFemaleSign />
                                </label>

                                <label htmlFor="sad">
                                    <input type="radio" name="rating" className="sad" id="sad" value="sad" />
                                    <BsGenderAmbiguous />
                                </label>

                                <div className="all-users" >
                                    {potentialChart && potentialChart.map((u, index) => {

                                        return (
                                            <div className="single-user" key={index} onClick={() => createChat(user?.user[0]._id, u._id)}>
                                                {u.username}
                                                <span className={onlineUser?.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <UserChat />
                </div>
            </div>
        </>
    )
}
