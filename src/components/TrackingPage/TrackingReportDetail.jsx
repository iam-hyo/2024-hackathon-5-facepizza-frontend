import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from '../../styles/StyledComponents';
import * as RT from '../../styles/RealTimeTrackingStyled';
import * as C from '../../styles/CameraStyled';
import { API } from '../../api';
import ImportCharacter from "../Character/ImportCharacter";
import { BsJustify } from 'react-icons/bs';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const TrackingReportDetail = () => {
  const { reportid } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const emotionTranslations = {
    happy: '행복',
    sad: '슬픔',
    angry: '화남',
    surprised: '놀람',
    disgusted: '혐오',
    fearful: '두려움',
    neutral: '무표정',
  };

  const emotionHighlightFields = {
    happy: 'happy_highlight',
    sad: 'sad_highlight',
    angry: 'angry_highlight',
    surprised: 'surprised_highlight',
    disgusted: 'disgusted_highlight',
    fearful: 'fearful_highlight',
    neutral: 'neutral_highlight',
  };

  const emotionMaxValueFields = {
    happy: 'happy_maxValue',
    sad: 'sad_maxValue',
    angry: 'angry_maxValue',
    surprised: 'surprised_maxValue',
    disgusted: 'disgusted_maxValue',
    fearful: 'fearful_maxValue',
    neutral: 'neutral_maxValue',
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const calculateElapsedTime = (start, end) => {
    const elapsedMs = new Date(end) - new Date(start);
    const seconds = Math.floor((elapsedMs / 1000) % 60);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);

    if (minutes === 0) {
      return `${String(seconds)}초`;
    } else {
      return `${String(minutes)}분 ${String(seconds)}초`;
    }
  };

  const BestEmotion = (report) => {
    let maxEmotion = null;
    let maxPercentage = -Infinity;

    Object.entries(report).forEach(([key, value]) => {
      if (emotionTranslations[key] && parseFloat(value) > maxPercentage) {
        maxPercentage = parseFloat(value);
        maxEmotion = key;
      }
    }); 

    return maxEmotion ? { emotion: maxEmotion, percentage: maxPercentage } : null;
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/api/report/${reportid}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setReport(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportid]);

  const deleteReport = async () => {
    if (window.confirm("정말로 이 레포트를 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/api/report/${reportid}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        alert('레포트가 삭제되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error("Failed to delete the report:", error);
        alert('레포트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bestEmotion = report ? BestEmotion(report) : null;

  const emotionSequence = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'afraid', 'disgusted'];
  const getEmoticonKey = (emotion, characterType) => {
    const emotionIndex = emotionSequence.indexOf(emotion);
    if (emotionIndex === -1) return null;
    return `${characterType}_${emotionSequence[emotionIndex]}`;
};

const CharacterDisplay = ({ bestEmotion, characterType = 's' }) => {
    const emoticonKey = getEmoticonKey(bestEmotion.emotion, characterType);
    const emoticonsrc = ImportCharacter[emoticonKey] || images['s_neutral'];
    const imgstyle = {
      width: '350px',
      hieght: '200px',
      objectFit: 'cover'
    }
    return (
    <img src={emoticonsrc} alt={bestEmotion.emotion} style={imgstyle} />
    );
}; 

  return (
    <RT.TrackingContainer>
      <C.Main_Container>
        <div id='title_bar' style={{ justifyContent: 'space-between', borderBottom: 'none' }}>
          <h3 style={{ margin: '0px', paddingLeft: '0px' }}>{report.title}</h3>
          <button id='deledtBTN' onClick={deleteReport}>삭제하기</button>
        </div>
        <div className='dataContainer2'>
          <RT.HeadP>data</RT.HeadP>

          <h2>누적 표정 데이터</h2>

          <div>
            <RT.Data1 style={{ justifyContent: 'center' }}>
              {Object.entries(report).map(([key, value]) => (
                emotionTranslations[key] && (
                  <h4 key={key}>{`${emotionTranslations[key]}: ${value}%`}</h4>
                )
              ))}
            </RT.Data1>

            <CharacterDisplay bestEmotion={bestEmotion} characterType="s" />
            {bestEmotion && (
              <div style={{paddingBottom: '20px'}}>
                {emotionTranslations[bestEmotion.emotion] === '무표정' ?
                  <RT.H3magin>{emotionTranslations[bestEmotion.emotion]}을 가장 많이 지었어요!</RT.H3magin>
                  : emotionTranslations[bestEmotion.emotion] === '행복' ?
                    <RT.H3magin>행복한 표정을 가장 많이 지었어요!</RT.H3magin>
                    : <RT.H3magin>{emotionTranslations[bestEmotion.emotion]} 표정을 가장 많이 지었어요!</RT.H3magin>
                }
              </div>
            )}
          </div>

        </div>
        <C.FlexRow style={{ justifyContent: 'flex-start',alignItems: 'center', width: '100%', gap: '18px' }} >
          <p style={{fontSize: '18px'}}>총 {calculateElapsedTime(report.created_at, report.ended_at)} 트래킹</p>
          <p>{`시작: ${formatDate(report.created_at)} ${formatTime(report.created_at)}`}</p>
          <p>{`종료: ${formatDate(report.ended_at)} ${formatTime(report.ended_at)}`}</p>
        </C.FlexRow>
        <div>
          <h3>하이라이트 사진</h3>
          <RT.Gallery>
            {Object.entries(emotionHighlightFields).map(([emotion, field]) => (
              report[field] ? (
                <div key={emotion}>
                  <img src={report[field]} alt={emotion} width="300" />
                  <p>{`${emotionTranslations[emotion]}`} |{`${(report[emotionMaxValueFields[emotion]] * 100).toFixed(5)}`}%</p>
                </div>
              ) : null
            ))}
          </RT.Gallery>
        </div>
      </C.Main_Container>
    </RT.TrackingContainer>
  );
};

export default TrackingReportDetail;
