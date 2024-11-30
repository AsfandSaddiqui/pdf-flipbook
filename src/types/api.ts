export interface EmbedResponse {
  success: boolean;
  embedCode?: string;
  previewUrl?: string;
  error?: string;
  details?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}

export interface EmbedRequest {
  pdfUrl: string;
  width?: string;
  height?: string;
}