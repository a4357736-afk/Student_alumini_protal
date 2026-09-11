import React from 'react';

// Friendly student character illustration
export function StudentAvatarIllustration({ className = "w-48 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle highlight */}
      <circle cx="100" cy="100" r="90" fill="#EFF6FF" />
      <circle cx="100" cy="100" r="80" fill="#DBEAFE" />
      
      {/* Body / Hoodie */}
      <path d="M45 190C45 150 70 135 100 135C130 135 155 150 155 190" fill="#2563EB" />
      <path d="M75 140L100 170L125 140" fill="#1D4ED8" />
      {/* Hoodie strings */}
      <path d="M92 145V175" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 145V175" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Neck */}
      <rect x="88" y="115" width="24" height="25" rx="5" fill="#FBCFE8" />
      
      {/* Head */}
      <ellipse cx="100" cy="85" rx="35" ry="40" fill="#FBCFE8" />
      
      {/* Hair */}
      <path d="M65 80C65 50 80 40 100 40C125 40 138 52 135 80C125 65 110 65 100 65C85 65 75 75 65 80Z" fill="#1E293B" />
      <path d="M65 80C60 70 65 55 75 48" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
      
      {/* Face features */}
      {/* Eyebrows */}
      <path d="M80 76C84 73 89 74 92 77" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 77C111 74 116 73 120 76" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="86" cy="84" r="3.5" fill="#0F172A" />
      <circle cx="114" cy="84" r="3.5" fill="#0F172A" />
      {/* Smile */}
      <path d="M89 98C93 105 107 105 111 98" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="78" cy="92" r="5" fill="#F472B6" fillOpacity="0.4" />
      <circle cx="122" cy="92" r="5" fill="#F472B6" fillOpacity="0.4" />
      
      {/* Sparkles */}
      <circle cx="150" cy="50" r="3" fill="#F59E0B" />
      <circle cx="45" cy="110" r="4" fill="#3B82F6" />
      <circle cx="160" cy="120" r="2.5" fill="#10B981" />
    </svg>
  );
}

// Student Thumbs Up Illustration (Review step)
export function ThumbsUpIllustration({ className = "w-48 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="88" fill="#FEF3C7" />
      <circle cx="100" cy="100" r="76" fill="#FDE68A" fillOpacity="0.5" />
      
      {/* Hoodie Body */}
      <path d="M50 190C50 155 72 140 100 140C128 140 150 155 150 190" fill="#2563EB" />
      
      {/* Head */}
      <ellipse cx="100" cy="85" rx="34" ry="38" fill="#FBCFE8" />
      
      {/* Hair */}
      <path d="M66 80C66 48 80 40 100 40C125 40 136 50 134 80C124 64 110 64 100 64C85 64 76 74 66 80Z" fill="#1E293B" />
      
      {/* Face */}
      <path d="M80 75C84 72 89 73 92 76" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 76C111 73 116 72 120 75" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="86" cy="83" r="3.5" fill="#0F172A" />
      <circle cx="114" cy="83" r="3.5" fill="#0F172A" />
      <path d="M88 96C93 105 107 105 112 96" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      
      {/* Hand with Thumbs Up */}
      <g transform="translate(130, 105)">
        <circle cx="15" cy="20" r="18" fill="#FBCFE8" />
        <path d="M10 24L10 8C10 5 14 3 17 6C20 9 20 18 20 22" fill="#FBCFE8" stroke="#EA580C" strokeWidth="1.5" />
        <rect x="5" y="20" width="16" height="18" rx="5" fill="#FBCFE8" stroke="#EA580C" strokeWidth="1.5" />
      </g>
      
      {/* Little sparkle bursts */}
      <path d="M155 70L158 60L161 70L171 73L161 76L158 86L155 76L145 73L155 70Z" fill="#F59E0B" />
    </svg>
  );
}

// 3D Books with Graduation Cap Illustration (Education step)
export function EducationBooksIllustration({ className = "w-48 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#F0FDF4" />
      
      {/* Bottom Book */}
      <rect x="40" y="145" width="120" height="24" rx="4" fill="#0284C7" />
      <rect x="44" y="150" width="112" height="14" rx="2" fill="#F8FAFC" />
      <rect x="40" y="145" width="14" height="24" rx="2" fill="#0369A1" />
      
      {/* Middle Book */}
      <rect x="50" y="125" width="105" height="22" rx="4" fill="#E11D48" />
      <rect x="54" y="130" width="97" height="12" rx="2" fill="#F8FAFC" />
      <rect x="50" y="125" width="12" height="22" rx="2" fill="#BE123C" />
      
      {/* Top Book */}
      <rect x="45" y="105" width="115" height="22" rx="4" fill="#0D9488" />
      <rect x="49" y="110" width="107" height="12" rx="2" fill="#F8FAFC" />
      <rect x="45" y="105" width="14" height="22" rx="2" fill="#0F766E" />
      
      {/* Graduation Cap */}
      <g transform="translate(10, -5)">
        {/* Cap Skull */}
        <ellipse cx="90" cy="85" rx="25" ry="12" fill="#1E293B" />
        {/* Cap Diamond */}
        <polygon points="90,55 135,72 90,88 45,72" fill="#0F172A" />
        <polygon points="90,58 130,72 90,85 50,72" fill="#1E293B" />
        {/* Tassel Button */}
        <circle cx="90" cy="72" r="3" fill="#F59E0B" />
        {/* Tassel String */}
        <path d="M90 72C105 74 118 85 118 95" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        <rect x="114" y="95" width="8" height="14" rx="2" fill="#D97706" />
      </g>
      
      {/* Ribbon / Scroll */}
      <rect x="125" y="132" width="40" height="12" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-15 125 132)" />
    </svg>
  );
}

