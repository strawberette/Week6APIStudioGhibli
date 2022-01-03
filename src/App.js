import './App.css';
import { useState, useEffect } from "react"

function App() {
  const [movies, setMovies] = useState([])
  const [movieDetails, setMovieDetails] = useState({})
  const [visibility, setVisibility] = useState("active")
  
  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = async () => {
    const response = await fetch("https://ghibliapi.herokuapp.com/films", {
      method: "GET"
    })

    const movies = await response.json()
  
    setMovies(movies)
    console.log(movies)
  }

  const handleDetails = async (id) => {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`, {
      method: "GET"
    })

    const movieDetails = await response.json()
  
    setVisibility("inactive")
    setMovieDetails(movieDetails)
    console.log(movieDetails)


  }
  const backToList = ()=> {
    setVisibility("active")
    

  }
  return (
    <div className="App">
      <h1 className={visibility}>Studio Ghibli Movies</h1>
      <img className={`hero ${visibility}`} src="/studio-ghibli-movies.jpeg" alt="studio ghibli animes"/> <br />
      {/* <p>{movie.title ? movie.title : "Click the button to get info about your favourite animes!"}</p> */}
      <div className="filmList">
        <ol className={visibility}>
        {movies.map((m, index) => {
          console.log(index)
          // return <li key={index} onClick={handleDetails}>{m.title}</li>
          return <ListItem key={index} filmId={m.id} title={m.title} handler={handleDetails} image={m.image} rating={m.rt_score} />
        })}
      </ol>
      </div>
     <Details 
        release={movieDetails.release_date} 
        description={movieDetails.description} 
        director={movieDetails.director} 
        origTitle={movieDetails.original_title} 
        origTitleRoman={movieDetails.original_title_romanised} 
        image={movieDetails.image} 
        handleClick={backToList} 
        visibility={visibility == "active" ? "inactive" : "active"}
      />
    
    </div>
  );
}


const ListItem = (props) => {
  return (
    <li onClick={() => props.handler(props.filmId)}>
      {props.key}
      <img className="thumbnail" src={props.image}/>
      <a className='movieLink'  href="#">{props.title}</a>
      <span className="rating"><img className="rt" src="/RTlogo.png"/> {props.rating}</span>
    </li>
  )
}
const Details = (props) => {
  if (props.description == null) {
    return <></>
  }

  return (
    <div className={`filmDetails ${props.visibility}`}>
      <img className="filmCover" src={props.image} />
      <p><strong>Description:</strong> {props.description}</p>
      <p><strong>Release Date:</strong> {props.release}</p>
      <p><strong>Director:</strong> {props.director}</p>
      <p><strong>Original Title:</strong> {props.origTitle} ({props.origTitleRoman})</p>
      <button onClick={props.handleClick}>BACK</button>
    
     </div>
  )
}
// const Anime = ({movies}) => <p>{movies}</p>
export default App;
