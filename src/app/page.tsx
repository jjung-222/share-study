import LottieAnimation from "../components/lottie/LottieAnimation";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Scroll to See Animation</h1>
      <div className="relative h-screen">
        <LottieAnimation />
      </div>
      <div className="h-[200vh] bg-gray-100"></div> {/* 페이지의 나머지 부분을 스크롤하기 위해 추가 */}
    </div>
  );
}
