import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeaderBar from "./HeaderBar";
import { storage, database } from "../firebase";
import "./Profile.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {FaTrash} from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Profile() {
  const { logout, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const classes = useStyles();
  // const handleDelete=(post)=>{
    
  // }
  useEffect(() => {
    const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
      setUserData(doc.data());
    });
    return unsub;
  }, [currentUser]);

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().userId === userData?.userId) {
            // console.log(doc.data());
            let data = { ...doc.data(), postId: doc.id };
            parr.push(data);
          }
        });
        setPosts(parr);
      });
    return unsub;
  }, [userData]);
  return (
    <>
      {userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <HeaderBar userData={userData} logout={logout} showName={true} />
          {posts == null || posts.length === 0 ? (
            posts != null && posts.length === 0 ? (
              <></>
            ) : (
              <CircularProgress className="loader" color="secondary" />
            )
          ) : (
            <div className="profile-container">
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={10}>
                    {posts.map((post) => (
                      <Grid key={post.postId} item>
                        <video
                          autoPlay={false}
                          className="profilevid"
                          controls
                          type="video/mp4"
                        >
                          <source src={post.pUrl} type="video/webm" />
                        </video>
                        {/* <FaTrash onClick={()=>handleDelete(post)}/> */}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
