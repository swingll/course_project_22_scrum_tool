import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Moment from 'moment';
import Gantt from './Gantt/Gantt';
import { useFetchTimelines, useTimelines, useFetchTimeline } from "../states/timeline/hooks";
import { useCreateTimelinedetail} from "../states/timelinedetail/hooks";

import MessageArea from './MessageArea/MessageArea';
import Toolbar from './Toolbar/Toolbar';

export function Timeline() {
  interface Data {
    id: number
    text: any
    start_date: any
    duration: any
    progress: any
  }
  
  // interface TimelineData {
  //   contributors:[{
  //     roles:string,
  //   }]
  //   data: [{
  //     id: number
  //     text: any
  //     start_date: any
  //     duration: any
  //     progress: any
  //   },]
  // }

  interface TimelineData {  
    contributors:any[]
      id: number
      text: any
      start_date: any
      duration: any
      progress: any
  
  }

  interface TimelineLink {  
      id: number
      source: number
      target: number
      type: String
  
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchTimelines] = useFetchTimelines();
  const [fetchTimeline] = useFetchTimeline();
  const { timelines, count } = useTimelines();
  const [timeline, setTimeline] = React.useState<any[]>([]);
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
    // useCreateTimelinedetail
    // const tmp = {id:1696942534488, duration: item.duration, parent: parent, progress:progress};
    // setTimelineData(...);
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
      const daa = fetchTimelines();
      // console.log(daa);
      const da = fetchTimeline('652250087eb001c14029dfaa')
      da.then((res)=>{
        console.log(res.data);
      });
      console.log(da);
    }   
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

     
      // const { timelineDetail: _timelineDetail } = tl;
  
      // const { timelineLink: _timelineLink } = tl;
  
      // if (!_timelineDetail) {
      //   // navigate('/notfound');
      //   return;
      // }
      //   setTimelineDetail(_timelineDetail);
  
      // if (!_timelineLink) {
      //   // navigate('/notfound');
      //   return;
      // }
      //   setTimelineLink(_timelineLink);
    }
    
    // console.log("here!!!! timelines timelines", timelines);     
    // console.log("here!!!! timeline", timelines['timelinedetails']);
    // console.log("here!!!! timeline",timelines[0]);
   
    // var datatmp = timelines[0]['timelinedetails'];
    var dataTmp : TimelineData[]= [];
    timelines[0]['timelinedetails'].forEach(element => {  
      var tmp:TimelineData =  { id: -1, text: '', start_date: "", duration: 3, progress: 0.6, contributors :[]};  
      tmp['id'] =element['id'];
      tmp['start_date'] =Moment(new Date(element['start_date'])).format("YYYY-MM-DD hh:mm:ss");;
      tmp['text'] =element['text'];
      tmp['duration'] =element['duration'];
      tmp['progress'] =element['progress'];
      dataTmp.push(tmp);
    });
    var linkTmp : TimelineLink[]= []; 
    timelines[0]['timelinelinks'].forEach(element => {
      var tmp:TimelineLink =  { id: -1, source: -1, target: -1, type: '0' };      
      tmp['id'] =element['id'];
      tmp['source'] =element['source'];
      tmp['target'] =element['target'];
      tmp['type'] =element['type'];
      linkTmp.push(tmp);
    });
    // console.log("here!!!! datatmp", datatmp);
    setTimelineDatas({...timelineDatas, data: dataTmp, links:linkTmp})
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