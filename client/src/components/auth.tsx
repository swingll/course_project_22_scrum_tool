import * as React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSignin } from '../states/user/hooks';
import { signin } from '../states/user/service';

function AuthPath() {
    const [info, setInfo] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [setToken, setProfile] = useSignin();

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

    return (
        <Container>
            <Form>
                <FormGroup>
                    <Label for='email'>Email or Username</Label>
                    <Input type='email' name='email' id='email' placeholder='Enter email or username' onChange={(e) => setInfo(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' name='password' id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button onClick={() => csignin()}>Sign In</Button>
            </Form>
        </Container>
    )
}

export default AuthPath;
