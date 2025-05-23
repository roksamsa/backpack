interface FetchOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

interface ApiHelperOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    onFinish?: () => void;
}

interface ApiHelperParams {
    url: string;
    method: string;
    body?: Record<string, any>;
    query?: Record<string, any>;
    options?: ApiHelperOptions;
}

export async function fetchData({
    url,
    method,
    body,
    query,
    options = {},
}: ApiHelperParams) {
    const { onSuccess, onError, onFinish } = options;

    try {
        const queryString = query ? new URLSearchParams(query).toString() : "";
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        const fetchOptions: FetchOptions = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(fullUrl, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (onSuccess) {
            onSuccess(data);
        }

        return data;
    } catch (error) {
        console.log("Error in fetchData:", error);
        if (error instanceof Error) {
            if (onError) {
                onError(error);
            } else {
                console.error("API Error:", error.message);
            }
        } else {
            console.error("Unknown error:", error);
        }

        return error;
    } finally {
        if (onFinish) {
            onFinish();
        }
    }
}
