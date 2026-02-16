import React from 'react';
import { Heart, MessageCircle, Send, MoreVertical, Music2, ArrowLeft, Bookmark } from 'lucide-react';

const reels = [
  {
    id: 1,
    user: 'mason.k',
    name: 'Mason K',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Building a founder routine in 30 seconds.',
    audio: 'Original audio - Mason K',
    likes: '18.3k',
    comments: '412',
    shares: '1,208',
    background: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    user: 'studio.sato',
    name: 'Studio Sato',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Product shots with a single light setup.',
    audio: 'Soundtrack - Studio Sato',
    likes: '42.7k',
    comments: '1,904',
    shares: '3,552',
    background: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    user: 'founderlab',
    name: 'Founder Lab',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80',
    caption: 'Three mistakes every new founder makes.',
    audio: 'Talkback - Founder Lab',
    likes: '9,522',
    comments: '238',
    shares: '680',
    background: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
  }
];

const Shorts = ({ onBack }) => {
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center relative text-black">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 p-3 bg-gray-100 rounded-full text-black hover:bg-gray-200 transition-all group border border-gray-200 shadow-sm"
      >
        <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="h-full w-full max-w-[420px] py-6 overflow-y-auto snap-y snap-mandatory no-scrollbar">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
};

const ReelCard = ({ reel }) => {
  return (
    <section className="h-[calc(100vh-48px)] w-full snap-center flex justify-center items-center mb-6 last:mb-0 relative group">
      {/* Video Container */}
      <div className="relative h-full w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-100">
        <img
          src={reel.background}
          alt="Reel background"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <div className="flex flex-col items-start gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img src={reel.avatar} alt={reel.user} className="w-9 h-9 rounded-full border border-white/20" />
              <span className="text-white font-semibold text-sm hover:underline cursor-pointer">{reel.user}</span>
              <span className="text-white/60 text-xs">• Follow</span>
            </div>

            {/* Caption */}
            <div className="space-y-2 mb-2">
              <p className="text-white text-sm line-clamp-2 leading-relaxed">{reel.caption}</p>
              <div className="flex items-center gap-2 text-xs text-white/80 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Music2 className="w-3 h-3" />
                <span>{reel.audio}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Actions (Outside Video) */}
      <div className="absolute -right-16 bottom-0 flex flex-col items-center gap-6 pb-2">
        <ActionIcon icon={Heart} label={reel.likes} />
        <ActionIcon icon={MessageCircle} label={reel.comments} />
        <ActionIcon icon={Send} label={reel.shares} />
        <ActionIcon icon={Bookmark} />
        <ActionIcon icon={MoreVertical} />
        <div className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden mt-2 bg-gray-100">
          <img src={reel.avatar} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const ActionIcon = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <div className="p-3 rounded-full bg-white hover:bg-gray-50 transition-all border border-gray-200 shadow-sm">
        <Icon className="h-6 w-6 text-gray-900" fill="transparent" strokeWidth={2} />
      </div>
      {label && <span className="text-xs font-medium text-gray-500">{label}</span>}
    </div>
  );
};

export default Shorts;
