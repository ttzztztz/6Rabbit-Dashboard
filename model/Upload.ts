let abortList: { [key: string]: () => void } = {};

export const upload = (tempId: string, url: string, { method, headers, body }: RequestInit, onProgress: XMLHttpRequestEventTarget["onprogress"]) =>
    new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method || "get", url);
        headers && Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
        xhr.setRequestHeader("Authorization", localStorage.getItem("token")!);
        xhr.onload = function() {
            delete abortList[tempId];
            resolve(this.responseText);
        };
        xhr.onerror = function() {
            delete abortList[tempId];
            reject();
        };
        xhr.upload.onprogress = onProgress;
        xhr.send(body);

        abortList[tempId] = () => xhr.abort();
    });

export const abortAll = () => {
    Object.entries(abortList).forEach(([_k, v]) => {
        try {
            v();
        } catch (e) {
            console.log(e);
        }
    });
    abortList = {};
};

export const abortOne = (tempId: string) => {
    try {
        const result = Object.entries(abortList).filter(([k, v]) => k === tempId);
        if (result.length === 1) {
            const [[, abortObj]] = result;
            abortObj();

            abortList = Object.entries(abortList).reduce((p, [k, v]) => {
                if (k !== tempId) {
                    return {
                        ...p,
                        [k]: v
                    };
                } else {
                    return p;
                }
            }, {});
        }
    } catch (e) {
        console.log(e);
    }
};
