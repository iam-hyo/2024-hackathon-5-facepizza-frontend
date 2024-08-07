// src/components/PhotoSnap/EmotionalAlbum.jsx
import React, { useEffect, useState } from "react";
import { EmotionAlbumBox, ImageBox } from "../../styles/PhotoAlbumStyle";
import ImportFace from "./ImportFace";
import { Default } from "../../styles/StyledComponents";
import PhotoElement from "./PhotoElement";
import { API } from "../../api";

const Interpret = {
  happy: "행복",
  surprised: "놀람",
  angry: "화남",
  sad: "슬픔",
};

const EmotionalAlbum = ({ Emotion, onClick }) => {
  const [token, setToken] = useState(null);
  const [images, setImages] = useState([]);

  const emoticonsrc = ImportFace[Emotion];
  if (!emoticonsrc) {
    console.error(`Emotion "${Emotion}" is not recognized.`);
    return null;
  }

  const getImage = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
      const response = await API.get(`/api/albums?emotion=${Emotion}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("리스펀스:", response.data);
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImage();
  }, [Emotion]); // Ensure useEffect runs when Emotion changes


  // console.log(Emotion);

  return (
    <EmotionAlbumBox id="EmotionAlbumBox" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            paddingRight: "23px",
          }}
        >
          <img
            src={emoticonsrc}
            alt={Emotion}
            style={{
              width: "36.87px",
              height: "36.499px",
              marginRight: "10px",
            }}
          />
          <Default>{Interpret[Emotion]}</Default>
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <ImageBox>
          {
            images.slice(-4).map(data =>
              <PhotoElement key={data.id} data={data} />
            )
          }
        </ImageBox>
      </div>
    </EmotionAlbumBox>
  );
};

export default EmotionalAlbum;
