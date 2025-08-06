export async function uploadVideoToCloudinary(file: File, folderId: string): Promise<{ secure_url: string; public_id: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "estate_videos");
    formData.append("folder", `FlowEstate/${folderId}`);
    formData.append("resource_type", "video");

    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Video upload failed");
    }
  
    const data = await response.json();
  
    return {
      secure_url: data.secure_url, // Teljes elérhetőség
      public_id: data.public_id,   // Kell majd a transition URL-ekhez
    };
  }
  