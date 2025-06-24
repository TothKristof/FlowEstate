import { useRef } from "react";
import { PlusCircle } from "lucide-react";
import { uploadImagesToCloudinary } from "../../utils/imageUpload";
import "daisyui";
import type { Property } from "../../utils/types/Property";

interface PictureSelectFormProps{
  handleChange: (field: string, value: string | number | string[]) => void,
  propertyDetails: Property;
}

function PictureSelectForm({ propertyDetails, handleChange }: PictureSelectFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const urls = await uploadImagesToCloudinary(Array.from(files));

    const updatedUrls = [...(propertyDetails.imageUrls || []), ...urls];
    handleChange("imageUrls", updatedUrls);
  }

  return (
    <div className="w-full">
      {/* Feltöltő gomb */}
      <div className="flex items-center gap-4 mb-4">
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
        {propertyDetails.imageUrls && propertyDetails.imageUrls.length > 0 && (
          <div className="carousel carousel-center rounded-box w-full max-w-md">
            {propertyDetails.imageUrls.map((url:string, index:number) => (
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
