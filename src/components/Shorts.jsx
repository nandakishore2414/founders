import React from 'react';
import {
  Camera,
  Search,
  Heart,
  MessageCircle,
  Send,
  MoreVertical,
  Music2,
  Home,
  Play,
  ShoppingBag,
  User
} from 'lucide-react';

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

const Shorts = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center p-4">
      <div className="relative h-[min(900px,calc(100vh-2rem))] w-full max-w-[420px] overflow-hidden rounded-[28px] bg-black shadow-2xl ring-1 ring-white/10">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
          <div className="flex items-center justify-between px-4 pt-4">
            <button className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition">
              <Camera className="h-5 w-5" />
            </button>
            <div className="text-lg font-semibold tracking-wide">Reels</div>
            <button className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="mx-4 mb-4 rounded-2xl bg-black/70 backdrop-blur-md ring-1 ring-white/10">
            <div className="flex items-center justify-between px-5 py-3 text-white">
              <NavIcon icon={Home} label="Home" />
              <NavIcon icon={Search} label="Search" />
              <NavIcon icon={Play} label="Reels" active />
              <NavIcon icon={ShoppingBag} label="Shop" />
              <NavIcon icon={User} label="Profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReelCard = ({ reel }) => {
  return (
    <section className="relative h-full w-full snap-start">
      <img
        src={reel.background}
        alt="Reel background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex">
        <div className="flex w-4/5 flex-col justify-end gap-3 px-4 pb-24">
          <div className="flex items-center gap-3">
            <img
              src={reel.avatar}
              alt={reel.name}
              className="h-9 w-9 rounded-full ring-2 ring-white/40"
            />
            <div className="text-sm font-semibold">{reel.user}</div>
            <button className="rounded-full border border-white/60 px-3 py-1 text-xs font-semibold hover:bg-white/10 transition">
              Follow
            </button>
          </div>
          <div className="text-sm leading-relaxed text-white/90">{reel.caption}</div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Music2 className="h-3.5 w-3.5" />
            <span>{reel.audio}</span>
          </div>
        </div>

        <div className="ml-auto flex w-1/5 flex-col items-center justify-end gap-4 pb-28 pr-3 text-white">
          <ActionIcon icon={Heart} label={reel.likes} />
          <ActionIcon icon={MessageCircle} label={reel.comments} />
          <ActionIcon icon={Send} label={reel.shares} />
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition">
            <MoreVertical className="h-5 w-5" />
          </button>
          <div className="h-12 w-12 rounded-lg bg-white/10 ring-1 ring-white/20" />
        </div>
      </div>
    </section>
  );
};

const ActionIcon = ({ icon: Icon, label }) => {
  return (
    <button className="flex flex-col items-center gap-1 text-xs font-semibold">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[11px] text-white/90">{label}</span>
    </button>
  );
};

const NavIcon = ({ icon: Icon, label, active }) => {
  return (
    <button className={`pointer-events-auto flex flex-col items-center gap-1 text-[10px] ${active ? 'text-white' : 'text-white/60'}`}>
      <Icon className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
      <span>{label}</span>
    </button>
  );
};

export default Shorts;
