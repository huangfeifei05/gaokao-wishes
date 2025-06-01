// 高考祝福语数组
let wishes = [
    "金榜题名，梦想成真！",
    "蟾宫折桂，一举高中！",
    "考的全会，蒙的都对！",
    "笔下生花，文思泉涌！",
    "超常发挥，创造奇迹！",
    "沉着冷静，稳定发挥！",
    "十年寒窗，一朝成名！",
    "旗开得胜，马到成功！",
    "心想事成，前程似锦！",
    "智慧如泉涌，答题如有神！"
];

// 烟花效果
class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.speed = 2;
        this.particles = [];
        this.alive = true;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        if (Math.abs(this.x - this.targetX) < 5 && Math.abs(this.y - this.targetY) < 5) {
            this.explode();
            this.alive = false;
        }
    }

    explode() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;
            this.particles.push({
                x: this.x,
                y: this.y,
                angle: angle,
                speed: speed,
                radius: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 350}, 100%, 50%)`,
                life: 100
            });
        }
    }

    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.speed *= 0.95;
            p.life--;
        }
        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw(ctx) {
        if (this.alive) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
        }

        for (const p of this.particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }
}

// 初始化烟花画布
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < fireworks.length; i++) {
        const fw = fireworks[i];
        fw.update();
        fw.updateParticles();
        fw.draw(ctx);
        
        if (!fw.alive && fw.particles.length === 0) {
            fireworks.splice(i, 1);
            i--;
        }
    }
}

animate();

// 窗口大小调整时重设画布大小
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// DOM元素
const wishButton = document.getElementById('wishButton');
const wishDisplay = document.getElementById('wishDisplay');
const shareBtn = document.getElementById('shareBtn');
const customWishInput = document.getElementById('customWishInput');
const addWishBtn = document.getElementById('addWishBtn');
const clickSound = document.getElementById('clickSound');
const countdownTimer = document.getElementById('countdown-timer');

// 点击获取祝福
wishButton.addEventListener('click', function() {
    // 播放音效
    clickSound.currentTime = 0;
    clickSound.play();
    
    // 创建烟花
    const rect = wishButton.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const startX = Math.random() * canvas.width;
        const startY = canvas.height;
        fireworks.push(new Firework(startX, startY, buttonX, buttonY));
    }
    
    // 随机选择一条祝福语
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    // 创建新的段落元素
    const newWish = document.createElement('p');
    newWish.textContent = randomWish;
    newWish.className = 'fade-in';
    
    // 清空显示区域并添加新祝福
    wishDisplay.innerHTML = '';
    wishDisplay.appendChild(newWish);
    
    // 按钮点击效果
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 300);
});

// 其他功能保持不变...
// (倒计时、添加自定义祝福、分享功能等与之前相同)