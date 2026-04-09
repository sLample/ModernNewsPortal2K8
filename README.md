# ModernNewsPortal2K8
Modern News Portal – Trang web tin tức phong cách hiện đại 2026 | Vue 3 + Tailwind CSS + Node.js Fullstack
**Trang web tin tức phong cách hiện đại 2026** – Dự án Fullstack hoàn chỉnh.

Một nền tảng tin tức sạch sẽ, tối giản, hỗ trợ **Dark/Light mode**, infinite scroll, reading progress, và trải nghiệm mobile-first. Được thiết kế để thể hiện kỹ năng **Fullstack Junior** chuyên nghiệp.

![Demo Screenshot](https://via.placeholder.com/800x400/111827/ffffff?text=Modern+News+Portal+Demo)  
*(Bạn thay link ảnh demo sau khi deploy)*

## ✨ Tính năng nổi bật

- ✅ Giao diện hiện đại, minimal & responsive (Dark/Light mode tự động)
- ✅ Infinite scroll + Skeleton loading mượt mà
- ✅ Đọc bài chi tiết với progress bar
- ✅ Phân loại theo category + tìm kiếm realtime
- ✅ Hệ thống Auth (Login/Register + JWT + Role-based)
- ✅ Admin dashboard quản lý tin tức
- ✅ Upload ảnh tin tức (Cloudinary)
- ✅ API Restful chuẩn + Zod validation
- ✅ Performance cao với Vite + Pinia + TanStack Query

## 🛠 Tech Stack

**Frontend:**
- Vue 3 + Vite
- Tailwind CSS v4
- Pinia + Vue Router
- Lucide Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- Cloudinary (image upload)

**Tools:**
- ESLint + Prettier
- Docker ready (sắp có)
- Deploy: Vercel (FE) + Render (BE)

## 🚀 Cài đặt nhanh

```bash
# Clone project
git clone https://github.com/<username>/modern-news-portal.git
cd modern-news-portal

# Frontend
cd frontend
npm install
npm run dev

# Backend (mở terminal khác)
cd backend
npm install
cp .env.example .env
npm run dev
