const convertDataUrlToBlob = (dataUrl: string) => {
  const type = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  const decodedData = atob(dataUrl.split(",")[1]);
  const buffer = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; i++) {
    buffer[i] = decodedData.charCodeAt(i);
  }
  return new Blob([buffer.buffer], { type });
};

export const convertSvgToDataUrl = (
  svgText: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svg = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);
    const image = new Image();

    image.onerror = () => reject();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (context === null) {
        return reject();
      }

      // Safari で `context.drawImage` するとたまに内部の image 要素が描写されないことがある
      // 800ms 程度待ってみる
      setTimeout(() => {
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 1));
      }, 800);
    };

    image.src = url;
  });
};
