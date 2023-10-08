import * as React from 'react';
import Task from './task'
import Tooltips from './tooltip'
import {Alert, Button, Modal, ModalFooter, ModalHeader} from "reactstrap";
import {useAuthorize} from "../states/permission/hooks";
import {useDeleteStory, useFetchStories} from "../states/story/hooks";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {TaskInfo} from "./taskInfo";

export function Story({story, tasks, loading,setLoading}: any) {
    const [isDeleting, setDeleting] = React.useState<boolean>(false)
    const [err,setErr] = React.useState<string>('')
    const deletePermission = useAuthorize("story", "D")
    const [removeStory] = useDeleteStory()
    const [fetchStories] = useFetchStories(false)
    const navigate = useNavigate()
    let cancelDelete = ()=>{setDeleting(false);setErr('')}
    let confirmDelete = ()=>{setDeleting(true),setErr('')}
    let deleteStory = async ()=>{
        try{
            setLoading(true)
            await removeStory(story["_id"])
            cancelDelete()
            await fetchStories()
            navigate('/story/999')
        }catch(e:any){
            if(e instanceof AxiosError){
                setErr(e.response?e.response.data.message:'???')

            }else if(typeof e === 'string'){
                setErr(e)
            }
            setLoading(false)
        }


    }

    let deleteButton = deletePermission ? (<Button variant={"secondary"} onClick={confirmDelete}>Delete Story</Button>) : <></>;
    let errMsg = err?<Alert>{err}</Alert>:<></>
    return (
        <>
            <Modal isOpen={isDeleting}>
                <ModalHeader>Make Sure you want to delete story <span style={{
                    color: 'blue',
                }}>{story ? story.title : "..."}</span></ModalHeader>
                {errMsg}
                <ModalFooter>
                    <Button color="primary" onClick={deleteStory}>
                        Confirm Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='container'>
                <div className='space'>
                    <h2 className='story'>{story ? story.title : 'Loading...'}</h2>
                    {deleteButton}
                </div>
                <div className='row'>
                    {[...Array(4)].map((_,i)=><TaskInfo  key={`${i}keyInfo`}{...{index:i,story,tasks,loading,setLoading}}></TaskInfo>)}
                </div>
            </div>
        </>
    )
}