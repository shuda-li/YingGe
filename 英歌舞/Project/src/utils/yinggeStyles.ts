import type { YingGeCharacter } from '../types';

export const YINGGE_STYLES: Record<string, YingGeCharacter> = {
  chaoyang: {
    id: 'chaoyang',
    name: '潮阳英歌',
    description: '刚劲雄浑',
    primaryColor: '#8B0000',
    secondaryColor: '#DC143C',
    accentColor: '#FFD700',
    facialFeatures: {
      eyeShape: 'sharp',
      browStyle: 'bold',
      mouthStyle: 'fierce',
      beardStyle: 'thick'
    },
    patterns: ['火焰纹', '云雷纹', '几何纹'],
    culturalBackground: '潮阳英歌源于宋代，以刚劲有力的动作和雄浑的气势著称，脸谱色彩浓烈，造型夸张，体现了潮汕人民的豪迈气概。',
    colorSymbolism: '红色为主色调，象征忠勇正义；金色点缀，彰显威严尊贵。',
    drawingSteps: [
      '打底：用白色颜料涂满面部',
      '描眉：用黑色勾勒粗犷的眉毛',
      '画眼：夸张的丹凤眼造型',
      '勾鼻：突出鼻梁的立体感',
      '涂唇：红色填充嘴唇',
      '绘纹：添加火焰纹和几何图案',
      '点睛：用金色勾勒轮廓'
    ]
  },
  puning: {
    id: 'puning',
    name: '普宁英歌',
    description: '华丽细腻',
    primaryColor: '#1E90FF',
    secondaryColor: '#4169E1',
    accentColor: '#FFD700',
    facialFeatures: {
      eyeShape: 'round',
      browStyle: 'curved',
      mouthStyle: 'smirk',
      beardStyle: 'medium'
    },
    patterns: ['祥云纹', '水波纹', '卷草纹'],
    culturalBackground: '普宁英歌以其华丽的服饰和细腻的表演著称，脸谱注重细节刻画，色彩搭配讲究，体现了潮汕文化的精致之美。',
    colorSymbolism: '蓝色为主色调，象征沉稳睿智；金色镶边，增添华丽感。',
    drawingSteps: [
      '打底：淡蓝色薄涂面部',
      '描眉：弯曲的柳叶眉',
      '画眼：圆润的杏眼造型',
      '勾鼻：柔和的鼻形勾勒',
      '涂唇：粉红渐变嘴唇',
      '绘纹：绘制祥云和卷草图案',
      '描边：金色线条勾勒轮廓'
    ]
  },
  shenquan: {
    id: 'shenquan',
    name: '神泉英歌',
    description: '古朴典雅',
    primaryColor: '#228B22',
    secondaryColor: '#32CD32',
    accentColor: '#8B4513',
    facialFeatures: {
      eyeShape: 'almond',
      browStyle: 'natural',
      mouthStyle: 'gentle',
      beardStyle: 'sparse'
    },
    patterns: ['花卉纹', '藤蔓纹', '几何纹'],
    culturalBackground: '神泉英歌历史悠久，风格古朴典雅，脸谱造型简洁大方，色彩清新自然，体现了传统民间艺术的质朴之美。',
    colorSymbolism: '绿色为主色调，象征生机与活力；棕色点缀，增添古朴韵味。',
    drawingSteps: [
      '打底：淡绿色均匀涂抹',
      '描眉：自然弯曲的眉毛',
      '画眼：杏仁眼造型',
      '勾鼻：简洁的鼻形',
      '涂唇：自然红色',
      '绘纹：花卉和藤蔓图案',
      '装饰：添加棕色几何边框'
    ]
  },
  guangong: {
    id: 'guangong',
    name: '关公脸谱',
    description: '忠义威严',
    primaryColor: '#DC143C',
    secondaryColor: '#FF4500',
    accentColor: '#FFD700',
    facialFeatures: {
      eyeShape: 'sharp',
      browStyle: 'long',
      mouthStyle: 'closed',
      beardStyle: 'long'
    },
    patterns: ['青龙纹', '火焰纹', '云纹'],
    culturalBackground: '关公脸谱是英歌舞中最具代表性的脸谱之一，取材于三国名将关羽，象征忠义、勇猛、威严，是潮汕人民崇尚的英雄形象。',
    colorSymbolism: '红脸象征忠义；卧蚕眉、丹凤眼彰显威严；长须体现大将风范。',
    drawingSteps: [
      '打底：大红色均匀涂抹面部',
      '描眉：长而粗的卧蚕眉',
      '画眼：丹凤眼，眼神锐利',
      '勾鼻：高挺的鼻梁',
      '涂唇：深红色嘴唇',
      '绘纹：添加青龙和火焰图案',
      '点睛：金色勾勒眼眶和眉骨'
    ]
  },
  zhangfei: {
    id: 'zhangfei',
    name: '张飞脸谱',
    description: '粗犷豪放',
    primaryColor: '#2F4F4F',
    secondaryColor: '#000000',
    accentColor: '#FFD700',
    facialFeatures: {
      eyeShape: 'round',
      browStyle: 'short',
      mouthStyle: 'open',
      beardStyle: 'thick'
    },
    patterns: ['豹纹', '火焰纹', '锯齿纹'],
    culturalBackground: '张飞脸谱取材于三国猛将张飞，以粗犷豪放著称，黑脸象征刚正不阿，豹头环眼彰显勇猛无畏的性格。',
    colorSymbolism: '黑脸象征刚正勇猛；豹纹图案体现其勇猛如豹的特质；金色点缀增添威严。',
    drawingSteps: [
      '打底：黑色均匀涂抹面部',
      '描眉：短而粗的倒竖眉',
      '画眼：圆睁的豹眼',
      '勾鼻：宽阔的鼻子',
      '涂唇：张开的血盆大口',
      '绘纹：添加豹纹和火焰图案',
      '装饰：金色线条勾勒轮廓'
    ]
  },
  wusong: {
    id: 'wusong',
    name: '武松脸谱',
    description: '英武豪迈',
    primaryColor: '#DEB887',
    secondaryColor: '#D2691E',
    accentColor: '#DC143C',
    facialFeatures: {
      eyeShape: 'sharp',
      browStyle: 'straight',
      mouthStyle: 'firm',
      beardStyle: 'short'
    },
    patterns: ['虎纹', '闪电纹', '几何纹'],
    culturalBackground: '武松脸谱取材于水浒传中的打虎英雄武松，体现了英雄好汉的英武豪迈之气，脸谱造型英气逼人，充满力量感。',
    colorSymbolism: '赭色为主色调，象征豪迈奔放；虎纹图案体现打虎英雄的特质。',
    drawingSteps: [
      '打底：赭色均匀涂抹',
      '描眉：直而有力的剑眉',
      '画眼：锐利的眼神',
      '勾鼻：挺直的鼻梁',
      '涂唇：紧抿的嘴唇',
      '绘纹：虎纹和闪电图案',
      '点睛：红色勾勒眼眶'
    ]
  },
  linchong: {
    id: 'linchong',
    name: '林冲脸谱',
    description: '儒雅刚毅',
    primaryColor: '#708090',
    secondaryColor: '#2F4F4F',
    accentColor: '#FFD700',
    facialFeatures: {
      eyeShape: 'almond',
      browStyle: 'slanted',
      mouthStyle: 'gentle',
      beardStyle: 'goatee'
    },
    patterns: ['梅花纹', '云纹', '水波纹'],
    culturalBackground: '林冲脸谱取材于水浒传中的豹子头林冲，既有儒雅的气质，又有刚毅的性格，脸谱造型清秀中透着英气。',
    colorSymbolism: '灰色为主色调，象征沉稳内敛；梅花纹体现其儒雅气质；金色点缀增添贵气。',
    drawingSteps: [
      '打底：灰色均匀涂抹',
      '描眉：斜飞入鬓的眉毛',
      '画眼：细长的杏仁眼',
      '勾鼻：清秀的鼻形',
      '涂唇：淡红色嘴唇',
      '绘纹：梅花和云纹图案',
      '装饰：金色勾勒轮廓'
    ]
  }
};

