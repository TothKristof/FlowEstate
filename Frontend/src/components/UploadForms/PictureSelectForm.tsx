import { useRef } from "react";
import { PlusCircle } from "lucide-react";
import { uploadImagesToCloudinary } from "../../utils/imageUpload";
import "daisyui";
import type { Property } from "../../utils/types/Property";
import { useFormContext } from "react-hook-form";

function PictureSelectForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, watch } = useFormContext<Property>();
  const imageUrls = watch("imageUrls") || [];

  async function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return; 

    const urls = await uploadImagesToCloudinary(Array.from(files));
    const updatedUrls = [...imageUrls, ...urls];
    setValue("imageUrls", updatedUrls);
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
          <div className="carousel carousel-center rounded-box w-full max-w-md">
            {imageUrls.map((url:string, index:number) => (
              <div key={index} className="carousel-item">
                <img src={url} alt={`image-${index}`} className="w-90 h-60 object-cover rounded-xl m-1" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PictureSelectForm;
