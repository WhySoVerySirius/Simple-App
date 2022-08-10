import { useEffect, useState } from "react";

export default function useSimpleFetch(url, sendData) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async(url, sendData) => {
        fetch(
                url, {
                    method: 'POST',
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                    },
                    body: JSON.stringify(sendData)
                })
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(setIsLoading(false))

    }

    useEffect(() => { getData(url, sendData) }, [url])

    return { data, error, isLoading };
}