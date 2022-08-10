import { useEffect, useState } from "react";

export default function useFetch(url, method = 'POST', contentType = 'application/json') {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async(url, actions) => {
        fetch(
                url, {
                    method: method,
                    headers: {
                        api_token: sessionStorage.getItem('api_token'),
                        contentType: contentType
                    }
                }
            )
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => { getData(url, method, contentType) }, [url])

    return { data, error, isLoading };
}