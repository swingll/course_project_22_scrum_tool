import * as React from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useSignin } from '../states/user/hooks';
import {useEffect} from "react";
import { signin, signup } from '../states/user/service';

function AuthPath() {
    const [info, setInfo] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [setToken, setProfile] = useSignin();
    const [errClass,setErrClass] = React.useState<string>('alertContent')
    const [contentClass,setContentClass] = React.useState<string>('content1')
    const [isRegister, setIsRegister] = React.useState<boolean>(false);

    const [errMsg, setErrMsg] = React.useState<string>('');
    useEffect(()=>{
        if(isRegister){
            setContentClass('content1 content2')
        }else{
            setContentClass('content1')
        }
    },[isRegister])
    useEffect(()=>{
        console.log(errMsg)
        if(errMsg === ''){
            setErrClass('alertContent')
            // setErrSubClass('alertText')
        }else{
            setErrClass('alertContent alertShow')
            // setErrSubClass('alertText alertTextShow')
        }
    },[errMsg])
    const csignin = async () => {
        setErrMsg('');

        if (!info) return setErrMsg('Username or email cannot be empty');
        if (!password) return setErrMsg('Password cannot be empty');

        const isEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        const body = isEmail.test(info) ? { email: info, password } : { username: info, password };

        signin(body).then((res) => {
            if (res.status === 200) {
                const { info, token } = res.data;
                setToken(token);
                setProfile(info);
            }
        }).catch((err) => {
            if (typeof err === 'string') setErrMsg(err)
            else setErrMsg('Unknown Error')
        })
    }
    const csignup = async () => {
        setErrMsg('');

        if (!info) return setErrMsg('Email cannot be empty');
        if (!username) return setErrMsg('Username cannot be empty');
        if (!password) return setErrMsg('Password cannot be empty');

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info)) return setErrMsg('Invalid email format');

        const body = {
            username,
            email: info,
            password
        }

        signup(body).then((res) => {
            console.log(res)
            if (res.status === 200) {
                signin(body).then((res) => {
                    if (res.status === 200) {
                        const { info, token } = res.data;
                        setToken(token);
                        setProfile(info);
                    }
                }).catch((err) => {
                    if (typeof err === 'string') setErrMsg(err)
                    else setErrMsg('Unknown Error')
                })
            }
        }).catch((err) => {
            if (typeof err === 'string') setErrMsg(err)
            else setErrMsg('Unknown Error')
        })
    }

    const onAuth = () => {
        isRegister ? csignup() : csignin();
    }

    return (
        <div className="bgcw">
            {/*{isRegister &&*/}
            {/*    <FormGroup>*/}
            {/*      <Label for='username'>Username</Label>*/}
            {/*      <Input type='text' name='username' id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />*/}
            {/*    </FormGroup>*/}
            {/*}*/}
            <div className={errClass}>{
                errMsg &&
                <div className={"alertText"}>
                    <div className="Err">ERR!</div>
                    <div className="ErrMsg">{errMsg}</div>
                    <div className="ErrButton"><Button onClick={()=>{setErrMsg('')}} color="info">Oh,I see.</Button></div>
                </div>
            }

            </div>
            <div className="logining">

                <div className="headImg">
                    {/*<img className="img" src="/left.png" />*/}
                </div>
                <div className={contentClass}>

                    <div className="banner">
                        Jira
                    </div>
                    {/*<Alert>haha</Alert>*/}

                    {isRegister?<div className="item fading">
                        <i className="fas fa-user-tie user icon" style={{"color":"#3A95E0","fontSize":"30px"}} aria-hidden="true"></i>
                        <Input className="inputing" type='text' name='username' id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></Input>
                    </div>: <div className="item fadingOut"></div>}
                    <div className="item">
                        <i className="fas fa-envelope icon" style={{"color":"#3A95E0","fontSize":"30px"}} aria-hidden="true"></i>
                        <Input className="inputing" type='email' name='email' id='email' placeholder={isRegister? 'Enter email':'Enter email or username'} onChange={(e) => setInfo(e.target.value)}></Input>
                    </div>
                    <div className="item">
                        <i className="fas fa-unlock-alt icon" style={{"color":"#3A95E0",fontSize:"30px"}}></i>
                        {/*<LockOutlined />*/}
                        <Input className="inputing" type='password' name='password' id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}></Input>
                    </div>
                    {!isRegister?<Button className="btn1" onClick={() => csignin()}>{"login"}</Button>:<Button className="btn1" onClick={() => csignup()}>{"sign up"}</Button>}
                    <a className="registering" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'I already have an account' : 'I want to sign up'}</a>

                    <br/>
            </div>
            <div className="headImg">
                {/*<img className="img" src="/right.png" />*/}
            </div>
        </div>
            {/*        // <Container>*/}
            {/*        //     <Form>*/}
            {/*        //         <FormGroup>*/}
            {/*        //             <Label for='email'>Email or Username</Label>*/}
            {/*        //             <Input type='email' name='email' id='email' placeholder='Enter email or username' onChange={(e) => setInfo(e.target.value)} />*/}
            {/*        //         </FormGroup>*/}
            {/*        //         <FormGroup>*/}
            {/*        //             <Label for='password'>Password</Label>*/}
            {/*        //             <Input type='password' name='password' id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />*/}
            {/*        //         </FormGroup>*/}
            {/*        //         <Button onClick={() => csignin()}>Sign In</Button>*/}
            {/*        //     </Form>*/}
            {/*        // </Container>*/}
</div>

    )
}

export default AuthPath;