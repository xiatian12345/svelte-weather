enum weatherDataCode {
    ServerError = 1,
    InvalidInput,
    InvalidData,
    SuccessData
}

type weatherDataType = {
    code:weatherDataCode,
    message:String,
    data?:Object
}

export type {weatherDataType}
export {weatherDataCode}