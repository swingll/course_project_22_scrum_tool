import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import AddUser from '../forms/addUser';
import { signout } from '../../states/user/service';
import { useSignout } from '../../states/user/hooks';
import { setStory } from '../../states/story/service';
import { useCreateTimeline } from '../../states/timeline/hooks';
import { useFetchStory } from "../../states/story/hooks";

function Header({story}:any) {
  const [err, setErr] = React.useState<string>('');
  const [createTimeline] = useCreateTimeline();
  const [setLogout] = useSignout();
  const [timelineId, setTimelineId] = useState<string>();
  const [fetchStory] = useFetchStory();

  const csignout = () => {
    signout().then((res) => {
      if (res.status === 200) { 
        setLogout();
      }
    }).catch((err) => {
      const { response } = err
      console.log(response)
    })
  }

  useEffect(() => {
    console.log("story",story);
    if(!story?.timeline && story?._id){
        console.log("timeline is null.");
        fetchStory(story?._id).then((res) => {
          if(res.data?.timeline){
            setTimelineId(res.data?.timeline);
          }else{
            console.log("timeline is null.....");
            const timeline = {story:story?._id}
            createTimeline(timeline).then((res)=>{
              setTimelineId(res.data?._id);
            });
          }
          
        }).catch((err) => {
          setErr(err.response.data.message);
        })
    }else{
      console.log("timeline is not null.");
      setTimelineId(story?.timeline ?? -1);
      
    }
    
  }, [story]);

  return (
    <header>
      <div className="container containerDashboard">
        <div className="mainMenu">          
          <ul>
            <Link to="/story/1"><li><i className="fas fa-folder-open"></i><span className="mainMenuText">Board</span></li></Link>
            <a rel="noopener noreferrer" target="_blank" href={"/timeline/" + timelineId}><li><i className="fas fa-code-branch" /><span className="mainMenuText">Timeline</span></li></a>
            {/* <a rel="noopener noreferrer" target="_blank" href={"/voting/" + timelineId}><li><i className="fas fa-code-branch" /><span className="mainMenuText">Voting</span></li></a> */}
            {/* <a rel="noopener noreferrer" target="_blank" href="https://github.com/mreorhan/Scrum-Task-Management-with-ReactJS-Express-Server"><li><i className="fas fa-code-branch" /><span className="mainMenuText">Fork Me on Github</span></li></a> */}
          </ul>
        </div>
        <div className="profilewidget">
          {/* <AddUser /> // TODO: create user by admin */}
          <a onClick={() => csignout()}>Logout</a>
        </div>
      </div>
    </header>
  )
}
export default Header