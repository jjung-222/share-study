'use client'; // 클라이언트 측 코드임을 명시

import { useEffect, useRef, useState } from 'react';

interface FadeInImageProps {
  src: string;
  alt: string;
  position?: 'left' | 'right'; // 'left' 또는 'right'로만 설정
  title?: string;
  content?: string[]; // content를 문자열 배열로 정의
  textStyle?: string;
  className?: string;
}

const FadeInImage: React.FC<FadeInImageProps> = ({ src = '', alt = '', position = 'left', title = '', content = [], textStyle="", className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 } // 40% 이상 보이면 visible로 설정
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
      
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className={`flex ${position === 'left' ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      <div
        ref={textRef}
        className={`h-screen flex flex-col justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} w-[600px] ${textStyle}`}
      >
        <p className="text-2xl">{title}</p>
        <div className="mt-10 flex flex-col ">
          {content.map((line, index) => (
            <p key={index} className="mb-2">
              {line === "/n" ? <br /> : line}
            </p>
          ))}
        </div>
      </div>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className} ${position === 'left' ? 'ml-0' : 'mr-0'} flex-grow`}
        style={{ flexShrink: 0 }} // 이미지가 축소되지 않도록 설정
      />
    </div>
  );
};

export default FadeInImage;
