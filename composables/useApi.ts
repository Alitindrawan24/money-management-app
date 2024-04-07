interface ApiRequestParams {
    method: Method,
    path: string,
    body?: any
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponseData {
    status: string,
    message: string
    errors?:any
    data?: any
}

export const useApi = async({method, path, body}: ApiRequestParams): Promise<ApiResponseData> => {
    const config = useRuntimeConfig()
    const token = useCookie('access-token', {
        default: () => ""
    })

    let url = path
    if (!url.includes(config.public.apiHost)) {
        url = config.public.apiHost + path
    }

    console.log(url)

    return await $fetch(url, {
        method: method,
        body: body,
        headers: {
            "authorization": "Bearer " + token.value
        }
    })
}
