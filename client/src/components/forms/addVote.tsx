import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Alert } from 'reactstrap';

export function AddVote({ story, className }: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<string[]>(['abc', 'efg']);
  const [err, setErr] = React.useState<string>('');
  const [tasks, setTasks] = React.useState<any[]>(story?.tasks ?? []);
  const [selectedTask, setSelectedTask] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const onAddOptions = () => {
    setErr('');
    let x = [...options, '']
    setOptions(x)
  }

  const onDeleteOption = (i) => {
    setErr('');
    let x = [...options]
    x.splice(i, 1)
    setOptions(x)
  }

  const onInputOptions = (i, value) => {
    setErr('');
    let x = [...options]
    x[i] = value
    setOptions(x)
  }

  let taskContent;
  if (!story || !story.tasks || !story.tasks.length)
    taskContent = <option value=''>Loading...</option>
  else {
    taskContent = tasks.filter(u => u['_id'] !== story.creator._id).map((task: any, index: number) => (
      <option key={index} value={task._id}>{task.title}</option>
    ))
  }

  const optionFields = React.useMemo(() => 
    options.map((opt, i) => <FormGroup>
      <i className="fas fa-minus-circle input-icon-right" key={`option_label_${i}`} onClick={() => onDeleteOption(i)}></i>
      <Input type="text" name="option" key={`option_${i}`} value={opt} onChange={(e) => onInputOptions(i, e.target.value)} />
    </FormGroup>)
  , [options])

  const errorMsg = err?<Alert color="warning">{err}</Alert>:<></>
  
  const handleClick = (e) => {
    setErr('');

    if (!selectedTask) { setErr('Task cannot be empty'); return; }

    if (!options || options.length == 0 || options.filter(x => x === '').length > 0) { setErr('Options cannot be empty'); return; }

    if (options.length < 2) { setErr('You cannot vote with one option.'); return; }

    // TODO({ story: story._id, task: selectedTask, options })
    //   .then((res) => {
    //     setModal(false);
    //     setLoading(true)
    //   }).catch((err) => {

    //   }).finally(() => {
    //     fetchStories();
    //     setLoading(false);
    //   })
  }

  return (
    <div>
      <Button variant={"secondary"} onClick={() => setModal(!modal)}>Add Vote</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className={className}>
        <ModalHeader toggle={() => setModal(!modal)}>
          <i className="fas fa-check-to-slot"></i><span>{`Vote of ${story?.name}`}</span>
        </ModalHeader>
        <ModalBody>
          <Label>Story:&nbsp;{story?.title}</Label>

          <FormGroup>
            <Label for="contributors">Add to task:&nbsp;</Label>
            <Input type="select" name="members" id="members" onChange={(e) => { setErr(''); setSelectedTask(e.target.value); }}>
              {(tasks && tasks && tasks.length) ? <option value="">Choose</option> : <></>}
              {taskContent}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="options">Options(*):</Label>
            {optionFields}
            {<i className="fas fa-plus-circle" onClick={() => onAddOptions()}></i>}
          </FormGroup>

          {errorMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={loading} onClick={(e) => handleClick(e)}>Submit</Button>
          <Button color="secondary" disabled={loading} onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddVote;