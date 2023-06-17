export async function fetchEmotion(data: any) {
    const response = await fetch('http://127.0.0.1:5328/api/python/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
        mode: 'cors'
    });
    const result = await response.json();
    return result;
}