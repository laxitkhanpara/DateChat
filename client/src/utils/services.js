export const baseUrl = "http://localhost:5000"

export const postRequest = async (url, body) => {
    console.log("req is ready to go");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })
    const data = await response.json();
    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }
    return data;
}

export const getRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json()
    const status = await response.status
    if (!response.ok) {
        let message = "An error occure..."
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }
    return { data, status }
}
