import React, { useState } from "react";
import {AxiosPromise} from "axios";

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

// type FetchFunction = (url: string) => Promise<void>;
type FetchFunction<T> = () => void;
const useFetch = <T,>(fn: () => void): [FetchFunction<T>, ApiResponse<T>,  React.Dispatch<React.SetStateAction<ApiResponse<T>>>] => {
    const [response, setResponse] = useState<ApiResponse<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = () => {
        return fn();
    }
    //
    // const fetchData: FetchFunction = async (url) => {
    //     setResponse({ ...response, loading: true });
    //     try {
    //         const fetchedData = await fetch(url);
    //         if (!fetchedData.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const result = await fetchedData.json();
    //         setResponse({ data: result, loading: false, error: null });
    //     } catch (error) {
    //         setResponse({ ...response, loading: false, error: "An error occurred" });
    //     }
    // };
    //
    return [fetchData, response, setResponse];
};

export default useFetch;
