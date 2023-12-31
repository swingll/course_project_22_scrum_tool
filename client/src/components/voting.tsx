import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from './loader';
import Moment from 'moment';
import './Voting/voting.css';
import { useFetchVotingByTask, useUpdateVoting} from "../states/voting/hooks";
import {useUser} from "../states/user/hooks";

export function Voting() {

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
    title: string
    data: VotingDetails[]
    date: Date
    status: number
    _id: String
    __v:number

  }

  interface VotingDetails {
    _id: String
    name: string
    votes: number
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchVotingByTask] = useFetchVotingByTask();
  const [updateVoting] = useUpdateVoting();
  const [isUpdate, setIsUpdate] = useState<number>(0);
  const [isVoting, setIsVoting] = useState<boolean>(true);
  const { profile: { id: userId } } = useUser() // TODO: fetch users
  const [voting, setVoting] = useState<Voting>({
    contributors: [{
    roles: "",
    public: false,
    profilePhoto: "",
    _id: "",
    username: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    __v: 0}],
    _id: "",
    status: 1,
    date: new Date(),    
    title:"",
    story: '',
    task: '',
    data: [{
      _id: "",
      name: "",
      votes: 0
    }],
    __v: 0
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      navigate('/notfound');
      return;
    } else {
      const data = fetchVotingByTask(id);
      data.then((res) => {
        setVoting(res.data[0]);
        
      });      
    }
    // setInterval(() => { }, 5000);
  }, [id]);

  useEffect(() => {
    if(isUpdate > 0){
      updateVoting(voting);
      setIsVoting(false); 
    }else{
      let contributors = voting.contributors.slice(1);
      if(contributors.length > 0 && contributors.includes(userId.toString())){
          setIsVoting(false); 
      }
    }
    
  }, [voting]);

  function handleVoting(index: number): void {
    const newData = [...voting.data];// Create a copy of the data array
    newData[index].votes += 1; // Update the votes for the selected index
    setVoting({...voting, data: newData }); // Return the updated state object
    setIsUpdate(1);
  }

  return (
    <div>
      <h1>{voting.title}</h1>
      <div className="languages">
        {
          voting && voting?.data?.map((v, index) => (<div key={index} className="language">
            <div className="voteCount">
              {v.votes}
            </div>
            <div className="languageName">
              {v.name}
            </div>
            {isVoting &&<button onClick={() => handleVoting(index) }>Click Here</button>}
            {!isVoting &&<button disabled >Voted</button>}
          </div>
          ))
        }
      </div>
    </div>
  )
}
export default Voting