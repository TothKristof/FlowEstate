export async function uploadImagesToCloudinary(files:File[]) {
  console.log("🚀 ~ uploadImagesToCloudinary ~ files:", files)
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "estate_images");
    formData.append("folder", "FlowEstate");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwrtglpsr/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    uploadedUrls.push(data.secure_url);
  }

  return uploadedUrls;
}
