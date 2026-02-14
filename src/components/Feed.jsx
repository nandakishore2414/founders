import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, Image, Calendar, Newspaper, MoreHorizontal, X, Globe } from 'lucide-react';

const Feed = () => {
    return (
        <div className="space-y-4 pb-10">
            {/* Create Post Widget */}
            <div className="bg-white border border-gray-300 rounded-lg p-3">
                <div className="flex gap-3 mb-2">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-12 h-12 rounded-full cursor-pointer"
                    />
                    <button className="flex-grow text-left pl-4 border border-gray-400 rounded-3xl hover:bg-gray-100 transition-colors bg-white font-semibold text-gray-500 text-sm h-12">
                        Start a post
                    </button>
                </div>
                <div className="flex justify-between items-center pt-1 px-2">
                    <CreatePostAction icon={Image} color="text-blue-500" label="Media" />
                    <CreatePostAction icon={Calendar} color="text-yellow-600" label="Event" />
                    <CreatePostAction icon={Newspaper} color="text-red-400" label="Write article" />
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-between">
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
                <span className="text-xs text-gray-500 px-2">Sort by: <span className="font-semibold text-gray-900 cursor-pointer">Top</span></span>
            </div>

            {/* Posts */}
            <Post
                name="Elon Musk"
                description="Owner at X"
                time="2h • "
                content="Just launched another rocket! 🚀 #SpaceX #Mars"
                image="https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                likes={2456}
                comments={89}
            />
            <Post
                name="Jane Doe"
                description="Senior React Developer"
                time="5h • "
                content="Loving the new features in React 19! The compiler is a game changer. ⚛️"
                likes={532}
                comments={45}
            />
            <Post
                name="Tech Crunch"
                description="Technology News"
                time="1d • "
                content="Breaking: AI startup raises $100M in Series A funding."
                image="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                likes={1203}
                comments={156}
            />
        </div>
    );
};

const CreatePostAction = ({ icon: Icon, color, label }) => (
    <button className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md transition-colors">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-semibold text-gray-500">{label}</span>
    </button>
);

const Post = ({ name, description, time, content, image, likes, comments }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            {/* Post Header */}
            <div className="p-3">
                <div className="flex gap-3 relative">
                    <img
                        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt={name}
                        className="w-12 h-12 rounded-full cursor-pointer"
                    />
                    {/* Close/More Options (Top Right) */}
                    <div className="absolute top-0 right-0 flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-1 group cursor-pointer">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 group-hover:underline">{name}</h3>
                            <span className="text-gray-500 text-xs">• 1st</span>

                        </div>
                        <p className="text-xs text-gray-500">{description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{time}</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-900">
                    {content}
                </div>
            </div>

            {/* Post Media */}
            {image && (
                <div className="w-full">
                    <img src={image} alt="Post content" className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            {/* Social Counts */}
            <div className="px-3 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="bg-blue-500 rounded-full p-0.5">
                            <ThumbsUp className="w-2 h-2 text-white fill-current" />
                        </div>
                        {/* <div className="bg-red-500 rounded-full p-0.5">
                             <Heart className="w-2 h-2 text-white fill-current" />
                         </div> */}
                    </div>
                    <span className="hover:text-blue-600 hover:underline cursor-pointer">{likes}</span>
                </div>
                <div className="hover:text-blue-600 hover:underline cursor-pointer">
                    {comments} comments 
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-3 py-1 flex justify-between items-center">
                <PostAction
                    icon={ThumbsUp}
                    label="Like"
                    active={isLiked}
                    onClick={() => setIsLiked(!isLiked)}
                />
                <PostAction icon={MessageSquare} label="Comment" />
               
                <PostAction icon={Send} label="Send" />
            </div>
        </div>
    );
};

const PostAction = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-3 hover:bg-gray-100 rounded-md transition-colors flex-1 justify-center ${active ? 'text-blue-600' : 'text-gray-600'}`}
    >
        <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

export default Feed;
