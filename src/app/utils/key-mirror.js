// @flow

export default function keyMirror(data: string[] | { [string]: * }): { [string]: string } {
    const result = {};
    let collection = [];
    if (Array.isArray(data)) {
        collection = data;
    } else if (data instanceof Object) {
        collection = Object.keys(data);
    }

    collection.forEach((item) => {
        result[item] = item;
    });

    return result;
}
