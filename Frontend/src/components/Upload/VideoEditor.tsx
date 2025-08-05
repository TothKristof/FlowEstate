// A React component that allows users to:
// 1. Upload a video
// 2. Preview it
// 3. Extract snapshots from specific timestamps
// 4. Link snapshots together
// 5. Generate Cloudinary segment URLs for transitions

import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function VideoEditor() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [edges, setEdges] = useState([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const videoUploadError = "Cannot upload video";
  const uploadVideoInProgress = "Uploading video...";
  const uploadVideoText = "Upload video";
  const takeSnapshotText = "Take snapshot";
  const snapshotsText = "Snapshots";
  const createTransitionsText = "Create transitions";

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError("");
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    } catch (err) {
      setError(videoUploadError);
    } finally {
      setUploading(false);
    }
  };

  const takeSnapshot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    if (snapshots.find((snap) => snap.timestamp === video.currentTime)) return;
    const timestamp = parseFloat(video.currentTime.toFixed(1));
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");

    const node = {
      id: uuidv4(),
      timestamp,
      snapshotUrl: dataUrl,
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
    if (!from || !to || !videoFile) return;

    const cloudinaryPublicId = videoFile.name.replace(/\.[^/.]+$/, "");

    const edge = {
      from: fromId,
      to: toId,
      videoSegmentUrl: `https://res.cloudinary.com/<cloud_name>/video/upload/so_${from.timestamp},eo_${to.timestamp}/${cloudinaryPublicId}.mp4`,
    };
    setEdges((prev) => [...prev, edge]);
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
            <video ref={videoRef} src={videoUrl} controls width="600" />
            <button
              className="mt-2 btn btn-success w-full"
              onClick={takeSnapshot}
            >
              {takeSnapshotText}
            </button>
          </div>
          <div className="mt-0 w-4/12 flex flex-col gap-4 h-60">
            <div className="h-1/2">
              <h3 className="text-lg font-bold mb-2">{snapshotsText}</h3>
              <div className="flex gap-4 overflow-x-auto max-w-xs p-2 border rounded bg-stone-50 h-full">
                {snapshots.map((snap) => (
                  <div key={snap.id} className="text-center min-w-[8rem]">
                    <img
                      src={snap.snapshotUrl}
                      alt="snapshot"
                      className="w-32 h-20 object-cover"
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

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
