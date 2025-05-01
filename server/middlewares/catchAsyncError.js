export const catchAsyncError = (theFunction) => {
    return (req, res, next) => {
        promises.resolve(thefunction(req,res,next)).catch(next);
    }; 
};