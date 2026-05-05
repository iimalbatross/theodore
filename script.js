const herName = 'Rup'; // CHANGE THIS TO HER NAME
document.getElementById('cake-name').textContent = herName;

// ===================== PASTEL BACKGROUND HEARTS/SPARKLES =====================
const bgParticles = document.getElementById('bg-particles');
function seedBackground() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = ['❤', '❣', '💖', '💗'][Math.floor(Math.random() * 4)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${8 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.opacity = `${0.3 + Math.random() * 0.5}`;
        bgParticles.appendChild(heart);
    }
    for (let i = 0; i < 26; i++) {
        const dot = document.createElement('span');
        dot.className = 'sparkle-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 3}s`;
        dot.style.animationDuration = `${2 + Math.random() * 3}s`;
        bgParticles.appendChild(dot);
    }
}
seedBackground();

// ===================== CONFETTI =====================
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiColors = ['#e8b4b8', '#f4d1d9', '#f7e7ce', '#e6c288', '#ff8fa3', '#ce93d8', '#90caf9'];
const confettiPieces = [];
let burstPieces = [];
const confettiCount = 200;

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 10 - 5;
        this.oscillation = Math.random() * 2;
        this.oscillationSpeed = Math.random() * 0.05 + 0.02;
        this.time = 0;
    }

    update() {
        this.y += this.speed;
        this.angle += this.spin;
        this.time += this.oscillationSpeed;
        this.x += Math.sin(this.time) * this.oscillation;

        if (this.y > confettiCanvas.height + 20) {
            this.y = -20;
            this.x = Math.random() * confettiCanvas.width;
        }
    }

    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate((this.angle * Math.PI) / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        confettiCtx.restore();
    }
}

for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new ConfettiPiece());
}

let confettiActive = true;
let confettiFrameCount = 0;
const maxConfettiFrames = 500;

function animateConfetti() {
    if (!confettiActive) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });

    burstPieces = burstPieces.filter((piece) => piece.life > 0);
    burstPieces.forEach((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.08;
        piece.rotation += piece.spin;
        piece.life -= 0.02;

        confettiCtx.save();
        confettiCtx.translate(piece.x, piece.y);
        confettiCtx.rotate(piece.rotation);
        confettiCtx.globalAlpha = Math.max(piece.life, 0);
        confettiCtx.fillStyle = piece.color;
        confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
        confettiCtx.restore();
    });
    confettiCtx.globalAlpha = 1;

    confettiFrameCount++;
    if (confettiFrameCount < maxConfettiFrames || true) {
        requestAnimationFrame(animateConfetti);
    }
}

function triggerCakeConfettiBurst(originX, originY) {
    const burstCount = 90;
    for (let i = 0; i < burstCount; i++) {
        burstPieces.push({
            x: originX + (Math.random() - 0.5) * 70,
            y: originY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 6,
            vy: -(Math.random() * 5 + 2.5),
            size: Math.random() * 7 + 4,
            spin: (Math.random() - 0.5) * 0.35,
            rotation: Math.random() * Math.PI * 2,
            life: 1,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
        });
    }
}

animateConfetti();

