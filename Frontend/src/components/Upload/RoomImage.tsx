import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function RoomImage({
  imageUrl,
  clipPoints,
}: {
  imageUrl: string;
  clipPoints: number[];
}) {
  const [img] = useImage(imageUrl);
  if (!img) return null;

  // 1. Bounding box kiszámítása a clipPoints alapján
  const xs = clipPoints.filter((_, i) => i % 2 === 0);
  const ys = clipPoints.filter((_, i) => i % 2 === 1);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const boxWidth = maxX - minX;
  const boxHeight = maxY - minY;

  return (
    <KonvaImage
      image={img}
      x={minX}
      y={minY}
      width={boxWidth}
      height={boxHeight}
      listening={false}
      clipFunc={(ctx) => {
        ctx.beginPath();
        ctx.moveTo(clipPoints[0] - minX, clipPoints[1] - minY);
        for (let i = 2; i < clipPoints.length; i += 2) {
          ctx.lineTo(clipPoints[i] - minX, clipPoints[i + 1] - minY);
        }
        ctx.closePath();
      }}
    />
  );
}
