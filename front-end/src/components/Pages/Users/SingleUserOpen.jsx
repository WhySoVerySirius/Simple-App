import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../../features/usersData/usersDataSlice";
import CommonInput from "../../commonComponents/CommonInput";
import SimpleButton from "../../commonComponents/SimpleButton";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import './css/SingleUserOpen.css';


export default function SingleUserOpen({passedProps})
{
    const {openUser} = useSelector(selectUsersData);
    const [setSendEmail, setSendMessage, emailTitleRef, emailContentRef, messageRef, messageStatus, setMessageStatus, messageSuccess] = passedProps;
    const [openEmail, setOpenEmail] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);

    return (
        <div className="single-user-container">
            <div className="user-display">
                <div className="user-display-title-and-name">{openUser.title} {openUser.full_name}</div>
                <div className="user-display-description">{openUser.description}</div>
                <div className="user-display-status">Status: {openUser.status}</div>
            </div>
            <div className="user-display-actions">
                <PopOutContainer>
                {
                    openEmail && !messageStatus
                        ?<>
                            <div className="action">
                                <div className="mail-icon"/>
                                <p>Email:</p>
                            </div>
                            <div className="email-canvas">
                                <CommonInput inputRef={emailTitleRef} placeholder={'Title'}/>
                                <CommonInput type={'textArea'} inputRef={emailContentRef} placeholder={'Enter your message here'}/>
                                <SimpleButton type={'button'} value={'Send'} clickHandle={()=>{setSendMessage(false); setSendEmail(true)}}/>
                            </div>
                            </>
                        :<>
                            <div className="action" onClick={()=>{setMessageStatus(false);setOpenEmail(true); setOpenMessage(false)}}>
                                <div className="mail-icon"/>
                                {messageSuccess.email
                                    ?<div className="message-success">Email sent succesfully</div>
                                    :<p>Contact via email</p>
                                }
                            </div>
                        </>
                }
                </PopOutContainer>
                <PopOutContainer>
                {
                    openMessage && !messageStatus
                    ?<>
                        <div className="action">
                            <div className="message-icon"/>
                            <p>Message:</p>
                        </div>
                        <CommonInput inputRef={messageRef} placeholder={'Message...'}/>
                        <SimpleButton type={'button'} value={'Send'} clickHandle={()=>{setSendEmail(false); setSendMessage(true)}}/>
                    </>
                    :<>
                        <div className="action" onClick={()=>{setMessageStatus(false); setOpenMessage(true); setOpenEmail(false)}}>
                            <div className="message-icon"/>
                            {messageSuccess.message
                                    ?<div className="message-success">Message sent succesfully</div>
                                    :<p>Write a message</p>
                                }                        </div>
                    </>
                }
                </PopOutContainer>
            </div>
        </div>
    )
}