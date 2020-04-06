import {Constants} from "../../Constants";

export const asyncRequest = async (
    endpoint: string,
    requestBody: any,
    method?: "post" | "get",
    isFormData = false
) => handleResponse(await asyncApiRequest(endpoint, requestBody, method, isFormData));

/**
 * Handles the response to make sure that the body is set to the 
 * correct structure in case of an error.
 * 
 * @param response 
 */
export async function handleResponse(response: Response) {
    if (response.status === 400 || response.status === 409) {
        throw await response.json();
    }

    if (!response.ok) {
        console.log("FALSE: handleResponse: ", response);
        throw Error(response.statusText);
    }
    return await response.json();
}

/**
 * Processes the http request to the resource
 * 
 * @param endpoint API endpoint 
 * @param requestBody The request body
 * @param method The request method - post || get
 * @param isFormData Boolean flag to determine a json or form-data header
 * 
 * @returns Promise
 */
export async function asyncApiRequest(
    endpoint: string,
    requestBody: any,
    method?: "post" | "get",
    isFormData = false
){
    const request: RequestInit = {
        method: method,
        headers: !isFormData ? {"Content-Type": "application/json"} : {"Content-Length": "multipart/form-data"},
        body: isFormData ? requestBody : JSON.stringify(requestBody)
    }
    return await fetch(endpoint, request);
}

export const services = {
    retrieveDocuments: async (requestBody?: any) => await asyncRequest(Constants.API_GET_DOCUMENTS, requestBody, "get"),
    uploadDocument: async (requestBody?: any) => await asyncRequest(Constants.UPLOAD_DOCUMENT, requestBody, "post", true)
};