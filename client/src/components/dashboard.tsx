import * as React from "react";
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Story } from './story';
import AddStory from './forms/addStory';
import Loader from './loader';
import Header from './common/header';
import { useFetchStories, useStories } from "../states/story/hooks";
import { useAuthorize } from "../states/permission/hooks";
import { useRef, useState } from "react";
import { useFetchUsers } from "../states/user/hooks";

export function Dashboard() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation()

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  const [tasks, setTasks] = React.useState<any[]>([]);
  const [story, setStory] = React.useState<any>();
  const [futureId, setFutureId] = useState(id)

  const [fetchStories] = useFetchStories();
  const [fetchUsers] = useFetchUsers();
  const { stories, count } = useStories();

  const addButtonShow = useAuthorize("story", "C")
  const init = useRef(false)
  React.useEffect(() => {
    // if not do this the callback function may be called twice during first time rendering
    if (!init.current) {
      init.current = true;
      if (!id) {
        navigate('/notfound');
        return;
      }
      setLoading(true)
      //
      try {
        fetchStories();
        fetchUsers();
      } finally {
        setLoading(false);
      }
    }

    // setInterval(() => { }, 5000);
  }, []);

  React.useEffect(() => {
    if (!stories || count === 0) return;
    if (futureId !== id) {
      navigate(`/story/${futureId}`)
      setLoading(false)
      return
    }
    const s = stories.find((story: any) => story._id === id);
    if (!s) {
      navigate(`/story/${stories[0]._id}`);
      setLoading(false)
      return;
    }

    setStory(s);

    const { tasks: _tasks } = s;

    if (!_tasks) {
      // navigate('/notfound');
      setLoading(false)
      return;
    }

    setTasks(_tasks);
    setLoading(false)
  }, [stories])
  React.useEffect(() => {
    if (!stories || count === 0) return;

    const s = stories.find((story: any) => story._id === id);
    if (!s) {
      navigate(`/story/${stories[0]._id}`);
      return;
    }

    setStory(s);

    const { tasks: _tasks } = s;

    if (!_tasks) {
      // navigate('/notfound');
      return;
    }

    setTasks(_tasks);
  }, [id])


  let storyTable;

  if (!loading) {
    storyTable = stories.map((story: any, index: number) => {
      return (
        <li key={index}>
          <Link to={`/story/${story._id}`}>
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
  let addButton = (): React.JSX.Element => {
    return addButtonShow ? (<div className="otherMenu">
      <AddStory setFutureId={setFutureId} />
    </div>) : (<></>)
  }

  return (
    <div>
      <div className="side">
        <span className="logo">Scrum Beta</span>
        {addButton()}
        <ul className="side-menu">
          {storyTable}
        </ul>

      </div>
      <div className="con">
        <Header story= {story}/>
        <aside>
          {story && <Story story={story} tasks={tasks ?? []} setLoading={setLoading} loading={loading} />}
        </aside>
      </div>
    </div>
  )
}
export default Dashboard