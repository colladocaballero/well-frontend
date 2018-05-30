export interface HttpResponseModel {
    statusCode:number;
    data: {
        id,
        authToken,
        expiresIn
    };
}
