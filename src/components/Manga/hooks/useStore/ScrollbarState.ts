export const ScrollbarState = {
  /** 滚动条 */
  scrollbar: {
    /** 滚动条提示文本 */
    tipText: '',
    /** 滚动条高度比率 */
    dragHeight: 0,
    /** 滚动条所处高度比率 */
    dragTop: 0,
  },

  /**
   * 用于防止滚轮连续滚动导致过快触发事件的锁
   *
   * - 在缩放时开启，结束缩放一段时间后关闭。开启时禁止翻页。
   * - 在首次触发结束页时开启，一段时间关闭。开启时禁止触发结束页的上下话切换功能。
   */
  scrollLock: false,
};
