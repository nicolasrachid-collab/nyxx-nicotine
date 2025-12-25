import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { InstagramCard } from './InstagramCard';

export function SocialSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  const posts = [
    { 
      id: 1, 
      username: "nyxx_nicotine", 
      location: "Tokyo, Japan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", 
      likes: "12,486", 
      caption: "Minimalist architecture at its finest. 🏢",
      comments: "42",
      date: "September 19" 
    },
    { 
      id: 2, 
      username: "nyxx_nicotine", 
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", 
      likes: "8,392", 
      caption: "Abstract forms creating new perspectives.",
      comments: "28",
      date: "September 18" 
    },
    { 
      id: 3, 
      username: "nyxx_nicotine", 
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", 
      likes: "15,201", 
      caption: "Interior design that speaks volumes. ✨",
      comments: "56",
      date: "September 16" 
    },
    { 
      id: 4, 
      username: "nyxx_nicotine", 
      location: "Berlin, Germany",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=800", 
      likes: "9,943", 
      caption: "Geometry in nature and structure.",
      comments: "31",
      date: "September 15" 
    },
  ];

  return (
    <section 
      ref={ref}
      className={`w-full bg-white py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="inline-flex items-center rounded-full w-fit gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-black/20 bg-black/10 text-black backdrop-blur-xl shadow-lg shadow-black/20 hover:bg-black/15 hover:border-black/30 transition-all duration-300">
               {t('social')}
             </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('followAlong')}
          </h2>
        </div>
        
        <a href="#" className="group flex items-center gap-2 text-lg font-medium border-b border-black pb-1 hover:opacity-60 transition-opacity" aria-label="Follow @nyxx_nicotine on social media">
          @nyxx_nicotine
          <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <InstagramCard 
            key={post.id} 
            username={post.username}
            location={post.location}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            caption={post.caption}
            comments={post.comments}
            date={post.date}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
