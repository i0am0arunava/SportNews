/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FetchPreferes } from "../../context/prefer/actions"
import { usePreferDispatch } from "../../context/prefer/context"
import { useSportsState } from "../../context/sport/context";
import { useSportsDispatch } from "../../context/sport/context";
import { FetchSports } from "../../context/sport/actions";
import { usearticlesState } from "../../context/article/context";
import { fetcharticles } from "../../context/article/actions";
import { usearticleDispatch } from "../../context/article/context";
import { refresharticles } from "../../context/article/actions";
import { articlelist } from "../../context/article/types";
import { usePreferState } from "../../context/prefer/context"
const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const preferstate = usePreferState();
  const preferdispatch = usePreferDispatch()
  const [fetchedData, setFetchedData] = useState<articlelist[]>([]);
  const token = localStorage.getItem("authToken")
  useEffect(() => {
    fetch('https://wd301-capstone-api.pupilfirst.school/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setFetchedData(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [token]);

  // Now you can access 'fetchedData' outside the promise chain





  const handleLinkClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link);
  };
  const sportState = useSportsState();
  const sportDispatch = useSportsDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const articalState = usearticlesState();
  const taskDispatch = usearticleDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    FetchPreferes(preferdispatch)

  }, [preferdispatch]);
  useEffect(() => {
    fetcharticles(taskDispatch);


  }, [taskDispatch]);
  console.log(articalState)
  useEffect(() => {
    FetchSports(sportDispatch);


  }, [sportDispatch]);

  const show = (a: string) => {
    if (a === "all") {
      fetcharticles(taskDispatch);
    } else {
      const b = fetchedData?.filter((item) => item.sport.name === a);

      refresharticles(taskDispatch, b)
    }
  }

  const filtersport = sportState.sports.filter(item => preferstate.selectedsport.includes(item.name));
  console.log("2222", filtersport)
  return (
    <div className="Navbar">
      <ul className="flex space-x-4 ">
        <li className={`nav-link ${activeLink === "allnews" ? 'active' : ''}`}
          onClick={() => handleLinkClick("allnews")}>
          <button
            type="button"
            className={`nav-button ${activeLink === "#allnews" ? 'active' : ''} text-cyan-800`}
            onClick={() => show("all")}
          >
            All News
          </button>
        </li>
        {filtersport.length === 0 ? (
         sportState.sports.map((sport) => (
          <li
            key={sport.id}
            className={`nav-link ${activeLink === `#${sport.name}` ? 'active' : ''}`}
            onClick={() => handleLinkClick(`#${sport.name}`)}
          >
            <button
              type="button"
              className={`nav-button ${activeLink === `#${sport.name}` ? 'active' : ''} text-gray-500`}
              onClick={() => show(sport.name)}
            >
              {sport.name}
            </button>
          </li>
        ))
        ) : (
          filtersport.map((sport) => (
            <li
              key={sport.id}
              className={`nav-link ${activeLink === `#${sport.name}` ? 'active' : ''}`}
              onClick={() => handleLinkClick(`#${sport.name}`)}
            >
              <button
                type="button"
                className={`nav-button ${activeLink === `#${sport.name}` ? 'active' : ''} text-gray-500`}
                onClick={() => show(sport.name)}
              >
                {sport.name}
              </button>
            </li>
          ))
        )}

      </ul>
    </div>
  );
};

export default Navbar;