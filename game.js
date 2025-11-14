// Cosmic Nexus - Cross-Platform Space Shooter Game
// Optimized for both desktop and mobile devices

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();

        // Game state
        this.state = 'menu'; // menu, playing, paused, gameover, upgrade
        this.score = 0;
        this.currency = 0;
        this.wave = 1;
        this.combo = 0;
        this.comboTimer = 0;
        this.highScore = parseInt(localStorage.getItem('cosmicNexusHighScore')) || 0;

        // Entities
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.powerUps = [];
        this.stars = [];

        // Timers
        this.enemySpawnTimer = 0;
        this.enemySpawnDelay = 2000;
        this.waveEnemiesRemaining = 10;
        this.waveClearTimer = 0;

        // Input
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        this.touch = null;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Upgrades
        this.upgrades = {
            damage: 1,
            fireRate: 1,
            speed: 1,
            maxHealth: 100,
            multiShot: 1
        };

        this.lastTime = 0;
        this.setupEventListeners();
        this.createStarfield();
        this.gameLoop(0);
    }

    setupCanvas() {
        const container = document.getElementById('gameContainer');
        const containerRect = container.getBoundingClientRect();

        // Set canvas to fill container while maintaining aspect ratio
        const aspectRatio = 16 / 9;
        let width = containerRect.width;
        let height = containerRect.height;

        if (width / height > aspectRatio) {
            width = height * aspectRatio;
        } else {
            height = width / aspectRatio;
        }

        this.canvas.width = Math.min(1920, width);
        this.canvas.height = Math.min(1080, height);

        // Scale for high DPI displays
        const dpr = window.devicePixelRatio || 1;
        if (dpr > 1) {
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.ctx.scale(dpr, dpr);
            this.canvas.style.width = rect.width + 'px';
            this.canvas.style.height = rect.height + 'px';
        }
    }

    setupEventListeners() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ' || e.key === 'Escape') e.preventDefault();
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        });

        // Touch
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.touch = {
                x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
                y: (touch.clientY - rect.top) * (this.canvas.height / rect.height)
            };
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.touch = {
                x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
                y: (touch.clientY - rect.top) * (this.canvas.height / rect.height)
            };
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touch = null;
        });

        // Buttons
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('restartBtn').addEventListener('click', () => this.startGame());
        document.getElementById('menuBtn').addEventListener('click', () => this.showMenu());
        document.getElementById('continueBtn').addEventListener('click', () => this.continueFromUpgrade());

        // Resize
        window.addEventListener('resize', () => this.setupCanvas());
    }

    createStarfield() {
        for (let i = 0; i < 200; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    startGame() {
        this.state = 'playing';
        this.score = 0;
        this.currency = 0;
        this.wave = 1;
        this.combo = 0;
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.powerUps = [];
        this.waveEnemiesRemaining = 10;

        // Reset upgrades
        this.upgrades = {
            damage: 1,
            fireRate: 1,
            speed: 1,
            maxHealth: 100,
            multiShot: 1
        };

        // Create player
        this.player = new Player(this, this.canvas.width / 2, this.canvas.height / 2);

        document.getElementById('menuScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('upgradeScreen').style.display = 'none';

        this.showWaveNotification(`WAVE ${this.wave}`);
    }

    showMenu() {
        this.state = 'menu';
        document.getElementById('menuScreen').style.display = 'flex';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('upgradeScreen').style.display = 'none';
    }

    gameOver() {
        this.state = 'gameover';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalWave').textContent = this.wave;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('cosmicNexusHighScore', this.highScore);
        }

        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('gameOverScreen').style.display = 'flex';
    }

    showUpgradeScreen() {
        this.state = 'upgrade';
        document.getElementById('upgradeCurrency').textContent = this.currency;
        this.populateUpgrades();
        document.getElementById('upgradeScreen').style.display = 'flex';
    }

    populateUpgrades() {
        const upgradeList = document.getElementById('upgradeList');
        upgradeList.innerHTML = '';

        const upgrades = [
            { name: 'Damage', key: 'damage', cost: 50, desc: 'Increase bullet damage' },
            { name: 'Fire Rate', key: 'fireRate', cost: 75, desc: 'Shoot faster' },
            { name: 'Speed', key: 'speed', cost: 60, desc: 'Move faster' },
            { name: 'Max Health', key: 'maxHealth', cost: 100, desc: 'Increase maximum health' },
            { name: 'Multi-Shot', key: 'multiShot', cost: 150, desc: 'Fire additional bullets' }
        ];

        upgrades.forEach(upgrade => {
            const card = document.createElement('div');
            card.className = 'upgrade-card';
            card.innerHTML = `
                <div class="upgrade-title">${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.desc}</div>
                <div class="upgrade-cost">Cost: ${upgrade.cost} Crystals</div>
                <div style="margin-bottom: 10px; color: #0f0;">Level: ${this.upgrades[upgrade.key]}</div>
                <button class="btn upgrade-btn" data-upgrade="${upgrade.key}" data-cost="${upgrade.cost}">
                    UPGRADE
                </button>
            `;
            upgradeList.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const upgrade = btn.dataset.upgrade;
                const cost = parseInt(btn.dataset.cost);

                if (this.currency >= cost) {
                    this.currency -= cost;
                    this.upgrades[upgrade]++;
                    if (upgrade === 'maxHealth') {
                        this.player.maxHealth += 20;
                        this.player.health = this.player.maxHealth;
                    }
                    document.getElementById('upgradeCurrency').textContent = this.currency;
                    this.populateUpgrades();
                }
            });
        });
    }

    continueFromUpgrade() {
        document.getElementById('upgradeScreen').style.display = 'none';
        this.state = 'playing';
        this.wave++;
        this.waveEnemiesRemaining = 10 + this.wave * 5;
        this.enemySpawnDelay = Math.max(500, 2000 - this.wave * 100);
        this.showWaveNotification(`WAVE ${this.wave}`);
    }

    showWaveNotification(text) {
        const notification = document.getElementById('waveNotification');
        notification.textContent = text;
        notification.style.opacity = '1';

        setTimeout(() => {
            notification.style.transition = 'opacity 1s';
            notification.style.opacity = '0';
        }, 2000);
    }

    update(deltaTime) {
        if (this.state !== 'playing') return;

        // Update player
        if (this.player) {
            this.player.update(deltaTime);

            if (this.player.health <= 0) {
                this.gameOver();
                return;
            }
        }

        // Update enemies
        this.enemies.forEach((enemy, index) => {
            enemy.update(deltaTime);
            if (enemy.markedForDeletion) {
                this.enemies.splice(index, 1);
            }
        });

        // Spawn enemies
        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer >= this.enemySpawnDelay && this.waveEnemiesRemaining > 0) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
            this.waveEnemiesRemaining--;
        }

        // Check wave completion
        if (this.waveEnemiesRemaining <= 0 && this.enemies.length === 0) {
            this.waveClearTimer += deltaTime;
            if (this.waveClearTimer >= 2000) {
                this.waveClearTimer = 0;
                this.showUpgradeScreen();
            }
        }

        // Update bullets
        this.bullets.forEach((bullet, index) => {
            bullet.update(deltaTime);
            if (bullet.markedForDeletion) {
                this.bullets.splice(index, 1);
            }
        });

        // Update particles
        this.particles.forEach((particle, index) => {
            particle.update(deltaTime);
            if (particle.markedForDeletion) {
                this.particles.splice(index, 1);
            }
        });

        // Update power-ups
        this.powerUps.forEach((powerUp, index) => {
            powerUp.update(deltaTime);
            if (powerUp.markedForDeletion) {
                this.powerUps.splice(index, 1);
            }
        });

        // Update combo timer
        if (this.combo > 0) {
            this.comboTimer -= deltaTime;
            if (this.comboTimer <= 0) {
                this.combo = 0;
            }
        }

        // Collision detection
        this.checkCollisions();

        // Update UI
        this.updateUI();
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch(side) {
            case 0: x = Math.random() * this.canvas.width; y = -50; break;
            case 1: x = this.canvas.width + 50; y = Math.random() * this.canvas.height; break;
            case 2: x = Math.random() * this.canvas.width; y = this.canvas.height + 50; break;
            case 3: x = -50; y = Math.random() * this.canvas.height; break;
        }

        const types = ['basic', 'fast', 'tank', 'shooter'];
        const weights = [0.5, 0.25, 0.15, 0.1];
        const type = this.weightedRandom(types, weights);

        this.enemies.push(new Enemy(this, x, y, type));
    }

    weightedRandom(items, weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        const random = Math.random() * total;
        let sum = 0;

        for (let i = 0; i < items.length; i++) {
            sum += weights[i];
            if (random < sum) return items[i];
        }

        return items[0];
    }

    checkCollisions() {
        // Player bullets vs enemies
        this.bullets.forEach(bullet => {
            if (bullet.team !== 'player') return;

            this.enemies.forEach(enemy => {
                if (this.checkCircleCollision(bullet, enemy)) {
                    bullet.markedForDeletion = true;
                    enemy.takeDamage(bullet.damage);

                    if (enemy.health <= 0) {
                        this.addScore(enemy.scoreValue);
                        this.addCombo();

                        // Drop currency
                        if (Math.random() < 0.3) {
                            this.powerUps.push(new PowerUp(this, enemy.x, enemy.y, 'currency'));
                        }

                        // Drop power-ups
                        if (Math.random() < 0.1) {
                            const types = ['health', 'shield', 'multishot', 'speed'];
                            const type = types[Math.floor(Math.random() * types.length)];
                            this.powerUps.push(new PowerUp(this, enemy.x, enemy.y, type));
                        }
                    }

                    this.createParticles(bullet.x, bullet.y, '#00ffff', 5);
                }
            });
        });

        // Enemy bullets vs player
        this.bullets.forEach(bullet => {
            if (bullet.team !== 'enemy') return;

            if (this.player && this.checkCircleCollision(bullet, this.player)) {
                bullet.markedForDeletion = true;
                this.player.takeDamage(bullet.damage);
                this.createParticles(bullet.x, bullet.y, '#ff0000', 8);
            }
        });

        // Enemies vs player
        this.enemies.forEach(enemy => {
            if (this.player && this.checkCircleCollision(enemy, this.player)) {
                this.player.takeDamage(enemy.damage);
                enemy.takeDamage(enemy.maxHealth);
                this.createParticles(enemy.x, enemy.y, '#ff6600', 15);
            }
        });

        // Power-ups vs player
        this.powerUps.forEach(powerUp => {
            if (this.player && this.checkCircleCollision(powerUp, this.player)) {
                powerUp.apply(this.player);
                powerUp.markedForDeletion = true;
                this.createParticles(powerUp.x, powerUp.y, powerUp.color, 10);
            }
        });
    }

    checkCircleCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < obj1.radius + obj2.radius;
    }

    addScore(points) {
        const multiplier = 1 + (this.combo * 0.1);
        this.score += Math.floor(points * multiplier);
    }

    addCombo() {
        this.combo++;
        this.comboTimer = 3000;
    }

    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this, x, y, color));
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('wave').textContent = this.wave;
        document.getElementById('currency').textContent = this.currency;

        if (this.player) {
            const healthPercent = (this.player.health / this.player.maxHealth) * 100;
            document.getElementById('healthFill').style.width = healthPercent + '%';
        }

        const comboDisplay = document.getElementById('comboDisplay');
        if (this.combo > 1) {
            comboDisplay.textContent = `${this.combo}x COMBO!`;
            comboDisplay.style.display = 'block';
        } else {
            comboDisplay.style.display = 'none';
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw starfield
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }

            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });

        if (this.state !== 'playing') return;

        // Draw particles (behind)
        this.particles.filter(p => p.layer === 'back').forEach(p => p.draw());

        // Draw power-ups
        this.powerUps.forEach(p => p.draw());

        // Draw player
        if (this.player) this.player.draw();

        // Draw enemies
        this.enemies.forEach(e => e.draw());

        // Draw bullets
        this.bullets.forEach(b => b.draw());

        // Draw particles (front)
        this.particles.filter(p => p.layer === 'front').forEach(p => p.draw());
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

