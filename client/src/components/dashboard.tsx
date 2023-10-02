import * as React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router';
import { Story } from './story';
import AddStory from './forms/addStory';
import Loader from './loader';
import Header from './common/header';
import { useFetchStories, useStories } from "../states/story/hooks";

export function Dashboard() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [tasks, setTasks] = React.useState<any[]>([]);
  const [story, setStory] = React.useState<any>();

  const [fetchStories] = useFetchStories();
  const { stories, count } = useStories();

  React.useEffect(() => {
    if (!id) {
      navigate('/notfound');
      return;
    }
    fetchStories();
    // setInterval(() => {
    // }, 5000);
  }, []);

  React.useEffect(() => {
    if (!stories || count === 0) return;

    const s = stories.find((story: any) => story._id === id);

    if (!s) {
      // navigate('/notfound');
      return;
    }

    setStory(s);

    const { tasks: _tasks } = s;

    if (!_tasks) {
      // navigate('/notfound');
      return;
    }

    setTasks(_tasks);
  }, [stories])

  let storyTable;

  if (!loading) {
    storyTable = stories.map((story: any, index: number) => {
      return (
        <li key={index}>
          <Link to={`/story/${story._id}`} activeClassName="active">
            <i className="fas fa-list-alt"></i>
            <span className="menu-text">{story.title}</span>
          </Link>
        </li>
      )
    })
  } else {
    storyTable = <li>
      <div className="loader">
        <Loader />
      </div>
    </li>
  }

  return (
    <div>
      <div className="side">
        <span className="logo">Scrum Beta</span>
        <ul className="side-menu">
          {storyTable}
        </ul>
        <div className="otherMenu">
          <AddStory />
        </div>
      </div>
      <div className="con">
        <Header />
        <aside>
          <Story storyName={story ? [story] : []} storyType={id} tasks={tasks ?? []} loading={loading} />
        </aside>
      </div>
    </div>
  )
}
export default Dashboard