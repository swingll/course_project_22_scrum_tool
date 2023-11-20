import * as React from "react";
import moment from 'moment';
import ModalExampleDimmer from './modal';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import Loader from './loader';
import { useDeleteTask, useUpdateTask } from "../states/task/hooks";
import { useFetchStories } from "../states/story/hooks";
import { useState } from "react";
import { useAuthorize } from "../states/permission/hooks";

export function Task({ tasks, filter, loading: loadingOver, setLoading: setLoadingOver }: any) {
  React.useEffect(() => {
    $(".mcell-task").draggable({
      appendTo: "body",
      cursor: "move",
      helper: 'clone',
      revert: "invalid"
    });

    $(".mcell").droppable({
      tolerance: "intersect",
      accept: ".mcell-task",
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function (event, ui) {
        // $(this).append($(ui.draggable));
        const id: string = ui.draggable[0].getAttribute('id') ?? ''
        const status = $(this).find('.mcell-title').find('i').attr('id').substring(8, 9)
        if (status === ui.draggable[0].getAttribute('about')) {
          return;
        } else {
          onDrop(id, Number(status));
        }
      }
    });
    setLoadingOver(false)
    setLoading(false)
  }, [tasks])

  const [fetchStories] = useFetchStories();
  const [removeTask] = useDeleteTask();
  const [updateTask] = useUpdateTask();
  const [loading, setLoading] = useState<boolean>()
  const taskDPermission = useAuthorize("task", "D")

  const onDrop = (id: string, status: number) => {
    setLoadingOver(true)
    updateTask({ id, status })
      .then((res) => {

      }).catch((err) => {
        alert(err)
      }).finally(() => {
        fetchStories()
      })
  }

  const onDelete = (id: string) => {
    setLoading(true)
    removeTask(id)
      .then((res) => {

      }).catch((err) => {

      }).finally(() => {
        fetchStories(); // refresh stories
      })
  }
  let photo
  let content;
  if (loading || loadingOver) {
    photo = <></>
    content = <div className="loader">
      <Loader />
    </div>;
  }
  else {
    content =
      tasks.filter((task: any) => task.status === Number(filter))
        .map((task: any, index: number) => {
          photo = (task.contributors[0] && task.contributors[0].profilePhoto) ? (<img alt={task.contributors[0].name + ' ' + task.contributors[0].lastName} title={task.contributors[0].name + ' ' + task.contributors[0].lastName} src={'/assets/img/' + task.contributors[0].profilePhoto} />) : <></>
          return (
            <li id={task._id} about={task.status} className="mcell-task" key={index}>
              <span className="task-name">
                <span>{task.title}</span>
                {taskDPermission ? <i id="delete" title="double click" className="fas fa-times" onDoubleClick={() => onDelete(task._id)}></i> : <></>}
              </span>
              <span className="task-details">{task.content}</span>
              <div>
                <span className="task-due">{moment(task.dueDate).format("DD.MM.YYYY")}</span>
                <span className="task-contributors">
                  {photo}
                </span>
              </div>
              <div className={task.color} />
              {task.voting && task.voting.length > 0 && <span className="task-details"> <a rel="noopener noreferrer" target="_blank" href={"/voting/" + task._id}><li><i className="fas fa-code-branch" /><span className="mainMenuText">Voting</span></li></a></span>}
              
             
              <ModalExampleDimmer propContent={task} classType="btnDashboard" />
            </li>
          )
        })

  }
  return (
    <div className="process">{content}</div>
  )
}
export default Task;