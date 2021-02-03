module.exports =(req, res, next) =>{  //journal doesn't have fat arrow function
    res.header("access-control-allow-origin","*");
    res.header("access-control-allow-methods","POST, GET, PUT, DELETE, OPTIONS");  //journal had OPTIONS added?
    res.header("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
next();     
};