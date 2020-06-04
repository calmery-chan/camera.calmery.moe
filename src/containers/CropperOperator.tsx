import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "~/domains";
import { actions } from "~/domains/cropper/actions";
import { convertEventToCursorPositions } from "~/utils/convert-event-to-cursor-positions";
import { getColorByDominantColorLightness } from "~/utils/canvas";

export const CropperOperator: React.FC = () => {
  const dispatch = useDispatch();
  const c = useSelector(({ cropper }: State) => cropper);
  const { displayMagnification } = c;
  const image = c;
  const cropper = c;

  // Refs

  const circleRef = useRef<SVGCircleElement>(null);

  // Events

  const handleOnStartCropperTransform = useCallback(
    (event: React.MouseEvent | TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(
        actions.startCropperCropperTransform(
          convertEventToCursorPositions(event)
        )
      );
    },
    [dispatch]
  );

  // Hooks

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const c = circleRef.current!;

    c.addEventListener("touchstart", handleOnStartCropperTransform, {
      passive: false,
    });

    return () => {
      c.removeEventListener("touchstart", handleOnStartCropperTransform);
    };
  }, [circleRef]);

  // Render

  let sx = cropper.cropperScaleX;
  let sy = cropper.cropperScaleY;

  if (!cropper.freeAspect) {
    sx = cropper.cropperScale;
    sy = cropper.cropperScale;
  }

  const x = cropper.cropperX;
  const y = cropper.cropperY;
  const width = cropper.cropperWidth * sx;
  const height = cropper.cropperHeight * sy;

  const cx = x + width;
  const cy = y + height;
  const r = 12 * displayMagnification;

  const dark = getColorByDominantColorLightness(1);
  const light = getColorByDominantColorLightness(0);

  return (
    <>
      <clipPath id="cropper-operator-clip-path">
        <rect
          width={image.imageWidth * image.imageScale}
          height={image.imageHeight * image.imageScale}
          x={image.imageX}
          y={image.imageY}
          transform={`rotate(${image.imageAngle}, ${image.imageWidth / 2}, ${
            image.imageHeight / 2
          })`}
        />
      </clipPath>

      <g>
        <rect
          fillOpacity="0"
          stroke={dark}
          strokeWidth="2"
          strokeDasharray="8 8"
          width={width}
          height={height}
          x={x}
          y={y}
        ></rect>

        <circle fill={dark} cx={cx} cy={cy} r={r}></circle>
      </g>

      <g clipPath="url(#cropper-operator-clip-path)">
        <rect
          fillOpacity="0"
          stroke={light}
          strokeWidth="2"
          strokeDasharray="8 8"
          width={width}
          height={height}
          x={x}
          y={y}
        ></rect>

        <circle fill={light} cx={cx} cy={cy} r={r}></circle>
      </g>

      <image
        xlinkHref="/images/containers/resize.svg"
        width={r}
        height={r}
        x={x + width - r / 2}
        y={y + height - r / 2}
      />

      <circle
        ref={circleRef}
        fillOpacity="0"
        cx={cx}
        cy={cy}
        r={r}
        onMouseDown={handleOnStartCropperTransform}
      ></circle>
    </>
  );
};
