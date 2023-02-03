import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputNamePokemon, setinputNamePokemon] = useState("");
  const [showpokemon, setshowpokemon] = useState(false);


  function randomPokemon() {
    var random = Math.floor(Math.random() * 1008) + 1;
    return random
  }

  useEffect(() => {
    let RandomNumber = randomPokemon();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${RandomNumber}/`).then((resp) => {
      setData(resp.data);
      setLoading(false);
      console.log(resp.data)
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }, []);

  function ValidadePokemon() {
    if (inputNamePokemon == 0) {
      return
    }
    setTimeout(() => {
      setshowpokemon(true);
    }, 600);
    if (inputNamePokemon.toLocaleLowerCase() === data.name) {
      alert("Ganhou")
    } else {
      alert("perdeu")
    }
  }

  const UpdatePokemonName = (event) => {
    setinputNamePokemon(event.target.value)
    console.log(event.target.value)

  };

  return (
    <>
      <main className="h-screen bg-slate-500 flex justify-center items-center">
        <div className="w-5/6 h-screen flex flex-col items-center min-h-50re justify-center">
          <div className="w-1/2 my-5 flex justify-center">
            {!loading ? <img src={loading === true ? "" : data.sprites.other["official-artwork"].front_default} className={showpokemon === false ? "brightness-0" : ""}></img> : <h1>Logando</h1>}
          </div>
          <input type={"text"} className="w-4/6 h-10 text-2xl rounded" onChange={UpdatePokemonName}></input>
          <button disabled={loading === true} type="button" className="transition ease-in-out delay-150 my-6 bg-cyan-500  w-2/6 h-16 rounded-lg hover:bg-cyan-800 hover:text-white duration-300" onClick={ValidadePokemon}>Enviar</button>
        </div>
      </main >
    </>
  );
}

export default App;
