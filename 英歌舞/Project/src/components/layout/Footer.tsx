import { Heart, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              英歌幻境
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              让每个人都能体验非遗英歌舞的魅力，通过AI技术将传统文化以全新的方式呈现和传承。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-red-400">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">首页</a>
              </li>
              <li>
                <a href="/face-generator" className="hover:text-white transition-colors">脸谱生成</a>
              </li>
              <li>
                <a href="/costume-changer" className="hover:text-white transition-colors">战袍换装</a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-white transition-colors">我的作品</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-red-400">关注我们</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© {currentYear} 英歌幻境. 保留所有权利.</p>
          <p className="flex items-center mt-2 md:mt-0">
            用 <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" /> 传承非遗文化
          </p>
        </div>
      </div>
    </footer>
  );
}
