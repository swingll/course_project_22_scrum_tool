import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios'

export function AddUser(props: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [profilePhoto, setProfilePhoto] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClick = (event: any) => {
    axios.post('/users', {
      username: username,
      name: name,
      lastName: lastName,
      profilePhoto: profilePhoto
    })
      .then((response) => {
        if (response.data.message)
          alert(response.data.message)
        else {
          setModal(!modal);
          setUsername('');
          setName('');
          setLastName('');
          setProfilePhoto('');
          setLoading(false);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <div>
      <i className="fas fa-user-plus" onClick={() => setModal(!modal)}></i>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className={props.className}>
        <ModalHeader toggle={() => setModal(!modal)}>
          <i className="fas fa-user-circle"></i> Add User
        </ModalHeader>
        <ModalBody>
          <FormGroup><Label for="username">Username(*):</Label><Input type="text" name="username" onChange={(e) => setUsername(e.target.value)} /></FormGroup>
          <FormGroup><Label for="name">Name(*):</Label><Input type="text" name="name" onChange={(e) => setName(e.target.value)} /></FormGroup>
          <FormGroup><Label for="lastName">Last Name(*):</Label><Input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} /></FormGroup>
          <FormGroup><Label for="profilePhoto">Profile Photo URL(*):</Label><Input type="text" name="profilePhoto" onChange={(e) => setProfilePhoto(e.target.value)} /></FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleClick(e)}><i className="fas fa-plus-circle"></i> Add</Button>
          <Button color="secondary" onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddUser;