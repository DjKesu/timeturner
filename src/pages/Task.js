import React from 'react';
//firebase stuff 
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Redirect } from "react-router-dom";

//the general skeleton of a react stateless component
//the props are the properties that are passed in from the parent component
//the props are immutable, so they cannot be changed
export default function Task(props) {
    //authentication stuff
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Redirect to="/signup" />;
      } else {
        return (
          <>
            <div className="flex flex-wrap">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <p>{currentUser.email} is logged in</p>
              </div>
            </div>
          </>
        );
      }
    }