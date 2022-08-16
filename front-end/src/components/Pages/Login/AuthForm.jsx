import React, {useState, useEffect, useRef} from "react";
import LoginInput from "./LoginInput";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import { setLoginData, setLoginFailed, setLogout } from '../../../features/loginData/loginDataActions';
import './AuthForm.css';
import SubmitButton from "./SubmitButton";
import SimpleButton from '../../commonComponents/SimpleButton';
import { useNavigate } from "react-router-dom";
import evalCreds from "./services/evalCreds";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import CommonInput from "../../commonComponents/CommonInput";

export default function AuthForm()
{
    const [legend, setLegend] = useState('Login');
    const [title, setTitle] = useState('Mr');
    const [remember, setRemember] = useState(false);
    const [failure, setFailure] = useState();
    const [rules, setRules] = useState();
    const firstName = useRef();
    const surname = useRef();
    const login = useRef();
    const password = useRef();
    const password_confirmation = useRef();
    const email = useRef();
    const loginData = useSelector(selectLoginData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const remindRef = useRef();



    const loginAttempt = (loginData) => {
        fetch(
            'http://localhost/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    dispatch(setLoginData(res));
                    navigate('/');
                }
                if (res.status === 'failure') {
                    dispatch(setLogout());
                }
            })
            .catch(err => dispatch(setLoginFailed(err)))
    }

    const registerAttempt = (registerData) => {
        fetch(
            'http://localhost/api/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            })
            .then(res=>res.json()
            .then(res=>{
                if (res.status === 'success') {
                    dispatch(setLoginData(res));
                    navigate('/');
                }
                if (res.status === 'failure') {
                    setFailure(res.data);
                    dispatch(setLogout());
                }
            }))
    }

    const sendReminder = (email) => {
        fetch(
            'http://localhost/api/reset',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email})
            }
        )
        .then(res=>res.json())
        .then(res=> {
            if (res.status === 'success') {
                alert('Password reset link has been sent')
            }
            if (res.status === 'failure') {
                alert('Something went wrong')
            }
        })
        .catch(err=>console.log('Error: ',err))
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setRules();
        const data = {
            full_name: firstName.current.value + ' ' + surname.current.value,
            title: title,
            login: login.current.value,
            password: password.current.value,
            password_confirmation: password_confirmation.current.value,
            email: email.current.value
        };
        const {status, rules} = evalCreds(data);
        if (status) {
            registerAttempt(data);
        }
        setRules(rules);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const loginAttemptData = {
            login: login.current.value,
            password: password.current.value,
            remember: remember
        }
        loginAttempt(loginAttemptData);
    }

    const handleRemind = (event) => {
        event.preventDefault();
        const email = remindRef.current.value;
        sendReminder(email);
    }

    if(legend === 'Register')
    {
        return (
            <form onSubmit={handleRegister} className='auth-form'>
                    <PopOutContainer>
                        <div className="title">Register</div>
                        <PopOutContainer passedClass={rules && rules.full_name?'failed':null}>
                            <LoginInput logref={firstName} type={'simple'} placeHolder={'First name'} id={'firstName'} name={'firstName'}/>
                            <LoginInput logref={surname} type={'simple'} placeHolder={'Surname'} id={'surname'} name={'surname'}/>
                            {
                                rules && rules.full_name
                                    ?<div className="failed">{rules.full_name}</div>
                                    :null
                            }
                        </PopOutContainer>
                        <PopOutContainer>
                            <div className="title-select">
                                <label htmlFor="title">Title: </label>
                                <select value={title} name="title" id='title' onChange={(e)=>setTitle(e.target.value)}>
                                    <option value="Mr">Mr.</option>
                                    <option value='Mrs'>Mrs.</option>
                                    <option value='Ms'>Ms.</option>
                                    <option value='Miss'>Miss</option>
                                </select>
                            </div>
                        </PopOutContainer>
                        <PopOutContainer passedClass={rules && rules.login?'failed':null}>
                            <LoginInput logref={login} type={'simple'} placeHolder={'Login'} id={'login'} name={'login'}/>
                            {
                                rules && rules.login
                                    ?<div className="failed">{rules.login}</div>
                                    :null
                            }
                        </PopOutContainer>
                        <PopOutContainer>
                            <LoginInput logref={email} type={'email'} placeHolder={'Email'} id={'email'} name={'email'}/>
                        </PopOutContainer>
                        <PopOutContainer passedClass={rules && rules.password||rules && rules.password_confirmation?'failed':null}>
                            <LoginInput logref={password} type={'password'} placeHolder={'Password'} id={'password'} name={'password'}/>
                            <LoginInput logref={password_confirmation} type={'password'} placeHolder={'Password repeat'} id={'passwordRepeat'} name={'passwordRepeat'}/>
                            {
                                rules && rules.password
                                    ?<div className="failed">{rules.password}</div>
                                    :null
                            }
                            {
                                rules && rules.password_confirmation
                                    ?<div className="failed">{rules.password_confirmation}</div>
                                    :null
                            }
                        </PopOutContainer>
                        <div className="">
                            <SimpleButton value={'Register'} type={'Submit'}/>
                            <p>Alredy registered? <span onClick={()=>setLegend('Login')} style={{color:'var(--color-main-dark)'}}>Back to login</span></p>
                        </div>
                    </PopOutContainer>
            </form>
        )
    }
    if (legend === 'forgot') {
        return (
            <form onSubmit={handleRemind}>
                <PopOutContainer passedStyle={{height:'fit-content', width:'fit-content'}}>
                    <CommonInput placeholder={'Enter your email here'} inputRef={remindRef} type={'email'}/>
                    <SimpleButton type={'submit'} value={'remind me'}/>
                </PopOutContainer>
            </form>
        )
    }
    return (
        <form onSubmit={handleLogin} className='auth-form'>
            <PopOutContainer>
                <PopOutContainer>
                    <LoginInput logref={login} type={'simple'} placeHolder={'Login/E-mail'} id={'login'} name={'login'}/>
                </PopOutContainer>
                <PopOutContainer>
                    <LoginInput logref={password} type={'password'} placeHolder={'Password'} id={'password'} name={'password'}/>
                </PopOutContainer>
                <div className="">
                    <div className="">
                        <label htmlFor="remember">Remember me?</label>
                        <input type="checkbox" name="remember" id="remember" onClick={()=>setRemember(!remember)}/>
                    </div>
                    <SimpleButton value={'login'} type={'Submit'}/>
                </div>
                <p onClick={()=>setLegend('forgot')} style={{color:'var(--color-main-dark)', cursor:'pointer'}}>Forgot password?</p>
                <p>Not registered? <span onClick={()=>setLegend('Register')} style={{color:'var(--color-main-dark)'}}>click here</span></p>
            </PopOutContainer>
        </form>
    )
}