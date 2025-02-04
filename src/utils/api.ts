
export async function fetchProviderData(providerId: string) {
  try {
    // Ensure providerId has .json extension when fetching
    const fileName = providerId.endsWith('.json') ? providerId : `${providerId}.json`;
    const response = await fetch(`http://localhost:3000/api/providers/${fileName}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch provider data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching provider data:', error);
    throw error;
  }