export const compressImage = async (file: File, size?: number) => {
  size ??= 256;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to create canvas context");
  }

  canvas.width = size;
  canvas.height = size;

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const ratio = Math.max(size / width, size / height);

  const x = (size - width * ratio) / 2;
  const y = (size - height * ratio) / 2;

  ctx.drawImage(
    bitmap,
    0,
    0,
    width,
    height,
    x,
    y,
    width * ratio,
    height * ratio
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to compress image"));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      1
    );
  });
};
