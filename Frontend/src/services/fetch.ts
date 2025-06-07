interface FetchStructure {
    path: string;
    method: string;
    body?: any;
    jwt?: string | null;
}

export const customFetch = async (req: FetchStructure) => {
    const { path, method, body, jwt } = req;
    
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (jwt) {
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${jwt}`
        };
    }

    if (method !== "GET" && body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`/api/${path}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return { data, status: response.status };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}