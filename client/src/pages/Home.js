import React, { useContext, useState } from "react";
import { UidContext } from "../components/ContextApi/uidContext";
import Log from "../components/Log";
import WelcomeCard from "../components/Menu/WelcomeCard";
import Navbar from "../components/Navigation/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const uid = useContext(UidContext);
  const [signUp, setSignUp] = useState(true);
  console.log(uid);
  return (
    <>
   <header> <Navbar setSignUp={setSignUp} signUp={signUp} /></header>
   <main  style={{marginBottom : "25rem" }}>
      <div className="home enter">
        <div className="enter">
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
   <footer class="footer"> 
        <div>
        <FontAwesomeIcon
          icon={faX}
          style={{
            color: "#7617c4",
            fontSize: "1.5rem",
            marginLeft: "20rem",
            marginTop: "2rem"
          }}
        />
         <FontAwesomeIcon
          icon={faHome}
          style={{
            color: "#7617c4",
            fontSize: "1.5rem",
            marginLeft: "10px",
            marginTop: "2rem"
          }}
        />
        </div>
    </footer>
    </>
  );
};

export default Home;
