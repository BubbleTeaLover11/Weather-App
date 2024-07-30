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

export default parseData;