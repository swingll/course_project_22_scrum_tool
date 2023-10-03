import * as React from "react";
import moment from 'moment';
import ModalExampleDimmer from './modal';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import Loader from './loader';
import { useDeleteTask } from "../states/task/hooks";
import { useFetchStories } from "../states/story/hooks";

export function Task({ tasks, loading, filter }: any) {

  // const componentWillReceiveProps = () => {
  //   $(".mcell-task").draggable({
  //     appendTo: "body",
  //     cursor: "move",
  //     helper: 'clone',
  //     revert: "invalid"
  //   });

  //   $(".mcell").droppable({
  //     tolerance: "intersect",
  //     accept: ".mcell-task",
  //     activeClass: "ui-state-default",
  //     hoverClass: "ui-state-hover",
  //     drop: function (event, ui) {
  //       $(this).append($(ui.draggable));
  //       console.log($(this).find("li").attr('id'))
  //     }
  //   });
  // }

  const [fetchStories] = useFetchStories();
  const [removeTask] = useDeleteTask();

  const onDelete = (id: string) => {
    removeTask(id)
      .then((res) => {
        
      }).catch((err) => {
        
      }).finally(() => {
        fetchStories(); // refresh stories
      })
  }

  let content;
  if (loading) {
    content = <div className="loader">
      <Loader />
    </div>;
  }
  else {
    content =
      tasks.filter((task: any) => task.status === Number(filter))
        .map((task: any, index: number) => {
          return (
            <li id={task._id} className="mcell-task" key={index}>
              <span className="task-name">
                <span>{task.title}</span>
                <i id="delete" className="fas fa-times" onClick={() => onDelete(task._id)}></i>
              </span>
              <span className="task-details">{task.content}</span>
              <div>
                <span className="task-due">{moment(task.dueDate).format("DD.MM.YYYY")}</span>
                <span className="task-contributors">
                  <img alt={task.contributors[0].name + ' ' + task.contributors[0].lastName} title={task.contributors[0].name + ' ' + task.contributors[0].lastName} src={'/assets/img/' + task.contributors[0].profilePhoto} />
                </span>
              </div>
              <div className={task.color} />
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