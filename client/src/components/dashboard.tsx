import * as React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router';
import { Story } from './story';
import AddStory from './forms/addStory';
import Loader from './loader';
import Header from './common/header';

export function Dashboard(props: any) {
  const { id } = useParams();

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<any>([]);
  const [stories, setStories] = React.useState<any>([]);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingStory, setLoadingStory] = React.useState<boolean>(false);

  React.useEffect(() => {
    getStoryDetails();
    getData();
    setInterval(() => {
      // this.getData();
    }, 2000);
  }, []) 

  const getStoryDetails = () => {
    axios.get(`/story`)
      .then((r) => {
        setStories(r.data);
        setErr2('');
      })
      .then(() => {
        setLoadingStory(false)
      })
      .catch((e) => {
        setLoadingStory(false)
        setErr2(e);
      })

  }

  const getData = () => {
    axios.get(`/tasks/${id}`)
      .then((r) => {
        setTasks(r.data);
        setErr('');
      })
      .then(() => {
        setLoading(false)
      })
      .catch((e) => {
        if (!e.response) {
          setLoading(true)
          setErr(e);
        }
        else {
          setLoading(false)
          setErr(e);
        }
      })


  }

  let storyTable;

  if (!loadingStory)
    storyTable = stories.map((story: any, index: number) => {
      return (
        <li key={index}>
          <Link to={`/story/${story.storyId}`} activeClassName="active">
            <i className="fas fa-list-alt"></i>
            <span className="menu-text">{story.title}</span>
          </Link>
        </li>
      )
    })
  else
    storyTable = <li>
      <div className="loader">
        <Loader />
      </div>
    </li>
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
          <Story storyName={stories.filter((i: any) => i.storyId === parseInt(props.router.params.id))} storyType={id} tasks={tasks} loading={loading} />
        </aside>

      </div>
    </div>
  )
}
export default Dashboard