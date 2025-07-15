import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Line, Text } from 'react-konva';
import useImage from 'use-image';
import type { KonvaEventObject } from 'konva/lib/Node';

type DrawMode = 'freehand' | 'rectangle';

interface RoomPolygon {
    points: number[];
    name: string;
    type: DrawMode;
    imageUrl: string | null; // új mező
}

interface RoomEditorProps {
    blueprintUrl: string,
    imageUrls: string[]
}

export default function RoomEditor({ blueprintUrl, imageUrls }: RoomEditorProps) {
    const [image] = useImage(blueprintUrl);
    const [polygons, setPolygons] = useState<RoomPolygon[]>([]);
    const [currentPoints, setCurrentPoints] = useState<number[]>([]);
    const [showNameInput, setShowNameInput] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [drawMode, setDrawMode] = useState<DrawMode>('freehand');
    const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null);
    const containerRef = useRef(null);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const stageRef = useRef<Konva.Stage>(null);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                console.log('Container width:', offsetWidth);
                setStageSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleClick = (e: KonvaEventObject<MouseEvent>) => {
        if (showNameInput) return;
        const stage = e.target.getStage();
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;

        const { x, y } = pos;

        if (drawMode === 'freehand') {
            setCurrentPoints([...currentPoints, x, y]);
        } else if (drawMode === 'rectangle') {
            if (!startPoint) {
                setStartPoint({ x, y });
            } else {
                const endX = x;
                const endY = y;
                const rectPoints = [
                    startPoint.x, startPoint.y,
                    endX, startPoint.y,
                    endX, endY,
                    startPoint.x, endY
                ];
                setCurrentPoints(rectPoints);
                setStartPoint(null);
            }
        }
    };

    const handleFinishPolygon = () => {
        if ((drawMode === 'freehand' && currentPoints.length >= 6) || (drawMode === 'rectangle' && currentPoints.length === 8)) {
            setShowNameInput(true);
        } else {
            alert("A forma befejezéséhez legalább 3 pont (6 koordináta), vagy egy téglalap szükséges.");
        }
    };

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomName.trim() !== '') {
            setPolygons([...polygons, { points: currentPoints, name: roomName, type: drawMode, imageUrl: null }]);
            setPolygonImages([...polygonImages, null]);
            setCurrentPoints([]);
            setRoomName('');
            setShowNameInput(false);
        }
    };

    const getPolygonCenter = (points: number[]) => {
        const xs = points.filter((_, i) => i % 2 === 0);
        const ys = points.filter((_, i) => i % 2 === 1);
        const centerX = xs.reduce((sum, x) => sum + x, 0) / xs.length;
        const centerY = ys.reduce((sum, y) => sum + y, 0) / ys.length;
        return { x: centerX, y: centerY };
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const stage = stageRef.current;
        if (!stage) return;
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const imageUrl = e.dataTransfer.getData('imageUrl');
        if (!imageUrl) return;

        const polygonIndex = polygons.findIndex(poly =>
            isPointInPolygon(pointer.x, pointer.y, poly.points)
        );
        console.log("🚀 ~ handleDrop ~ polygonIndex:", polygonIndex)
        if (polygonIndex === -1) return;

        // Load the image and set it for the polygon
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
            setPolygons(prev =>
                prev.map((poly, idx) =>
                    idx === polygonIndex ? { ...poly, imageUrl: img.src } : poly
                )
            );
        };
    };

    function isPointInPolygon(x: number, y: number, points: number[]) {
        console.log("🚀 ~ isPointInPolygon ~ y:", y)
        console.log("🚀 ~ isPointInPolygon ~ x:", x)
        const poly = [];
        for (let i = 0; i < points.length; i += 2) {
            poly.push([points[i], points[i + 1]]);
        }
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const xi = poly[i][0], yi = poly[i][1];
            const xj = poly[j][0], yj = poly[j][1];
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / ((yj - yi) || 1e-10) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function handleImageDropOnRoom(e: React.DragEvent<HTMLLIElement>, polygonIndex: number) {
        e.preventDefault();
        const imageUrl = e.dataTransfer.getData('imageUrl');
        if (!imageUrl) return;
        setPolygons(prev =>
            prev.map((poly, idx) =>
                idx === polygonIndex ? { ...poly, imageUrl } : poly
            )
        );
    }

    const polygonImages = polygons.map(poly => useImage(poly.imageUrl || ''));

    return (
        <div className="flex-col h-fit p-2 justify-center items-center w-full mt-4">
            <div className="flex flex-row items-center space-x-4 mb-2">
                <button
                    type="button"
                    className={`btn ${drawMode === 'freehand' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => {
                        setDrawMode('freehand');
                        setCurrentPoints([]);
                        setStartPoint(null);
                    }}
                >
                    Szabadkézi
                </button>
                <button
                    type="button"
                    className={`btn ${drawMode === 'rectangle' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => {
                        setDrawMode('rectangle');
                        setCurrentPoints([]);
                        setStartPoint(null);
                    }}
                >
                    Téglalap
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleFinishPolygon}
                >
                    Finish Room
                </button>
            </div>

            {showNameInput && (
                <form style={{ margin: '10px 0' }}>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Room name"
                        autoFocus
                        required
                    />
                    <button type="button" className="btn btn-success" onClick={handleNameSubmit}>
                        Save
                    </button>
                </form>
            )}

            <div className="flex flex-row  h-[400px]">
                <div
                    className="basis-6/12 h-full flex-none"
                    ref={containerRef}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                >
                    <Stage
                        ref={stageRef}
                        width={stageSize.width}
                        height={stageSize.height}
                        onClick={handleClick}
                    >
                        <Layer>
                            {image && <KonvaImage
                                image={image}
                                width={stageSize.width}
                                height={stageSize.height}
                            />}

                            {polygons.map((poly, idx) => {
                                const center = getPolygonCenter(poly.points);
                                const [polyImage] = polygonImages[idx];

                                return (
                                    <React.Fragment key={idx}>
                                        {polyImage && (
                                            <KonvaImage
                                                image={polyImage}
                                                x={0}
                                                y={0}
                                                width={stageSize.width}
                                                height={stageSize.height}
                                                listening={false}
                                                clipFunc={(ctx: any) => {
                                                    ctx.beginPath();
                                                    ctx.moveTo(poly.points[0], poly.points[1]);
                                                    for (let i = 2; i < poly.points.length; i += 2) {
                                                        ctx.lineTo(poly.points[i], poly.points[i + 1]);
                                                    }
                                                    ctx.closePath();
                                                }}
                                            />
                                        )}
                                        {poly.type === 'freehand' ? (
                                            <Line
                                                points={poly.points}
                                                closed
                                                stroke="green"
                                                strokeWidth={2}
                                                fill="rgba(0,255,0,0.2)"
                                            />
                                        ) : (
                                            <Line
                                                points={poly.points}
                                                closed
                                                stroke="orange"
                                                strokeWidth={2}
                                                fill="rgba(252, 206, 3, 0.69)"
                                            />
                                        )}
                                        <Text
                                            x={center.x - 30}
                                            y={center.y - 10}
                                            text={poly.name}
                                            fontSize={16}
                                            fill="black"
                                        />
                                    </React.Fragment>
                                );
                            })}

                            {currentPoints.length > 0 && (
                                <Line
                                    points={currentPoints}
                                    stroke={drawMode === 'freehand' ? 'blue' : 'orange'}
                                    strokeWidth={2}
                                    lineCap="round"
                                    lineJoin="round"
                                    closed={drawMode === 'rectangle'}
                                    dash={drawMode === 'rectangle' ? [10, 5] : undefined}
                                />
                            )}
                        </Layer>
                    </Stage>
                </div>
                <div className="basis-2/12 h-full flex-none">
                    <div id="list" className="flex-[2] px-1 overflow-auto">
                        <ol className="mt-4 space-y-1 text-md p-2 rounded">
                            {polygons.map((polygon, index) => (
                                <li
                                    key={index}
                                    className="p-1 rounded text-green-800 bg-green-100"
                                    onDrop={e => handleImageDropOnRoom(e, index)}
                                    onDragOver={e => e.preventDefault()}
                                >
                                    {polygon.name}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="carousel w-full mx-20 h-60">
                        {imageUrls && imageUrls.map((imageUrl, index) => (
                            <div id={`slide${index}`} className="carousel-item relative w-full flex items-center justify-center" key={index}>
                                <a
                                    href={`#slide${(index - 1 + imageUrls.length) % imageUrls.length}`}
                                    className="btn btn-circle mx-2"
                                >
                                    ❮
                                </a>
                                <img
                                    src={imageUrl}
                                    className="w-full max-w-[80%] mx-2"
                                    alt={`slide${index}`}
                                    draggable
                                    onDragStart={e => {
                                        e.dataTransfer.setData('imageUrl', imageUrl);
                                    }}
                                />
                                <a
                                    href={`#slide${(index + 1) % imageUrls.length}`}
                                    className="btn btn-circle mx-2"
                                >
                                    ❯
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}