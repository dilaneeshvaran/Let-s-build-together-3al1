import express, {Request, Response, NextFunction }  from "express"

export const isNotAuth = (req: Request, res: Response, next: NextFunction) => {
    //if(req.session.connected && req.session.user) { --> variable de session ?
        //res.redirect("/")
    //}
    //else {
        //next()
    //}
}