/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Fragment,useRef } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { articlelist } from "../../context/article/types";
import Skeleton from "react-loading-skeleton";
import { Sports } from "../../context/sport/types";
import { MdRecordVoiceOver } from "react-icons/md";
import { MdVoiceOverOff } from "react-icons/md";

type dataDetail = articlelist& {
  isRunning: boolean;
  content?: string;
};

const read = () => {
  const navigate = useNavigate();
  const { Id } = useParams();

  const [data, setData] = useState<dataDetail>();
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  // FetchMatchData retrieve Data of Particular data When User Clicks on Readmore
  const FetchMatchData = async () => {
    const res = await fetch(`${API_ENDPOINT}/articles/${Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: dataDetail = await res.json();
    setData(data);
  };

  useEffect(() => {
    void FetchMatchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  // eslint-disable-next-line prefer-const
  let synth = window.speechSynthesis;
  let voice;
  const textToSpeakRef = useRef<HTMLDivElement>(null);

  // other code...

  function speak() {
    console.log("speak");
    voice = new SpeechSynthesisUtterance(`${textToSpeakRef.current?.textContent}`);
    synth.speak(voice);
  }

  function stopSpeaking() {
      console.log("stopSpeaking");
      synth.cancel();
  }
  if (data) {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 overflow-y-auto custom-scrollbar ">
              <div className="flex min-h-full items-center justify-center sm:p-12 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full transform overflow-hidden rounded-2x backside p-4 md:p-6 text-left align-middle shadow-xl transition-all dark:text-white dark:bg-gray-900">
                    <div className="absolute right-0 top-0 pr-4 pt-4 ">
                      <button
                        type="button"
                        className=" text-xl font-semibold rounded-md  text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 md:text-3xl text-md font-bold"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="text-lg font-light leading-6 text-gray-700/75"
                    ></Dialog.Title>
                    <div className="mt-4">
                      <div className="backside dark:text-white dark:bg-gray-900">
                        <div className="mx-auto max-w-7xl md:px-8">
                          <div className="mx-auto flex max-w-2xl flex-col items-baseline justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                            <div className="w-full lg:max-w-lg lg:flex-auto">
                              <h2 className="text-xl font-bold tracking-tight contentread md:text-4xl dark:text-white">
                                {data?.sport?.name}
                              </h2>
                              <p className="text-sm font-semibold mt-2">
                                {
                                  String(data?.date)
                                    ?.toString()
                                    ?.split("T")[1]
                                    ?.split(".")[0]
                                }
                                ,{String(data?.date)?.toString()?.split("T")[0]}
                              </p>
                              <p className="mt-6 text-xl leading-8 sumpara">
                               <i>{data?.summary}</i> 
                              </p>
                              <img
                                src={data?.thumbnail}
                                className="mt-12 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                              />
                            </div>
                            <div className="w-full lg:max-w-xl lg:flex-auto">
                              <h3 className="text-xl md:text-3xl font-bold">
                                {data?.title}
                              </h3>
                              <p className="my-3 space-x-2">
                                {data?.teams?.map((team: Sports) => (
                                  <span
                                    className="bg-gray-200/75 text-gray-600/75 p-2 my-2 dark:text-white dark:bg-gray-700 rounded"
                                    key={team?.id}
                                  >
                                    # {team?.name}
                                  </span>
                                ))}
                              </p>
                              <div className="voice" >
  <button id="speak" onClick={speak}><MdRecordVoiceOver /></button>
  <button id="stop" onClick={stopSpeaking}><MdVoiceOverOff /></button>
</div>


                              <div id="texttospeak" ref={textToSpeakRef}> <p className="md:my-6 xl:my-24 text-md md:text-xl leading-normal md:leading-8 text-white">
                                {data?.content}
                              </p></div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  } else {
    return (
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                  <div className="absolute right-0 top-0 pr-4 pt-4 ">
                    <button
                      type="button"
                      className=" text-xl font-semibold rounded-md bg-whites text-gray-400 hover:text-gray-500"
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 md:text-3xl text-md font-bold"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <div className="mt-4">
                    <div className="bg-white dark:bg-gray-900">
                      <div className="mx-auto max-w-7xl md:px-8">
                        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                          <div className="w-full lg:max-w-lg lg:flex-auto">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-4xl">
                              <Skeleton height={30} width={150} />
                            </h2>
                            <p className="text-sm font-semibold mt-2 ">
                              <Skeleton height={15} width={80} />
                            </p>
                            <p className="mt-6 text-xl leading-8 text-gray-600">
                              <Skeleton height={50} width={300} />
                            </p>
                            <Skeleton className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]" />
                          </div>
                          <div className="w-full lg:max-w-xl lg:flex-auto">
                            <h3 className="text-xl md:text-3xl font-bold">
                              <Skeleton height={40} width={450} />
                            </h3>
                            <p className="my-3 space-x-2">
                              <span className="bg-gray-200/75 text-gray-600/75 p-2 my-2">
                                <Skeleton height={8} width={80} />
                              </span>
                            </p>
                            <p className="my-6 text-md md:text-xl leading-normal md:leading-8 text-gray-600">
                              <Skeleton height={435} width={500} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
};

export default read;