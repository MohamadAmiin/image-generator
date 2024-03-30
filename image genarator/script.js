const api = "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";
const inp = document.getElementById('inp');
const images = document.querySelector('.images');

const getImage = async () => {
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
            "prompt": inp.value,
            "n": 3,
            "size": "512x512"
        })
    };

    try {
        const res = await fetch("https://api.openai.com/v1/images/generations", methods);

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const data = await res.json();
        const listImage = data.data;
        images.innerHTML = '';

        listImage.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo.url;
            images.appendChild(img);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};