import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from './loader';
import Moment from 'moment';
import './Voting/voting.css';
import { useFetchVoting} from "../states/voting/hooks";



export function Voting() {

  const dummyData = {
    data: [
      { id: 1, name: 'Task #1', votes: 0 },
      { id: 2, name: 'Task #2', votes: 0 }
    ],
    story: 1,
    task: -1
  };

  interface Voting {
    contributors: [{
      roles: string
      public: boolean
      profilePhoto: string
      _id: string
      username: string
      email: string
      createdAt: string
      updatedAt: string
      __v: 0
    }]
    story: any
    task: any
    data: VotingDetails[]
    date: Date
    status: number
    _id: String
    __v:number

  }

  interface VotingDetails {
    id: number
    name: string
    votes: number
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchVoting] = useFetchVoting();
  const [voting, setVoting] = useState<Voting>({
    contributors: [{
    roles: "-1",
    public: false,
    profilePhoto: "default.jpg",
    _id: "6521729009fed13b2898d2c7",
    username: "admin",
    email: "amind@dev.com",
    createdAt: "2023-10-07T15:00:32.670Z",
    updatedAt: "2023-10-07T15:00:32.670Z",
    __v: 0}],
    _id: "653e07aa429062e9010042e7",
    status: 1,
    date: new Date(),
    __v: 11,
    story: '',
    task: '',
    data: [{
      id: -1,
      name: "",
      votes: 0
    }]
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [timelineDatas, setTimelineDatas] = useState<{ data: any[]; links: any[] }>({
  //   data: [],
  //   links: [],
  // });


  useEffect(() => {
    if (!id) {
      navigate('/notfound');
      return;
    } else {
      // setVoting(dummyData);
      const data = fetchVoting("653e07aa429062e9010042e7");
      console.log(data);

      data.then((res) => {
        console.log(res.data);
        setVoting(res.data);
      });
      
    }
    // setInterval(() => { }, 5000);
  }, [id]);

  useEffect(() => {
    console.log("Updated voting state:", voting);
  }, [voting]);

  function handleVoting(index: number): void {
    const newData = [...voting.data];// Create a copy of the data array
    newData[index].votes += 1; // Update the votes for the selected index
    setVoting({...voting, data: newData }); // Return the updated state object
  }


  return (
    <div>
      <h1>Vote Your like!</h1>
      <div className="languages">
        {
          voting && voting?.data?.map((v, index) => (<div key={index} className="language">
            <div className="voteCount">
              {v.votes}
            </div>
            <div className="languageName">
              {v.name}
            </div>
            <button onClick={() => handleVoting(index)}>Click Here</button>
          </div>
          ))
        }
      </div>

    </div>

  )


}
export default Voting