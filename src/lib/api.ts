const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.STRAPI_URL
  : process.env.BASE_API_URL; 

export async function fetchAPI(endpoint: string, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    console.log(res)
    console.error(`Error fetching ${endpoint}`);
    throw new Error(`Error fetching ${endpoint}`);
  }

  return res.json();
}