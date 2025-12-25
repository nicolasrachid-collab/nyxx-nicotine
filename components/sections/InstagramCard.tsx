import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface InstagramCardProps {
  username: string;
  location: string;
  avatar: string;
  image: string;
  likes: string;
  caption: string;
  comments: string;
  date: string;
}

export function InstagramCard({ 
  username, 
  location, 
  avatar, 
  image, 
  likes, 
  caption, 
  comments, 
  date 
}: InstagramCardProps) {
  return (
    <div className="bg-white rounded-[1.5rem] p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
             <img src={avatar} alt={`${username} avatar`} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
             <span className="text-xs font-bold text-black">{username}</span>
             <span className="text-[10px] text-gray-500">{location}</span>
          </div>
        </div>
        <MoreHorizontal size={16} className="text-gray-600" aria-label="More options" />
      </div>

      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mt-1">
         <img src={image} alt={`Post by ${username}`} className="object-cover w-full h-full" loading="lazy" />
         <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">1/2</div>
      </div>

      <div className="flex justify-between items-center mt-1">
         <div className="flex gap-4">
            <button aria-label="Like" className="hover:opacity-60 transition-opacity">
              <Heart size={22} className="text-black" />
            </button>
            <button aria-label="Comment" className="hover:opacity-60 transition-opacity">
              <MessageCircle size={22} className="text-black" />
            </button>
            <button aria-label="Share" className="hover:opacity-60 transition-opacity">
              <Send size={22} className="text-black" />
            </button>
         </div>
         <button aria-label="Save" className="hover:opacity-60 transition-opacity">
           <Bookmark size={22} className="text-black" />
         </button>
      </div>

      <div className="space-y-1.5 px-0.5">
         <div className="text-xs font-semibold">
            Liked by <span className="text-black">craig_love</span> and <span className="text-black">{likes} others</span>
         </div>
         <div className="text-xs leading-relaxed">
            <span className="font-bold mr-1.5">{username}</span>
            <span className="text-gray-900">{caption}</span>
         </div>
         <button className="text-[10px] text-gray-500 font-medium hover:text-gray-800 transition-colors">
            View all {comments} comments
         </button>
         <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">
            {date}
         </div>
      </div>
    </div>
  );
}
