import { useEffect, useState } from "react";
import { getData } from "../helpers/getData";
import { postData } from "../helpers/postData";

export const useFetch = ( info ) => {

    const { get, path, body } = info;
    
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect( () => {
        if (get) {
            getData(path).then( r => {
                console.log('respondioooo', r)
                setState({
                    data: r,
                    loading: false
                });
            })
        } else {
            postData(path, body).then( r => {
                setState({
                    data: r,
                    loading: false
                });
            })
        }
        
    }, [info]);

    return state;
}