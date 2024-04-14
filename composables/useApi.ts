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
            "accept": "application/json",
            "authorization": "Bearer " + token.value
        }
    }).then(data => {
        return data as ApiResponseData
    }).catch(err => {
        const status = err.status
        if (status === 401) {
            const router = useRouter()
            const token = useCookie<string | null>('access-token', {
                default: () => "",
            })
            token.value = null
            router.push("/login")
        }

        return err.data as ApiResponseData
    })
}
