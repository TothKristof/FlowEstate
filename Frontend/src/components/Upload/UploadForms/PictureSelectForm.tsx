import { useRef } from "react";
import { Divide, PlusCircle } from "lucide-react";
import { uploadImagesToCloudinary } from "../../../utils/imageUpload";
import "daisyui";
import type { Property } from "../../../utils/types/Property";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function PictureSelectForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, watch } = useFormContext<Property>();
  const imageUrls = watch("imageUrls") || [];
  const thumbnailImageUrl = watch("thumbnailImageUrl");

  async function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    let imageFolderId = watch("imageFolderId");
    if (!imageFolderId) {
      imageFolderId = uuidv4();
      setValue("imageFolderId", imageFolderId);
    }
    const urls = await uploadImagesToCloudinary(Array.from(files), imageFolderId);
    const updatedUrls = [...imageUrls, ...urls];
    setValue("imageUrls", updatedUrls);
    setValue("imageFolderId", imageFolderId);
    if(!thumbnailImageUrl){
      setValue("thumbnailImageUrl", updatedUrls[0]);
    }
  }

  function setImageToThumbnail(url: string){
    setValue("thumbnailImageUrl", url);
  }

  return (
    <div className="w-full">
      {/* Feltöltő gomb */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div
          className="cursor-pointer bg-stone-100 hover:bg-stone-200 rounded-xl p-4 flex items-center justify-center h-60 w-60"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <PlusCircle size={40} color="#00bf83" />
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={selectImage}
          className="hidden"
          ref={fileInputRef}
        />

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div className="w-full max-w-md overflow-x-auto whitespace-nowrap  rounded-xl">
          {imageUrls.map((url: string, index: number) => (
            <div
              key={index}
              className="inline-block w-72 h-60 m-1 rounded-xl overflow-hidden "
            >
              <img
                src={url}
                alt={`image-${index}`}
                className={`w-full h-full object-cover ${thumbnailImageUrl == url ? `border-success border-3`:``}`}
                onClick={() => setImageToThumbnail(url)}
              />
            </div>
          ))}
        </div>
        )}
      </div>
      <div>
          {thumbnailImageUrl && (
            <div className="flex w-full justify-center items-center gap-2">
              <div className="rounded-full h-3 w-3 bg-success"></div>
              <div className="font-[600]">Thumbnail image</div>
            </div>
          )}
        </div>
    </div>
  );
}

export default PictureSelectForm;
