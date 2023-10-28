import * as React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSignin } from '../states/user/hooks';
import { signin, signup } from '../states/user/service';

function AuthPath() {
    const [info, setInfo] = React.useState<string>('');
    const [username, serUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [setToken, setProfile] = useSignin();
    const [isRegister, setIsRegister] = React.useState<boolean>(false);

    const csignin = async () => {
        if (!info || !password) return;

        const body = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info) ? { email: info, password } : { username: info, password };

        signin(body).then((res) => {
            if (res.status === 200) {
                const { info, token } = res.data;
                setToken(token);
                setProfile(info);
            }
        }).catch((err) => {
            const { response } = err
            console.log(response)
        })
    }

    const csignup = async () => {
        if (!info || !username || !password) return;

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info)) return;

        const body = {
            username,
            email: info,
            password
        }

        signup(body).then((res) => {
            console.log(res)
            if (res.status === 200) {
                const { info, token } = res.data;
                setToken(token);
                setProfile(info);
            }
        }).catch((err) => {
            const { response } = err
            console.log(response)
        })
    }

    const onAuth = () => {
        isRegister ? csignup() : csignin();
    }

    return (
        <Container>
            <Form>
                {isRegister &&
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username' placeholder='Username' onChange={(e) => serUsername(e.target.value)} />
                    </FormGroup>
                }
                <FormGroup>
                    <Label for='email'>{isRegister ? 'Email' : 'Email or Username'}</Label>
                    <Input type='email' name='email' id='email' placeholder={isRegister ? 'Enter email' : 'Enter email or username'} onChange={(e) => setInfo(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' name='password' id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button onClick={() => onAuth()}>{isRegister ? 'Sign up' : 'Sign In'}</Button>
            </Form>
            <br /><br /><br /><br />
            <Button onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'I already have an account' : 'I want to sign up'}</Button>
        </Container>
    )
}

export default AuthPath;