// ===================== PARTICLES =====================
const particlesCanvas = document.getElementById('particles-canvas');
const particlesCtx = particlesCanvas.getContext('2d');
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particleTypes = ['heart', 'star', 'sparkle'];
const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -0.5 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        this.pulse = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseOffset += this.pulse;

        if (this.y < -50 || this.x < -50 || this.x > particlesCanvas.width + 50) {
            this.reset();
            this.y = particlesCanvas.height + 50;
        }
    }

    draw() {
        particlesCtx.save();
        particlesCtx.globalAlpha = this.opacity * (0.7 + 0.3 * Math.sin(this.pulseOffset));
        particlesCtx.fillStyle = '#e8b4b8';
        particlesCtx.font = `${this.size}px serif`;
        particlesCtx.textAlign = 'center';
        particlesCtx.textBaseline = 'middle';

        let symbol = '✦';
        if (this.type === 'heart') symbol = '♥';
        else if (this.type === 'star') symbol = '★';
        else if (this.type === 'sparkle') symbol = '✨';

        particlesCtx.fillText(symbol, this.x, this.y);
        particlesCtx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===================== RESIZE HANDLER =====================
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// ===================== COUNTDOWN TIMER =====================
const birthdayDate = new Date('2025-06-15T00:00:00'); // CHANGE THIS TO HER BIRTHDAY
const now = new Date();

function updateCountdown() {
    const current = new Date();
    const diff = birthdayDate - current;

    if (diff <= 0) {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('birthday-today').style.display = 'block';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===================== TYPEWRITER EFFECT =====================
const letterText = `Tum meri life ka sabse beautiful part ho. Jab se tum meri life me aayi ho, sab kuch aur special ho gaya hai. Tumhari smile meri happiness hai aur tumhari har chhoti si baat mere liye bohot important hai ❤️

Mujhe pata hai kabhi kabhi main perfect nahi hota, galtiyaan karta hoon gussa dilata hoon, lekin ek baat hamesha yaad rakhna, main tumse dil bahut se pyaar karta hoon bss khul kr bata nahi pata ❤️

Main promise karta hoon jab tak main hun hamesha tumhare saath rahunga, tumhe khush rakhne ki puri koshish karunga, aur har situation me tumhara support banunga ❤️

Tum meri ho aur hamesha meri hi rahogi ❤️

I Love You Sooooo Muchhhhh Forever and Ever Endever, Rup ❤️`;

const typewriterElement = document.getElementById('typewriter-text');
let charIndex = 0;
let typewriterStarted = false;

function typeWriter() {
    if (charIndex < letterText.length) {
        if (letterText.charAt(charIndex) === '\n') {
            typewriterElement.innerHTML += '<br><br>';
        } else {
            typewriterElement.innerHTML += letterText.charAt(charIndex);
        }
        charIndex++;
        const delay = Math.random() * 30 + 20;
        setTimeout(typeWriter, delay);
    } else {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.remove();
    }
}

// ===================== MUSIC PLAYER =====================
let isPlaying = false;
const vinyl = document.getElementById('vinyl');
const playBtn = document.getElementById('play-btn');
const birthdayAudio = document.getElementById('birthday-audio');
const progressFill = document.getElementById('progress-fill');
let progress = 35;

async function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        vinyl.classList.add('playing');
        playBtn.classList.add('playing');
        playBtn.textContent = '⏸';
        if (birthdayAudio) {
            try {
                await birthdayAudio.play();
            } catch (e) {
                // Keep visual player working even if autoplay is blocked.
            }
        }
    } else {
        vinyl.classList.remove('playing');
        playBtn.classList.remove('playing');
        playBtn.textContent = '▶';
        if (birthdayAudio) {
            birthdayAudio.pause();
        }
    }
}

// Try autoplay on load; if blocked, start on first user interaction.
async function startAudioOnLoad() {
    if (!birthdayAudio) return;
    try {
        await birthdayAudio.play();
        isPlaying = true;
        vinyl.classList.add('playing');
        playBtn.classList.add('playing');
        playBtn.textContent = '⏸';
    } catch (e) {
        const resumeOnFirstGesture = async () => {
            try {
                await birthdayAudio.play();
                isPlaying = true;
                vinyl.classList.add('playing');
                playBtn.classList.add('playing');
                playBtn.textContent = '⏸';
            } catch (err) {
                // Ignore if still blocked.
            }
            window.removeEventListener('click', resumeOnFirstGesture);
            window.removeEventListener('touchstart', resumeOnFirstGesture);
            window.removeEventListener('keydown', resumeOnFirstGesture);
        };

        window.addEventListener('click', resumeOnFirstGesture, { once: true });
        window.addEventListener('touchstart', resumeOnFirstGesture, { once: true });
        window.addEventListener('keydown', resumeOnFirstGesture, { once: true });
    }
}

window.addEventListener('load', startAudioOnLoad);

// Simulate progress
setInterval(() => {
    if (isPlaying) {
        progress += 0.1;
        if (progress > 100) progress = 0;
        progressFill.style.width = progress + '%';
    }
}, 100);

// ===================== SCROLL REVEAL =====================
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });

    // Start typewriter when letter section is visible
    const letterSection = document.getElementById('letter');
    const letterRect = letterSection.getBoundingClientRect();
    if (letterRect.top < window.innerHeight - 200 && !typewriterStarted) {
        typewriterStarted = true;
        typewriterElement.innerHTML = '<span class="cursor"></span>';
        setTimeout(() => {
            typewriterElement.innerHTML = '';
            typeWriter();
        }, 500);
    }
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===================== GIFT IMAGE WALL TOGGLE =====================
const giftButton = document.getElementById('gift-button');
const giftWall = document.getElementById('gift-wall');
giftButton.addEventListener('click', () => {
    giftWall.classList.toggle('show');
    giftButton.textContent = giftWall.classList.contains('show')
        ? 'Hide Surprise 💝'
        : 'Click for a Surprise 🎁';
});

// ===================== CLICK/TOUCH CAKE CUT =====================
const cakeWrap = document.getElementById('cake-wrap');
const cakeMessage = document.getElementById('cake-message');
function toggleCakeCut() {
    cakeWrap.classList.toggle('cut');
    cakeMessage.style.opacity = cakeWrap.classList.contains('cut') ? '1' : '0';
    if (cakeWrap.classList.contains('cut')) {
        const cakeRect = cakeWrap.getBoundingClientRect();
        const burstX = cakeRect.left + cakeRect.width / 2;
        const burstY = cakeRect.top + cakeRect.height / 2;
        triggerCakeConfettiBurst(burstX, burstY);
    }
}
cakeWrap.addEventListener('click', toggleCakeCut);
cakeWrap.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleCakeCut();
}, { passive: false });
cakeWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCakeCut();
    }
});
