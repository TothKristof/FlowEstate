import { useState } from "react";
import useImage from "use-image";
import { Stage, Layer, Line, Text, Image as KonvaImage, Group } from "react-konva";
import type { Room } from "../../utils/types/Room";

type Props = {
  blueprintUrl: string | null;
  rooms: Room[];
  width?: number;
  height?: number;
  onRoomClick?: (room: Room) => void;
  scale?: number;
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function RoomOverlay({
  blueprintUrl,
  rooms,
  width = 600,
  height = 300,
  scale = 1,
  onRoomClick,
}: Props) {
  const [image] = useImage(blueprintUrl || "");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Stage width={width} height={height} scale={{ x: scale, y: scale }}>
      <Layer>
        {image && <KonvaImage image={image} width={width} height={height} />}
        {rooms.map((room, index) => {
          if (!room.points || room.points.length < 6) return null;

          const { color, points, name } = room;

          const closedPoints =
            points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]
              ? [...points, points[0], points[1]]
              : points;

          const xPoints = closedPoints.filter((_, i) => i % 2 === 0);
          const yPoints = closedPoints.filter((_, i) => i % 2 === 1);
          const centerX = xPoints.reduce((sum, x) => sum + x, 0) / xPoints.length;
          const centerY = yPoints.reduce((sum, y) => sum + y, 0) / yPoints.length;

          return (
            <Group
              key={`room-${index}`}
              onClick={() => onRoomClick?.(room)}
              onMouseOver={(event) => {
                const stage = event.target.getStage();
                const node = stage?.findOne(`#shape-${index}`);
                node?.fire('onmouseenter');}}
              onMouseEnter={() => {
                setHoveredIndex(index);
                document.body.style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                document.body.style.cursor = "default";
              }}
            >
              <Line
                points={closedPoints}
                closed
                stroke={color}
                strokeWidth={2}
                id={`shape-${index}`}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  document.body.style.cursor = "pointer";
                }}
                fill={hoveredIndex === index ? hexToRgba(color, 0.4) : hexToRgba(color, 0.2)}
              />
              <Text
                text={name}
                x={centerX - 30}
                y={centerY - 10}
                fontSize={16}
                fill="#000"
                fontStyle="bold"
              />
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );
}
