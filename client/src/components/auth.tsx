import * as React from 'react';
import {Container, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import { useSignin } from '../states/user/hooks';
import { signin } from '../states/user/service';
import {useEffect} from "react";

function AuthPath() {
    const [info, setInfo] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [setToken, setProfile] = useSignin();
    const [errMsg, setErrMsg] = React.useState<string>('');
    const [errClass,setErrClass] = React.useState<string>('alertContent')
    const [errSubClass,setErrSubClass] = React.useState<string>('alertText')

    useEffect(()=>{
        console.log(errMsg)
        if(errMsg === ''){
            setErrClass('alertContent')
            setErrSubClass('alertText')
        }else{
            setErrClass('alertContent alertShow')
            setErrSubClass('alertText alertTextShow')
        }
    },[errMsg])
    const csignin =async () => {
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

    return (
        <div className="bgcw">
            <div className={errClass}>
                <div className={errSubClass}>
                    <div className="Err">ERR!</div>
                    <div className="ErrMsg">{errMsg}</div>
                    <div className="ErrButton"><Button onClick={()=>{setErrMsg('')}} color="info">Oh,I see.</Button></div>
                </div>
            </div>
            <div className="logining">
                <div className="headImg">
                    {/*<img className="img" src="/left.png" />*/}
                </div>
                <div className="content1">
                    <div className="banner">
                        Jira
                    </div>
                    {/*<Alert>haha</Alert>*/}
                    <div className="item">
                        <i className="fas fa-user-tie user icon" style={{"color":"#3A95E0","fontSize":"30px"}} aria-hidden="true"></i>
                        <Input className="inputing" type='email' name='email' id='email' placeholder='Enter email or username' onChange={(e) => setInfo(e.target.value)}></Input>
                    </div>
                    <div className="item">
                        <i className="fas fa-unlock-alt icon" style={{"color":"#3A95E0",fontSize:"30px"}}></i>
                        {/*<LockOutlined />*/}
                        <Input className="inputing" type='password' name='password' id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}></Input>
                    </div>
                    <Button className="btn1" onClick={() => csignin()}>login</Button>
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
