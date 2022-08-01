import React, {useState, useEffect, useRef} from "react";
import LoginInput from "./LoginInput";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSplice";
import { setLoginFailed, setLoginSuccess } from "../../../features/loginData/loginDataActions";
import loginAttempt from "./services/loginAttempt";
import registerAttempt from "./services/registerAttempt";


export default function AuthForm()
{
    const [legend, setLegend] = useState('Login');
    const [title, setTitle] = useState('Mr');
    const [remember, setRemember] = useState(false);
    const [loginResponse, setLoginResponse] = useState();
    const [error, setError] = useState();
    const [inputStatus, setInputStatus] = useState(false);
    const firstName = useRef();
    const surname = useRef();
    const login = useRef();
    const password = useRef();
    const password_confirmation = useRef();
    const email = useRef();
    const loginData = useSelector(selectLoginData);
    const dispatch = useDispatch();


    const evalCreds = (creds) => {
        let status = true;
        if (firstName.current.value.length < 5)
        return status;
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = {
            full_name: firstName.current.value + ' ' + surname.current.value,
            title: title,
            login: login.current.value,
            password: password.current.value,
            password_confirmation: password_confirmation.current.value,
            email: email.current.value
        };
        const response = await registerAttempt(data);
        if (response) {
            console.log(response);
        }
    }



    const handleLogin = async (event) => {
        event.preventDefault();
        const loginAttemptData = {
            login: login.current.value,
            password: password.current.value,
            remember: remember
        }
        const response = await loginAttempt(loginAttemptData);
        if (response.status === 'success') {
            dispatch(setLoginSuccess(response))
        }
        console.log(loginData)
    }

    useEffect(()=>{if(loginResponse){handleLogin(loginResponse)}},[loginResponse])


    if(legend === 'Register')
    {
        return (
            <form action="#" onSubmit={handleRegister}>
                <fieldset>
                    <legend>{legend}</legend>
                <LoginInput logref={firstName} type={'simple'} placeHolder={'First name'} id={'firstName'} name={'firstName'}/>
                <LoginInput logref={surname} type={'simple'} placeHolder={'Surname'} id={'surname'} name={'surname'}/>
                <label htmlFor="title">Title: </label>
                <select value={title} name="title" id='title' onChange={(e)=>setTitle(e.target.value)}>
                    <option value="Mr">Mr.</option>
                    <option value='Mrs'>Mrs.</option>
                    <option value='Ms'>Ms.</option>
                    <option value='Miss'>Miss</option>
                </select>
                <LoginInput logref={login} type={'simple'} placeHolder={'Login'} id={'login'} name={'login'}/>
                <LoginInput logref={email} type={'email'} placeHolder={'Email'} id={'email'} name={'email'}/>
                <LoginInput logref={password} type={'password'} placeHolder={'Password'} id={'password'} name={'password'}/>
                <LoginInput logref={password_confirmation} type={'password'} placeHolder={'Password repeat'} id={'passwordRepeat'} name={'passwordRepeat'}/>
                <div className="">
                    <input type="submit" value="Register"/>
                </div>
                </fieldset>
            </form>
        )
    }
    return (
        <form onSubmit={handleLogin}>
            <fieldset>
                <legend>{legend}</legend>
            <LoginInput logref={login} type={'simple'} placeHolder={'Login/E-mail'} id={'login'} name={'login'}/>
            <LoginInput logref={password} type={'password'} placeHolder={'Password'} id={'password'} name={'password'}/>
            <div className="">
                <div className="">
                    <label htmlFor="remember">Remember me?</label>
                    <input type="checkbox" name="remember" id="remember" onClick={()=>setRemember(!remember)}/>
                </div>
                <button type="submit">Login</button>
            </div>
            <p>Not registered? <span onClick={()=>setLegend('Register')}>click here</span></p>
            </fieldset>
        </form>
    )
}