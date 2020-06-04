import React from "react";
import { useSelector } from "react-redux";
import { State } from "~/domains";
import { Constants } from "~/styles/constants";
import { CropperImageState } from "~/domains/cropper/reducer";

const Image: React.FC<{
  image: CropperImageState;
  fill?: boolean;
}> = ({ image, fill = false }) => (
  <svg
    width={image.width * image.scale.current}
    height={image.height * image.scale.current}
    x={image.position.x}
    y={image.position.y}
    viewBox={`0 0 ${image.width} ${image.height}`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    overflow="visible"
  >
    <g
      transform={`rotate(${image.rotate.current}, ${image.width / 2}, ${
        image.height / 2
      })`}
    >
      <image xlinkHref={image.url} width="100%" height="100%" />
      {fill && (
        <rect
          width="100%"
          height="100%"
          fill="#000"
          fillOpacity={Constants.opacity}
        />
      )}
    </g>
  </svg>
);

export const CropperImage: React.FC = () => {
  const { cropper, image } = useSelector(({ cropper }: State) => cropper);

  let sx = cropper.scaleX.current;
  let sy = cropper.scaleY.current;

  if (!cropper.freeAspect) {
    sx = cropper.scale.current;
    sy = cropper.scale.current;
  }

  return (
    <>
      <clipPath id="cropper-image-clip-path">
        <rect
          x={cropper.position.x}
          y={cropper.position.y}
          width={cropper.width * sx}
          height={cropper.height * sy}
        />
      </clipPath>

      <Image image={image} fill />

      <g clipPath="url(#cropper-image-clip-path)">
        <Image image={image} />
      </g>
    </>
  );
};
