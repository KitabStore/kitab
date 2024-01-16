const jwt=require('jsonwebtoken');

/*const checklogin=(req,res,next)=>{
    console.log("i entered");
    console.log(req.cookies);
    const token= req.cookies.jwt;
    console.log("in he middleware:",req.cookies);

    if(token){
        jwt.verify(token,'user secret',(err,decodedtoken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log("decodedtoken.id:",decodedtoken.token);
                console.log("decodedtoken:",decodedtoken);
                req.decodedtoken=decodedtoken;
                next();
            }

        })
    }else res.redirect('/login');
}*/

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