import { Link } from 'react-router-dom';
import Card from '@/components/common/Card';
import { Theater, Shirt, Image } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'face',
    icon: <Theater className="w-12 h-12" />,
    title: '脸谱生成',
    description: '上传正脸照片，AI根据水浒角色生成专属英歌舞脸谱妆容，红脸关公、黑脸张飞任你选择',
    path: '/face-generator',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'costume',
    icon: <Shirt className="w-12 h-12" />,
    title: '战袍换装',
    description: '上传全身照，AI为你穿上传统英歌舞战袍，威武霸气的靠旗战裙让你化身英歌勇士',
    path: '/costume-changer',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'poster',
    icon: <Image className="w-12 h-12" />,
    title: '海报生成',
    description: '融合脸谱、战袍与传统场景，生成电影级个人英歌舞海报，分享到朋友圈引爆点赞',
    path: '/poster-generator',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            三大核心功能
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            简单三步，即可生成专属英歌舞形象，体验非遗文化的魅力
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link key={feature.id} to={feature.path}>
              <Card hover className="h-full group">
                <div className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-red-600 font-medium">
                    <span>立即体验</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
