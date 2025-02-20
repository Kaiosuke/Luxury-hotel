import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

interface IFormUploadImage<T extends FieldValues> {
  id: string | null | undefined;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  option: string;
  setOption: (value: string) => void;
  url: string | string[];
  setUrl: (value: any | any[]) => void;
  title: string;
  isImages: boolean;
}

const FormUploadImage = <T extends FieldValues>({
  id,
  title,
  register,
  formState,
  option,
  setOption,
  url,
  setUrl,
  isImages,
}: IFormUploadImage<T>) => {
  return (
    <div>
      {id ? (
        <div>
          <Select value={option} onValueChange={(value) => setOption(value)}>
            <SelectTrigger className="w-fit text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-four text-sidebar-primary">
              <SelectItem value="keep">Keep Current {title}</SelectItem>
              <SelectItem value="upload">Upload {title} from Local</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <Select value={option} onValueChange={(value) => setOption(value)}>
            <Label>Upload {title}</Label>
            <SelectTrigger className="w-[240px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-four text-sidebar-primary">
              <SelectItem value="upload">Upload {title} from Local</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        {option === "link" && (
          <input
            type="text"
            className="form-control"
            id={String(title)}
            {...register(title as Path<T>)}
          />
        )}
        {option === "upload" && (
          <>
            {isImages ? (
              <div className="grid w-full max-w-sm items-center gap-1.5 text-primary">
                <Input
                  id={String(title)}
                  type="file"
                  className="text-sidebar-primary"
                  multiple
                  {...register(title as Path<T>, { required: true })}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const imageUrls = Array.from(files).map((file) =>
                        URL.createObjectURL(file)
                      );
                      setUrl(imageUrls);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="grid w-full max-w-sm items-center gap-1.5 text-primary">
                <Input
                  id={String(title)}
                  type="file"
                  className="text-sidebar-primary"
                  {...register(title as Path<T>, { required: true })}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setUrl(imageUrl);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}

        <div className="mt-2">
          {formState.errors?.[title]?.message && (
            <p className="text-red-500">
              {formState.errors?.[title]?.message as string}
            </p>
          )}
          {!isImages && typeof url === "string" && url && (
            <AspectRatio ratio={16 / 12} className="bg-muted rounded-md">
              <Image
                src={url}
                alt="picture"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full rounded-md object-cover"
                priority
              />
            </AspectRatio>
          )}

          {isImages && Array.isArray(url) && url.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {url.map((image, index) => (
                <AspectRatio
                  key={index}
                  ratio={16 / 12}
                  className="bg-muted rounded-md"
                >
                  <Image
                    src={image}
                    alt={`Uploaded Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 
                    (max-width: 1200px) 50vw, 
                    33vw"
                    className="h-full w-full rounded-md object-cover"
                    priority
                  />
                </AspectRatio>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUploadImage;
