 const func = (asyncCatch) => (req,res,next) => {
   Promise.resolve(asyncCatch(req,res,next)).catch(next);
    };

    export default func;