/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Fragment, useContext,useEffect } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/theme";
import NewProject from "../../pages/sports/settings"
import "./lg.css"

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");
  const { pathname } = useLocation();
  const [isuser, setUser] = useState(false);
  interface NavigationItem {
    name: string;
    href: string;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUser(!!localStorage.getItem("userData"));
  });

 const useras = [
   { name: "Profile", href: "#" },
   { name: "Sign out", href: "/logout" },
 ];
 const guest=[
   { name: "Profile", href: "#" },
   { name: "Sign Up", href: "/signup" },
   { name: "Sign in", href: "/signin" },
 ]
 let userNavigation: NavigationItem[];
 if(isuser){
   userNavigation=useras
 }else{
   userNavigation=guest
 }
 






  const navigation = [
  
    { name: "Sports", href: "/account/sport", current: false },
  ];
  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  return (
    <>
      <Disclosure as="nav" className="border-slate-950">
        {({}) => (
          <div className="mx-auto max-w-7xl px-4  ">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
               
                <div className="hidden md:block">
                  <div className="ml-0 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = pathname.includes(item.href);

                      return (
                        <Link
      key={item.name}
      to={item.href}
      className={classNames(
        "",
        isCurrent
          ? "text-blue-700 after:bg-green-500 after:content-[''] after:h-1 after:absolute after:bottom-0 after:left-0 after:w-full after:transform after:scale-x-0 after:origin-left after:shadow-green-500"
          : "text-slate-500 hover:text-blue-600",
      )}
      aria-current={isCurrent ? "page" : undefined}
    >
     <div className="iconlev">{item.name}</div>
      
    </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
         
                {isuser && <NewProject />}
            
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}

                    className={`${enabled ? "bg-slate-400" : "bg-slate-700"}
                      relative inline-flex h-[20px] w-[55px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-9" : "translate-x-0"}
                        pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  
                  {/* Setting Icon */}
                
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2  text-sm text-gray-700",
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
