import React, { useContext, useState } from "react";
import { UidContext } from "../components/ContextApi/uidContext";
import Log from "../components/Log";
import WelcomeCard from "../components/Menu/WelcomeCard";
import Navbar from "../components/Navigation/Navbar";

const Home = () => {
  const uid = useContext(UidContext);
  const [signUp, setSignUp] = useState(true);
  console.log(uid);
  return (
    <>
    <Navbar setSignUp={setSignUp} signUp={signUp} />
   <main>
      <div className="home main">
        <div className="main">
          {uid ? (
            <WelcomeCard />
          ) : (
            <div className="home-header">
              {" "}
              <Log signUp={signUp} />{" "}
            </div>
          )}
        </div>
      </div>
   </main>
    </>
  );
};

export default Home;
