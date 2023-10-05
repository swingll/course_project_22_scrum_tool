import * as React from "react";
import {useParams, useNavigate, Link, useLocation} from 'react-router-dom';
import { Story } from './story';
import AddStory from './forms/addStory';
import Loader from './loader';
import Header from './common/header';
import { useFetchStories, useStories } from "../states/story/hooks";
import {useAuthorize} from "../states/permission/hooks";

export function Dashboard() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation()

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [tasks, setTasks] = React.useState<any[]>([]);
  const [story, setStory] = React.useState<any>();

  const [fetchStories] = useFetchStories();
  const { stories, count } = useStories();
  const addButtonShow = useAuthorize("story","C")

  React.useEffect(() => {
    console.log("???")
    if (!id) {
      navigate('/notfound');
      return;
    }
    setLoading(true)
    fetchStories().finally(()=>setLoading(false))

    // setInterval(() => { }, 5000);
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
  }, [stories,location])


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
  let addButton = ():React.JSX.Element=>{
    return addButtonShow? (<div className="otherMenu">
      <AddStory />
    </div>):(<></>)
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
        <Header />
        <aside>
          {story && <Story story={story} tasks={tasks ?? []} loading={loading} />}
        </aside>
      </div>
    </div>
  )
}
export default Dashboard