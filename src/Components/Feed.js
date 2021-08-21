import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { database } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadFile from "./UploadFile";
import HeaderBar from "./HeaderBar";
import "./Feed.css";
import Posts from "./Posts";

function Feed() {
  const { logout, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
    });
    return unsub;
  }, [currentUser]);
  return (
    <>
      {userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <HeaderBar userData={userData} logout={logout} showName={false}/>
          <div style={{ height: "1.5vh" }} />
          <span className="upload">
              <UploadFile userData={userData} />
            </span>
          <div className="feed-container">
            
            <div className="center">
              <Posts userData={userData} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Feed;
