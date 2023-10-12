import Jwt from 'jsonwebtoken';
import User from '../model/User.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from './catchAsyncError.js';


export const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    console.log("cookies",req.cookies);
    if(token) {
        Jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => { 

            if(err) { 
                res.locals.user = null;
                res.cookie("jwt", null, {
                    expires: new Date(Date.now()),
                    httpOnly: true,
                  });
                next();
            } else {
              const decodetedData = Jwt.verify(token , process.env.TOKEN)

                req.user =  await User.findById(decodetedData.id)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        }
    )
    } else {
        res.locals.user = null;
        next();
    }
}

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        Jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
        if (err) {
            console.log(err);
        } else {
            console.log(decodedToken.id);
            next();
        }
    });
    } else {
    console.log('no token');
}
};


export const isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
  const token  = req.cookies.jwt
    if(!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodetedData = Jwt.verify(token , process.env.TOKEN)

    req.user =  await User.findById(decodetedData.id)

 next()
})


export const setRoles = (...status) => {
   
    return (req, res, next) => {
      if (!status.includes(req.user?.status)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.status} is not allowed to access this resource `,
            403
          )
        );
      }
      next();
    };
  };

  export const sendToken = (user, statusCode,res) => { 
    const token = user.getJWTToken();
    console.log("token",token)
    // options for cookie
    const options = {
      expiresIn: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("jwt", token, options).json({
      success: true,
      user,
      token,
    });
};


    