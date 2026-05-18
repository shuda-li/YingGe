@echo off
chcp 65001 >nul
title 英歌脸谱生成器 - 一键启动

echo ================================================
echo          🎭 英歌脸谱生成器 - 一键启动
echo ================================================
echo.

:: 检查是否存在 node_modules
if not exist "node_modules" (
    echo ⏳ 检测到首次运行，正在安装依赖...
    echo.
    npm install --registry=https://registry.npmmirror.com
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败，请检查网络连接
        pause
        exit /b 1
    )
    echo ✅ 依赖安装成功！
    echo.
)

echo 🚀 启动开发服务器...
echo.
echo 访问地址: http://localhost:5173/
echo.
echo 按 Ctrl+C 停止服务器
echo ================================================
echo.

npm run dev

pause