import React, { useRef, useState } from "react";
import type { PropertyMap } from "../../utils/types/PropertyMap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  propertyMap: PropertyMap;
};

function VideoModal({ open, onClose, propertyMap }: VideoModalProps) {
  const { snapshots = [], edges = [] } = propertyMap || {};
  const [currentSnapshot, setCurrentSnapshot] = useState(snapshots[0] ?? null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!open) return null;

  /** Edge kereső */
  const findEdge = (fromId: string, toId: string) =>
    edges.find((e) => e.from === fromId && e.to === toId);

  /** Videó lejátszása edge alapján */
  const playVideoSegment = (url: string, onEnd: () => void) => {
    if (!videoRef.current) return;
    videoRef.current.src = url;
    videoRef.current.play();
    videoRef.current.onended = onEnd;
  };

  /** Snapshot váltás */
  const goToSnapshot = (nextSnapshot: any, playEdge: boolean) => {
    if (!currentSnapshot || !nextSnapshot) return;

    const edge = findEdge(currentSnapshot.id, nextSnapshot.id);
    if (playEdge && edge && videoRef.current) {
      // előrefelé van edge
      playVideoSegment(edge.forwardUrl, () =>
        setCurrentSnapshot(nextSnapshot)
      );
    } else if (playEdge && !edge && videoRef.current) {
      // visszafelé edge reverse url-t ad a backend
      const reverseEdge = findEdge(nextSnapshot.id, currentSnapshot.id);
      if (reverseEdge?.reverseUrl) {
        playVideoSegment(reverseEdge.reverseUrl, () =>
          setCurrentSnapshot(nextSnapshot)
        );
      } else {
        // ha semmi nincs fallback: csak snapshot váltás
        setCurrentSnapshot(nextSnapshot);
      }
    } else {
      setCurrentSnapshot(nextSnapshot);
    }
  };

  /** Következő snapshot */
  const goNext = () => {
    const idx = snapshots.findIndex((s) => s.id === currentSnapshot?.id);
    const next = snapshots[idx + 1];
    goToSnapshot(next, true);
  };

  /** Előző snapshot */
  const goPrev = () => {
    const idx = snapshots.findIndex((s) => s.id === currentSnapshot?.id);
    const prev = snapshots[idx - 1];
    goToSnapshot(prev, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-black rounded-2xl w-full max-w-4xl h-[80%] flex items-center justify-center">
        {/* Close */}
        <IoIosCloseCircleOutline
          className="cursor-pointer bg-transparent absolute right-2 top-2 text-white z-20"
          size={25}
          onClick={onClose}
        />

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={undefined}
          poster={currentSnapshot?.snapshotUrl}
          controls={false}
          muted
        />

        {/* Navigation */}
        <button
          className="absolute left-4 bottom-1 -translate-y-1/2 text-white text-4xl"
          onClick={goPrev}
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="absolute right-4 bottom-1 -translate-y-1/2 text-white text-4xl"
          onClick={goNext}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default VideoModal;
