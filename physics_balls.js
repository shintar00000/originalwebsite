console.log('Physics balls simulation loading...');

window.addEventListener('load', () => {
    console.log('Starting ball physics simulation');
    
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingCats = document.getElementById('loadingCats');
    const mainContent = document.getElementById('mainContent');
    
    if (!loadingScreen || !loadingCats || !mainContent) {
        console.error('Missing elements!');
        return;
    }
    
    // Physics constants
    const GRAVITY = 0.8;
    const BOUNCE_DAMPING = 0.75;
    const FRICTION = 0.98;
    const BALL_SIZE = 120;
    const MAX_BALLS = 300;
    const COLLISION_DAMPING = 0.85;
    
    let balls = [];
    let ballsCreated = 0;
    let animationRunning = true;
    
    // Ball class
    class Ball {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 4; // Random horizontal velocity
            this.vy = Math.random() * 2; // Small initial downward velocity
            this.radius = BALL_SIZE / 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = 0;
            this.settled = false;
            this.bounceCount = 0;
            this.color = this.getRandomColor();
            
            // Create DOM element
            this.element = document.createElement('div');
            this.element.className = 'physics-ball';
            this.element.style.cssText = `
                position: absolute;
                width: ${BALL_SIZE}px;
                height: ${BALL_SIZE}px;
                border-radius: 50%;
                background-image: url('image/icon.jpg');
                background-size: cover;
                background-position: center;
                border: 3px solid ${this.color};
                box-shadow: 0 0 20px ${this.color}66;
                will-change: transform;
                backface-visibility: hidden;
                transform: translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg);
            `;
            
            loadingCats.appendChild(this.element);
        }
        
        getRandomColor() {
            const colors = ['#34FFE7', '#FF57FF', '#F8FF00', '#00FFFF', '#FF6B6B', '#00FF7F', '#FF4500'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update(deltaTime) {
            if (this.settled) {
                // Very subtle idle movement for settled balls
                this.rotation += Math.sin(Date.now() * 0.0005 + this.x * 0.01) * 0.05;
                this.updateTransform();
                return;
            }
            
            // Apply gravity
            this.vy += GRAVITY * deltaTime;
            
            // Apply air resistance
            this.vx *= Math.pow(FRICTION, deltaTime);
            this.vy *= Math.pow(0.999, deltaTime);
            
            // Update position
            this.x += this.vx * deltaTime;
            this.y += this.vy * deltaTime;
            
            // Subtle rotation based on movement
            this.rotationSpeed = this.vx * 0.5;
            this.rotation += this.rotationSpeed * deltaTime;
            
            // Wall collisions
            if (this.x - this.radius <= 0) {
                this.x = this.radius;
                this.vx = Math.abs(this.vx) * BOUNCE_DAMPING;
                this.bounceCount++;
            } else if (this.x + this.radius >= window.innerWidth) {
                this.x = window.innerWidth - this.radius;
                this.vx = -Math.abs(this.vx) * BOUNCE_DAMPING;
                this.bounceCount++;
            }
            
            // Find the highest solid surface this ball can land on
            let groundLevel = window.innerHeight - this.radius;
            let supportingBalls = [];
            
            // Check all settled balls for potential landing surfaces
            balls.forEach(otherBall => {
                if (otherBall !== this && otherBall.settled) {
                    const dx = this.x - otherBall.x;
                    const dy = this.y - otherBall.y;
                    const horizontalDistance = Math.abs(dx);
                    const ballDiameter = this.radius + otherBall.radius;
                    
                    // If this ball is directly above or near another settled ball
                    if (horizontalDistance < ballDiameter * 0.95 && this.y < otherBall.y) {
                        const landingHeight = otherBall.y - ballDiameter;
                        if (landingHeight < groundLevel) {
                            groundLevel = landingHeight;
                            supportingBalls.push(otherBall);
                        }
                    }
                }
            });
            
            // Surface collision with proper stacking
            if (this.y + this.radius >= groundLevel + this.radius) {
                this.y = groundLevel;
                
                if (this.vy > 0) {
                    this.vy *= -BOUNCE_DAMPING;
                    this.vx *= FRICTION;
                    this.bounceCount++;
                    
                    // Settle if energy is low and has support
                    if (Math.abs(this.vy) < 1.2 && Math.abs(this.vx) < 0.8 && this.bounceCount > 1) {
                        this.settled = true;
                        this.vy = 0;
                        this.vx = 0;
                        this.rotationSpeed = 0;
                        
                        // Adjust position for perfect stacking if on top of another ball
                        if (supportingBalls.length > 0) {
                            const supportBall = supportingBalls[0];
                            const dx = this.x - supportBall.x;
                            const perfectDistance = this.radius + supportBall.radius;
                            
                            // Fine-tune position for stable stacking
                            if (Math.abs(dx) < perfectDistance * 0.5) {
                                // Center on top
                                this.x = supportBall.x;
                                this.y = supportBall.y - perfectDistance;
                            } else {
                                // Side stacking
                                const angle = Math.atan2(this.y - supportBall.y, dx);
                                this.x = supportBall.x + Math.cos(angle) * perfectDistance;
                                this.y = supportBall.y + Math.sin(angle) * perfectDistance;
                            }
                        }
                    }
                }
            }
            
            this.updateTransform();
        }
        
        updateTransform() {
            this.element.style.transform = `translate3d(${this.x - this.radius}px, ${this.y - this.radius}px, 0) rotate(${this.rotation}deg)`;
        }
        
        // Check collision with another ball - no overlap allowed
        checkCollision(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = this.radius + other.radius;
            
            if (distance < minDistance && distance > 0) {
                // Calculate collision normal
                const nx = dx / distance;
                const ny = dy / distance;
                
                // Completely separate balls - no overlap
                const overlap = minDistance - distance;
                
                if (this.settled && !other.settled) {
                    // If this ball is settled, only move the other ball
                    other.x -= nx * overlap;
                    other.y -= ny * overlap;
                } else if (!this.settled && other.settled) {
                    // If other ball is settled, only move this ball
                    this.x += nx * overlap;
                    this.y += ny * overlap;
                } else if (!this.settled && !other.settled) {
                    // Both moving - separate equally
                    const separateX = nx * overlap * 0.5;
                    const separateY = ny * overlap * 0.5;
                    
                    this.x += separateX;
                    this.y += separateY;
                    other.x -= separateX;
                    other.y -= separateY;
                    
                    // Calculate relative velocity
                    const rvx = this.vx - other.vx;
                    const rvy = this.vy - other.vy;
                    
                    // Calculate relative velocity along collision normal
                    const speed = rvx * nx + rvy * ny;
                    
                    // Apply collision response only if approaching
                    if (speed > 0) {
                        const impulse = speed * COLLISION_DAMPING;
                        this.vx -= impulse * nx;
                        this.vy -= impulse * ny;
                        other.vx += impulse * nx;
                        other.vy += impulse * ny;
                        
                        // Minimal rotation from collision
                        this.rotationSpeed += (other.vx - this.vx) * 0.02;
                        other.rotationSpeed += (this.vx - other.vx) * 0.02;
                    }
                }
                
                return true;
            }
            return false;
        }
        
        // Check if ball is resting on another ball (simplified)
        checkStacking(other) {
            if (!other.settled || this.settled) return false;
            
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const stackDistance = this.radius + other.radius;
            
            // If ball is touching settled ball and moving slowly
            if (distance <= stackDistance * 1.05 && Math.abs(this.vy) < 2 && Math.abs(this.vx) < 1.5) {
                // Push to exact stacking position
                const angle = Math.atan2(dy, dx);
                this.x = other.x + Math.cos(angle) * stackDistance;
                this.y = other.y + Math.sin(angle) * stackDistance;
                
                this.settled = true;
                this.vy = 0;
                this.vx = 0;
                this.rotationSpeed = 0;
                return true;
            }
            return false;
        }
    }
    
    // Create balls continuously
    function createBall() {
        if (ballsCreated >= MAX_BALLS) return;
        
        const x = Math.random() * (window.innerWidth - BALL_SIZE) + BALL_SIZE/2;
        const y = -BALL_SIZE/2 - Math.random() * 200; // Start above screen
        
        const ball = new Ball(x, y);
        balls.push(ball);
        ballsCreated++;
        
        console.log(`Ball ${ballsCreated} created`);
    }
    
    // Physics simulation loop
    let lastTime = performance.now();
    
    function physicsLoop(currentTime) {
        if (!animationRunning) return;
        
        const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2); // Cap at 2x speed
        lastTime = currentTime;
        
        // Update all balls
        balls.forEach(ball => ball.update(deltaTime));
        
        // Handle collisions between balls
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                balls[i].checkCollision(balls[j]);
            }
        }
        
        // Check stacking for unsettled balls
        balls.forEach(ball => {
            if (!ball.settled) {
                balls.forEach(other => {
                    if (other !== ball) {
                        ball.checkStacking(other);
                    }
                });
            }
        });
        
        requestAnimationFrame(physicsLoop);
    }
    
    // Start ball creation
    function startSimulation() {
        console.log('Starting ball drop simulation');
        
        // Create large initial burst of balls
        for (let i = 0; i < 25; i++) {
            setTimeout(createBall, i * 80);
        }
        
        // Continue creating balls very rapidly for 300 balls
        const creationInterval = setInterval(() => {
            if (ballsCreated < MAX_BALLS) {
                for (let i = 0; i < 4; i++) {
                    if (ballsCreated < MAX_BALLS) {
                        createBall();
                    }
                }
            } else {
                clearInterval(creationInterval);
                console.log('All 300 balls created');
            }
        }, 60);
        
        // Start physics
        requestAnimationFrame(physicsLoop);
    }
    
    // Hide loading after 3 seconds
    setTimeout(() => {
        console.log('Hiding loading screen');
        animationRunning = false;
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            
            // Initialize main app
            initializeMainApp();
        }, 1000);
    }, 3000);
    
    // Main app initialization
    function initializeMainApp() {
        console.log('Initializing main app...');
        
        // Start hero sequence
        startHeroSequence();
        
        // Initialize number counters
        initializeCounters();
    }
    
    // Hero sequence with typing effect
    async function startHeroSequence() {
        const typewriterElement = document.getElementById('typewriter');
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const heroProfile = document.getElementById('heroProfile');
        const heroCta = document.getElementById('heroCta');
        const scrollIndicator = document.getElementById('scrollIndicator');
        
        if (!typewriterElement) return;
        
        // Typing sequence
        const promptSequence = [
            '> OSHIN /',
            '> OSHIN / RUN',
            '> OSHIN / RΞN',
            '> OSHIN / RɄN',
            '> おしんが動けば、アイデアが加速する...'
        ];
        
        await runPromptSequence(typewriterElement, promptSequence);
        
        // Show elements with timing
        setTimeout(() => {
            if (heroTitle) heroTitle.classList.add('show');
        }, 500);
        
        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.classList.add('show');
        }, 800);
        
        setTimeout(() => {
            if (heroProfile) heroProfile.classList.add('show');
        }, 1100);
        
        setTimeout(() => {
            if (heroCta) heroCta.classList.add('show');
        }, 1400);
        
        setTimeout(() => {
            if (scrollIndicator) scrollIndicator.classList.add('show');
        }, 1700);
    }
    
    async function runPromptSequence(element, sequences) {
        for (let i = 0; i < sequences.length; i++) {
            const text = sequences[i];
            element.textContent = '';
            
            // Type each character
            for (let j = 0; j < text.length; j++) {
                element.textContent = text.slice(0, j + 1);
                await new Promise(resolve => setTimeout(resolve, 40));
            }
            
            // Add glitch effect
            if (i < sequences.length - 1) {
                element.parentElement.classList.add('glitch');
                await new Promise(resolve => setTimeout(resolve, 200));
                element.parentElement.classList.remove('glitch');
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        
        // Final glitch
        await new Promise(resolve => setTimeout(resolve, 800));
        element.parentElement.classList.add('glitch');
        await new Promise(resolve => setTimeout(resolve, 500));
        element.parentElement.classList.remove('glitch');
    }
    
    // Initialize number counters
    function initializeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const numbers = document.querySelectorAll('.achievement-number[data-target]');
        numbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        
        element.classList.add('counting');
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.classList.remove('counting');
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Start everything
    startSimulation();
});