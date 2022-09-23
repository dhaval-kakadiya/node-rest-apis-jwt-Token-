const jwt = require('jsonwebtoken');


module.exports = (roles) => (req,res,next) => {
    const authorization = req.get('Authorization');
    if(!authorization){
        return res.status(400).json({
            success:false,
            message : 'You Are Not Authorized'
        })
    }

    const splitToken = authorization.split(" ");
    const token = splitToken[1];

    let decodeToken
    try {
       decodeToken = jwt.verify(token,process.env.SECRET_KEY);
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message : 'You Are Not Authorized'
        })
    }

    const role = decodeToken.role;
    if(roles.includes(role)){
        req.user = decodeToken
        next();
    }
    else{
        return res.status(404).json({
            success : true,
            message : 'You Are Not Authorized'
        })
    }

    
} 