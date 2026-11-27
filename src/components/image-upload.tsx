"use client";

import { useState, useRef } from "react";
import { Camera, X, Loader2 } from "lucide-react";

export function ImageUpload({
  name,
  existingImages,
}: {
  name: string;
  existingImages?: string[];
}) {
  const [images, setImages] = useState<string[]>(existingImages ?? []);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const newImages = [...images];

    for (const file of Array.from(files).slice(0, 5 - images.length)) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = await res.json();
        if (data.ok) newImages.push(data.url);
      } catch { /* ignore failed uploads */ }
    }

    setImages(newImages);
    setUploading(false);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {images.map((src, i) => (
            <div key={i} className="group relative size-20 overflow-hidden rounded-lg border border-black/10">
              <img src={src} alt={`Upload ${i + 1}`} className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < 5 && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border border-dashed border-black/20 px-4 py-2.5 text-sm text-ink/60 transition-colors hover:border-leaf hover:text-leaf disabled:opacity-50"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
          {uploading ? "Uploading…" : `Add photos (${images.length}/5)`}
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
