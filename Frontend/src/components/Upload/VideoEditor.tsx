// A React component that allows users to:
// 1. Upload a video
// 2. Preview it
// 3. Extract snapshots from specific timestamps
// 4. Link snapshots together
// 5. Generate Cloudinary segment URLs for transitions

import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormContext } from "react-hook-form";
import { uploadVideoToCloudinary } from "../../utils/videoUpload";

export default function VideoEditor() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [edges, setEdges] = useState([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(
    "https://res.cloudinary.com/dwrtglpsr/video/upload/v1754476147/FlowEstate/undefined/video/csibg3x6kzhpxeb8aclk.mp4"
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { setValue, watch } = useFormContext<Property>();
  const folderId = watch("imageFolderId");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>(
    "FlowEstate/undefined/video/csibg3x6kzhpxeb8aclk"
  );

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

      // Cloudinary feltöltés
      const result = await uploadVideoToCloudinary(file, `${folderId}/video`);
      setVideoUrl(result.secure_url);
      setCloudinaryPublicId(result.public_id);

      // Lokális preview (nem kötelező, ha csak streamelnél Cloudinaryról)
      setVideoFile(file);
    } catch (err) {
      setError(videoUploadError);
    } finally {
      setUploading(false);
    }
  };

  const takeSnapshot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video || !cloudinaryPublicId) return;
  
    const timestamp = parseFloat(video.currentTime.toFixed(1));
    if (snapshots.find((snap) => snap.timestamp === timestamp)) return;
  
    const snapshotUrl = `https://res.cloudinary.com/${cloud_name}/video/upload/so_${timestamp},du_0.1/${cloudinaryPublicId}.jpg`;
  
    const node = {
      id: uuidv4(),
      timestamp,
      snapshotUrl,
    };
  
    setSnapshots((prev) => [...prev, node]);
  };

  const addEdge = (
    fromId: string,
    toId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const from = snapshots.find((n) => n.id === fromId);
    const to = snapshots.find((n) => n.id === toId);
    if (!from || !to) return;

    const edge = {
      from: fromId,
      to: toId,
      videoSegmentUrl: `https://res.cloudinary.com/${cloud_name}/video/upload/so_${from.timestamp},eo_${to.timestamp}/${cloudinaryPublicId}.mp4`,
    };
    setEdges((prev) => [...prev, edge]);
  };

  const playSegment = (
    e: React.MouseEvent<HTMLButtonElement>,
    segmentUrl: string
  ) => {
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.src = segmentUrl;
    videoRef.current.play();
  };

  return (
    <div className="p-4 ">
      {!videoUrl && (
        <div className="flex flex-col items-center justify-center h-80 w-full border rounded-xl p-8 bg-stone-50">
          <label className="mb-4 text-lg font-semibold">
            {uploadVideoText}
          </label>
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
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              muted
              controls
              width="600"
              crossOrigin="anonymous"
            />
            <button
              className="mt-2 btn btn-success w-full"
              onClick={takeSnapshot}
            >
              {takeSnapshotText}
            </button>
          </div>
          <div className="mt-0 w-4/12 flex flex-col gap-4 h-full">
            <div className="h-1/2">
              <h3 className="text-lg font-bold mb-2">{snapshotsText}</h3>
              <div className="flex gap-4 overflow-x-auto p-2 border rounded bg-stone-50 h-full min-w-sm">
                {snapshots.map((snap) => (
                  <div key={snap.id} className="text-center min-w-[8rem] h-full ">
                    <img
                      src={snap.snapshotUrl}
                      alt="snapshot"
                      className="h-25  object-cover"
                    />
                    <div className="text-xs">{snap.timestamp.toFixed(2)}s</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-4 h-1/2">
              {snapshots.length >= 2 && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">
                    {createTransitionsText}
                  </h3>
                  <div className="flex flex-wrap gap-2 overflow-y-auto">
                    {snapshots.map((from) =>
                      snapshots.map((to) =>
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
        {edges.map((edge, idx) => (
          <button
            key={idx}
            onClick={(e) => playSegment(e, edge.videoSegmentUrl)}
            className="btn btn-info text-left"
          >
            ▶
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
