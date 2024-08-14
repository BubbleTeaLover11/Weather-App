import data from "./cities500.json" assert {type: 'json'};

export function parseData() {
    var dataList = [];
    var dataSet = new Set();
    for (let x of data) {
        if (!dataSet.has(x.name)){
            dataList.push({"city": x.name})
            dataSet.add(x.name)
        }
    };
    return dataList;
};

export async function getAQI(lat, lon, key) {

    try {
        const requestMethod = {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lat: lat,
                lon: lon,
                key: key
            })
        };
        const response = await fetch("/aqiData", requestMethod);
        const data = await response.json();

        return data
    } catch (error) {
        console.error(error.message);
    }
};

export async function getHumid(lat, lon, key) {

    try {
        const requestMethod = {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lat: lat,
                lon: lon,
                key: key
            })
        }
        const response = await fetch("/humidityData", requestMethod)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
};

export async function getPressure(lat, lon, key) {

    try {
        const requestMethod = {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lat: lat,
                lon: lon,
                key: key
            })
        }
        const response = await fetch("/pressureData", requestMethod)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
};

export async function getQuote() {

    try {
        const requestMethod = {
            method: "post",
            headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch("/data", requestMethod)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
};

export default { parseData, getAQI, getHumid, getPressure, getQuote };