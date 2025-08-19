'use client';

import { useCallback, useEffect, useState } from 'react';

type ScrollDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;

type ListenerFn = () => unknown;

function getScrollTop(target?: HTMLElement) {
  if (target) return target.scrollTop;
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop ||
    (document.documentElement && document.documentElement.scrollTop) ||
    0
  );
}

function getScrollLeft(target?: HTMLElement) {
  if (target) return target.scrollLeft;
  return (
    window.scrollX ||
    window.pageXOffset ||
    document.body.scrollLeft ||
    (document.documentElement && document.documentElement.scrollLeft) ||
    0
  );
}

function isBrowser() {
  return typeof window === 'object';
}

function addScrollListener(
  listener: ListenerFn,
  target: HTMLElement | Document = document
) {
  return target.addEventListener('scroll', listener);
}

function removeScrollListener(
  listener: ListenerFn,
  target: HTMLElement | Document = document
) {
  return target.removeEventListener('scroll', listener);
}

export interface ScrollDirectionHookResult {
  isScrolling: boolean;
  isScrollingX: boolean;
  isScrollingY: boolean;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isScrollingLeft: boolean;
  isScrollingRight: boolean;
  scrollDirection: ScrollDirection;
  scrollTargetRef: (node: HTMLElement) => void;
}

export function useScrollDirection(
  options: {
    timeout?: number;
    target?: HTMLElement;
  } = {
    timeout: 500,
  }
): ScrollDirectionHookResult {
  const [targetFromApi, setTargetFromApi] = useState<HTMLElement | undefined>();
  const [targetFromProps, setTargetFromProps] = useState<
    HTMLElement | undefined
  >();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const targetToUse = targetFromProps || targetFromApi;

  const isScrolling = scrollDirection !== null;
  const isScrollingX =
    scrollDirection === 'LEFT' || scrollDirection === 'RIGHT';
  const isScrollingY = scrollDirection === 'UP' || scrollDirection === 'DOWN';
  const isScrollingUp = scrollDirection === 'UP';
  const isScrollingDown = scrollDirection === 'DOWN';
  const isScrollingLeft = scrollDirection === 'LEFT';
  const isScrollingRight = scrollDirection === 'RIGHT';
  const timeout = options.timeout || 66;

  const scrollTargetRef = useCallback((node: HTMLElement) => {
    setTargetFromApi(node);
  }, []);

  useEffect(() => {
    setTargetFromProps(options.target);
  }, [options.target]);

  useEffect(() => {
    if (isBrowser()) {
      let scrollTimeout: number;
      let lastScrollTop = getScrollTop(targetToUse);
      let lastScrollLeft = getScrollLeft(targetToUse);

      const handleScroll = () => {
        // Reset scroll direction when scrolling stops
        window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          setScrollDirection(null);
        }, timeout);

        // Set vertical direction while scrolling
        const scrollTop = getScrollTop(targetToUse);
        if (scrollTop > lastScrollTop) {
          setScrollDirection('DOWN');
        } else if (scrollTop < lastScrollTop) {
          setScrollDirection('UP');
        }
        lastScrollTop = scrollTop;

        // Set horizontal scroll direction
        const scrollLeft = getScrollLeft(targetToUse);
        if (scrollLeft > lastScrollLeft) {
          setScrollDirection('RIGHT');
        } else if (scrollLeft < lastScrollLeft) {
          setScrollDirection('LEFT');
        }
        lastScrollLeft = scrollLeft;
      };

      addScrollListener(handleScroll, targetToUse);
      return () => removeScrollListener(handleScroll, targetToUse);
    }
    return undefined;
  }, [timeout, targetToUse]);

  return {
    isScrolling,
    isScrollingX,
    isScrollingY,
    isScrollingUp,
    isScrollingDown,
    isScrollingLeft,
    isScrollingRight,
    scrollDirection,
    scrollTargetRef,
  };
}
