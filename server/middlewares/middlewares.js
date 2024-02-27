const jwt=require('jsonwebtoken');



module.exports.checklogin=(req,res,next)=>{
    console.log("i entered");
    console.log(req.cookies);
    //console.log("req headers:")
    //console.log(req);
    const token= req.cookies.jwt;
    console.log("in he middleware:",req.cookies);

    if(token){
        jwt.verify(token,'user secret',(err,decodedtoken)=>{
            if(err){
                console.log(err);
                res.status(401).json({logged:false});
            }else{
                console.log("decodedtoken.id:",decodedtoken);
                console.log("decodedtoken:",decodedtoken);
                req.decodedtoken=decodedtoken;
                next();
            }

        })
    }else res.status(401).json({logged:false});
}

module.exports.checksignin= (req,res,next)=>{
    let token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'user secret',async (err,decodedtoken)=>{
            if (err) {
               // req.decodedtoken = null;

                // Handle specific error scenarios
                if (err.name === 'TokenExpiredError') {
                    req.decodedtoken=null;
                    next();
                }

                // Log the error for debugging purposes
                console.error('JWT verification error:', err.message);

                next();
            }else{
                req.decodedtoken=decodedtoken;
                next();
            }
        })
    }else{
        req.decodedtoken=null;
        next();
    }
}

//module.exports={checksignin};