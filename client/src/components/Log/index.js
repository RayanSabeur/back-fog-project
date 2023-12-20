import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Log = ({signUp}) => {
  
  
    return (    
      
        <div className="connection-form">
            <div className="form-container">
            <div className='titleloginform'> 
                <h1>{signUp ? "s'enregistrer" : "se connecter"}</h1>
            </div>
                {signUp ? <SignUp/> : <SignIn/> }
            </div>
        </div>
    );
};

export default Log;