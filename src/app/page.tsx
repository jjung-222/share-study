import FadeInImage from '../components/intro/FadeInImage';

export default function Page() {

  return (
    <div className=" bg-white flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">TIMENODE</h1>
      <div className="w-full max-w-7xl space-y-8">
        {/* 이미지 1 */}
        <div className="w-full bg-white h-[600px] flex items-center justify-center border border-gray-300">
          {/* 화면 가로 길이에 맞춰 너비가 자동 조정됨 */}
          <div className='w-full bg-white h-[400px] flex'>
          <FadeInImage
            src="/imgs/study-alone.jpg" 
            alt="Image 1"
            position="left"
            title="함께 성장하는 공부, TimeNode 에서 시작하세요!"
            content={[
              "혼자 공부하다 보면 지루하거나 힘들 수 있지만,",
              "함께 공부하는 즐거움은 정말 큰 차이를 만들어냅니다.",
              "/n",
              "각자가 꿈꾸는 목표에 더 가까이 다가갈 수 있도록,",
              "TIMENODE 에서 서로의 성장과 성공을 함께 만들어보세요"
            ]}
            textStyle="ml-16"
            className="h-full w-auto object-contain" // 이미지 비율 유지하며 높이에 맞춤
          />
          </div>
        </div>
        {/* 이미지 2 */}
        <div className="w-full bg-white h-[600px] flex items-center justify-center border border-gray-300">
          {/* 화면 가로 길이에 맞춰 너비가 자동 조정됨 */}
          <div className='w-full bg-white h-[599px] flex justify-end'>
            <FadeInImage
              src="/imgs/study-together.jpg" 
              alt="Image 2"
              position="right"
              title="같은 공간에 함께하지 않아도 함께할 수 있습니다."
              content={[
                "이동 시간과 비용을 낭비할 필요가 없습니다.",
                "이제는 중요한 업무와 학습에 집중하며, 그에 따른 기회를 최대한으로 활용하세요.",
                "/n",
                "언제, 누구와 어디에서든,", 
                "지식을 공유하고 함께 학습할 수 있도록 TIMENODE 가 도와드릴께요.",
                "이러한 방식은 당신의 삶을 더욱 편리하고 경제적으로 만들어 줄 것입니다.",
              ]}
              className="h-full w-auto object-contain" // 이미지 비율 유지하며 높이에 맞춤
            />
          </div>
        </div>
        {/* 이미지 3 */}
        <div className="w-full bg-white h-[600px] flex items-center justify-center border border-gray-300">
          {/* 화면 가로 길이에 맞춰 너비가 자동 조정됨 */}
          <div className='w-full bg-white h-[599px] flex'>
            <FadeInImage
              src="/imgs/schedule.jpg"
              alt="Image 3"
              title="나만의 일정 관리부터 다른 사람과 일정 공유까지"
              content={[
                "이동 시간과 비용을 낭비할 필요가 없습니다.",
                "이제는 중요한 업무와 학습에 집중하며, 그에 따른 기회를 최대한으로 활용하세요.",
                "/n",
                "언제, 누구와 어디에서든,", 
                "지식을 공유하고 함께 학습할 수 있도록 TIMENODE 가 도와드릴께요.",
                "이러한 방식은 당신의 삶을 더욱 편리하고 경제적으로 만들어 줄 것입니다.",
              ]}
              position="left"
              textStyle="ml-16"
              className="h-full w-auto object-contain" // 이미지 비율 유지하며 높이에 맞춤
            />
          </div>
        </div>
        {/* 이미지 4 */}
        <div className="w-full bg-white h-[600px] flex items-center justify-center border border-gray-300">
          {/* 화면 가로 길이에 맞춰 너비가 자동 조정됨 */}
          <div className='w-full bg-white h-[599px] flex justify-end'>
            <FadeInImage
              src="/imgs/share-blog.png" 
              alt="Image 4"
              title="지식을 공유하며 함께 성장해가요."
              content={[
                "TIMENODE 의 포스팅 기능으로", 
                "개인적인 경험과 통찰을 나만의 공간에 기록하거나 다른사람과 공유해 보세요.",
                "/n",
                "알게된 내용을 글로 옮기면서, ",
                "본인의 것으로 만듦과 동시에 같은 고민을 하는 사람들에게 도움을 줄 수 있어요.",
                "/n",
                "개인적으로 보관할 수 있는 개인스페이스부터", 
                "모든사람과 공유할 수 있는 공용 공간까지 다양한 형태의 공간을 제공합니다.", 
              ]}
              position="right"
              textStyle="ml-16"
              className="h-full w-auto object-contain" // 이미지 비율 유지하며 높이에 맞춤
            />
          </div>
        </div>
        <div className="py-4 flex justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          자세히 보기
        </button>
      </div>
      </div>
    </div>
  );
}
