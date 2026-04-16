export const fakeApiCall = (data) => {
    return new Promise((resolve,rejected) => {
        setTimeout(() => {
            if(Math.random() < 0.8) {
                resolve(data);
            } else {
                rejected(new Error('Failed to fetch data'));
            }       
        }, 1000);
    });
}   