class Player {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.speed = 5;
        this.health = 100;
        this.maxHealth = 100;
        this.fireTimer = 0;
        this.fireDelay = 200;
        this.shields = 0;
        this.powerUpTimers = {};
    }

    update(deltaTime) {
        // Movement
        const speed = this.speed * (1 + (this.game.upgrades.speed - 1) * 0.2);

        if (this.game.touch) {
            const dx = this.game.touch.x - this.x;
            const dy = this.game.touch.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 5) {
                this.x += (dx / distance) * speed;
                this.y += (dy / distance) * speed;
            }
        } else {
            if (this.game.keys['w'] || this.game.keys['arrowup']) this.y -= speed;
            if (this.game.keys['s'] || this.game.keys['arrowdown']) this.y += speed;
            if (this.game.keys['a'] || this.game.keys['arrowleft']) this.x -= speed;
            if (this.game.keys['d'] || this.game.keys['arrowright']) this.x += speed;
        }

        // Keep player in bounds
        this.x = Math.max(this.radius, Math.min(this.game.canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(this.game.canvas.height - this.radius, this.y));

        // Shooting
        this.fireTimer += deltaTime;
        const adjustedFireDelay = this.fireDelay / this.game.upgrades.fireRate;

        if (this.fireTimer >= adjustedFireDelay) {
            this.shoot();
            this.fireTimer = 0;
        }

        // Update power-up timers
        Object.keys(this.powerUpTimers).forEach(key => {
            this.powerUpTimers[key] -= deltaTime;
            if (this.powerUpTimers[key] <= 0) {
                delete this.powerUpTimers[key];
            }
        });
    }

    shoot() {
        // Find nearest enemy for targeting
        let target = null;
        let minDist = Infinity;

        this.game.enemies.forEach(enemy => {
            const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (dist < minDist) {
                minDist = dist;
                target = enemy;
            }
        });

        // Default shoot upward if no target
        let angle = -Math.PI / 2;

        if (target) {
            angle = Math.atan2(target.y - this.y, target.x - this.x);
        } else if (!this.game.isMobile) {
            angle = Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x);
        }

        const damage = 10 * this.game.upgrades.damage;
        const shots = this.game.upgrades.multiShot;
        const spread = 0.3;

        for (let i = 0; i < shots; i++) {
            const shotAngle = angle + (i - (shots - 1) / 2) * spread;
            this.game.bullets.push(new Bullet(this.game, this.x, this.y, shotAngle, damage, 'player'));
        }
    }

    takeDamage(amount) {
        if (this.shields > 0) {
            this.shields--;
            return;
        }

        this.health -= amount;
        this.game.createParticles(this.x, this.y, '#ff0000', 5);
    }

    draw() {
        const ctx = this.game.ctx;

        // Shield
        if (this.shields > 0) {
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Ship body
        ctx.save();
        ctx.translate(this.x, this.y);

        // Main body
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(-this.radius * 0.6, this.radius);
        ctx.lineTo(this.radius * 0.6, this.radius);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = '#00cc00';
        ctx.fillRect(-this.radius * 0.8, this.radius * 0.2, this.radius * 0.4, this.radius * 0.5);
        ctx.fillRect(this.radius * 0.4, this.radius * 0.2, this.radius * 0.4, this.radius * 0.5);

        ctx.restore();

        // Engine trail
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = `rgba(0, 255, 255, ${0.3 - i * 0.1})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y + this.radius + i * 5, this.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class Enemy {
    constructor(game, x, y, type) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.markedForDeletion = false;

        // Type-specific properties
        switch(type) {
            case 'basic':
                this.radius = 15;
                this.speed = 2;
                this.health = 30;
                this.maxHealth = 30;
                this.damage = 10;
                this.scoreValue = 10;
                this.color = '#ff0000';
                break;
            case 'fast':
                this.radius = 12;
                this.speed = 4;
                this.health = 20;
                this.maxHealth = 20;
                this.damage = 5;
                this.scoreValue = 15;
                this.color = '#ff6600';
                break;
            case 'tank':
                this.radius = 25;
                this.speed = 1;
                this.health = 100;
                this.maxHealth = 100;
                this.damage = 20;
                this.scoreValue = 30;
                this.color = '#cc0000';
                break;
            case 'shooter':
                this.radius = 18;
                this.speed = 1.5;
                this.health = 40;
                this.maxHealth = 40;
                this.damage = 5;
                this.scoreValue = 25;
                this.color = '#ff00ff';
                this.fireTimer = 0;
                this.fireDelay = 2000;
                break;
        }
    }

    update(deltaTime) {
        if (!this.game.player) return;

        // Move toward player
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 100 || this.type === 'shooter') {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        // Shooter enemies shoot
        if (this.type === 'shooter') {
            this.fireTimer += deltaTime;
            if (this.fireTimer >= this.fireDelay) {
                this.shoot();
                this.fireTimer = 0;
            }
        }
    }

    shoot() {
        const angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
        this.game.bullets.push(new Bullet(this.game, this.x, this.y, angle, 15, 'enemy'));
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.markedForDeletion = true;
            this.game.createParticles(this.x, this.y, this.color, 20);
        }
    }

    draw() {
        const ctx = this.game.ctx;

        // Enemy body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Health bar
        const barWidth = this.radius * 2;
        const barHeight = 4;
        const healthPercent = this.health / this.maxHealth;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(this.x - barWidth / 2, this.y - this.radius - 10, barWidth, barHeight);

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x - barWidth / 2, this.y - this.radius - 10, barWidth * healthPercent, barHeight);

        // Type indicator
        if (this.type === 'shooter') {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class Bullet {
    constructor(game, x, y, angle, damage, team) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 10;
        this.radius = 5;
        this.damage = damage;
        this.team = team;
        this.markedForDeletion = false;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }

    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;

        // Remove if out of bounds
        if (this.x < 0 || this.x > this.game.canvas.width ||
            this.y < 0 || this.y > this.game.canvas.height) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        const ctx = this.game.ctx;

        // Trail
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = this.team === 'player' ? '#00ffff' : '#ff00ff';
        ctx.beginPath();
        ctx.arc(this.x - this.vx * 2, this.y - this.vy * 2, this.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Bullet
        ctx.fillStyle = this.team === 'player' ? '#00ffff' : '#ff00ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.team === 'player' ? '#00ffff' : '#ff00ff';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Particle {
    constructor(game, x, y, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.markedForDeletion = false;
        this.layer = Math.random() > 0.5 ? 'front' : 'back';
    }

    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        if (this.life <= 0) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        const ctx = this.game.ctx;
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class PowerUp {
    constructor(game, x, y, type) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 15;
        this.markedForDeletion = false;
        this.rotation = 0;
        this.pulsePhase = 0;

        switch(type) {
            case 'health':
                this.color = '#00ff00';
                break;
            case 'shield':
                this.color = '#00ffff';
                break;
            case 'multishot':
                this.color = '#ffff00';
                break;
            case 'speed':
                this.color = '#ff00ff';
                break;
            case 'currency':
                this.color = '#ffaa00';
                this.radius = 10;
                break;
        }
    }

    update(deltaTime) {
        this.rotation += 0.05;
        this.pulsePhase += 0.05;
    }

    apply(player) {
        switch(this.type) {
            case 'health':
                player.health = Math.min(player.maxHealth, player.health + 30);
                break;
            case 'shield':
                player.shields = Math.min(3, player.shields + 1);
                break;
            case 'currency':
                this.game.currency += 10;
                break;
        }
    }

    draw() {
        const ctx = this.game.ctx;
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.2;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        // Shape based on type
        if (this.type === 'currency') {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * pulse, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.radius * pulse, -this.radius * pulse,
                        this.radius * 2 * pulse, this.radius * 2 * pulse);
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

// Initialize game
window.addEventListener('load', () => {
    new Game();
});
