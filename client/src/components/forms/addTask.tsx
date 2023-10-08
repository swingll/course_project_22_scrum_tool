import * as React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Alert} from 'reactstrap';
import moment from 'moment'
import { useCreateTask } from "../../states/task/hooks";
import { useFetchStories } from "../../states/story/hooks";
import {useFetchUsers, useUsers} from "../../states/user/hooks";
// @ts-ignore
import {NodeJS} from "timers";
import {useRef} from "react";

export function AddTask({ storyId, status, className,loading,setLoading }: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [contributors, setContributors] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('colorRed');
  const [err, setErr] = React.useState<string>('');
  const [userLoading,setUserLoading] = React.useState<boolean>(false)
  const [degree,setDegree]  = React.useState<number>(90)
  const rotateInteval = useRef<NodeJS.Timeout>(undefined)

  const [createTask] = useCreateTask();
  const [fetchStories] = useFetchStories();
  const [fetchUsers] = useFetchUsers()
  const users = useUsers() // TODO: fetch users

  React.useEffect(() => {
    moment.locale('hk');
    changeColumnTitle(0)
  }, [])
  React.useEffect(()=>{
    setUserLoading(false)
    if(rotateInteval.current) clearInterval(rotateInteval.current)
    rotateInteval.current = undefined
  },[users])

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
      if (!content) generateErr('details',)
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
  const refeshUsers = () => {
    if(rotateInteval){
      clearInterval(rotateInteval.current)
      rotateInteval.current = undefined
    }
    if(userLoading){
      return;
    }
    setUserLoading(true)
    fetchUsers()
    rotateInteval.current = setInterval(()=>{
      setDegree(degree=>degree + 5)
    },50)
  }

  let userContent;
  if (!users || !users.length || userLoading)
    userContent = <option value=''>Loading...</option>
  else {
    userContent = users.map((user: any, index: number) => (
      <option key={index} value={user._id}>{user.username}</option>
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
            <Label for="title">Task Title(*):&nbsp;</Label>
            <Input type="text" name="title" id="taskTitle" onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="content">Task Details:&nbsp;</Label>
            <Input type="textarea" name="content" id="content" onChange={(e) => setContent(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="contributors">Assign to:&nbsp;</Label>
            <Input type="select" name="contributors" id="contributors" onChange={(e) => setContributors(e.target.value)}>
              {(users && users.length && !userLoading)?<option value="">Choose</option>:<></>}
              {userContent}
            </Input>
            <Button className=" user-refresh" onClick={refeshUsers}>
              <i className="fas fa-sync-alt" style={{rotate:`${degree}deg`}}></i>
            </Button>

          </FormGroup>
          <FormGroup>
            <Label for="color">Task Color:&nbsp;</Label>
            <Input type="select" defaultValue={'colorRed'} name="color" id="color" onChange={(e) => setColor(e.target.value)}>
              <option value="colorRed">Red</option>
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