import { useState, useEffect } from "react";
import axios from "axios";


const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        let isMounted 
    })
}