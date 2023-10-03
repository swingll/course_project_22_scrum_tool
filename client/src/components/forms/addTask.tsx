import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import moment from 'moment'
import axios from 'axios'

export function AddModal(props: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [contributors, setContributors] = React.useState<string>('');
  const [createdBy, setCreatedBy] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');
  const [status, setStatus] = React.useState<number>(props.status);
  const [color, setColor] = React.useState<string>('');
  const [storyId, setStoryId] = React.useState<string>(props.storyType);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<any>([]);
  const [err, setErr] = React.useState<string>('');

  React.useEffect(() => {
    moment.locale('tr');
    changeColumnTitle(0)
  }, [])

  const changeColumnTitle = (number: number) => {
    let newTitle;
    if (number === 1)
      newTitle = "Backlog"
    else if (number === 2)
      newTitle = "ToDo"
    else if (number === 3)
      newTitle = "In Progress"
    else
      newTitle = "Done"

    return newTitle;
  }

  const getUsers = () => {
    axios.get('/users')
      .then((r) => {
        setUsers(r.data);
        setErr('')
      })
      .then((r) => {
        console.log(users)
      })
      .catch((e) => {
        setErr(e)
      })
  }

  const handleClick = (event: any) => {
    axios.post('/tasks', {
      title: title,
      content: content,
      status: status,
      contributors: contributors,
      dueDate: dueDate,
      color: color,
      storyId: storyId,
      createdBy: createdBy
    })
      .then((response) => {
        if (response.data.message)
          alert(response.data.message)
        else {
          setModal(!modal);
          setTitle('');
          setContent('');
          setContributors('');
          setDueDate('');
          setLoading(false);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const toggle = () => {
    getUsers();
    setModal(!modal)
  }

  let userContent;
  if (!users)
    userContent = <option value="">Loading...</option>
  else {
    userContent = users.map((user: any, index: number) => (
      <option key={index} value={user._id}>{user.name + " " + user.lastName}</option>
    ))
  }

  return (
    <div>
      <i className="fas fa-plus-circle customAddTask" onClick={toggle}></i>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>
          Create a New Task to {changeColumnTitle(props.status)}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Task Title(*):</Label><Input type="text" name="title" id="taskTitle" onChange={(e) => setTitle(e.target.value)} /></FormGroup>
          <FormGroup>
            <Label for="content">Task Details:</Label>
            <Input type="textarea" name="content" id="content" onChange={(e) => setContent(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="contributors">Assign to:</Label>
            <Input type="select" name="contributors" id="contributors" onChange={(e) => setContributors(e.target.value)}>
              <option value="">Choose:</option>
              {userContent}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="color">Task Color:</Label>
            <Input type="select" name="color" id="color" onChange={(e) => setColor(e.target.value)}>
              <option value="">Choose:</option>
              <option value="colorBlue">Red</option>
              <option value="colorGreen">Green</option>
              <option value="colorGrey">Grey</option>
            </Input>
          </FormGroup>
          <hr />
          <i className="fas fa-calendar-alt"></i> Created Date: {moment().format('L, h:mm:ss')} <br />
          <i className="fas fa-clock"></i> Due Date: <input name="dueDate" id="dueDate" type="datetime-local" onChange={(e) => setDueDate(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleClick(e)}><i className="fas fa-plus-circle"></i> Add</Button>
          <Button color="secondary" onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddModal;