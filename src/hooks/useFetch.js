import axios from "axios";
import { useCallback, useState } from "react"

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback((url, params = '') => {
        const apiUrl = `${url}${params}`
        setLoading(true)
        axios.get(apiUrl)
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            })
    }, [])


    return { callApi, data, loading, error }
}

export default useFetch;