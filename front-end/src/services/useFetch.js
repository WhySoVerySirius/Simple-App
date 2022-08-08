import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

export default function useFetch(url, { dispatchData, dispatchDone }) {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async(url, actions) => {
        fetch(url, { method: 'POST', headers: { api_token: sessionStorage.getItem('api_token') } })
            .then(res => res.json())
            .then(res => {
                setData(res);
                dispatch(dispatchData(res))
            })
            .catch(err => setError(err))
            .finally(() => {
                setIsLoading(false);
                dispatch(dispatchDone())
            })
    }

    useEffect(() => { getData(url, { dispatchData, dispatchDone }) }, [])

    return { data, error, isLoading };
}