import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Moment from 'moment';
import Gantt from './Gantt/Gantt';
import { useFetchTimelines, useTimelines, useFetchTimeline } from "../states/timeline/hooks";
import { useCreateTimelinedetail, useUpdateTimelinedetail } from "../states/timelinedetail/hooks";

import MessageArea from './MessageArea/MessageArea';
import Toolbar from './Toolbar/Toolbar';

export function Timeline() {

  interface Timeline {
    contributors: [{
      roles: string,
    }]
    date: Date
    status: number
    _id: String
    story: any
    timelinedetails: [TimelineData,]
    timelinelinks: [TimelineLink]
  }

  interface TimelineData {
    _id: String
    contributors: any[]
    id: number
    text: any
    start_date: any
    duration: any
    progress: any
    parent:number

  }

  interface TimelineLink {
    _id: String
    id: number
    source: number
    target: number
    type: String

  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchTimelines] = useFetchTimelines();
  const [fetchTimeline] = useFetchTimeline();
  const [createTimelinedetail] = useCreateTimelinedetail();
  const [updateTimelinedetail] = useUpdateTimelinedetail();
  const { timelines, count } = useTimelines();
  const [timeline, setTimeline] = React.useState<Timeline>();
  const [timelineData, setTimelineData] = useState<TimelineData>();

  const [timelineDatas, setTimelineDatas] = useState<{ data: any[]; links: any[] }>({
    data: [],
    links: [],
  });

  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState<{ message: string }[]>([]);

  const addMessage = (message: string): void => {
    const maxLogLength = 5;
    const newMessage = { message };
    const updatedMessages = [newMessage, ...messages.slice(0, maxLogLength - 1)];

    setMessages(updatedMessages);
  };

  const logDataUpdate = (type: string, action: string, item: any, id: string): void => {
    console.log("type", type);
    console.log("action", action);
    console.log("item", item);
    console.log("id", id);
    // console.log("timeline", timeline);
    const tl = timeline?.timelinedetails?.find((timelinedetail: TimelineData) => timelinedetail.id === parseInt(id));
    console.log("tl", tl);
    // useCreateTimelinedetail
    const tmp = { _id: tl?._id, id: id, duration: item.duration, parent: item.parent, progress: item.progress, start_date: item.start_date, text: item.text, timeline: "652250087eb001c14029dfaa" };
    // setTimelineData(...);
    if(action === 'create')
      createTimelinedetail(tmp);
    if(action === 'update')
      updateTimelinedetail(tmp);
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    addMessage(message);
  };
  const handleZoomChange = (zoom: string): void => {
    setCurrentZoom(zoom);
  };

  useEffect(() => {
    // console.log("here!!!!");
    if (!id) {
      navigate('/notfound');
      return;
    } else {
      const daa = fetchTimelines();
      // console.log(daa);
      const da = fetchTimeline('652250087eb001c14029dfaa')
      da.then((res) => {
        console.log(res.data);
      });
      console.log(da);
    }
    // setInterval(() => { }, 5000);
  }, []);

  React.useEffect(() => {
    if (!timelines || count === 0) return;

    if (id === '1') {//TODO
      setTimeline(timelines[0]);
    } else {
      const tl = timelines.find((timeline: any) => timeline._id === id);
      if (!tl) {
        // navigate('/notfound');
        return;
      }

      setTimeline(tl);
      console.log(tl);

    }

    // var datatmp = timelines[0]['timelinedetails'];
    var dataTmp: TimelineData[] = [];
    timeline?.timelinedetails?.forEach(element => {
      var tmp: TimelineData = { _id: "", id: -1, text: '', start_date: "", duration: 3, progress: 0.6, contributors: [], parent: -1 };
      tmp['id'] = element['id'];
      tmp['start_date'] = Moment(new Date(element['start_date'])).format("YYYY-MM-DD hh:mm:ss");;
      tmp['text'] = element['text'];
      tmp['duration'] = element['duration'];
      tmp['progress'] = element['progress'];
      tmp['parent'] = element['parent'];
      dataTmp.push(tmp);
    });
    var linkTmp: TimelineLink[] = [];
    timeline?.timelinelinks?.forEach(element => {
      var tmp: TimelineLink = { _id: "", id: -1, source: -1, target: -1, type: '0' };
      tmp['id'] = element['id'];
      tmp['source'] = element['source'];
      tmp['target'] = element['target'];
      tmp['type'] = element['type'];
      linkTmp.push(tmp);
    });
    // console.log("here!!!! datatmp", datatmp);
    setTimelineDatas({ ...timelineDatas, data: dataTmp, links: linkTmp })
  }, [timelines])



  return (


    <div>
      <div className="zoom-bar">
        <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
      </div>
      <div className="gantt-container">
        {/* <Gantt tasks={data} zoom={currentZoom} onDataUpdated={logDataUpdate} /> */}
        {timelineDatas && timelineDatas.data?.length > 0 && <Gantt tasks={timelineDatas} zoom={currentZoom} onDataUpdated={logDataUpdate} />}
      </div>
      <MessageArea messages={messages} />
      {/* <>{console.log({ messages })}</> */}
    </div>



  )


}
export default Timeline