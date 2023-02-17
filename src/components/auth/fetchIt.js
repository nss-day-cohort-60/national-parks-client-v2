export const fetchIt = (url, kwargs = { method: "GET", body: null, token: null }) => {
    const options = {
        headers: {}
    }

    options.method = kwargs.method ?? "GET"

    if ("token" in kwargs && kwargs.token) {
        options.headers.Authorization = `Token ${kwargs.token}`
    }
    else {
        try {
            const auth = localStorage.getItem("np_token")
            const token = JSON.parse(auth).token
            options.headers.Authorization = `Token ${token}`

        } catch (error) {
            options.headers.Authorization = `Token none`
        }
    }

    let theFetch = null
    switch (options.method) {
        case "POST":
            options.body = kwargs.body
            options.headers["Content-Type"] = "application/json"
            theFetch = fetch(url, options).then(r => r.json())
            break;
        case "PUT":
            options.body = kwargs.body
            options.headers["Content-Type"] = "application/json"
            theFetch = fetch(url, options)
            break;
        case "DELETE":
            options.body = kwargs.body
            options.headers["Content-Type"] = "application/json"
            theFetch = fetch(url, options)
            break;
        default:
            theFetch = fetch(url, options).then(r => r.json())
            break;
    }

    return theFetch
}
