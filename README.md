# 🎭 英歌脸谱生成器

> 基于 AI 技术的英歌舞脸谱智能生成系统，融合传统非遗文化与现代科技创新

![版本](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff)

## 📖 项目简介

英歌脸谱生成器是一款创新的 AI 驱动的英歌舞文化体验应用。用户可以上传自己的照片，系统将基于先进的人脸检测技术，自动生成具有传统英歌风格的脸谱彩绘效果。

### 核心功能

- 🎨 **智能脸谱生成** - AI 驱动的英歌脸谱自动生成
- 👤 **精准人脸定位** - MediaPipe FaceMesh 478 点高精度人脸特征检测
- 🎭 **7种风格选择** - 涵盖潮阳、普宁、神泉及经典人物脸谱
- 📚 **文化知识普及** - 详细的绘制指南和色彩象征体系
- 💾 **作品管理** - 本地存储作品库，随时查看和下载

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用国内镜像（推荐）
npm install --registry=https://registry.npmmirror.com
```

### 启动开发服务器

```bash
# Windows 用户
双击 start.bat

# 或使用命令行
npm run dev
```

访问 <http://localhost:5173/> 开始体验！

### 构建生产版本

```bash
npm run build
```

## 🎭 英歌脸谱风格

| 风格       | 特点   | 主色调   | 文化内涵            |
| -------- | ---- | ----- | --------------- |
| **潮阳英歌** | 刚劲雄浑 | 🔴 深红 | 源于宋代，体现潮汕人民豪迈气概 |
| **普宁英歌** | 华丽细腻 | 🔵 蓝色 | 注重细节刻画，精致之美     |
| **神泉英歌** | 古朴典雅 | 🟢 绿色 | 历史悠久，质朴之美       |
| **关公脸谱** | 忠义威严 | 🔴 大红 | 象征忠义勇猛的英雄形象     |
| **张飞脸谱** | 粗犷豪放 | ⚫ 黑色  | 豹头环眼，刚正不阿       |
| **武松脸谱** | 英武豪迈 | 🟤 赭色 | 打虎英雄，英气逼人       |
| **林冲脸谱** | 儒雅刚毅 | ⚪ 灰色  | 豹子头，文武双全        |

## 🎨 色彩象征体系

| 颜色    | 象征意义     | 代表人物  |
| ----- | -------- | ----- |
| 🔴 红色 | 忠勇、正义、热情 | 关公、岳飞 |
| ⚫ 黑色  | 刚正、勇猛、正直 | 张飞、包拯 |
| ⚪ 白色  | 奸诈、阴险、狠毒 | 曹操、秦桧 |
| 🔵 蓝色 | 沉稳、睿智、勇敢 | 窦尔敦   |
| 🟢 绿色 | 暴躁、勇猛、草莽 | 程咬金   |
| 🟡 黄色 | 凶狠、残暴、勇猛 | 典韦    |
| ✨ 金色  | 神圣、尊贵、超凡 | 二郎神   |

## 🛠️ 技术栈

### 前端框架

- **React 18** - UI 框架
- **TypeScript 5** - 类型安全
- **Vite 6** - 构建工具

### 状态管理

- **Zustand** - 轻量级状态管理

### 人脸检测

- **MediaPipe FaceMesh** - 478 点高精度人脸特征检测

### 样式

- **Tailwind CSS 3** - 原子化 CSS 框架
- **Lucide React** - 图标库

## 📁 项目结构

```
YingGe/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── generator/      # 脸谱生成器组件
│   │   ├── layout/         # 布局组件
│   │   └── ...
│   ├── hooks/              # 自定义 Hooks
│   │   ├── useFaceMesh.ts  # 人脸检测
│   │   └── useImageUpload.ts
│   ├── pages/              # 页面组件
│   ├── stores/             # 状态管理
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   │   ├── yinggeStyles.ts # 英歌风格配置
│   │   └── yinggePainter.ts # 绘制算法
│   ├── App.tsx             # 根组件
│   └── main.tsx            # 入口文件
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── start.bat               # 一键启动脚本
```

## 📖 使用指南

### 1. 上传照片

- 点击上传区域或拖拽图片
- 支持 JPG、PNG、WebP 格式
- 最大 5MB

### 2. 选择风格

- 从7种风格中选择喜欢的英歌脸谱
- 可点击展开查看文化背景和色彩象征

### 3. 生成脸谱

- 系统自动检测人脸并生成脸谱
- 支持调整透明度、饱和度、对比度等参数

### 4. 保存分享

- 下载高清图片
- 保存到作品库
- 分享到社交平台

## 🔧 开发指南

### 添加新的英歌风格

1. 在 `src/utils/yinggeStyles.ts` 的 `YINGGE_STYLES` 对象中添加新风格
2. 更新类型定义 `src/types/index.ts`
3. 在 `YingGeFaceGenerator.tsx` 中更新风格选择器

### 示例

```typescript
// src/utils/yinggeStyles.ts
export const YINGGE_STYLES = {
  // ... 现有风格
  newStyle: {
    id: 'newStyle',
    name: '新风格名称',
    description: '风格特点描述',
    primaryColor: '#hexcode',
    secondaryColor: '#hexcode',
    accentColor: '#hexcode',
    facialFeatures: {
      eyeShape: 'sharp',
      browStyle: 'bold',
      mouthStyle: 'fierce',
      beardStyle: 'thick'
    },
    patterns: ['纹样1', '纹样2'],
    culturalBackground: '文化背景介绍',
    colorSymbolism: '色彩象征说明',
    drawingSteps: ['步骤1', '步骤2']
  }
};
```

## 🌐 相关资源

- [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh) - 人脸特征检测
- [英歌舞 - 维基百科](https://zh.wikipedia.org/wiki/英歌舞) - 英歌舞文化介绍
- [潮汕英歌舞 - 非物质文化遗产](https://www.ihchina.cn/) - 非遗保护

## 📄 开源协议

本项目基于 MIT 协议开源。

## 🙏 致谢

- [MediaPipe](https://google.github.io/mediapipe/) - 开源人脸检测方案
- [React](https://react.dev/) - UI 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [潮汕英歌舞传承人](https://www.vcg.com/creative-image/yinggewulianpu/) - 文化素材参考

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/shuda-li/YingGe/issues)
- 邮箱: <contact@example.com>

***

<p align="center">
  <strong>🎭 让传统文化焕发新生机 🎭</strong>
  <br />
  传承非遗，科技创新
</p>
