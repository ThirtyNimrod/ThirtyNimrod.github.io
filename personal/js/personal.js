// Terminal Portfolio - 30.NIMROD
const terminal = {
    output: document.getElementById('output'),
    input: document.getElementById('input'),
    hints: document.getElementById('hints'),
    history: [],
    historyIndex: -1,

    commands: [
        { cmd: 'about', desc: 'about 30.NIMROD' },
        { cmd: 'clear', desc: 'clear the terminal' },
        { cmd: 'gaming', desc: 'my gaming preferences' },
        { cmd: 'help', desc: 'list available commands' },
        { cmd: 'history', desc: 'view command history' },
        { cmd: 'music', desc: 'my music taste' },
        { cmd: 'projects', desc: 'view my projects' },
        { cmd: 'social', desc: 'my social links' },
        { cmd: 'welcome', desc: 'display welcome message' }
    ],

    init() {
        this.input.focus();
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('click', () => this.input.focus());
        this.executeCommand('welcome');
    },

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cmd = this.input.value.trim();
            if (cmd) {
                this.history.unshift(cmd);
                this.historyIndex = -1;
                this.addToOutput(this.createPrompt() + cmd);
                this.executeCommand(cmd);
            } else {
                this.addToOutput(this.createPrompt());
            }
            this.input.value = '';
            this.hints.innerHTML = '';
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.handleTab();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                this.input.value = '';
            }
        } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            this.clearTerminal();
        } else {
            // Clear hints when typing
            setTimeout(() => this.updateHints(), 0);
        }
    },

    handleTab() {
        const value = this.input.value;
        if (!value) return;

        const matches = this.commands.filter(c => c.cmd.startsWith(value));
        
        if (matches.length === 1) {
            this.input.value = matches[0].cmd;
            this.hints.innerHTML = '';
        } else if (matches.length > 1) {
            this.hints.innerHTML = matches.map(m => `<span>${m.cmd}</span>`).join('');
        }
    },

    updateHints() {
        const value = this.input.value;
        if (!value) {
            this.hints.innerHTML = '';
            return;
        }

        const matches = this.commands.filter(c => c.cmd.startsWith(value));
        if (matches.length > 1) {
            this.hints.innerHTML = matches.map(m => `<span>${m.cmd}</span>`).join('');
        } else {
            this.hints.innerHTML = '';
        }
    },

    createPrompt() {
        return '<span class="user">visitor</span>@<span class="host">30nimrod</span>:<span class="dir">~</span>$ ';
    },

    addToOutput(content) {
        const div = document.createElement('div');
        div.innerHTML = content;
        this.output.appendChild(div);
        this.scrollToBottom();
    },

    addToOutputAnimated(content, delay = 0) {
        setTimeout(() => {
            const p = document.createElement('p');
            p.innerHTML = content;
            this.output.appendChild(p);
            this.scrollToBottom();
        }, delay);
    },

    scrollToBottom() {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.scrollTop = mainContainer.scrollHeight;
        }
    },

    executeCommand(cmd) {
        const [command, ...args] = cmd.toLowerCase().split(' ');

        switch (command) {
            case 'welcome':
                this.showWelcome();
                break;
            case 'help':
                this.showHelp();
                break;
            case 'about':
                this.showAbout();
                break;
            case 'gaming':
                this.showGaming();
                break;
            case 'music':
                this.showMusic();
                break;
            case 'projects':
                this.showProjects();
                break;
            case 'social':
                this.showSocial();
                break;
            case 'history':
                this.showHistory();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'whoami':
                this.addToOutput('<div class="cmd-output">visitor</div>');
                break;
            case 'pwd':
                this.addToOutput('<div class="cmd-output">/home/visitor</div>');
                break;
            case '':
                break;
            default:
                this.addToOutput(`<div class="cmd-not-found">command not found: ${command}</div>`);
        }
    },

    showWelcome() {
        const welcome = `
<div class="cmd-output welcome">
    <pre class="ascii-art">
 ██████╗  ██████╗     ███╗   ██╗██╗███╗   ███╗██████╗  ██████╗ ██████╗ 
 ╚════██╗██╔═████╗    ████╗  ██║██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗
  █████╔╝██║██╔██║    ██╔██╗ ██║██║██╔████╔██║██████╔╝██║   ██║██║  ██║
  ╚═══██╗████╔╝██║    ██║╚██╗██║██║██║╚██╔╝██║██╔══██╗██║   ██║██║  ██║
 ██████╔╝╚██████╔╝    ██║ ╚████║██║██║ ╚═╝ ██║██║  ██║╚██████╔╝██████╔╝
 ╚═════╝  ╚═════╝     ╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
    </pre>
</div>
        `;
        this.addToOutput(welcome);
        
        // Add welcome text with animation
        this.addToOutputAnimated('<div class="welcome-text">Welcome to my terminal portfolio. (v1.0.0)</div>', 50);
        this.addToOutputAnimated('<div class="separator">----</div>', 100);
        this.addToOutputAnimated('<div class="welcome-text">The Casual DedSec Member - Gaming, Music & Tech enthusiast</div>', 150);
        this.addToOutputAnimated('<div class="separator">----</div>', 200);
        this.addToOutputAnimated('<div class="welcome-text">For a list of available commands, type <span style="font-weight: 700">\'help\'</span>.</div>', 250);
        this.addToOutputAnimated('<br>', 300);
    },

    showHelp() {
        this.addToOutputAnimated('<div class="cmd-output help-section">', 0);
        this.addToOutputAnimated('<div class="help-title">Available Commands:</div>', 40);
        this.addToOutputAnimated('<div class="command-list">', 80);
        
        let delay = 120;
        this.commands.forEach(c => {
            this.addToOutputAnimated(`<div class="cmd-name">${c.cmd}</div>`, delay);
            this.addToOutputAnimated(`<div class="cmd-desc">${c.desc}</div>`, delay + 20);
            delay += 40;
        });
        
        this.addToOutputAnimated('</div>', delay);
        this.addToOutputAnimated('<div>Tip: Use Tab for autocomplete, Arrow keys for history, Ctrl+L to clear</div>', delay + 40);
        this.addToOutputAnimated('</div>', delay + 80);
    },

    showAbout() {
        const about = `
<div class="cmd-output about-section">
    <div class="about-title">About 30.NIMROD</div>
    <div class="about-content">Alias: The Casual DedSec Member</div>
    <div class="about-content">Location: Digital Realm</div>
    <div class="separator">----</div>
    <div class="about-content">I'm a passionate gamer, music producer, and technology enthusiast exploring the intersection of gaming, music, and tech while maintaining principles of freedom and privacy.</div>
    <div class="separator">----</div>
    <div class="about-content"><strong>Specialties:</strong></div>
    <div class="about-content">• Casual Gaming & Strategy</div>
    <div class="about-content">• Music Production & Audio Engineering</div>
    <div class="about-content">• Technology Exploration</div>
    <div class="about-content">• Cyberpunk Culture Enthusiast</div>
    <div class="separator">----</div>
    <div class="about-content">Experience: 5+ years in digital domains</div>
    <div class="about-content">Projects: 50+ completed</div>
    <div class="about-content">Technologies: 15+ mastered</div>
</div>
        `;
        this.addToOutput(about);
    },

    showGaming() {
        const gaming = `
<div class="cmd-output gaming-section">
    <div class="help-title">Gaming Profile</div>
    <div class="game-item">
        <div class="game-title">Cyberpunk 2077</div>
        <div class="game-desc">Immersive RPG with corporate intrigue and dystopian themes</div>
    </div>
    <div class="game-item">
        <div class="game-title">The Witcher 3</div>
        <div class="game-desc">Epic fantasy with deep moral choices and storytelling</div>
    </div>
    <div class="game-item">
        <div class="game-title">Apex Legends</div>
        <div class="game-desc">Strategic battle royale with team-based gameplay</div>
    </div>
    <div class="separator">----</div>
    <div class="about-content">Gaming Style: Casual competitive play</div>
    <div class="about-content">Favorite Genres: RPG, Strategy, Battle Royale</div>
    <div class="about-content">Platform: PC (Steam primary)</div>
    <div class="separator">----</div>
    <div class="social-item">
        <a href="https://steamcommunity.com/id/thirtynimrod" target="_blank" class="social-link">steamcommunity.com/id/thirtynimrod</a>
    </div>
</div>
        `;
        this.addToOutput(gaming);
    },

    showMusic() {
        const music = `
<div class="cmd-output music-section">
    <div class="help-title">Music Preferences</div>
    <div class="genre-item">
        <div class="genre-bar">
            <span class="genre-name">Synthwave</span>
            <div class="bar"><div class="bar-fill" style="width: 95%"></div></div>
            <span class="genre-percent">95%</span>
        </div>
    </div>
    <div class="genre-item">
        <div class="genre-bar">
            <span class="genre-name">Rock</span>
            <div class="bar"><div class="bar-fill" style="width: 92%"></div></div>
            <span class="genre-percent">92%</span>
        </div>
    </div>
    <div class="genre-item">
        <div class="genre-bar">
            <span class="genre-name">Electronic</span>
            <div class="bar"><div class="bar-fill" style="width: 88%"></div></div>
            <span class="genre-percent">88%</span>
        </div>
    </div>
    <div class="separator">----</div>
    <div class="about-content">Current Focus: Retro-futuristic electronic music</div>
    <div class="about-content">Production: DAW-based composition (Ableton workflow)</div>
    <div class="about-content">Influences: Cyberpunk aesthetics, vaporwave, industrial</div>
    <div class="separator">----</div>
    <div class="social-item">
        <a href="https://spotify-github-profile.kittinanx.com/api/view?uid=iamdivyapratap" target="_blank" class="social-link">Spotify Profile</a>
    </div>
</div>
        `;
        this.addToOutput(music);
    },

    showProjects() {
        const projects = `
<div class="cmd-output projects-section">
    <div class="help-title">Featured Projects</div>
    <div class="project-item">
        <div class="project-title">Terminal Portfolio</div>
        <div class="project-desc">Interactive terminal-style portfolio website</div>
        <div class="project-desc">Tech: HTML, CSS, JavaScript</div>
    </div>
    <div class="project-item">
        <div class="project-title">Music Production Projects</div>
        <div class="project-desc">Various electronic music compositions and remixes</div>
        <div class="project-desc">Tech: Ableton Live, Sound Design</div>
    </div>
    <div class="project-item">
        <div class="project-title">Gaming Content</div>
        <div class="project-desc">Gameplay sessions and strategy guides</div>
        <div class="project-desc">Platform: Steam, Twitch</div>
    </div>
    <div class="separator">----</div>
    <div class="about-content">More projects coming soon...</div>
</div>
        `;
        this.addToOutput(projects);
    },

    showSocial() {
        const social = `
<div class="cmd-output social-section">
    <div class="help-title">Social Links</div>
    <div class="social-item">
        <strong>Steam:</strong> <a href="https://steamcommunity.com/id/thirtynimrod" target="_blank" class="social-link">steamcommunity.com/id/thirtynimrod</a>
    </div>
    <div class="social-item">
        <strong>Spotify:</strong> <a href="https://spotify-github-profile.kittinanx.com/api/view?uid=iamdivyapratap" target="_blank" class="social-link">Spotify Profile</a>
    </div>
    <div class="social-item">
        <strong>GitHub:</strong> <a href="https://github.com/thirtynimrod" target="_blank" class="social-link">github.com/thirtynimrod</a>
    </div>
    <div class="social-item">
        <strong>Medium:</strong> <a href="https://medium.com/@nimrodwrites" target="_blank" class="social-link">@nimrodwrites</a>
    </div>
    <div class="separator">----</div>
    <div class="about-content">Feel free to connect on any platform!</div>
</div>
        `;
        this.addToOutput(social);
    },

    showHistory() {
        if (this.history.length === 0) {
            this.addToOutput('<div class="cmd-output">No command history</div>');
            return;
        }
        const historyList = this.history.slice().reverse().map((cmd, index) => 
            `<div>${index + 1}  ${cmd}</div>`
        ).join('');
        this.addToOutput(`<div class="cmd-output">${historyList}</div>`);
    },

    clearTerminal() {
        this.output.innerHTML = '';
        this.hints.innerHTML = '';
    }
};

// Initialize terminal on page load
document.addEventListener('DOMContentLoaded', () => {
    terminal.init();
});
