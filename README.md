# 🚀 Bolt.DIY - Enhanced with Advanced Prompt Management System

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Powered-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://reactjs.org/)
[![AI](https://img.shields.io/badge/AI-Enhanced-purple?logo=openai)](https://openai.com/)

> 🎯 **Bolt.DIY with Revolutionary Prompt Management System** - The ultimate AI assistant for developers with complete prompt customization, specialized roles, and intelligent tools.

## ✨ What's New - Prompt Management System

### 🎯 Complete Prompt Control
- **Custom System Prompts** - Replace or modify the core AI behavior
- **Layered Prompts** - Add prefix, context, and suffix instructions
- **Real-time Editing** - Instant prompt modifications with live preview
- **Template Integration** - Use existing templates or create your own

### 👤 AI Role Specialization
Choose from **6 expert roles** or create custom ones:
- 👨‍💻 **Senior Developer** - Code quality and best practices
- 🏗️ **Software Architect** - System design and scalability
- ⚙️ **DevOps Expert** - Infrastructure and deployment
- 🔒 **Security Expert** - Cybersecurity and vulnerabilities
- 📊 **Product Manager** - Strategy and user experience
- 🎨 **UX/UI Designer** - Interface and user experience

### 🔧 Intelligent Tools System
**5 Built-in Tools** + Custom Tool Creation:
- **Code Analyzer** - Detect issues and suggest improvements
- **Test Generator** - Automatic unit test creation
- **Auto Documentation** - Generate comprehensive docs
- **Performance Optimizer** - Analyze and optimize code
- **Security Validator** - Check for vulnerabilities

### 🎮 How to Access
1. Open **http://localhost:44100**
2. Click **Settings** ⚙️
3. Go to **Features** tab
4. **"Prompt Manager"** → Full interface!

## 🚀 Quick Start

### Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/akonedev/bolt-diy-enhanced.git
cd bolt-diy-enhanced

# Start with Docker
docker-compose up app-dev

# Access at http://localhost:44100
```

### Local Development
```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Start development server
pnpm run dev
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` with your API keys:
```env
# AI Providers (choose one or more)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key

# OpenRouter (Alternative)
OPENROUTER_API_KEY=your_openrouter_key

# Optional: Together AI
TOGETHER_API_KEY=your_together_key
```

### Prompt Management Setup
1. **Access Prompt Manager** via Settings → Features
2. **Configure System Prompt** - Modify base AI behavior
3. **Add Custom Prompts** - Layer additional instructions
4. **Activate Roles** - Choose expert specializations  
5. **Enable Tools** - Add intelligent capabilities

## 🎯 Use Cases & Examples

### 🔥 Frontend Development Specialist
```
Configuration:
✅ Role: Senior Developer
✅ Custom Prompt: "Focus on React, TypeScript, and modern CSS"
✅ Tools: Code Analyzer + Performance Optimizer
Result: AI specialized in frontend with automatic code analysis
```

### 🏗️ System Architecture Expert  
```
Configuration:
✅ Role: Software Architect
✅ Custom Prompt: "Design scalable, cloud-native systems"
✅ Tools: Performance Optimizer + Security Validator
Result: AI expert in scalable architecture design
```

### 🔒 Security-First Development
```
Configuration:
✅ Role: Security Expert
✅ Custom Prompt: "Always check OWASP vulnerabilities"
✅ Tools: Security Validator + Code Analyzer
Result: AI focused on secure coding practices
```

## 📁 Enhanced Project Structure

```
bolt.diy/
├── app/
│   ├── components/
│   │   ├── prompt-manager/           # 🆕 Prompt Management System
│   │   │   ├── PromptManager.tsx
│   │   │   ├── SystemPromptEditor.tsx
│   │   │   ├── CustomPromptEditor.tsx
│   │   │   ├── ToolsManager.tsx
│   │   │   └── RolesManager.tsx
│   │   ├── chat/
│   │   │   └── PromptConfigDisplay.tsx # 🆕 Active config display
│   │   └── @settings/
│   ├── lib/
│   │   └── hooks/
│   │       ├── usePromptManager.ts    # 🆕 Prompt logic
│   │       └── useEnhancedPrompts.ts  # 🆕 Chat integration
│   └── ...
├── docker-compose.yaml               # Updated Docker config
├── PROMPT_MANAGER_GUIDE.md          # 🆕 Complete user guide
└── PROMPT_SYSTEM_SUCCESS.md         # 🆕 Implementation report
```

## 🎨 Features Overview

### 🔥 Enhanced AI Capabilities
- **Specialized Responses** based on selected roles
- **Context-Aware** assistance for your specific project
- **Tool-Enhanced** interactions with automatic analysis
- **Persistent Configuration** across sessions

### 🎯 Developer Experience
- **Intuitive Interface** with tabbed navigation
- **Real-time Feedback** with visual statistics
- **Instant Apply** - no restart required
- **Professional UI** with smooth animations

### ⚡ Performance & Reliability
- **Token Optimization** - smart prompt combination
- **Local Storage** - instant configuration loading
- **Error Handling** - robust failure recovery
- **Responsive Design** - works on all devices

## 🛠️ Advanced Configuration

### Custom Role Creation
```typescript
// Example: Create a Machine Learning Expert role
{
  name: "ML Engineer",
  avatar: "🤖",
  description: "Expert in ML/AI development",
  prompt: `You are a machine learning engineer expert.
  Focus on:
  - Model architecture and training
  - Data preprocessing and feature engineering
  - MLOps and model deployment
  - Performance optimization and monitoring`
}
```

### Custom Tool Development
```typescript
// Example: Create a Code Review tool
{
  name: "Code Reviewer",
  description: "Comprehensive code review with suggestions",
  command: "review-code",
  parameters: {
    style: "comprehensive",
    focus: ["security", "performance", "maintainability"],
    suggestions: true
  }
}
```

## 📊 Technical Specifications

### Built With
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + UnoCSS  
- **Animations**: Framer Motion
- **State Management**: Custom hooks + LocalStorage
- **AI Integration**: Multiple provider support
- **Containerization**: Docker + Docker Compose

### Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

### System Requirements
- **Node.js** 18+ (for local development)
- **Docker** 20+ (recommended)
- **4GB RAM** minimum
- **Modern browser** with ES2020 support

## 🤝 Contributing

### Development Setup
```bash
# Fork and clone
git clone https://github.com/akonedev/bolt-diy-enhanced.git
cd bolt-diy-enhanced

# Install dependencies
pnpm install

# Start development
pnpm run dev

# Run tests
pnpm test
```

### Contribution Guidelines
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## 📚 Documentation

### User Guides
- 📖 **[Complete Prompt Manager Guide](PROMPT_MANAGER_GUIDE.md)** - Step-by-step usage
- 📋 **[Implementation Report](PROMPT_SYSTEM_SUCCESS.md)** - Technical details
- 🚀 **[Quick Start Examples](#-use-cases--examples)** - Ready-to-use configurations

### API Reference
- 🔧 **[Prompt Management API](app/lib/hooks/usePromptManager.ts)** - Core functionality
- 🎯 **[Enhanced Prompts Integration](app/lib/hooks/useEnhancedPrompts.ts)** - Chat integration
- 🎨 **[UI Components](app/components/prompt-manager/)** - Interface components

## 🎯 Roadmap

### 🔜 Coming Soon
- [ ] **Prompt Templates Marketplace** - Share and download prompts
- [ ] **Team Collaboration** - Shared prompt configurations
- [ ] **Import/Export** - Backup and restore settings
- [ ] **Analytics Dashboard** - Usage statistics and optimization
- [ ] **Voice Integration** - Voice-activated prompt switching

### 🚀 Future Vision
- [ ] **AI-Assisted Prompt Creation** - Let AI help create better prompts
- [ ] **Context-Aware Auto-Switching** - Automatic role selection
- [ ] **Integration Plugins** - VSCode, GitHub, Slack extensions
- [ ] **Enterprise Features** - Team management and compliance

## 📞 Support & Community

### Get Help
- 📧 **Email**: [akonedev@example.com](mailto:akonedev@example.com)
- 💬 **Discord**: [Join our community](#)
- 📖 **Documentation**: [Complete guides available](PROMPT_MANAGER_GUIDE.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/akonedev/bolt-diy-enhanced/issues)

### Show Your Support
- ⭐ **Star** this repository
- 🐛 **Report** bugs and issues
- 💡 **Suggest** new features
- 📢 **Share** with the community

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bolt.new team** for the amazing foundation
- **StackBlitz** for the WebContainer technology
- **Open source community** for the incredible tools
- **Contributors** who make this project better

---

<div align="center">

### 🚀 **Ready to revolutionize your AI development experience?**

**[🎯 Start Now](http://localhost:44100)** • **[📖 Read Guide](PROMPT_MANAGER_GUIDE.md)** • **[⭐ Star Repository](https://github.com/akonedev/bolt-diy-enhanced)**

*Built with ❤️ by [akonedev](https://github.com/akonedev) - Transforming AI development, one prompt at a time.*

</div>
