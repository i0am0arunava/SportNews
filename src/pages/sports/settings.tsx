/* eslint-disable @typescript-eslint/ban-types */
// src/pages/projects/NewProject.tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { CogIcon } from "@heroicons/react/24/outline";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { matchdata } from "../../context/Match/types";
import { Sportan } from "../../context/sport/types"
import { FetchPreferes, updaPreferes } from "../../context/prefer/actions"
import { usePreferDispatch, usePreferState } from "../../context/prefer/context"
import { preferance } from "../../context/prefer/types"
import { useNavigate } from "react-router-dom";


const NewProject = () => {

  const navigate = useNavigate();
  const preferdispatch = usePreferDispatch()


  const [isOpen, setIsOpen] = useState(false)

  const [fetchedteam, setFetchedteam] = useState<matchdata>();
  const [fetchedtitle, setFetchedtitle] = useState<Sportan>();
  const [selectedSports, setSelectedSports] = useState<String[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<String[]>([]);
  console.log(selectedSports)
  console.log(selectedTeams)
  const token = localStorage.getItem("authToken")
  const preferstate = usePreferState();
  useEffect(() => {
    FetchPreferes(preferdispatch)

  }, [preferdispatch]);
  useEffect(() => {
    fetch('https://wd301-capstone-api.pupilfirst.school/matches', {
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
        setFetchedteam(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [token]);
  useEffect(() => {
    fetch('https://wd301-capstone-api.pupilfirst.school/sports', {
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
        setFetchedtitle(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [token]);

  const handleSportCheckboxChange = (sport: string, preferstate: preferance) => {
    console.log("hellow")

    if (preferstate.selectedsport.includes(sport)) {
      // If sport is already selected, remove it
      console.log("delete")
      preferstate.selectedsport = preferstate.selectedsport.filter((selectedSport) => selectedSport !== sport);
    } else {
      // If sport is not selected, add it
      console.log("in")
      preferstate.selectedsport = [...preferstate.selectedsport, sport];
      console.log(preferstate.selectedsport)
    }
    setSelectedSports(preferstate.selectedsport);
  };


  const handleTeamCheckboxChange = (team: string, preferstate: preferance) => {

    if (preferstate.selectedteam.includes(team)) {
      // If team is already selected, remove it

      preferstate.selectedteam = preferstate.selectedteam.filter((selectedTeam) => selectedTeam !== team);
    } else {
      // If team is not selected, add it

      preferstate.selectedteam = [...preferstate.selectedteam, team];
    }
    setSelectedTeams(preferstate.selectedteam);
  };


  const d = { selectedsport: preferstate.selectedsport, selectedteam: preferstate.selectedteam }
  const c = { ...preferstate, ...d }

  const closeModal = () => {
    setIsOpen(false)
    updaPreferes(preferdispatch, c)
  }

  const openModal = () => {
    setIsOpen(true)
  }



  if (preferstate.iserror === "Unable to Load Matches") {
    toast.error("Authentication Failed\n You may be logged in elsewhere\n Please Try To Login Again", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/signin");
  
  }



  return (
    <>
      <button
        id="new-member-btn"
        type="button"
        onClick={openModal}

      >
        <CogIcon className="h-8 w-8 mr-10 text-white hover:text-blue-600" aria-hidden="true" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        {/* ... (your existing modal code) */}
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full max-w-3xl mb-50 transform overflow-hidden rounded-2xl backdrop-filter backdrop-blur-xl   bg-[rgba(0, 0, 30, 0.9)] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="diag seting text-lg font-medium leading-6 mt-1 ml-64">
                    Create new Member
                  </Dialog.Title>
                  <div className="mt-2">


                    <section className="sec ">Sports</section>
                    <div className="mt-2 grid grid-cols-3">
                      {fetchedtitle?.sports.map((item) => (
                        <div key={item.id} className="mb-4 flex items-center">
                          <input
                            type="checkbox"

                            id={item.name}
                            className="text-blue-500 mr-2"
                            onChange={() => handleSportCheckboxChange(item.name, preferstate)}
                            defaultChecked={preferstate.selectedsport.includes(item.name)}


                          />
                          <label htmlFor={item.name} className="block text-gray-400">
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <section className="sec ">Teams</section>

                    <div className="mt-2 grid grid-cols-3">
                      {fetchedteam?.matches.map((match) => (
                        <div key={match.id}>
                          {match.teams.map((team) => (
                            <div className="mb-4 flex items-center" key={team.id}>
                              <input
                                type="checkbox"
                                id={team.name}
                                className="text-blue-500 mr-2"
                                onChange={() => handleTeamCheckboxChange(team.name, preferstate)}
                                defaultChecked={preferstate.selectedteam.includes(team.name)}

                              />
                              <label htmlFor={team.name} className="block text-gray-400">
                                {team.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>




                  </div>

                  {/* Save and Cancel buttons outside the form */}
                  <div className="flex justify-end mt-4 absolute bottom-4 right-4">
                    <button
                      className="prefbut p-2 font-medium text-xl font-[Poppins] dark:hover:bg-white dark:hover:text-gray-900 hover:bg-gray-900 hover:text-white duration-200"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {/* Add Save button if needed */}
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        {/* ... (rest of your modal code) */}
      </Transition>
    </>
  )
}

export default NewProject;
