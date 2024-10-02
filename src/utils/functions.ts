export const getSignedUrlFromPinata = async (cid: string) => {
  
  const fileUrl = `https://${import.meta.env.VITE_PINATA_GATEWAY}/${cid}`;

  console.log(fileUrl)
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: fileUrl,
      expires: 500000,
      date: Math.floor(Date.now() / 1000),
      method: 'GET',
    }),
  };

  try {
    const response = await fetch(import.meta.env.VITE_PINATA_API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data)
    return data.data;
  } catch (error) {
    console.error('Error fetching signed URL from Pinata:', error);
    throw new Error('Could not fetch signed URL');
  }
};