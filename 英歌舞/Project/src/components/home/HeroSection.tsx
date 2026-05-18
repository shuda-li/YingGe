import { Link } from 'react-router-dom';
import { Sparkles, ArrowDown } from 'lucide-react';
import Button from '@/components/common/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-yellow-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
          <span className="text-white/90 text-sm font-medium">AI 赋能传统文化传承</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
            英歌幻境
          </span>
          <br />
          <span className="text-3xl md:text-5xl text-white/90">AI数字英歌舞剧场</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          上传你的照片，AI即刻生成专属英歌舞形象<br />
          <span className="text-yellow-300 font-medium">让每个人都能「跳」起非遗英歌舞</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/face-generator">
            <Button size="lg" className="text-lg px-10 py-4 shadow-2xl">
              🎭 立即体验脸谱生成
            </Button>
          </Link>
          <Link to="/costume-changer">
            <Button variant="secondary" size="lg" className="text-lg px-10 py-4 shadow-2xl">
              👘 试试战袍换装
            </Button>
          </Link>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#features" className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors">
            <span className="text-sm mb-2">向下滚动探索</span>
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
