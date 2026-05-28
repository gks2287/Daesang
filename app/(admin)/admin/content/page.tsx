export default function ContentPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[15px] text-gray-800 font-bold">
          <span>콘텐츠 등록</span>
        </div>
        <button className="flex items-center gap-2 bg-[#55A4DA] hover:bg-[#3A8BC4] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          등록
        </button>
      </div>
      <div className="flex-1 bg-[#D6EAF8] rounded-sm flex items-center justify-center">
        <p className="text-gray-600 text-base font-medium tracking-wide">콘텐츠 목록</p>
      </div>
    </div>
  );
}
