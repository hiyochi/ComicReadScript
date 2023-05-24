import MdLooksOne from '@material-design-icons/svg/round/looks_one.svg';
import MdLooksTwo from '@material-design-icons/svg/round/looks_two.svg';
import MdViewDay from '@material-design-icons/svg/round/view_day.svg';
import MdQueue from '@material-design-icons/svg/round/queue.svg';
import MdSettings from '@material-design-icons/svg/round/settings.svg';
import MdSearch from '@material-design-icons/svg/round/search.svg';

import type { Component } from 'solid-js';
import { createSignal, createMemo } from 'solid-js';
import { setState, store } from './hooks/useStore';
import { IconButton } from '../IconButton';
import { SettingPanel } from './components/SettingPanel';

import classes from './index.module.css';
import {
  activeImgIndex,
  handleMangaFlowScroll,
  nowFillIndex,
  setOption,
  switchFillEffect,
  updatePageData,
} from './hooks/useStore/slice';

interface DefaultSettingsButtonProps {
  /** 触发鼠标离开工具栏的事件 */
  onMouseLeave: () => void;
}

export type ToolbarButtonList = Component<DefaultSettingsButtonProps>[];

/** 工具栏按钮分隔栏 */
export const buttonListDivider: Component = () => (
  <div style={{ height: '1em' }} />
);

/** 工具栏的默认按钮列表 */
export const defaultButtonList: ToolbarButtonList = [
  // 单双页模式
  () => (
    <IconButton
      tip={store.option.onePageMode ? '单页模式' : '双页模式'}
      hidden={store.option.scrollMode}
      onClick={() => {
        setState((state) => {
          setOption((draftOption) => {
            draftOption.onePageMode = !draftOption.onePageMode;
          });
          updatePageData(state);
          state.activePageIndex = state.option.onePageMode
            ? activeImgIndex()
            : state.pageList.findIndex((page) =>
                page.includes(activeImgIndex()),
              );
        });
      }}
    >
      {store.option.onePageMode ? <MdLooksOne /> : <MdLooksTwo />}
    </IconButton>
  ),
  // 卷轴模式
  () => (
    <IconButton
      tip="卷轴模式"
      enabled={store.option.scrollMode}
      onClick={() => {
        store.panzoom?.smoothZoomAbs(0, 0, 1);
        setState((state) => {
          state.activePageIndex = 0;
          setOption((draftOption) => {
            draftOption.scrollMode = !draftOption.scrollMode;
            draftOption.onePageMode = draftOption.scrollMode;
          });
          updatePageData(state);
        });
        setTimeout(handleMangaFlowScroll);
      }}
    >
      <MdViewDay />
    </IconButton>
  ),
  // 页面填充
  () => (
    <IconButton
      tip="页面填充"
      enabled={store.fillEffect[nowFillIndex()]}
      hidden={store.option.onePageMode}
      onClick={switchFillEffect}
    >
      <MdQueue />
    </IconButton>
  ),
  buttonListDivider,
  // 放大模式
  () => (
    <IconButton
      tip="放大模式"
      enabled={store.isZoomed}
      onClick={() => {
        if (!store.panzoom) return;
        const { scale } = store.panzoom.getTransform();

        if (scale === 1) store.panzoom.smoothZoom(0, 0, 1.2);
        else store.panzoom.smoothZoomAbs(0, 0, 1);
      }}
    >
      <MdSearch />
    </IconButton>
  ),
  // 设置
  (props) => {
    const [showPanel, setShowPanel] = createSignal(false);

    const handleClick = () => {
      const _showPanel = !showPanel();
      setState((state) => {
        state.showToolbar = _showPanel;
      });
      setShowPanel(_showPanel);
      props.onMouseLeave();
    };

    const popper = createMemo(() => (
      <>
        <SettingPanel />
        <div
          class={classes.closeCover}
          onClick={handleClick}
          role="button"
          tabIndex={-1}
          aria-label="关闭设置弹窗的遮罩"
        />
      </>
    ));

    return (
      <IconButton
        tip="设置"
        enabled={showPanel()}
        showTip={showPanel()}
        onClick={handleClick}
        popperClassName={showPanel() && classes.SettingPanelPopper}
        popper={showPanel() && popper()}
      >
        <MdSettings />
      </IconButton>
    );
  },
];
