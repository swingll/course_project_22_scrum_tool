import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import moment from 'moment'
import axios from 'axios'

export function ModalExample(props: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClick = (id: string) => {
    axios.put(`/tasks/update/${id}`, {
      title: title,
      content: content,
      status: status
    })
      .then((response) => {
        if (response.data.message)
          alert(response.data.message)
        else {
          setModal(!modal);
          setTitle('');
          setContent('');
          setLoading(false);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const { propContent, classType } = props;

  return (
    <div>
      <Button color="primary" size="sm" className={classType} onClick={() => setToggle(!toggle)}><i className="fas fa-arrow-alt-circle-right" /></Button>
      <Modal isOpen={modal} toggle={() => setToggle(!toggle)} className={props.className}>
        <ModalHeader toggle={() => setToggle(!toggle)}>
          <Label for="title">Task Title:</Label><Input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="content">Task Details:</Label>
            <Input type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
          </FormGroup>
          <Label for="status">Status:</Label>
          <Input type="select" value={status} name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="1">Backlog</option>
            <option value="2">Todo</option>
            <option value="3">In Progress</option>
            <option value="4">Done</option>
          </Input>
          <hr />
          <i className="fas fa-calendar-alt"></i> Created Date: {moment(propContent.date).format("DD.MM.YYYY")}<br />
          <i className="fas fa-clock"></i> Due Date: {moment(propContent.dueDate).format("DD.MM.YYYY")}<br />
          <i className="fas fa-user"></i> Created by: {propContent.createdBy}
        </ModalBody>
        <ModalFooter>
          <img height="35" alt={propContent.contributors[0].name + ' ' + propContent.contributors[0].lastName} title={propContent.contributors[0].name + ' ' + propContent.contributors[0].lastName} src={'/assets/img/' + propContent.contributors[0].profilePhoto} />
          <Button color="primary" onClick={() => handleClick(propContent._id)}>Update</Button>
          <Button color="secondary" onClick={() => setToggle(!toggle)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;