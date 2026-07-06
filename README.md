# Personal Academic Website | 个人学术主页

🌐 **Live Demo / 网站访问**: [fyapeng.com](https://fyapeng.com)

This is the source code for the personal academic website of **Yapeng Fu (付亚鹏, Fya)**, a Ph.D. Student in Economics at the University of Chinese Academy of Social Sciences (UCASS). The site is built with pure HTML/CSS and Jekyll, optimized for academic profiles.

这是**付亚鹏（Fya）**的个人学术主页源代码。目前就读于中国社会科学院大学经济学院，攻读经济学博士学位。该网站基于 Jekyll 和纯 HTML/CSS 构建，专为学术研究人员量身定制。

---

## 🌟 Features | 核心特性

- **Bilingual Support (双语支持)**: Built-in English and Chinese toggles. Data like publications are shared using a unified data source to prevent redundancy. (中英双语切换，研究成果等通用数据采用统一数据源，避免重复维护)。
- **Data-Driven (数据驱动)**: Research papers, education, and site configurations are managed easily via YAML files in the `_data` folder. (通过 YAML 文件管理论文列表和个人信息，只需修改数据，页面自动渲染)。
- **Responsive Design (响应式设计)**: Modern, clean, and mobile-friendly UI. (现代、简洁、学术风的 UI，完美适配手机与电脑端)。
- **SEO Optimized (SEO 优化)**: Configured for better search engine visibility. (基础的学术搜索引擎优化)。

---

## 📁 Project Structure | 目录结构

The repository follows a standard Jekyll structure:
本项目遵循标准的 Jekyll 静态站点结构：

```text
fyapeng.github.io/
├── _data/               # YAML data files (页面数据源)
│   ├── en.yml           # English static text / 英文静态文本
│   ├── zh.yml           # Chinese static text / 中文静态文本
│   └── research.yml     # Universal research data (papers) / 全局研究成果数据 (不区分双语)
├── _includes/           # Reusable HTML components / 可复用组件
│   ├── header.html      # Navigation bar / 导航栏
│   ├── footer.html      # Footer / 页脚
│   ├── paper_item.html  # Paper list rendering template / 单篇论文渲染模板
│   └── ...
├── _layouts/            # Page templates / 页面布局模板
│   └── default.html     # Base layout / 基础布局
├── assets/              # Static files / 静态资源
│   ├── css/             # Stylesheets (style.css) / 样式表
│   ├── img/             # Profile pictures, highlight images / 图片资源
│   └── cv/              # PDF resumes / 简历 PDF 文件
├── en/                  # English Pages / 英文子页面
│   ├── index.html       # English Homepage / 英文首页
│   └── research.html    # English Research Page / 英文研究页
├── index.html           # Chinese Homepage / 中文首页 (默认)
├── research.html        # Chinese Research Page / 中文研究页
└── _config.yml          # Jekyll configuration & Site settings / 网站全局配置
```

---

## 🛠️ How to Use / Local Development | 本地运行与开发

If you want to run this website locally or fork it to create your own:
如果您想在本地运行或基于此仓库创建自己的主页：

**1. Prerequisites (环境准备):**
Make sure you have[Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Jekyll](https://jekyllrb.com/) installed on your machine.
确保你的电脑已安装 Ruby 和 Jekyll。

**2. Clone the repository (克隆仓库):**
```bash
git clone https://github.com/fyapeng/fyapeng.github.io.git
cd fyapeng.github.io
```

**3. Install dependencies (安装依赖):**
```bash
bundle install
```

**4. Run the local server (启动本地服务):**
```bash
bundle exec jekyll serve
```
Then open `http://localhost:4000` in your browser.
然后在浏览器中访问 `http://localhost:4000`。

---

## 📝 Editing Content | 如何修改内容

- **Update Profile (修改简介):** Edit the text directly in `index.html` and `en/index.html`. 
- **Add Papers (添加论文):** Open `_data/research.yml` and add a new entry. The `research.html` pages will automatically render it using the `_includes/paper_item.html` template. (在 `_data/research.yml` 中添加论文信息，页面会自动读取并生成)。
- **Change Theme Color (修改主题色):** Open `assets/css/style.css` and modify the CSS variables (e.g., `--accent-color`) at the top `:root` section. (在 `style.css` 顶部的 `:root` 变量中修改颜色即可)。

---

## 📄 License | 开源协议

This project is licensed under the [MIT License](LICENSE). You are free to fork and use this repository as a template for your own academic website, but please change the personal information, Google Analytics ID, and domain settings.

本项目采用 [MIT License](LICENSE) 协议。欢迎 Fork 此项目作为你个人学术主页的模板，但在使用前，**请务必替换掉源码中的个人信息、照片、数据以及自定义域名配置**。