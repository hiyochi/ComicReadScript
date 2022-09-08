import { castDraft } from 'immer';
import { throttle } from 'lodash';
import type { KeyboardEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { shallow, useStore } from './useStore';

const selector = ({
  //
  initSwiper,
  swiper,
  option: { 卷轴模式 },
  img: { initImg, windowResize },
}: SelfState) => ({
  initImg,
  initSwiper,
  windowResize,
  swiper,
  卷轴模式,
});

export type InitData = {
  fillEffect?: FillEffect;
  option?: Partial<Option>;
};

/**
 * 初始化
 *
 * @param imgUrlList 图片列表
 * @param initData 初始化选项
 */
export const useInit = (imgUrlList: string[], initData?: InitData) => {
  const { initImg, initSwiper, windowResize, swiper, 卷轴模式 } = useStore(
    selector,
    shallow,
  );

  const refInitDara = useRef(initData);

  // 初始化 swiper、panzoom
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    useStore.setState((state) => {
      state.rootRef = castDraft(rootRef);
      if (refInitDara.current?.option)
        Object.assign(state.option, refInitDara.current?.option);
    });

    const [_swiper, _panzoom] = initSwiper();
    useStore.setState((state) => {
      state.swiper = castDraft(_swiper);
      state.panzoom = _panzoom;
    });

    windowResize(window.innerWidth, window.innerHeight);

    // 在窗口大小发生改变时修改对应状态
    window.addEventListener(
      'resize',
      throttle(() => {
        windowResize(window.innerWidth, window.innerHeight);
      }, 100),
    );

    // 仅执行一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 初始化图片相关
  useEffect(() => {
    initImg(imgUrlList, refInitDara.current?.fillEffect);
  }, [imgUrlList, initImg]);

  const [scrollLock, setScrollLock] = useState<number | null>(null);
  /** 处理滚动操作 */
  const handleScroll = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (swiper === undefined) return;

      if (!卷轴模式) {
        if (!swiper.allowTouchMove) {
          // 在放大模式下通过滚轮缩小至原尺寸后，不会立刻跳转至下一页
          if (scrollLock) clearTimeout(scrollLock);
          setScrollLock(
            window.setTimeout(() => {
              if (swiper.allowTouchMove) setScrollLock(null);
            }, 500),
          );
        } else if (!event.altKey && !scrollLock) {
          if (event.deltaY > 0) swiper.slideNext(0);
          else swiper.slidePrev(0);
        }
      }
    },
    [scrollLock, swiper, 卷轴模式],
  );

  /** 处理键盘操作 */
  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (swiper === undefined) return;

      switch (e.key) {
        case 'PageUp':
        case 'ArrowUp':
        case 'ArrowRight':
        case '.':
          swiper.slidePrev(0);
          break;

        case ' ':
        case 'PageDown':
        case 'ArrowDown':
        case 'ArrowLeft':
        case ',':
          swiper.slideNext(0);
          break;

        default:
          break;
      }
    },
    [swiper],
  );

  useEffect(() => {
    useStore.setState((state) => {
      state.handleScroll = handleScroll;
      state.handleKeyUp = handleKeyUp;
    });
  }, [handleKeyUp, handleScroll]);

  return rootRef;
};
