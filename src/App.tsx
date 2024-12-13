import { useEffect, useState } from 'react'

import { Character } from './types/character'
import { FetchDataApi } from './types/fetch-data-api';




function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<string>(""); 
  const [species, setSpecies] = useState<string>("");
  const [gender, setGender] = useState<string>("")


  const fetchData = async () => {
    const baseUrl = "https://rickandmortyapi.com/api/character";

    const queryParams = new URLSearchParams({
      status: status,
      species: species,
      gender: gender,
    });

    queryParams.forEach((value, key) => {
      if (!value) {
        queryParams.delete(key);
      }
    });


    const data = await fetch(`${baseUrl}?${queryParams.toString()}`)

    const jsonData: FetchDataApi = await data.json()
    setCharacters(jsonData.results)
  }

  const orderCharacters = (order: "asc" | "desc") => {
    const sorted = [...characters].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return order === "asc" ? -1 : 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return order === "asc" ? 1 : -1;
      return 0;
    });
    setCharacters(sorted);
  };

  useEffect(() => {

    fetchData()
  }, [species, status, gender])

  return (
    <>
      <div className='flex flex-col justify-center items-center m-4'>
        <h1 className='text-2xl font-extrabold mb-4'>The Rick and Morty API</h1>

        <div className='flex justify-center'>
          <section className='min-w-40 flex flex-col'>
            <button className='bg-gray-700 w-full p-1 text-white rounded mb-2' onClick={() => orderCharacters("asc")}>
              orden: a-z
            </button>
            <button className='bg-gray-700 p-1 w-full text-white rounded mb-2' onClick={() => orderCharacters("desc")}>
              orden: z-a
            </button>

            <p>Status</p>
            <select className='bg-gray-700 p-1 w-full text-white rounded mb-2' onChange={(e) => setStatus(e.target.value)}>
              <option value="">Default</option>
              <option value="Alive">Alive</option>
              <option value="unknown">Unknown</option>
            </select>
            <p>Gender</p>
            <select className='bg-gray-700 p-1 w-full text-white rounded mb-2' onChange={(e) => setGender(e.target.value)}>
              <option value="">Default</option>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="genderless">genderless</option>
              <option value="unknown">unknown</option>
            </select>
            <p>Species</p>
            <select className='bg-gray-700 p-1 w-full text-white rounded mb-2' onChange={(e) => setSpecies(e.target.value)}>
            <option value="">Default</option>
              <option value="default">Default</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Human">Human</option>
            </select>
          </section>
        </div>
      </div>
      <div className="flex justify-center min-w-60 p-4 bg-slate-800">
        
        <section className="grid gap-x-1 gap-y-4  grid-cols-subgrid sm:grid-cols-2 lg:grid-cols-3 ">
          {characters.map((c, i) => (
            <article className="min-w-64 m-2 bg-[#444444]" key={i}>
              <div>
                <img src={c.image} alt={c.name} />
              </div>
              <div className='p-4 text-white font-bold'>
                <h3>Name: {c.name}</h3>
                <h3>Species: {c.species} </h3>
              </div>
            </article>
          ))}
        </section>
      </div>
      
    </>
  )
}

export default App
