import React, { useRef, useState } from "react";
import { v4 as idv4 } from "uuid";
import { useFormContext } from "react-hook-form";
import { uploadVideoToCloudinary } from "../../utils/videoUpload";
import type { Property } from "../../utils/types/Property";
import type { PropertyMap } from "../../utils/types/PropertyMap";
import { IoReload } from "react-icons/io5";
import { GoVideo } from "react-icons/go";

export default function VideoEditor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isSegmentPlaying, setIsSegmentPlaying] = useState(false);

  const { setValue, watch } = useFormContext<Property>();
  const folderId = watch("imageFolderId");
  const propertyMap = watch("propertyMap") || {
    videoPublicId: "",
    snapshots: [],
    edges: [],
  };

  const videoUploadError = "Cannot upload video";
  const uploadVideoInProgress = "Uploading video...";
  const uploadVideoText = "Upload video";
  const takeSnapshotText = "Take snapshot";
  const snapshotsText = "Snapshots";
  const createTransitionsText = "Create transitions";

  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");

      const result = await uploadVideoToCloudinary(file, `${folderId}/video`);
      setVideoUrl(result.secure_url);
      setValue("propertyMap", {
        ...propertyMap,
        videoPublicId: result.public_id,
      });
    } catch (err) {
      setError(videoUploadError);
    } finally {
      setUploading(false);
    }
  };

  const takeSnapshot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video || !propertyMap?.videoPublicId) return;

    const timestamp = parseFloat(video.currentTime.toFixed(1));
    if ((propertyMap.snapshots || []).find((snap) => snap.timestamp === timestamp)) return;

    const snapshotUrl = `https://res.cloudinary.com/${cloud_name}/video/upload/so_${timestamp},du_0.1/${propertyMap.videoPublicId}.jpg`;

    const node = {
      id: idv4(),
      timestamp,
      snapshotUrl,
    };

    const updatedSnapshots = [...(propertyMap.snapshots || []), node];
    const updatedMap: PropertyMap = {
      videoPublicId: propertyMap.videoPublicId,
      snapshots: updatedSnapshots,
      edges: propertyMap.edges || [],
    };
    setValue("propertyMap", updatedMap);
    console.log(updatedMap);
    return updatedSnapshots;
  };
  
  const addEdge = (
    fromId: string,
    toId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const from = propertyMap.snapshots.find((n) => n.id === fromId);
    const to = propertyMap.snapshots.find((n) => n.id === toId);
    if (!from || !to) return;
  
    const forwardUrl = `https://res.cloudinary.com/${cloud_name}/video/upload/so_${from.timestamp},eo_${to.timestamp}/${propertyMap.videoPublicId}.mp4`;
    const reverseUrl = `https://res.cloudinary.com/${cloud_name}/video/upload/so_${from.timestamp},eo_${to.timestamp},e_reverse/${propertyMap.videoPublicId}.mp4`;
  
    const edge = {
      from: fromId,
      to: toId,
      forwardUrl,
      reverseUrl,
    };
  
    const updatedEdges = [...(propertyMap.edges || []), edge];
    const updatedMap: PropertyMap = {
      videoPublicId: propertyMap.videoPublicId,
      snapshots: propertyMap.snapshots,
      edges: updatedEdges,
    };
    setValue("propertyMap", updatedMap);
    console.log(updatedMap);
    return updatedEdges;
  };
  

  const playSegment = (
    e: React.MouseEvent<HTMLButtonElement>,
    segmentUrl: string
  ) => {
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.src = segmentUrl;
    videoRef.current.play();
    setIsSegmentPlaying(true);
  };

  const playFullVideo = () => {
    if (!videoRef.current || !videoUrl) return;
    videoRef.current.src = videoUrl;
    videoRef.current.play();
    setIsSegmentPlaying(false);
  };

  return (
    <div className="p-4">
      {!propertyMap.videoPublicId && (
        <div className="flex flex-col items-center justify-center h-80 w-full border rounded-xl p-8 bg-stone-50">
          <label className="mb-4 text-lg font-semibold">{uploadVideoText}</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploading}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          {uploading && (
            <div className="mt-2 text-blue-600">{uploadVideoInProgress}</div>
          )}
          {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
      )}

      {videoUrl && (
        <div className="mt-4 flex flex-row gap-8 items-start w-200">
          <div className="w-8/12">
            <div className="relative w-fit">
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted
                controls
                width="600"
                crossOrigin="anonymous"
              />
              {isSegmentPlaying && (
                <button
                  onClick={playFullVideo}
                  className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded shadow hover:bg-gray-200"
                  title="Load back full video"
                >
                  <IoReload />
                </button>
              )}

            </div>
            {!isSegmentPlaying && (<button
              className="mt-2 btn btn-success w-full"
              onClick={takeSnapshot}
            >
              {takeSnapshotText}
            </button>)}
          </div>
          <div className="mt-0 w-4/12 flex flex-col gap-4 h-full">
            <div className="h-1/2">
              <h3 className="text-lg font-bold mb-2">{snapshotsText}</h3>
              <div className="flex gap-4 overflow-x-auto p-2 border rounded bg-stone-50 h-full min-w-sm">
                {(propertyMap.snapshots || []).map((snap) => (
                  <div key={snap.id} className="text-center min-w-[8rem] h-full">
                    <img
                      src={snap.snapshotUrl}
                      alt="snapshot"
                      className="h-25 object-cover"
                    />
                    <div className="text-xs">{snap.timestamp.toFixed(2)}s</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-4 h-1/2">
              {(propertyMap.snapshots || []).length >= 2 && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">
                    {createTransitionsText}
                  </h3>
                  <div className="flex flex-wrap gap-2 overflow-y-auto">
                    {(propertyMap.snapshots || []).map((from) =>
                      (propertyMap.snapshots || []).map((to) =>
                        from.id !== to.id && from.timestamp < to.timestamp ? (
                          <button
                            className="btn btn-outline"
                            key={`${from.id}-${to.id}`}
                            onClick={(e) => addEdge(from.id, to.id, e)}
                          >
                            {from.timestamp.toFixed(1)}s →{" "}
                            {to.timestamp.toFixed(1)}s
                          </button>
                        ) : null
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-6 gap-2">
        {(propertyMap.edges || []).map((edge, idx) => (
          <button
            key={idx}
            onClick={(e) => playSegment(e, edge.videoSegmentUrl)}
            className="btn btn-success"
          >
            <GoVideo color="white"  size={20}/>
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
