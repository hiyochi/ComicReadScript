import clsx from 'clsx';
import type { Draft } from 'immer';
import type { SyntheticEvent } from 'react';
import { memo, useEffect, useRef, useCallback, useMemo } from 'react';
import { useStore } from '../hooks/useStore';

import classes from '../index.module.css';

/**
 * 漫画图片
 *
 * @param img 图片数据
 */
export const ComicImg: React.FC<ComicImg> = memo(
  ({ index, loadType, src, type }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImgLoaded = useCallback(() => {
      useStore.setState((state) => {
        if (!imgRef.current) return;

        const draftImg = state.imgList[index];
        draftImg.loadType = 'loaded';
        draftImg.height = imgRef.current.naturalHeight;
        draftImg.width = imgRef.current.naturalWidth;
        state.img.updateImgType(draftImg);
      });
    }, [index]);

    const handleImgError = useCallback(
      (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if ((e.target as HTMLImageElement).getAttribute('src') === '') return;
        useStore.setState((state) => {
          const draftImg = state.imgList[index];
          draftImg.loadType = 'error';
          draftImg.error = e as Draft<SyntheticEvent<HTMLImageElement, Event>>;
        });
      },
      [index],
    );

    // 页数发生变动时，预加载当前页前后指定数量的图片，并取消加载其他加载中的图片
    const activeImgIndex = useStore((state) => state.activeImgIndex);
    const preloadImgNum = useStore((state) => state.option.preloadImgNum);
    const imgSrc = useMemo(
      () =>
        loadType === 'loaded' ||
        loadType === 'loading' ||
        (index > activeImgIndex - preloadImgNum / 2 &&
          index < activeImgIndex + preloadImgNum)
          ? src
          : '',
      [activeImgIndex, index, loadType, src, preloadImgNum],
    );

    // 更新图片状态
    useEffect(() => {
      useStore.setState((state) => {
        if (state.imgList[index].loadType !== 'loaded')
          state.imgList[index].loadType = imgSrc ? 'loading' : 'wait';
      });
    }, [index, imgSrc]);

    return (
      <img
        ref={imgRef}
        src={imgSrc}
        data-type={loadType}
        alt={`${index}`}
        className={clsx(classes.img, classes[type])}
        onLoad={handleImgLoaded}
        onError={handleImgError}
      />
    );
  },
);
