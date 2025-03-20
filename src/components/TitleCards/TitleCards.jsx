import React, { useRef, useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {
const [apiData, setApiData] = useState([]);

const cardsRef = useRef();
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmY0Yzc4MmE2YjFlYWIyNTgyYWQ0MWM1NDE0ZWY0YSIsIm5iZiI6MTc0MjQ5MjAwOS42ODcsInN1YiI6IjY3ZGM1MTY5MzUwODkxMTQ1MjZiOWJlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6tCe8z8KgNngW4CbmP2qaHz5nZtjiMAynIVTyRZ4OXw'
    }
};

const handleWheel = (event) => {
event.preventDefault();
cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    
    cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='title-cards'>
      <h2>
        {title ? title: "Popular on Netlfix"}
      </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key ={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards