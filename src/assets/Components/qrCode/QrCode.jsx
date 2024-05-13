import React, { useState } from "react";
import './qrcode.css'

const QrCode = () => {
  const [img,setImg] = useState("./public/img/qrcode.gif");
  const [isLoading,setIsLoading] = useState(false);
  const [userData,setUserData] = useState("");
  const [qrSize,setQRSize] = useState("200");
  const generaterQr = () => {
    setIsLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(userData)}`;
        setImg(url);
    } catch (error) {
      console.error("Error : ",error);
    }finally{
      setIsLoading(false);
    }
  }
  const downloadQr = () => {
   fetch(img)
   .then((response) => response.blob())
   .then ((blob)=> {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   }) 
  }
  return (
    <div className="qr-container">
      <h1>Qr-Code<span> Generater</span></h1>
      {isLoading && <p>Please wait...</p>}
      {img &&  <div className="imgAlign">
        <img src={img} width={`${qrSize}px`} height={`${qrSize}px`} />
       </div>}
      <div className="qrGroup">
        <label htmlFor="qr-code">Qr-code</label>
        <input type="text" id="qr-code" placeholder="Enter your name (or) URL..." value={userData} onChange={(e) => setUserData(e.target.value)} required />
      </div>
      <div className="qrGroup">
        <label htmlFor="qr-size">Image Size (e.g., 150)</label>
        <input type="text" id="qr-size" value={qrSize} onChange={(e) => setQRSize(e.target.value)} />
      </div>
      <div className="buttonGroup">
        <button className="primary"  disabled = {isLoading} onClick={generaterQr}>
          Get Qr Code
        </button>
        <button className="primary outline" onClick={downloadQr}>
          Download Qr Code
        </button>
      </div>
    </div>
  );
};

export default QrCode;
