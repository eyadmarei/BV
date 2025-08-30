import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface LocalImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  children?: React.ReactNode;
  className?: string;
  reset?: boolean; // Add reset prop
}

export function LocalImageUploader({ onImageSelected, children, className, reset }: LocalImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset component when reset prop changes
  useEffect(() => {
    if (reset) {
      console.log('Resetting image uploader');
      setPreviewUrl(null);
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [reset]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent event bubbling that might close modal
    event.stopPropagation();
    
    const file = event.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File selected:', file.name, file.size);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 15MB)
    const maxSize = 15 * 1024 * 1024; // 15MB in bytes
    if (file.size > maxSize) {
      alert(`Image size must be less than 15MB. Selected file is ${(file.size / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    console.log('Starting upload...');
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include session cookies for authentication
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Image uploaded successfully:', data.imageUrl);
      onImageSelected(data.imageUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      setPreviewUrl(null); // Reset preview on error
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // Prevent event bubbling that might close modal
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const clearPreview = (e: React.MouseEvent) => {
    // Prevent event bubbling that might close modal
    e.preventDefault();
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="space-y-2">
          <div className="relative w-full max-w-xs mx-auto">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-md border"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={clearPreview}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-green-600 text-center">✓ Image ready for upload</p>
        </div>
      ) : (
        <Button
          onClick={handleButtonClick}
          disabled={uploading}
          variant="outline"
          className="w-full"
          type="button"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Uploading...' : (children || 'Upload Image')}
        </Button>
      )}
    </div>
  );
}