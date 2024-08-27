import React from 'react';

const LottieAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_ftjfyyep.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        controls
        autoplay
      />
    </div>
  );
};

export default LottieAnimation;
