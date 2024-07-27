import React, { useRef, useState, useEffect } from "react";
import FaceDetection from "./FaceDetection";

const FaceExpression = ({ onExpressions }) => {
  const videoRef = useRef(null);
  const [detections, setDetections] = useState(false);
  const [expressions, setExpressions] = useState({ maxKey: "start", maxValue: 0 });

  useEffect(() => {
    if (detections) {
      setExpressions(expressions);
      if (onExpressions) {
        onExpressions(expressions); // onExpressions 콜백 호출
      }
    }
  }, [detections, expressions, onExpressions]);

  const handleDetections = (resizedDetections) => {
    resizedDetections.forEach((detection) => {
      const expressions = detection.expressions;
      const [maxKey, maxValue] = Object.entries(expressions).reduce(
        (acc, [key, value]) => {
          if (value > acc[1]) {
            return [key, value];
          } else {
            return acc;
          }
        },
        [null, -Infinity]
      );
      const faceExpression = { maxKey, maxValue };
      if (maxValue > 0.5) {
        setDetections(true);
        setExpressions(faceExpression);
      } else {
        setDetections(false);
      }
    });
  };

  return (
    <FaceDetection videoRef={videoRef} onDetections={handleDetections} />
  );
};

export default FaceExpression;
