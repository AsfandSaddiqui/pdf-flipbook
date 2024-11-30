import { EmbedRequest, EmbedResponse } from '../types/api';

export async function generateEmbed(params: EmbedRequest): Promise<EmbedResponse> {
  try {
    const response = await fetch('/api/embed/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate embed code',
    };
  }
}