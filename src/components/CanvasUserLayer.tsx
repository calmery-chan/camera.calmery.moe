import React from "react";
import { CanvasUserLayerFrame } from "~/types/CanvasUserLayerFrame";
import { CanvasUserLayer } from "~/types/CanvasUserLayer";

export const CanvasUserLayerComponent: React.FC<{
  id: number;
  layer: CanvasUserLayer;
  frame: CanvasUserLayerFrame;
  isCollaging: boolean;
  onStart: (event: React.MouseEvent | React.TouchEvent) => void;
}> = (props) => {
  const { id, frame, layer, onStart, isCollaging } = props;

  return (
    <svg
      x={frame.x}
      y={frame.y}
      width={frame.width}
      height={frame.height}
      viewBox={`0 0 ${frame.width} ${frame.height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ cursor: "move" }}
    >
      <defs>
        <filter id={`canvas-user-layer-filter-${id}`}>
          <feGaussianBlur stdDeviation={`${layer.blur}`} />
          <feColorMatrix type="hueRotate" values={`${layer.hue}`} />
          <feColorMatrix type="saturate" values={`${layer.saturate}`} />
        </filter>
      </defs>

      <clipPath id={`canvas-user-layer-frame-${id}`}>
        <path d={frame.path} />
      </clipPath>

      <g clipPath={`url(#canvas-user-layer-frame-${id})`}>
        <svg
          width={layer.width}
          height={layer.height}
          x={isCollaging ? layer.x : 0}
          y={isCollaging ? layer.y : 0}
          viewBox={`0 0 ${layer.width} ${layer.height}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          overflow="visible"
        >
          <g transform={`rotate(0, ${layer.width / 2}, ${layer.height / 2})`}>
            <image
              xlinkHref={layer.dataUrl}
              width="100%"
              height="100%"
              filter={`url(#canvas-user-layer-filter-${id})`}
            />
          </g>
        </svg>
      </g>

      <g clipPath={`url(#canvas-user-layer-frame-${id})`}>
        <rect
          width={frame.width}
          height={frame.height}
          fillOpacity={0}
          onTouchStart={onStart}
          onMouseDown={onStart}
        />
      </g>
    </svg>
  );
};
