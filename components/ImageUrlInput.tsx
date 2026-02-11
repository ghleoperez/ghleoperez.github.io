'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, X } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/image-utils';

interface ImageUrlInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

const ImageUrlInput: React.FC<ImageUrlInputProps> = ({
  value,
  onChange,
  label = 'Image URL',
  placeholder = 'https://example.com/image.jpg'
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setPreview(getOptimizedImageUrl(value) || null);
    setError(false);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setPreview(getOptimizedImageUrl(newValue) || null);
    setError(false);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            type="url"
          />
          {value && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => onChange('')}
              title="Clear URL"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {preview && !error ? (
        <div className="relative mt-2 rounded-lg border overflow-hidden bg-muted/30">
          <div className="aspect-video w-full flex items-center justify-center relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain max-h-[200px]"
              onError={handleImageError}
            />
          </div>
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Preview
          </div>
        </div>
      ) : preview && error ? (
        <div className="mt-2 p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="text-sm">Invalid image URL or unable to load image</span>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUrlInput;
