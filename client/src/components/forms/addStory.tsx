import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios'

export function AddStory(props: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [createdBy, setCreatedBy] = React.useState<string>('');
  const [err, setErr] = React.useState<string>('');
  const [count, setCount] = React.useState<number>(2);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [storyId, setStoryId] = React.useState<string>('');

  const getStoryCount = () => {
    axios.get(`/story/count`)
      .then((r) => {
        setCount(r.data.count);
        setErr('');
      })
      .catch((e) => {
        setErr(e);
      })
  }

  const handleClick = (event: any) => {
    getStoryCount()
    axios.post('/story', {
      title: title,
      createdBy: createdBy,
      storyId: count
    })
      .then((response) => {
        if (response.data.error)
          alert(response.data.error)
        else {
          setModal(!modal);
          setTitle('');
          setCreatedBy('');
          setStoryId('')
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
      <Button color="secondary" onClick={() => setModal(!modal)}><i className="fas fa-plus-circle" /> Add Project</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className={props.className}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Add Story
        </ModalHeader>
        <ModalBody>
          <FormGroup><Label for="title">Story Title(*):</Label><Input type="text" name="title" onChange={(e) => setTitle(e.target.value)} /></FormGroup>
          <FormGroup><Label for="createdBy">Created by(*):</Label><Input type="text" name="createdBy" onChange={(e) => setCreatedBy(e.target.value)} /></FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleClick(e)}><i className="fas fa-plus-circle"></i> Add</Button>
          <Button color="secondary" onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddStory;