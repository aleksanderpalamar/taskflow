"use client";

import { useState, useEffect } from "react";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 6, // 6 images
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log({ error });
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2 mt-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative cursor-pointer aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
          >
            <input 
              type="radio"
              name={id}
              id={id}
              className="hidden"
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id} | ${image.urls.thumb} | ${image.urls.full}
              | ${image.links.html} | ${image.user.name}`}
            />
            <Image
              fill
              alt="Unsplash image"
              className="obejct-cover rounded-sm"
              src={image.urls.thumb}
            />
            {selectedImage === image.id && (
              <div
                className="absolute inset-y-0 h-full w-full bg-black/30
              flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              passHref
              className="opacity-0 group-hover:opacity-100 absolute
              bottom-0 w-full text-[10px] truncate text-white
              hover:underline p-1 bg-black/50"
            >
              {image.user.name || "Unsplash image"}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors 
        id="Image"
        errors={errors}
      />
    </div>
  );
};
