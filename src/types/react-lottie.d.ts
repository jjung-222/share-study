declare module 'react-lottie' {
    import * as React from 'react';
  
    interface LottieProps {
      options: object;
      height?: number;
      width?: number;
      isClickToPauseDisabled?: boolean;
      isStopped?: boolean;
      isPaused?: boolean;
      eventListeners?: Array<{ eventName: string; callback: () => void }>;
      ariaRole?: string;
      ariaLabel?: string;
    }
  
    export default class Lottie extends React.Component<LottieProps> {}
  }
  