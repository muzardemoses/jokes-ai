// 'use client';

import Spline from '@splinetool/react-spline/next';

// import { Suspense, useEffect, useState } from 'react';

// Component to detect crawler
// const useIsCrawler = () => {
//   const [isCrawler, setIsCrawler] = useState(true); // Default to true for SSR

//   useEffect(() => {
//     // Check if the user agent is a crawler
//     const userAgent = navigator.userAgent.toLowerCase();
//     const crawlers = [
//       'googlebot',
//       'bingbot',
//       'slurp',
//       'duckduckbot',
//       'baiduspider',
//       'yandexbot',
//     ];
//     const isBot = crawlers.some((crawler) => userAgent.includes(crawler));
//     setIsCrawler(isBot);
//   }, []);

//   return isCrawler;
// };

// Hero content component
const HeroContent = () => (
  <div className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 className="mb-2 text-7xl font-bold leading-none text-jkpink md:mb-0 md:text-8xl">
      Jasmin Karatas
    </h1>
    <p className="text-jkpink/80">
      Builds games, gamified products, workshops and services based on emotions
      and creativity.
    </p>
  </div>
);

// Wrapper component for Spline that only renders on client side
// const SplineWrapper = () => {
//     const [isClient, setIsClient] = useState(false);
  
//     useEffect(() => {
//       setIsClient(true);
//     }, []);
  
//     if (!isClient) return null;
  
//     return (
//       <Spline scene="https://prod.spline.design/4el-qyxhOAjpQJ2Z/scene.splinecode" />
//     );
//   };
  

function HeroSection() {
    // const isCrawler = useIsCrawler();
  
    return (
      <div className="relative h-screen">
        <HeroContent />
  
        {/* If not a crawler, load Spline */}
        {/* {!isCrawler ? (
          <Suspense fallback={null}>
            <SplineWrapper />
          </Suspense>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p>Interactive 3D content is not available for crawlers.</p>
          </div>
        )} */}
        <Spline scene="https://prod.spline.design/HsgqcVtbCWVzfEyF/scene.splinecode" />
  
        {/* <noscript>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <HeroContent />
          </div>
        </noscript> */}
      </div>
    );
  }

export default HeroSection;
