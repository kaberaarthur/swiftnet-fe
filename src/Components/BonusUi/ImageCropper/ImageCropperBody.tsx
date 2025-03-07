import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { DownloadCrop, HiddenDownload, Href } from '@/Constant';
import CropControl from './CropControl';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import { Button } from 'reactstrap';
import Link from 'next/link';

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  return centerCrop(makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
};
const ImageCropperBody = () => {
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
    const blobUrlRef = useRef("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setCrop(undefined);
        const reader = new FileReader();
        reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
        reader.readAsDataURL(e.target.files[0]);
      }
    };
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspect) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
      }
    };
    const onDownloadCropClick = () => {
      if (!previewCanvasRef.current) throw new Error("Crop canvas does not exist");
      previewCanvasRef.current.toBlob((blob) => {
        if (!blob) throw new Error("Failed to create blob");
        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = URL.createObjectURL(blob);
        hiddenAnchorRef.current!.href = blobUrlRef.current;
        hiddenAnchorRef.current!.click();
      });
    };
    useDebounceEffect(
      async () => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current)
          canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      },100,[completedCrop, scale, rotate]
    );
    const handleToggleAspectClick = () => {
      if (aspect) {
        setAspect(undefined);
      } else if (imgRef.current) {
        const { width, height } = imgRef.current;
        setAspect(16 / 9);
        setCrop(centerAspectCrop(width, height, 16 / 9));
      }
    };
    const imgStyle = { transform: `scale(${scale}) rotate(${rotate}deg)` };
  return (
    <div className="App">
      <CropControl imgSrc={imgSrc} scale={scale} setScale={setScale} rotate={rotate} setRotate={setRotate} aspect={aspect} onSelectFile={onSelectFile} handleToggleAspectClick={handleToggleAspectClick} />
      {!!imgSrc && (
        <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)} aspect={aspect}>
          <img ref={imgRef} alt="Crop me" src={imgSrc} style={imgStyle} onLoad={onImageLoad} />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div><canvas ref={previewCanvasRef} style={{ border: "1px solid black", objectFit: "contain", width: completedCrop.width, height: completedCrop.height }} /></div>
          <div>
            <Button color="success" className="mt-2" onClick={onDownloadCropClick}>{DownloadCrop}</Button>
            <Link href={Href} ref={hiddenAnchorRef} download className="position-absolute top-100 d-none">{HiddenDownload}</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCropperBody