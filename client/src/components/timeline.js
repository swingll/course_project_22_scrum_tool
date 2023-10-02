import React,{Component} from 'react'
import axios from 'axios'
// import {Link} from 'react-router'
import Loader from './loader'
import Header from './common/header'
import Gantt from './Gantt';

class Timeline extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      show: true,
      timeDetails:  {
        data: [
            { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
            { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: '0' }
        ]
    },
      tasks:[],
      stories:[],
      err:'',
      err2:'',
      loading:true,
      loadingStory:true
    };
    
    this.getTimelineDetails = this.getTimelineDetails.bind(this)
  }
  


  componentDidMount = ()=>{
    // this.getStoryDetails();
    // this.getData();
    this.getTimelineDetails();
    setInterval(() => {
      // this.getData();
  }, 2000);
  }

  getTimelineDetails = () => {
//     axios.get(`/time`)
//     .then((r)=> {
        this.setState({
            timeDetails:  {
                data: [
                    { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
                    { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
                ],
                links: [
                    { id: 1, source: 1, target: 2, type: '0' }
                ]
            }
                   })
//     })
//     .then(()=>{
//       this.setState({
//         loadingStory:false
//     })
//   })
//     .catch((e)=>{
//         this.setState({
//           loadingStory:false,
//           err2: e
//         })
//     })
   
  }

  getStoryDetails = () => {
    axios.get(`/story`)
    .then((r)=> {
        this.setState({
            stories: r.data,
            err2:''
        })
    })
    .then(()=>{
      this.setState({
        loadingStory:false
    })
  })
    .catch((e)=>{
        this.setState({
          loadingStory:false,
          err2: e
        })
    })
   
  }
 
    render(){      
      let {stories,loadingStory} = this.state;
      let storyTable;
    //   if(!loadingStory)
    //   storyTable = stories.map((story,index)=>{
    //     return(
    //       <li key={index}>
    //         <Link to={`/story/${story.storyId}`} activeClassName="active">
    //           <i className="fas fa-list-alt"></i>
    //           <span className="menu-text">{story.title}</span>
    //         </Link>
    //       </li>
    //     )
    //   })
    //   else
      storyTable = <li>
        <div className="loader">
         <Loader/>
          </div>
      </li>
        return(
            <div>
              <div className="side">
                <span className="logo">Scrum Beta</span>
                <ul className="side-menu">
                  {storyTable}
                </ul>
                <div className="otherMenu">
                  TO DO GO BACK?
                </div>
               
              </div>
              <div className="con">
                <Header/>
                <div className="gantt-container">                  
                    <Gantt tasks={this.state.timeDetails}/>
                </div>

              </div>
            </div>
        )
    }
}
export default Timeline