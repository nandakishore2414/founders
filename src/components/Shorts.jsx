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
    <div className="fixed top-0 left-16 right-0 bottom-0 flex justify-center items-center z-40" style={{ background: 'linear-gradient(160deg, #dbeafe 0%, #eff6ff 30%, #f8faff 60%, #e0ecfa 100%)' }}>
      <div className="relative w-full max-w-2xl h-full md:h-[calc(100%-2rem)] md:mt-4 md:mb-4 flex justify-center">

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
            className="p-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(147, 197, 253, 0.5)' }}
          >
            <ChevronUp className="w-6 h-6 text-blue-500" />
          </button>
          <button
            onClick={() => handleScroll('down')}
            className="p-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(147, 197, 253, 0.5)' }}
          >
            <ChevronDown className="w-6 h-6 text-blue-500" />
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
      <div className="relative h-full aspect-[9/16] rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(147, 197, 253, 0.4)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12), 0 20px 40px -12px rgba(0, 0, 0, 0.1)' }}>
        {/* Video Content Layer */}
        <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
          <img
            src={reel.background}
            alt={reel.caption}
            className="w-full h-full object-cover"
          />
          {/* Soft blue gradient overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 0%, transparent 25%, transparent 55%, rgba(30, 64, 175, 0.45) 85%, rgba(30, 58, 138, 0.7) 100%)' }} />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="p-5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.25)' }}>
                <Play className="w-14 h-14 text-blue-600 fill-blue-600" />
              </div>
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
                className="w-8 h-8 rounded-full object-cover"
                style={{ border: '2px solid rgba(255, 255, 255, 0.8)' }}
              />
              <h3 className="font-bold text-white text-sm drop-shadow-md">{reel.user}</h3>
              <button className="text-xs font-semibold px-3 py-0.5 rounded-full transition-colors" style={{ background: 'rgba(255, 255, 255, 0.85)', color: '#2563eb', border: '1px solid rgba(147, 197, 253, 0.6)' }}>
                Follow
              </button>
            </div>

            <p className="text-white text-sm leading-snug drop-shadow-md line-clamp-2">
              {reel.caption}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-auto cursor-pointer transition-all" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
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
        <div className="mt-auto flex flex-col gap-5">
          <ActionItem
            icon={Heart}
            label={reel.likes}
            isActive={isLiked}
            activeColor="text-rose-500 fill-rose-500"
            color="text-slate-700"
            onClick={() => setIsLiked(!isLiked)}
          />
          <ActionItem
            icon={MessageCircle}
            label={reel.comments}
            color="text-slate-700"
          />
          <ActionItem
            icon={Send}
            label={reel.shares}
            color="text-slate-700"
          />
          <ActionItem
            icon={Bookmark}
            isActive={isSaved}
            activeColor="text-slate-900 fill-slate-900"
            color="text-slate-700"
            onClick={() => setIsSaved(!isSaved)}
          />
          <ActionItem
            icon={MoreVertical}
            color="text-slate-700"
          />
        </div>
        <div className="w-10 h-10 rounded-lg overflow-hidden mt-2" style={{ border: '2px solid rgba(147, 197, 253, 0.5)', background: 'white' }}>
          <img src={reel.avatar} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const ActionItem = ({ icon: Icon, label, isActive, activeColor, color = "text-slate-700", onClick }) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={onClick}>
      <div className="p-2.5 rounded-full transition-all transform group-hover:scale-110 active:scale-95" style={{ background: 'rgba(255, 255, 255, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)' }}>
        <Icon
          className={`w-7 h-7 ${isActive ? activeColor : color}`}
          strokeWidth={1.5}
        />
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-600 text-center">
          {label}
        </span>
      )}
    </div>
  );
};

export default Shorts;
