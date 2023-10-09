import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Gantt from './Gantt';
import { useFetchTimelines, useTimelines } from "../states/timeline/hooks";
import { useFetchTlinedetails, useTlinedetails } from "../states/tlinedetail/hooks";
import MessageArea from './MessageArea/MessageArea';
import Toolbar from './Toolbar/Toolbar';

const data = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6, timeId:"123", contributors :""},
    { id: 2, text: 'Task #2', start_date: '2020-02-16', duration: 3, progress: 0.4, timeId:"123", contributors :""},
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' },
  ],
};

export function Timeline() {
  interface Data {
    id: number
    text: any
    start_date: any
    duration: any
    progress: any
  }
  interface TimelineData {
    data: [{
      id: number
      text: any
      start_date: any
      duration: any
      progress: any
    },]
  }

  const { id } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>('');
  const [err2, setErr2] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [timeline, setTimeline] = React.useState<any[]>([]);
  const [timelineDetail, setTimelineDetail] = React.useState<any[]>([]);
  const [timelineLink, setTimelineLink] = React.useState<any[]>([]);
  // const [story, setStory] = React.useState<any>();

  const [fetchTimelines] = useFetchTimelines();
  const [fetchTlinedetails] = useFetchTlinedetails();
  const { timelines, count } = useTimelines();
  const [gantTimelines, setGantTimelines] = React.useState<TimelineData>();
  const [data1, setData1] = useState({
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
    }else{
      fetchTimelines();
    }
   
    // fetchTlinedetails();
    // setInterval(() => { }, 5000);
  }, []);

  React.useEffect(() => {
    if (!timelines || count === 0) return;
       
    if(id === '1'){//TODO
      setTimeline(timelines[0]);
    }else{
      const tl = timelines.find((timeline: any) => timeline._id === id);
      if (!tl) {
        // navigate('/notfound');
        return;
      }
  
      setTimeline(tl);

      console.log("here!!!! timeline", timeline);
      const { timelineDetail: _timelineDetail } = tl;
  
      const { timelineLink: _timelineLink } = tl;
  
      if (!_timelineDetail) {
        // navigate('/notfound');
        return;
      }
  
      setTimelineDetail(_timelineDetail);
  
      if (!_timelineLink) {
        // navigate('/notfound');
        return;
      }
  
      setTimelineLink(_timelineLink);
    }
    
    console.log("here!!!! timeline timeline", timeline);     


  }, [timelines])



  return (


    <div>
      <div className="zoom-bar">
        <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
      </div>
      <div className="gantt-container">
        {/* <Gantt tasks={data} zoom={currentZoom} onDataUpdated={logDataUpdate} /> */}
        <Gantt tasks={data} zoom={currentZoom} onDataUpdated={logDataUpdate} />
      </div>
      <MessageArea messages={messages} />
      <>{console.log({ messages })}</>
    </div>



  )


}
export default Timeline