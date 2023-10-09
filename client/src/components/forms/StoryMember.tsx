import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import { useFetchUsers, useUsers } from "../../states/user/hooks";
import { useFetchStories, useUpdateStory } from "../../states/story/hooks";

export function StoryMember({ story, className }: any) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [members, setMembers] = React.useState<any[]>(story.members ?? []);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [fetchUsers] = useFetchUsers();
  const [updateStory] = useUpdateStory();
  const [fetchStories] = useFetchStories();
  const users = useUsers() // TODO: fetch users

  React.useEffect(() => {
    if (!users || users.length === 0) fetchUsers();
  }, [])

  const onMembersChange = (id) => {
    const _user = users.find(u => u['_id'] === id);
    setSelectedUser(_user);
  }

  const onAddMembers = () => {
    if (!selectedUser) return;
    if (members.filter(m => m._id === selectedUser._id).length === 0) setMembers([...members, selectedUser])
  }

  const onRemoveMembers = (id) => {
    setMembers(members.filter((m) => (m._id !== id)));
  }

  let userContent;
  if (!users || !users.length)
    userContent = <option value=''>Loading...</option>
  else {
    userContent = users.filter(u => u['_id'] !== story.creator._id).map((user: any, index: number) => (
      <option key={index} value={user._id}>{user.username}</option>
    ))
  }

  const handleClick = (e) => {
    updateStory({ id: story._id, members })
      .then((res) => {
        setModal(false);
        setLoading(true)
      }).catch((err) => {

      }).finally(() => {
        fetchStories();
        setLoading(false);
      })
  }

  return (
    <div>
      <Button variant={"secondary"} onClick={() => setModal(!modal)}>Manage Member</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className={className}>
        <ModalHeader toggle={() => setModal(!modal)}>
          <i className="fas fa-user-circle"></i><span>{`Mange Members of ${story?.title}`}</span>
        </ModalHeader>
        <ModalBody>
          <div>
            <Label>Current Members</Label>
            {
              members && members.length > 0 ?
              (members.map(member => (<div key={member?._id}>{member?.username}&nbsp;<i className="fas fa-minus-circle" onClick={() => onRemoveMembers(member._id)}></i></div>))):
              (<div>No Members</div>)
            }
          </div>

          <br />

          <FormGroup>
            <Label for="contributors">Select Member:&nbsp;</Label>
            <Input type="select" name="members" id="members" onChange={(e) => onMembersChange(e.target.value)}>
              {(users && users.length) ? <option value="">Choose</option> : <></>}
              {userContent}
            </Input>
          </FormGroup>
          {<i className="fas fa-plus-circle" onClick={() => onAddMembers()}></i>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={loading} onClick={(e) => handleClick(e)}>Submit</Button>
          <Button color="secondary" disabled={loading} onClick={() => setModal(!modal)}><i className="fas fa-times-circle"></i> Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default StoryMember;