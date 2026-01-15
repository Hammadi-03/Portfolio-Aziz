// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('img');
const loaderText = document.querySelector('.loader--text');
const loaderDiv = document.querySelector('.loader');

// 1. Initial State: Hide scroll while loading
document.body.style.overflow = 'hidden';

// 2. The Loading Logic
const updateProgress = (instance) => {
    const percent = Math.round(instance.progressedCount * 100 / images.length);
    loaderText.textContent = `${percent}%`;
};

const showDemo = () => {
    // Reveal the site
    const tl = gsap.timeline();
    
    tl.to(loaderDiv, {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
            loaderDiv.style.display = 'none';
            document.body.style.overflow = 'auto';
            initAnimations(); // Start the scroll animations
        }
    });
};

// 3. Initialize horizontal scroll animations
function initAnimations() {
    gsap.utils.toArray('section').forEach((section, index) => {
        const w = section.querySelector('.wrapper');
        if (!w) return; // Skip if no wrapper

        const [x, xEnd] = (index % 2) 
            ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] 
            : [w.scrollWidth * -1, 0];

        gsap.fromTo(w, { x }, {
            x: xEnd,
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
            }
        });
    });

    // Reveal Text Effect
    const aboutTexts = gsap.utils.toArray('.reveal-text');
    aboutTexts.forEach(text => {
        gsap.to(text, {
            backgroundSize: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
            },
        });
    });
}

// 4. Trigger the loader check
if (images.length > 0) {
    imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);
} else {
    // If no images found, just show the site
    showDemo();
}


