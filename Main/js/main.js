// Directionally aware header animation with GSAP ScrollTrigger
gsap.set("header.main-header", { y: -80, opacity: 0 });
ScrollTrigger.create({
	trigger: "header.main-header",
	start: "top top",
	end: "+=200",
	onEnter: () => {
		gsap.to("header.main-header", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
	},
	onLeaveBack: () => {
		gsap.to("header.main-header", { y: -80, opacity: 0, duration: 0.6, ease: "power3.in" });
	},
	toggleActions: "play none none reverse"
});
// Directionally aware navbar animation
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
	let lastX = 0;
	link.addEventListener('mouseenter', (e) => {
		const rect = link.getBoundingClientRect();
		const direction = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
		gsap.fromTo(link, {
			x: direction === 'left' ? -40 : 40,
			opacity: 0
		}, {
			x: 0,
			opacity: 1,
			duration: 0.5,
			ease: 'power3.out'
		});
	});
	link.addEventListener('mouseleave', (e) => {
		const rect = link.getBoundingClientRect();
		const direction = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
		gsap.to(link, {
			x: direction === 'left' ? -40 : 40,
			opacity: 0.5,
			duration: 0.4,
			ease: 'power3.in'
		});
		setTimeout(() => {
			gsap.to(link, { x: 0, opacity: 1, duration: 0.2 });
		}, 300);
	});
});
// GSAP effect for selection highlight
document.addEventListener('selectionchange', () => {
	const selection = document.getSelection();
	if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
		gsap.to(document.body, {backgroundColor: '#fffde7', duration: 0.3});
	} else {
		gsap.to(document.body, {backgroundColor: '#ffffff', duration: 0.3});
	}
});


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


// Example ScrollSmoother usage
// ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content"
// });

// Create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2.5, // much softer and slower catch-up for smoothness
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.05 // even softer smoothing on touch devices
});

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const portfolioItems = [
  {
    id: 1,
    category: 'UI/UX Design',
    title: 'Rupio',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 2,
    category: 'Graphic',
    title: 'Line Up',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 3,
    category: 'Landing Page',
    title: 'SakuPay',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: 'from-slate-300 to-slate-400'
  },
  {
    id: 4,
    category: 'Motion Graphic',
    title: 'Portfolio 2025',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 5,
    category: 'Mobile App Design',
    title: 'Nabung',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80',
    color: 'from-gray-300 to-gray-400'
  },
  {
    id: 6,
    category: 'Branding',
    title: 'Sipaling Spacing',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    color: 'from-blue-500 to-blue-600'
  }
];

const PortfolioCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute inset-0 bg-black/40"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 45 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Project
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <motion.p
          className="text-sm text-gray-500 mb-1"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.category}
        </motion.p>
        <motion.h3
          className="text-2xl font-bold text-gray-900"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {item.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Featured Work
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A collection of my latest projects and creative endeavors
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}