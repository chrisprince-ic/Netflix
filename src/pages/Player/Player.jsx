import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
 
  const {id} = useParams();
  const navigate =useNavigate();
  const [apiData, setApiData] = useState({
    name:'',
    key : '', 
    published_at: '', 
    typeof: ''
  });
//player api for specific movie key

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmY0Yzc4MmE2YjFlYWIyNTgyYWQ0MWM1NDE0ZWY0YSIsIm5iZiI6MTc0MjQ5MjAwOS42ODcsInN1YiI6IjY3ZGM1MTY5MzUwODkxMTQ1MjZiOWJlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6tCe8z8KgNngW4CbmP2qaHz5nZtjiMAynIVTyRZ4OXw'
  }
};


useEffect(()=>{
  
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

},[])


  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={()=>{navigate("/")}}/>
      <iframe width="90%" height="90%" 
      src={`https://www.youtube.com/embed/${apiData.key}` } title ='Trailer'
      frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p> {apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player