// Student with Lightbulb Illustration (Skills / Extras step)
export function IdeaLightbulbIllustration({ className = "w-48 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" fill="#FAF5FF" />
      
      {/* Character body */}
      <path d="M55 190C55 155 75 142 100 142C125 142 145 155 145 190" fill="#7C3AED" />
      
      {/* Head */}
      <ellipse cx="100" cy="95" rx="32" ry="36" fill="#FBCFE8" />
      {/* Hair with side parting */}
      <path d="M68 90C68 62 82 52 100 52C122 52 132 62 130 90C120 75 110 75 100 75C86 75 78 84 68 90Z" fill="#312E81" />
      
      {/* Face features */}
      <circle cx="88" cy="92" r="3" fill="#0F172A" />
      <circle cx="112" cy="92" r="3" fill="#0F172A" />
      <path d="M92 104C96 110 106 110 110 104" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Glowing Lightbulb floating above */}
      <g transform="translate(125, 25)">
        <circle cx="20" cy="20" r="16" fill="#FBBF24" />
        <circle cx="20" cy="20" r="22" fill="#FDE68A" fillOpacity="0.4" />
        <path d="M15 32H25V36C25 37.5 23.5 39 22 39H18C16.5 39 15 37.5 15 36V32Z" fill="#94A3B8" />
        {/* Filament */}
        <path d="M17 22C17 17 23 17 23 22" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Rays */}
        <line x1="20" y1="-2" x2="20" y2="4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="6" x2="33" y2="10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="6" x2="7" y2="10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Campus Night / Twilight Silhouette Illustration (Landing & Success banner)
export function CampusSilhouette({ className = "w-full h-32" }) {
  return (
    <svg className={className} viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back glow */}
      <rect width="1200" height="300" fill="url(#twilightGradient)" />
      
      {/* Stars */}
      <circle cx="150" cy="40" r="2" fill="#FFFFFF" fillOpacity="0.7" />
      <circle cx="320" cy="70" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
      <circle cx="580" cy="30" r="2" fill="#FDE047" fillOpacity="0.9" />
      <circle cx="850" cy="65" r="2" fill="#FFFFFF" fillOpacity="0.7" />
      <circle cx="1020" cy="45" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />

      {/* Far Campus Skyline */}
      <path d="M0 240L100 230L120 200L140 200L150 230L260 225L280 180L320 180L340 225L480 220L510 160L550 160L580 220L720 225L750 170L780 170L810 225L950 220L980 190L1030 190L1060 220L1200 225V300H0V240Z" fill="#111C3A" fillOpacity="0.7" />

      {/* Main Historical University Facade & Clocktower in center */}
      <g fill="#0B132B">
        {/* Left Wing */}
        <rect x="420" y="160" width="140" height="140" />
        {/* Right Wing */}
        <rect x="640" y="160" width="140" height="140" />
        {/* Center Clocktower */}
        <rect x="560" y="80" width="80" height="220" />
        {/* Tower Dome & Spire */}
        <polygon points="600,10 560,80 640,80" fill="#0A0F24" />
        <line x1="600" y1="10" x2="600" y2="0" stroke="#F59E0B" strokeWidth="3" />
        
        {/* Clock Face Glowing Gold */}
        <circle cx="600" cy="115" r="14" fill="#FEF08A" />
        <line x1="600" y1="115" x2="600" y2="107" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        <line x1="600" y1="115" x2="606" y2="115" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Warm Lit Windows */}
      <g fill="#FEF08A" fillOpacity="0.85">
        <rect x="440" y="180" width="12" height="20" rx="3" />
        <rect x="470" y="180" width="12" height="20" rx="3" />
        <rect x="500" y="180" width="12" height="20" rx="3" />
        <rect x="530" y="180" width="12" height="20" rx="3" />
        
        <rect x="440" y="220" width="12" height="20" rx="3" />
        <rect x="470" y="220" width="12" height="20" rx="3" />
        <rect x="500" y="220" width="12" height="20" rx="3" />
        <rect x="530" y="220" width="12" height="20" rx="3" />

        {/* Right Wing Windows */}
        <rect x="660" y="180" width="12" height="20" rx="3" />
        <rect x="690" y="180" width="12" height="20" rx="3" />
        <rect x="720" y="180" width="12" height="20" rx="3" />
        <rect x="750" y="180" width="12" height="20" rx="3" />

        <rect x="660" y="220" width="12" height="20" rx="3" />
        <rect x="690" y="220" width="12" height="20" rx="3" />
        <rect x="720" y="220" width="12" height="20" rx="3" />
        <rect x="750" y="220" width="12" height="20" rx="3" />
      </g>

      {/* Campus Courtyard Lawn and Walkway */}
      <path d="M0 270Q600 240 1200 270V300H0V270Z" fill="#060D1E" />
      {/* Soft pathway light beam */}
      <polygon points="600,260 520,300 680,300" fill="#FEF08A" fillOpacity="0.1" />

      <defs>
        <linearGradient id="twilightGradient" x1="600" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="60%" stopColor="#1C2541" />
          <stop offset="100%" stopColor="#25355A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
