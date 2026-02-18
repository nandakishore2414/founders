import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreVertical, Music2, ArrowLeft, Bookmark, Share2, Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';

const reels = [
  {
    id: 1,
    user: 'mason.k',
    name: 'Mason K',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Building a founder routine in 30 seconds. #startup #routine',
    audio: 'Original audio - Mason K',
    likes: '18.3k',
    comments: '412',
    shares: '1.2k',
    background: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    user: 'studio.sato',
    name: 'Studio Sato',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Product shots with a single light setup. 📸',
    audio: 'Soundtrack - Studio Sato',
    likes: '42.7k',
    comments: '1.9k',
    shares: '3.5k',
    background: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    user: 'founderlab',
    name: 'Founder Lab',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Three mistakes every new founder makes. Watch till the end!',
    audio: 'Talkback - Founder Lab',
    likes: '9.5k',
    comments: '238',
    shares: '680',
    background: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
  }
];

const Shorts = ({ onBack }) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientHeight;
      container.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-0 left-16 right-0 bottom-0 flex justify-center items-center z-40 bg-[#F3F2EF]">
      <div className="relative w-full max-w-2xl h-full md:h-[calc(100%-2rem)] md:mt-4 md:mb-4 flex justify-center">
        {/* Helper to block top gradient if needed, or just let content scroll */}

        <div
          ref={scrollContainerRef}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide rounded-none md:rounded-2xl"
        >
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden md:flex">
          <button
            onClick={() => handleScroll('up')}
            className="p-3 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 shadow-sm border border-gray-100 transition-all"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleScroll('down')}
            className="p-3 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 shadow-sm border border-gray-100 transition-all"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReelCard = ({ reel }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="h-full w-full snap-start flex justify-center items-center p-4">
      <div className="relative h-full aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200">
        {/* Video Content Layer */}
        <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
          <img
            src={reel.background}
            alt={reel.caption}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <Play className="w-16 h-16 text-white/80 fill-white/80" />
            </div>
          )}
        </div>

        {/* Bottom Content Layer (Inside Video) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex flex-col items-start text-left pointer-events-none">
          <div className="pointer-events-auto mb-3">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={reel.avatar}
                alt={reel.user}
                className="w-8 h-8 rounded-full border border-white/50 object-cover"
              />
              <h3 className="font-bold text-white text-sm drop-shadow-md">{reel.user}</h3>
              <button className="text-white text-xs font-semibold border border-white/40 px-2 py-0.5 rounded-full hover:bg-white/20 transition-colors">
                Follow
              </button>
            </div>

            <p className="text-white text-sm leading-snug drop-shadow-md line-clamp-2">
              {reel.caption}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full pointer-events-auto cursor-pointer hover:bg-white/30 transition-colors">
            <Music2 className="w-3 h-3 text-white" />
            <div className="overflow-hidden w-[100px]">
              <p className="text-xs text-white whitespace-nowrap animate-marquee">
                {reel.audio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Actions Layer (Outside Video) */}
      <div className="flex flex-col items-center justify-end gap-6 ml-4 pb-4 h-full">
        <div className="mt-auto flex flex-col gap-6">
          <ActionItem
            icon={Heart}
            label={reel.likes}
            isActive={isLiked}
            activeColor="text-rose-500 fill-rose-500"
            color="text-gray-800"
            onClick={() => setIsLiked(!isLiked)}
          />
          <ActionItem
            icon={MessageCircle}
            label={reel.comments}
            color="text-gray-800"
          />
          <ActionItem
            icon={Send}
            label={reel.shares}
            color="text-gray-800"
          />
          <ActionItem
            icon={Bookmark}
            isActive={isSaved}
            activeColor="text-black fill-black"
            color="text-gray-800"
            onClick={() => setIsSaved(!isSaved)}
          />
          <ActionItem
            icon={MoreVertical}
            color="text-gray-800"
          />
        </div>
        <div className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden mt-2 bg-gray-100">
          <img src={reel.avatar} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const ActionItem = ({ icon: Icon, label, isActive, activeColor, color = "text-white", onClick }) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={onClick}>
      <div className={`p-2 rounded-full hover:bg-gray-200 transition-all transform group-hover:scale-110 active:scale-95`}>
        <Icon
          className={`w-7 h-7 ${isActive ? activeColor : color}`}
          strokeWidth={1.5}
        />
      </div>
      {label && (
        <span className="text-xs font-medium text-gray-500 text-center">
          {label}
        </span>
      )}
    </div>
  );
};

export default Shorts;
