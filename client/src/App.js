import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Routes from './components/routes/index';
import { UidContext } from './components/ContextApi/uidContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
function App() {

  const [uid, setUid] = useState(null);
  
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, uid)
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    console.log('uid', uid)
    if (uid) dispatch(getUser(uid));
  }, [uid]);



  return (
    <>
      <UidContext.Provider value={uid}>
      <Routes value={uid} />
      </UidContext.Provider>
    </>
  );
}

export default App;
