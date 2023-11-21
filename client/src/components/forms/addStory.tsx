import * as React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Spinner, Alert} from 'reactstrap';
import { useCreateStory, useFetchStories } from "../../states/story/hooks";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import { useCreateTimeline } from '../../states/timeline/hooks';

export function AddStory(props: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [err, setErr] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [createTimeline] = useCreateTimeline();
  const [fetchStories] = useFetchStories();
  const [createStories] = useCreateStory();
  const navigateRef = useRef((_)=>{})
  const navigate = useNavigate()

  navigateRef.current = navigate
  const handleClick = (event: any) => {
    setErr('');

    setLoading(true);
    let _id = `999`
    createStories({ title })
      .then(({data}) => {
        setModal(false);
        setTitle('');
        _id = data._id
        const timeline = {story:_id}
        createTimeline(timeline);
      }).catch((err) => {
        setErr(err);
      }).finally(() => {

        fetchStories().finally(()=> {
          props.setFutureId(_id)
          setLoading(false)
        }) // refresh stories
      })
  }
  const errorMsg = err?<Alert color="warning">{err}</Alert>:<></>

  return (
    <div>
      <Button color="secondary" onClick={() => setModal(!modal)}><i className="fas fa-plus-circle" /> Add Story</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className={props.className}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Add Story
        </ModalHeader>
        <ModalBody>
          {errorMsg}
          <FormGroup>
            <Label for="title">Story Title(*):</Label>
            <Input type="text" name="title" disabled={loading} onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={loading} onClick={(e) => handleClick(e)}><i className="fas fa-plus-circle"></i> {loading?<Spinner />:"Add"}</Button>
          <Button color="secondary" disabled={loading} onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddStory;