import React from 'react'
import { useState } from 'react'
import DataContext from './DataContext'

const DataState = (props) => {

    // const host = "https://localhost:5000"

    const dataVal = []

    const [data, setData] = useState(dataVal);

    const getData = async () => {
        const response = await fetch(`http://localhost:5000/api/data/fetchalldata`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('u-token')
            },
        });
        // console.log(await response.json()); 
        setData(await response.json());
    }

    const addData = async ( {age, sex, cp, trestbps, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, chol, col} ) => {
        // console.log(localStorage.getItem('u-token'));
        const response = await fetch(`http://localhost:5000/api/data/adddata`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('u-token')
            },
            body: JSON.stringify({ age, sex, cp, trestbps, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, chol, col })
        });
        const res = await response.json()

        setData(data.concat(res))
    }

    return (
        <DataContext.Provider value={{ data, addData, getData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState