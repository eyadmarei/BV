import { FormData, Blob } from 'formdata-node';

export interface CloudflareImageUploadResult {
  success: boolean;
  imageId?: string;
  imageUrl?: string;
  variants?: string[];
  error?: string;
}

export class CloudflareImagesService {
  private accountId: string;
  private apiToken: string;
  private accountHash: string;

  constructor() {
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()!;
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim()!;
    this.accountHash = process.env.CLOUDFLARE_ACCOUNT_HASH?.trim()!;

    if (!this.accountId || !this.apiToken || !this.accountHash) {
      throw new Error('Missing required Cloudflare environment variables');
    }
    
    console.log('Cloudflare credentials loaded:', {
      accountId: this.accountId.substring(0, 8) + '...',
      tokenLength: this.apiToken.length,
      hashLength: this.accountHash.length
    });
  }

  async uploadImage(imageBuffer: Buffer, filename: string): Promise<CloudflareImageUploadResult> {
    try {
      console.log('Uploading to Cloudflare Images:', {
        accountId: this.accountId?.substring(0, 8) + '...',
        filename,
        bufferSize: imageBuffer.length
      });

      const blob = new Blob([imageBuffer]);
      const formData = new FormData();
      formData.append('file', blob, filename);

      const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1`;
      console.log('API URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: formData as any,
      });

      const result = await response.json();
      console.log('Cloudflare response:', { 
        status: response.status, 
        ok: response.ok,
        result: result 
      });

      if (!response.ok) {
        console.error('Cloudflare API error:', result);
        return {
          success: false,
          error: result.errors?.[0]?.message || `API Error: ${response.status}`
        };
      }

      const imageId = result.result?.id;
      if (!imageId) {
        return {
          success: false,
          error: 'No image ID returned from Cloudflare'
        };
      }

      const imageUrl = `https://imagedelivery.net/${this.accountHash}/${imageId}/public`;

      return {
        success: true,
        imageId,
        imageUrl,
        variants: result.result.variants || []
      };

    } catch (error) {
      console.error('Cloudflare Images upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteImage(imageId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Cloudflare Images delete error:', error);
      return false;
    }
  }

  getImageUrl(imageId: string, variant: string = 'public'): string {
    return `https://imagedelivery.net/${this.accountHash}/${imageId}/${variant}`;
  }
}

export const cloudflareImages = new CloudflareImagesService();