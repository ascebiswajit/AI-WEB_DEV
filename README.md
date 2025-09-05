# AI Tools Hub 🤖✨

A modern, responsive web application for discovering, organizing, and tracking the best free AI tools available online. Built with React, TypeScript, and Tailwind CSS.

![AI Tools Hub](https://img.shields.io/badge/AI%20Tools-Hub-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### Core Functionality
- **🔍 Smart Search**: Real-time search across tool names, descriptions, and categories
- **📂 Category Filtering**: Browse tools by categories (Chatbots, Image Generation, Coding, etc.)
- **✅ Personal Checklist**: Mark tools as "Tried" or "Saved" with persistent local storage
- **⭐ Tool Ratings**: View community ratings and popularity scores
- **📱 Responsive Design**: Mobile-first design that works on all devices

### Advanced Features
- **🎯 Advanced Filters**: Filter by pricing model, minimum rating, and popularity
- **📊 Export Options**: Download your checklist as CSV or PDF
- **🌟 Featured Tools**: Highlighted trending and popular AI tools
- **📋 Tool Details**: Comprehensive information for each tool including descriptions, links, and stats
- **💾 Data Persistence**: Your preferences and checklists are saved locally

### User Experience
- **🎨 Modern UI**: Clean, minimal design with smooth animations
- **⚡ Fast Performance**: Optimized for speed and responsiveness
- **🔧 Easy Navigation**: Intuitive sidebar filters and category pills
- **📈 Progress Tracking**: Visual indicators for tried and saved tools

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Hooks + Local Storage
- **Export Functionality**: jsPDF for PDF generation
- **Icons**: Lucide React
- **Notifications**: Sonner for toast messages

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-tools-hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
# or
npm run build
```

### Lint Code

```bash
pnpm run lint
# or
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ExportButtons.tsx
│   ├── SearchBar.tsx
│   ├── Sidebar.tsx
│   ├── ToolCard.tsx
│   └── ToolDetail.tsx
├── data/               # Static data files
│   └── aiTools.json    # AI tools database
├── hooks/              # Custom React hooks
│   └── useLocalStorage.tsx
├── lib/                # Utility functions
│   └── exportUtils.ts
├── pages/              # Page components
│   ├── Index.tsx       # Main homepage
│   └── NotFound.tsx    # 404 page
└── App.tsx             # Root component
```

## 🗃️ Data Structure

Each AI tool in the database follows this structure:

```json
{
  "id": "unique-tool-id",
  "name": "Tool Name",
  "category": "Category Name",
  "pricing": "Free | Free + Paid | Free Trial + Paid",
  "link": "https://tool-website.com",
  "description": "Brief description of the tool",
  "rating": 4.5,
  "popularity": 85,
  "featured": true
}
```

## 🎯 Usage Guide

### For Users

1. **Browse Tools**: Use the search bar or browse by categories
2. **Filter Results**: Use the sidebar to filter by category, pricing, or rating
3. **Mark Tools**: Check "Tried" or "Saved" to track your progress
4. **View Details**: Click "View Details" for comprehensive tool information
5. **Export Data**: Use export buttons to download your checklist

### For Developers

#### Adding New Tools

1. Edit `src/data/aiTools.json`
2. Add new tool objects following the data structure
3. The app will automatically include new tools

#### Customizing Categories

Categories are automatically generated from the tools data. To add new categories, simply include tools with new category names.

#### Extending Functionality

- **New Filters**: Modify `src/components/Sidebar.tsx`
- **Export Formats**: Extend `src/lib/exportUtils.ts`
- **UI Components**: Add to `src/components/`

## 🌟 Key Components

### ToolCard
Displays individual tool information with interactive checkboxes for marking as tried/saved.

### Sidebar
Advanced filtering interface with category, pricing, and rating filters.

### SearchBar
Real-time search functionality across all tool properties.

### ExportButtons
Handles CSV and PDF export functionality for user checklists.

### ToolDetail
Modal component showing comprehensive tool information.

## 📊 Current Database

The application includes **15 pre-loaded AI tools** across **8 categories**:

- **Chatbots**: ChatGPT, Claude
- **Image Generation**: Midjourney, DALL-E 3, Stable Diffusion
- **Coding**: GitHub Copilot, Cursor
- **Writing**: Grammarly, Jasper AI, Copy.ai
- **Research**: Perplexity AI, Hugging Face
- **Productivity**: Notion AI
- **Video**: Runway ML
- **Music**: Mubert

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization Options
- Modify `tailwind.config.ts` for theme customization
- Update `src/data/aiTools.json` to change the tools database
- Customize components in `src/components/` for UI changes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Deploy automatically on push to main branch

### Netlify
1. Build the project: `pnpm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms
The built files in the `dist` folder can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Adding New Tools
To contribute new AI tools:
1. Research the tool thoroughly
2. Add to `src/data/aiTools.json` with complete information
3. Test the application locally
4. Submit a PR with tool details

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the icon set
- **React** and **TypeScript** communities

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

Preview of the website : 

<img width="2940" height="5400" alt="image" src="https://github.com/user-attachments/assets/3ac548c1-4ff4-488c-9a49-ac4226af868b" />

Website link : https://ai-web-dev-six.vercel.app/

---

**Built with ❤️ for the AI community**

*Discover, try, and organize the best AI tools in one place.*
