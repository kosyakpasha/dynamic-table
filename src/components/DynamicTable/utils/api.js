import dataJson from "../fixtures/data.json";

const fakeRequest = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dataJson);
        }, 5000);
    });
};

export { fakeRequest };