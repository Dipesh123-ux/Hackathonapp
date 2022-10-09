import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import h1 from '../assests/bxs_cloud-upload.svg'

const Update = () => {
  const [title, setTitle] = useState('');
  const [st, setSt] = useState('');
  const [en, setEn] = useState('');
  const [des, setDes] = useState('');
  const [lev, setlev] = useState('');
  let navigate = useNavigate();
  const [hack, setHack] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://hackathondphi.herokuapp.com/api/hackathon/${id}`).then(data => {
      return data.json();
    }).then((h) => {
      setTitle(h.title);
      setSt(h.start)
      setEn(h.end)
      setDes(h.description)
      setlev(h.level)
    })
  }, [hack])

  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://hackathondphi.herokuapp.com/api/update/${id}`, {
      method: 'put',
      headers: {
        Accept: "application/json"
      },
      body: formData,

    }).then((response) => {
      return response.json();
    })
      .then((data) => {

        if (data) {
          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

  const handleChange = name => e => {

    if (name === "start" || name === "end") {
      const val = new Date(`${e.target.value}`).getTime();
      console.log(val.toString())
      formData.set(name, val.toString());
    }
    else {
      const value = name === "photo" ? e.target.files[0] : e.target.value;
      console.log(value)
      formData.set(name, value);
    }

  }


  return (
    <div>
      <div className="grid content-center h-16 bg-emerald-50">
        <p className="text-basic font-bold ml-12">Challenge details</p>
      </div>
      <div className="m-12">

        <form onSubmit={handleSubmit} class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-3 md:mb-0">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Challenge Name
              </label>
              <input value={title} class="appearance-none block w-3/4 bg-gray-200 text-gray-700 border rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="challenge" onChange={handleChange("title")} />
            </div>
            <div class="w-full px-3">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Start date
              </label>
              <input class="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="datetime-local" placeholder="" onChange={handleChange("start")} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                End date
              </label>
              <input class="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="datetime-local" onChange={handleChange("end")} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Description
              </label>
              <textarea value={des} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" onChange={handleChange("description")}></textarea>
            </div>
            <div class="w-full mt-4 px-3 mb-6 md:mb-0">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Image
              </label>
              <div className="bg-gray-300 h-12 w-4/12 rounded flex justify-center align-center">
                <img className="h-8 absolute mt-2" src={h1} alt="" />
                <input onChange={handleChange("photo")} className="opacity-0" type="file" />
              </div>
            </div>
            <div class="w-1/2 px-3 mt-4 md:mb-0">
              <label class="block   tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Level
              </label>
              <div class="relative">
                <select value={lev} onChange={handleChange("level")} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-g text-white text-center p-2 mt-4 rounded" type="submit">Save Changes</button>
        </form>


      </div>
    </div>
  )
}

export default Update