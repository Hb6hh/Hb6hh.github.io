// Update to call the local API route instead of the TryHackMe API

async function fetchTryHackMeData() {
    const response = await fetch('/api/tryhackme');
    const data = await response.json();
    return data;
}

// Example usage
fetchTryHackMeData().then(data => console.log(data));