export const YINGGE_COLOR_SYMBOLS = {
  red: {
    name: '红色',
    meaning: '忠勇、正义、热情',
    examples: ['关公', '岳飞']
  },
  black: {
    name: '黑色',
    meaning: '刚正、勇猛、正直',
    examples: ['张飞', '包拯']
  },
  white: {
    name: '白色',
    meaning: '奸诈、阴险、狠毒',
    examples: ['曹操', '秦桧']
  },
  blue: {
    name: '蓝色',
    meaning: '沉稳、睿智、勇敢',
    examples: ['窦尔敦', '单雄信']
  },
  green: {
    name: '绿色',
    meaning: '暴躁、勇猛、草莽',
    examples: ['程咬金', '武天虬']
  },
  yellow: {
    name: '黄色',
    meaning: '凶狠、残暴、勇猛',
    examples: ['典韦', '宇文成都']
  },
  gold: {
    name: '金色',
    meaning: '神圣、尊贵、超凡',
    examples: ['如来佛祖', '二郎神']
  },
  silver: {
    name: '银色',
    meaning: '神秘、鬼怪、神仙',
    examples: ['孙悟空', '哪吒']
  }
};

export const YINGGE_PATTERNS = {
  flame: {
    name: '火焰纹',
    meaning: '象征勇猛、热烈、正义之火',
    usage: '常用于武将脸谱'
  },
  cloud: {
    name: '云雷纹',
    meaning: '象征威严、神圣、力量',
    usage: '常用于神仙或猛将脸谱'
  },
  geometric: {
    name: '几何纹',
    meaning: '象征秩序、力量、神秘感',
    usage: '常用于各类脸谱装饰'
  },
  floral: {
    name: '花卉纹',
    meaning: '象征美好、吉祥、儒雅',
    usage: '常用于儒雅武将脸谱'
  },
  animal: {
    name: '动物纹',
    meaning: '象征该动物的特质',
    usage: '如豹纹象征勇猛，虎纹象征威猛'
  }
};

export const YINGGE_FACE_GUIDE = {
  title: '英歌脸谱绘制指南',
  introduction: '英歌脸谱是潮汕传统文化的瑰宝，融合了戏曲脸谱艺术与民间绘画风格，具有独特的艺术魅力和文化内涵。',
  basicPrinciples: [
    '对称性：脸谱图案注重对称美',
    '象征性：色彩和图案都有特定含义',
    '夸张性：造型夸张，突出人物性格',
    '装饰性：注重装饰效果和视觉冲击力'
  ],
  drawingTools: [
    '颜料：水性脸谱颜料或戏曲油彩',
    '画笔：粗细不同的毛笔数支',
    '调色盘：用于调配颜色',
    '定妆粉：防止颜料脱落',
    '卸妆用品：卸妆油、化妆棉等'
  ],
  basicSteps: [
    '打底：用基础色均匀涂抹面部',
    '勾勒轮廓：用黑色线条勾勒五官和图案',
    '填色：按设计填充各部分颜色',
    '细化：添加细节和纹理',
    '定妆：用定妆粉固定颜色'
  ],
  culturalNotes: [
    '尊重传统：了解脸谱背后的文化内涵',
    '传承创新：在传统基础上进行创新',
    '场合适宜：根据表演场合选择脸谱',
    '安全第一：使用无毒无害的化妆品'
  ]
};
