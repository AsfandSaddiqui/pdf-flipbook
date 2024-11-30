import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const embedRequestSchema = z.object({
  pdfUrl: z.string().url(),
  width: z.string().optional().default('100%'),
  height: z.string().optional().default('600px'),
});

router.post('/generate', async (req, res) => {
  try {
    const { pdfUrl, width, height } = embedRequestSchema.parse(req.body);
    
    // Generate embed code
    const embedCode = `<iframe 
      src="${req.protocol}://${req.get('host')}/embed?url=${encodeURIComponent(pdfUrl)}" 
      width="${width}" 
      height="${height}" 
      frameborder="0" 
      allowfullscreen
    ></iframe>`;

    res.json({
      success: true,
      embedCode,
      previewUrl: `/embed?url=${encodeURIComponent(pdfUrl)}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Invalid request parameters',
        details: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
});

export default router;