import * as React from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from './loader';
import Header from './common/header';
import Gantt from './Gantt';
import { useFetchTimelines, useTimelines } from "../states/timeline/hooks";

export function Timeline() {
  interface Data {
    id: number
    text: any
    start_date: any
    duration: any
    progress: any
  }
  interface TimelineData {
    data: [Data]

  }

  const { id } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [timeline, setTimeline] = React.useState<any[]>([]);
  // const [story, setStory] = React.useState<any>();

  const [fetchTimelines] = useFetchTimelines();
  const { timelines, count } = useTimelines();
  const [gantTimelines, setGantTimelines] = React.useState<TimelineData>();
  const [data, setData] = React.useState<TimelineData>();
  // const [timelineData, setTimelineData] = React.useState<>([])
  ;

  React.useEffect(() => {
    if (!id) {
      navigate('/notfound');
      return;
    }
    fetchTimelines();
    // setInterval(() => { }, 5000);
  }, []);

  React.useEffect(() => {
    if (!timelines || count === 0) return;

    // const t = timelines.find((timeline: any) => timeline._id === id);

    // if (!t) {
    //   // navigate('/notfound');
    //   return;
    // }
    //   data: [
    //     { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
    //     { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    // ],
    // links: [
    //     { id: 1, source: 1, target: 2, type: '0' }
    // ]
    console.log("timelines", timelines)
    timelines.map((t, index) => {
      setData({
        ...data,
        data: [
          {
            id: index,
            text: t.text,
            start_date: t.start_date,
            duration: t.duration,
            progress: t.progress
          }]
      });
    })
    console.log("data", data)
    const dataT = { data: data }
    setGantTimelines(data);
    // setGantTimelines(newSetOfArray);
    console.log("gantTimelines", gantTimelines)

  }, [timelines])


  let storyTable;

  if (!loading) {
    storyTable = timelines.map((story: any, index: number) => {
      return (
        <li key={index}>
          <Link reloadDocument to={`/story/${story._id}`}>
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
        <span className="logo">Scrum Tools</span>
        <ul className="side-menu">
          {storyTable}
        </ul>
        <div className="otherMenu">

        </div>
      </div>
      <div className="con">
        <Header />
        {/* <aside>
          {timeline && <Story story={story} tasks={tasks ?? []} loading={loading} />}}
        </aside> */}
        <aside>
          <div className="gantt-container">
            {data && <Gantt tasks={data} />}
          </div>
        </aside>
      </div>
    </div>
  )
}
export default Timeline