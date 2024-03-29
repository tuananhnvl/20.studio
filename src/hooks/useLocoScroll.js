import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const useLocoScroll = (start) => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('.container');
    console.log(`useLocoScroll start!`)
    let locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.2,
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
    });

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    ScrollTrigger.addEventListener('refresh', lsUpdate);
    ScrollTrigger.refresh();
    console.log(`useLocoScroll complete!`)
  }, [start]);
};

export default useLocoScroll;