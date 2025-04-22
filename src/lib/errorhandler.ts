export default function errorHandler(error : unknown) {
    if(error instanceof Error){        
        return {errorInfo : error.message}
    }

    return {errorInfo : "An unexpected Error occured"}
}