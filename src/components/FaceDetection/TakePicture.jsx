import React, { useEffect, useRef, useState } from 'react';
import FaceDetection from './FaceDetection';
import * as P from '../PhotoSnapModal';

const emotionMap = {
  happy: '행복',
  sad: '슬픔',
  angry: '분노',
  surprised: '놀람'
};

const TakePicture = ({ onPhotoTaken, ExpressionType }) => {
  const videoRef = useRef(); // videoRef 생성
  const canvasRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [detections, setDetections] = useState(false);
  const [expressions, setExpressions] = useState({ maxKey: null, maxValue: 0 });

  useEffect(() => {
    // 이미지를 캡처하는 함수 정의
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        // 캔버스 크기를 비디오 크기로 설정
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // 캔버스에 비디오 프레임을 그리기
        const context = canvasRef.current.getContext('2d');
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        // 캡처된 이미지를 데이터 URL로 변환
        const imageSrc = canvasRef.current.toDataURL('image/jpeg');
        onPhotoTaken(imageSrc);
        setImageSrc(imageSrc); // 찍힌 사진 저장
        setPhotoTaken(true);
      }
    };

    // 추적 됐을 때만 찍기
    if (detections === true && ExpressionType) {
      console.log(expressions, ExpressionType);
      const emotionTranslate = emotionMap[expressions.maxKey];
      // 감지된 표정이 지정된 표정과 일치할 경우
      if (emotionTranslate === ExpressionType) {
        console.log(`나는~${ExpressionType}합니다.`);
        const timer = setTimeout(captureImage, 3000);
        // cleanup 함수: 다음 감지 시도 전에 타이머를 클리어
        return () => clearTimeout(timer);
      }
    }
  }, [detections, expressions.maxKey, onPhotoTaken, ExpressionType]);
  // [ 감지여부, 감지된표정.맥스키, 사진전달함수, 목표표정]

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => (value > acc[1] ? [key, value] : acc),
        [null, -Infinity]
      );
      const faceExpression = { maxKey, maxValue };
      if (maxValue > 0.5) {
        // 0.5 이상일 때 추적 상태 true로 변경
        setDetections(true);
        setExpressions(faceExpression);
      } else {
        setDetections(false);
      }
    });
  };

  useEffect(() => {
    // 가로 세로 비율 유지하기
    const handleResize = () => {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        const { offsetWidth: width } = modalContent;
        const height = (width / 1500) * 1000;
        modalContent.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
      <P.CameraCanvas>
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* 캔버스 숨기기 */}
      </P.CameraCanvas>
      {photoTaken && imageSrc && (
        <div>
          <h2>촬영된 사진</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </>
  );
};

export default TakePicture;
