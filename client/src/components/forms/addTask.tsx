import * as React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Alert} from 'reactstrap';
import moment from 'moment'
import { useCreateTask } from "../../states/task/hooks";
import { useFetchStories } from "../../states/story/hooks";

export function AddTask({ storyId, status, className,loading,setLoading }: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [contributors, setContributors] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [users, setUsers] = React.useState<any>([]); // TODO: fetch users
  const [err, setErr] = React.useState<string>('');

  const [createTask] = useCreateTask();
  const [fetchStories] = useFetchStories();

  React.useEffect(() => {
    moment.locale('hk');
    changeColumnTitle(0)
  }, [])

  const changeColumnTitle = (number: number) => {
    switch (number) {
      case 1: return "Backlog";
      case 2: return "ToDo";
      case 3: return "In Progress";
      case 4: return "Done";
    }
  }

  const handleClick = (event: any) => {
    setErr('');
    let generateErr = (str,choose=false)=>{throw new Error(`Please ${choose?"choose":"input"} ${str}!`)}
    try{
      if (!title) generateErr('title');
      if (!content) generateErr('content',)
      if (!color) generateErr('color',true)
      if (!dueDate) generateErr('dueDate',true)
    }catch(e:any){
      setErr(e.message)
      return;
    }


    const data = {
      title,
      content,
      status,
      contributors: [],
      due: dueDate,
      color,
      story: storyId
    }

    setLoading(true);

    createTask(data)
      .then((res) => {
        console.log(res)
        setModal(false);
        setLoading(true)
      }).catch((err) => {
        setErr(err);
      }).finally(() => {
        fetchStories(); // refresh stories
      })
  }

  const toggle = () => {
    setModal(!modal)
    setErr('')
  }

  let userContent;
  if (!users)
    userContent = <option value=''>Loading...</option>
  else {
    userContent = users.map((user: any, index: number) => (
      <option key={index} value={user._id}>{user.name + ' ' + user.lastName}</option>
    ))
  }
  
  return (
    <div>
      <i className="fas fa-plus-circle customAddTask" onClick={toggle}></i>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          Create a New Task to {changeColumnTitle(status)}
        </ModalHeader>
        <ModalBody>
          {err?<Alert>{err}</Alert>:<></>}
          <FormGroup>
            <Label for="title">Task Title(*):</Label>
            <Input type="text" name="title" id="taskTitle" onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="content">Task Details:</Label>
            <Input type="textarea" name="content" id="content" onChange={(e) => setContent(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="contributors">Assign to:</Label>
            <Input type="select" name="contributors" id="contributors" onChange={(e) => setContributors(e.target.value)}>
              <option value="" disabled>Choose:</option>
              {userContent}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="color">Task Color:</Label>
            <Input type="select" name="color" id="color" onChange={(e) => setColor(e.target.value)}>
              <option value="" disabled>Choose:</option>
              <option value="colorBlue">Red</option>
              <option value="colorGreen">Green</option>
              <option value="colorGrey">Grey</option>
            </Input>
          </FormGroup>
          <hr />
          <i className="fas fa-calendar-alt"></i> Created Date: {moment().format('L, h:mm:ss')} <br />
          <i className="fas fa-clock"></i> Due Date: <Input name="dueDate" id="dueDate" type="date" onChange={(e) => setDueDate(e.target.value)} /> 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={loading} onClick={(e) => handleClick(e)}><i className="fas fa-plus-circle"></i> Add</Button>
          <Button color="secondary" disabled={loading} onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddTask;