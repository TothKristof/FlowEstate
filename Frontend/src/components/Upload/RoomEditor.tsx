import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import type { KonvaEventObject } from "konva/lib/Node";
import RoomImage from "./RoomImage";
import { useFormContext } from "react-hook-form";
import type { Property } from "../../utils/types/Property";
import { uploadImagesToCloudinary } from "../../utils/imageUpload";

/**
 * Fő komponens: tervrajzra lehet rajzolni poligonokat (szobákat), majd képet húzni rájuk
 */
export default function SimpleRoomEditor({ imageUrls }: { imageUrls: string[] }) {
  const { setValue, watch } = useFormContext<Property>();
  const rooms = watch("rooms") || [];
  const blueprintUrl = watch("blueprintUrl");
  // elmentett szobák
  const [currentPoints, setCurrentPoints] = useState<number[]>([]); // éppen rajzolt alakzat
  const [roomName, setRoomName] = useState("");
  const [color, setColor] = useState("");
  const [isNaming, setIsNaming] = useState(false);
  const stageRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Feltöltő UI logika
  async function handleBlueprintUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setUploading(true);
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;
      const urls = await uploadImagesToCloudinary([files[0]]);
      console.log("🚀 ~ handleBlueprintUpload ~ urls:", urls)
      if (urls && urls[0]) {
        setValue("blueprintUrl", urls[0]);
      }
    } catch {
      setError("Hiba történt a feltöltés során.");
    } finally {
      setUploading(false);
    }
  }

  // kattintáskor új pontot adunk hozzá az éppen rajzolt szobához
  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    if (isNaming) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setCurrentPoints((prev) => [...prev, pos.x, pos.y]);
  };

  // Szoba "befejezése", név megadása
  const finishRoom = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (currentPoints.length < 6) return alert("Legalább 3 pont kell");
    setIsNaming(true);
  };

  // Szoba mentése névvel
  const saveRoom = () => {
    if (!roomName) return;

    const newRooms = [
      ...rooms,
      { name: roomName, points: currentPoints, imageUrl: "", color },
    ];

    setValue("rooms", newRooms);
    setCurrentPoints([]);
    setRoomName("");
    setColor("");
    setIsNaming(false);
  };

  // Drag-drop kép hozzárendelés (egyszerűsített)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const imageUrl = e.dataTransfer.getData("imageUrl");
    if (!stage || !imageUrl) return;

    const boundingRect = stage.container().getBoundingClientRect();
    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;

    const index = rooms.findIndex((r) => isPointInPolygon(x, y, r.points));
    if (index === -1) return;

    const updatedRooms = rooms.map((r, i) =>
      i === index ? { ...r, imageUrl } : r
    );

    setValue("rooms", updatedRooms);
  };

  function isPointInPolygon(x: number, y: number, points: number[]) {
    let inside = false;
    console.log("🚀 ~ isPointInPolygon ~ inside:", inside);
    for (let i = 0, j = points.length / 2 - 1; i < points.length / 2; j = i++) {
      const xi = points[i * 2],
        yi = points[i * 2 + 1];
      const xj = points[j * 2],
        yj = points[j * 2 + 1];
      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-10) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // A return elején blueprintUrl ellenőrzés
  const [image] = useImage(blueprintUrl || "");
  if (!blueprintUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-80 w-full border rounded-xl p-8 bg-stone-50">
        <label className="mb-4 text-lg font-semibold">Töltsd fel a tervrajzot!</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBlueprintUpload}
          disabled={uploading}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {uploading && <div className="mt-2 text-blue-600">Feltöltés folyamatban...</div>}
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div
      className="flex-col space-y-2 "
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex gap-2">
        <Stage
          width={600}
          height={300}
          ref={stageRef}
          onClick={handleClick}
          style={{ border: "1px solid #ccc" }}
        >
          <Layer>
            {image && <KonvaImage image={image} width={600} height={300} />}

            {/* Rajzolt szobák */}
            {rooms.map((room, idx) => (
              <React.Fragment key={idx}>
                {room.imageUrl && (
                  <RoomImage
                    imageUrl={room.imageUrl}
                    clipPoints={room.points}
                  />
                )}
                <Line
                  points={room.points}
                  closed
                  stroke={room.color}
                  fill={room.imageUrl ? undefined : `${room.color}55`}
                  strokeWidth={2}
                />
              </React.Fragment>
            ))}

            {/* Épp rajzolt szoba */}
            {currentPoints.length > 0 && (
              <Line
                points={currentPoints}
                stroke="blue"
                strokeWidth={2}
                lineJoin="round"
                lineCap="round"
              />
            )}
          </Layer>
        </Stage>
        <div className="flex flex-col h-[300px] space-y-1">
          <div className="h-[250px] flex-col w-40 border-success border text-center justify-center px-2 space-y-3">
            <div className="w-full">
              <h2 className="uppercase">Rooms</h2>
            </div>
            <ol className="gap-2 w-full">
              {rooms &&
                rooms.map((room, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: room.color,
                      color: "#fff", // opcionálisan olvashatóbb szöveg
                      padding: "4px 8px",
                      borderRadius: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    {room.name}
                  </li>
                ))}
            </ol>
          </div>
          <div className="h-[50px]">
            <button className="btn btn-success" onClick={finishRoom}>
              Szoba kész
            </button>
            {/* Név megadás form */}
            {isNaming && (
              <div className="flex gap-2 items-center">
                <input
                  placeholder="Szoba neve"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                />
                <button className="btn btn-success" onClick={saveRoom}>
                  Mentés
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Példaképek (drag) */}
      <div className="flex h-30 w-full" style={{ marginTop: 20 }}>
        {imageUrls && imageUrls.map((url: string, i: number) => (
          <img
            key={i}
            src={url}
            alt=""
            draggable
            onDragStart={(e) => e.dataTransfer.setData("imageUrl", url)}
            style={{ marginRight: 10 }}
          />
        ))}
      </div>
    </div>
  );
}
