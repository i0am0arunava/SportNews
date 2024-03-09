/* eslint-disable @typescript-eslint/no-unused-vars */
import "./sport.css"
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetcharticles } from "../../context/article/actions";
import { usearticlesState } from "../../context/article/context";
import { usearticleDispatch } from "../../context/article/context";
import SkeletonLoading from "./loadings"
import { useMatchesState, useMatchesDispatch } from "../../context/Match/context";
import { FetchMatches } from "../../context/Match/actions";
import "react-loading-skeleton/dist/skeleton.css";
import { FaLocationDot } from "react-icons/fa6";
import SkeletonLoadingtwo from "./loadingtwo";
import { usePreferState } from "../../context/prefer/context"
import { useSportsState } from "../../context/sport/context";
import { articlelist } from "../../context/article/types"
import { Outlet } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi2";
const Sports = () => {
  const [userSport, setuserSport] = useState("");
  const [userTeam, setuserTeam] = useState("");
  const articalState = usearticlesState();
  const preferstate = usePreferState();
  const taskDispatch = usearticleDispatch();
  const matchstate = useMatchesState();
  const matchDispatch = useMatchesDispatch();
  const sportState = useSportsState();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animationCount, setAnimationCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetcharticles(taskDispatch);


  }, [taskDispatch]);

  useEffect(() => {
    FetchMatches(matchDispatch);


  }, [matchDispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the state to trigger the animation reset
      setAnimationCount((prevCount) => prevCount + 1);
    }, 15000); // Interval should match the animation duration

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const sortedData = matchstate.matches.sort((a, b) => (a.isRunning && !b.isRunning ? -1 : 0));
  const filterarticle = articalState.article.filter(item => preferstate.selectedsport.includes(item.sport.name));

  const filteredArray = sortedData.filter(item => {
    return (preferstate.selectedsport.includes(item.sportName) || item.teams.some(t => preferstate.selectedteam.includes(t.name))) && !item.isRunning;
  });
  const livess = sortedData.filter(item => item.isRunning);
  const finalmatch = [...livess, ...filteredArray]


  const hasMatchingsport = livess.some(item => preferstate.selectedsport.includes(item.sportName));
  const hasMatchingTeams = livess.some(item => item.teams.some(team => preferstate.selectedteam.includes(team.name)))

  let matchfin;
  if (finalmatch.every(item => item.isRunning === true) && !hasMatchingsport && !hasMatchingTeams) {
    matchfin = sortedData;
  } else {
    matchfin = finalmatch
  }

  const [fetchednewart, setFetchednew] = useState<articlelist[]>([]);
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
        setFetchednew(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [token]);
  const newartic = fetchednewart.filter(item => preferstate.selectedsport.includes(item.sport.name));



  let fetchedData;
  if (newartic.length === 0) {
    fetchedData = fetchednewart
  } else {
    fetchedData = newartic
  }

  const temsare = matchstate.matches.flatMap(obj => obj.teams);
  const preferteam = temsare.filter(item => preferstate.selectedteam.includes(item.name))
  let curteam;
  if (preferstate.selectedteam.length === 0) {
    curteam = temsare
  } else {

    curteam = preferteam
  }
  const prefersport = sportState.sports.filter(item => preferstate.selectedsport.includes(item.name))
  let cursports;
  if (preferstate.selectedsport.length === 0) {
    cursports = sportState.sports
  } else {

    cursports = prefersport
  }

  const userselect = [userSport, userTeam]
  let usersidebar;
  if (userSport == "" && userTeam != "") {

    usersidebar = fetchedData.filter(item => {
      return (item.teams.some(t => userselect.includes(t.name)));
    });
  } else if (userTeam === "" && userSport != "") {
    usersidebar = fetchedData.filter(item => {
      return (userselect.includes(item.sport.name));
    });
  } else if (userSport == "" && userTeam == "") {
    usersidebar = fetchedData;
  } else {
    usersidebar = fetchedData.filter(item => {
      return (userselect.includes(item.sport.name) && item.teams.some(t => userselect.includes(t.name)));
    });
  }
  let userfavaur;
  if (usersidebar.length != 0) {
    userfavaur = usersidebar
  } else {
    userfavaur = [{ id: "notfound", title: `There is No News Article For ${userselect[0]} and ${userselect[1]} `, thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLzUKYgf4-dLgzX8ScukVzj6x4GY17uAqmWPa5TwThJxUWD5iK8YHjlENPs2N-kAeIaA&usqp=CAU", sport: { id: null, name: "none" } }]
  }


  console.log(" userfavaur2", userfavaur)
  return (

    <div className="hell">

      <div className="sidebar">
        <div className="content-box3">
          <div className="label">FAVOURATE SECTION</div>
          <select
            id="sportSelect"
            className="appearance-none py-2 px-4 pr-8 rounded leading-tight focus:outline-none"
            value={userSport}
            onChange={(e) => setuserSport(e.target.value)}
          >
            <option value="">Select Sport</option>
            <option value="">Refresh Sport Section</option>
            {cursports.map((sport) => (
              <option key={sport.id} value={sport.name}>
                {sport.name}
              </option>
            ))}
          </select>
          <select
            id="teamSelect"
            className="appearance-none py-2 px-4 pr-8 rounded leading-tight focus:outline-none"
            value={userTeam}
            onChange={(e) => setuserTeam(e.target.value)}
          >
            <option value="">Select Team</option>
            <option value="">Refresh Team Section</option>
            {curteam.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>

        </div>
        <div>

          {userfavaur.map((data, index) => (
                  <Link to={`News/${data.id}`}>
            <div className="content-box2" key={index}>
              {/* Use data from fetchedData and fetched.ttl here */}
        
              <img
                src={data.thumbnail}
                alt="Thumbnail"
             

              />             
                     <p className="sport-name">   <Link to={`News/${data.id}`}><HiInformationCircle /></Link>{data.sport.name}</p>
                     <div className="readm">
                           
                            </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="rectangular-box" style={{ animationIterationCount: animationCount }}>
        {matchstate.isLoading ? (
          <>
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
            <SkeletonLoadingtwo />
          </>
        ) : (
          matchfin.map((match) => (
            <div
              key={match.id}
              className="rect-box"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {match.isRunning && <><div className="flex gap-1"><span className="flex gap-1 items-center match-live"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" ></path></svg>Live</span></div><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-800 opacity-70 logo border-2 border-green-600 shadow-lg">
                {/* Your content goes here */}
              </span>

              </>}
              <div className="match-name">{match.sportName}</div>

              <div className="match-team">
                {match.teams.map((item) => (
                  <div key={item.id} className="score">
                    <span className="team">{item.name}</span>
                    <span>{item.id}</span>
                  </div>

                ))}
              </div>

              {/* ROTATING REFRESH BUTTON */}
              <div className="refbut"><svg
                onClick={() => {
                  const refresh = document.getElementsByClassName(`refresh${match.id}`)[0];
                  refresh.classList.add('rotateAnimation');

                  // Remove the rotateAnimation class after 1 second (adjust as needed)
                  setTimeout(() => refresh.classList.remove('rotateAnimation'), 1000);
                }}
                className={`refresh${match.id}`}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"
                />
              </svg>
              </div>



              <div className="match-location">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaLocationDot style={{ fontSize: '30px', color: '#102894', marginRight: '5px' }} />
                  <span>{match.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="container">
        <Navbar />
        <div className="scroll-box">
          {articalState.isLoading ? (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />

              <SkeletonLoading />
            </>
          ) : (
            <>
              {filterarticle.length === 0 ? (
                articalState.article.map((article) => (
                  <Link

                    to={`News/${article.id}`}

                  >
                    <div className="content-box1" key={article.id}>
                      <div className="image-wrapper relative">
                        <img
                          src={article.thumbnail}
                          alt="Thumbnail"
                          className="w-[300px] h-[200px] max-w-full max-h-full object-cover rounded-t-lg min-[1024px]:rounded-l-lg p-1"
                        />
                        <div className="absolute inset-0 flex items-center justify-center ">
                          <div className="text-white text-center">
                            <div className="text-lg font-bold mb-2">
                              <b>
                                <i>{article.sport.name}</i>
                              </b>
                            </div>
                            <div className="mb-2">
                              <i>{article.title}</i>
                            </div>
                            <div className="read-more-button">
                              <Link to={`News/${article.id}`}>Read more</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                filterarticle.map((article) => (
                  <Link

                    to={`News/${article.id}`}

                  >
                    <div className="content-box1" key={article.id}>
                      <div className="image-wrapper relative">
                        <img
                          src={article.thumbnail}
                          alt="Thumbnail"
                          className="w-[300px] h-[200px] max-w-full max-h-full object-cover rounded-t-lg min-[1024px]:rounded-l-lg p-1"
                        />
                        <div className="absolute inset-0 flex items-center justify-center ">
                          <div className="text-white text-center">
                            <div className="text-lg font-bold mb-2">
                              <b>
                                <i>{article.sport.name}</i>
                              </b>
                            </div>
                            <div className="mb-2">
                              <i>{article.title}</i>
                            </div>
                            <div className="read-more-button">
                              <Link to={`News/${article.id}`}>Read more</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))

              )}
            </>
          )}
        </div>
      </div>


      <Outlet />;
    </div >


  )
}
export default Sports;