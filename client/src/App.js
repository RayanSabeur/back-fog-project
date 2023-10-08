import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Routes from './components/routes/index';
import { UidContext } from './components/ContextApi/uidContext';

function App() {

  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
          console.log(uid)
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <>
      <UidContext.Provider value={uid}>
      <Routes value={uid}/>
      </UidContext.Provider>
    </>
  );
}

export default App;
