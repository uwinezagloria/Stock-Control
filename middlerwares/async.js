const asyncWrapper=(func)=>{
    return async(req,res,next)=>{
        try{
            await func(req,res,next)
        }
        catch(error){
            return next(error)
        }
        
    }
}
export default asyncWrapper