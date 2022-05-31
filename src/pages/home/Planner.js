import "./Planner.css";
import ModulePlanner from "./ModulePlanner";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Planner() {

  //set an overall list for the modules
  const [mods, setMods] = useState([]);
  const [modsInfo, setmodsInfo] = useState(null);

  function newModHandler(newMod) {
    console.log(newMod);
    console.log(mods);
    let validMod = false;
    for (var i = 0; i < modsInfo.length; i++) {
      if (modsInfo[i].moduleCode === newMod.description) {
        let prevMods = [...mods, newMod];
        validMod = true;
        //save the list into local storage
        localStorage.setItem('mods', JSON.stringify(prevMods));
        setMods((prev) => {
          return [...prev, newMod];
        });
      }
    }
    if (!validMod) {
      toast.warn('No such module', {
        position: "bottom-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  //deletes based on uuid out of the entire list of mods
  function deleteHandler(modID) {
    const filteredMods = mods.filter((mod) => mod.id !== modID);
    localStorage.setItem('mods', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }

  //delete all local storage
  function deleteLocalHandler() {
    const filteredMods = [];
    localStorage.setItem('mods', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }

  const url = "https://api.nusmods.com/v2/2021-2022/moduleInfo.json";
  useEffect(() => {
    let mods = [];
    if (localStorage.getItem('mods')) {
      mods = JSON.parse(localStorage.getItem('mods'));
      setMods(mods);
    }

    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      const item = data;
      setmodsInfo(item);
    }
    fetchData()
  }, []);


  return (
    <div className="Planner">
      <header id="catchphrase">
        Make ModReg EZ
      </header>

      <div className="ModulePlan">
        <div id="y1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 1"
            category='year1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y2">
          <header className="subHead">
            <ModulePlanner 
            year="Year 2"
            category='year2'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y3">
          <header className="subHead">
            <ModulePlanner
            year="Year 3"
            category='year3'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y4">
          <header className="subHead">
            <ModulePlanner
            year="Year 4"
            category='year4'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
      </div>
      <div>
      <input 
        id="remove-all"
        className="btn-action"
        type="button" 
        value="remove all"
        onClick={deleteLocalHandler} 
        />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick  
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Planner;