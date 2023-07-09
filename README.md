![示例](/docs/images/页面填充示例.webp)

<p align="center">
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread"><img src="https://img.shields.io/greasyfork/v/374903"></a>
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread"><img src="https://img.shields.io/greasyfork/dt/374903"></a>
  <a href="https://sleazyfork.org/zh-CN/scripts/374903-comicread/feedback"><img src="https://img.shields.io/greasyfork/rating-count/374903"></a>
  <a href="https://github.com/hymbz/ComicReadScript/issues"><img src="https://img.shields.io/github/issues/hymbz/ComicReadScript"></a>
</p>

## 简介

这是一个因为目前大部分漫画站都不支持双页显示，所以每次遇到 **漫画中的跨页大图被分割成两页** 就很不爽的人为了有更好的漫画阅读体验而写的油猴脚本，为主流漫画站增加了**双页阅读模式**和优化体验的增强功能。

脚本会在网页右下角弹出用于 **进入阅读模式** 的悬浮按钮，其上的快捷按钮用于切换站点增强功能的开启与否，脚本默认开启了**自动进入阅读模式**的功能，也可在这里关闭。脚本没有全局设置，所有修改都只会在当前站点生效保存。~~反正平时也就只上那几个站点~~

对于支持站点以外的网站，如果能够在一个页面内显示所有漫画页图片一屏到底的话，可以使用「[简易漫画阅读模式](#简易漫画阅读模式)」直接阅读，否则的话欢迎 [反馈](issues) 申请增加支持。

> 如果喜欢这种阅读模式，也想用来看**本地漫画**的话，欢迎使用「[ComicRead PWA](https://comic-read.pages.dev/)」，只要打开网页拖入本地漫画即可获得完全一致的体验

## 安装

1. 首先需要在浏览器上装好 [Violentmonkey](https://violentmonkey.github.io/)、[Tampermonkey](https://tampermonkey.net/) 之类的油猴扩展
2. 然后通过 GreasyFork 安装脚本：[点我](https://sleazyfork.org/zh-CN/scripts/374903-comicread)

## 阅读模式快捷键

| 操作 | 快捷键 |
| -------- | ------- |
| 翻页 | `滚轮` `空格` `wasd` `方向键` `,.` `PageUp/PageDown` |
| 进入缩放模式 | `鼠标双击` `Alt + 滚轮` |
| 跳到漫画首尾 | `Home` / `End` |
| 切换页面填充 | `/` `m` `z` |
| 退出阅读模式 | `Esc` |

## 页面填充

> **省流：当跨页图被分割成两页且没有正确合并显示时，切换一下开启状态即可**

如果你在用双页模式阅读漫画时完全没有违和感，不追求漫画左右页的位置正确，那不需要了解也完全没事。反倒是在了解后可能就会因为意识到违和感的存在，并在阅读少部分漫画时因为不管怎么调整都觉得不对而浑身难受。

但如果你追求接近翻阅实体书的体验、希望了解页面填充功能，并且**不是强迫症敏感体质**，那还是非常推荐点进「[详情](https://github.com/hymbz/ComicReadScript/docs/PageFill.md)」了解一下的。

## 简易漫画阅读模式

通过点击打开浏览器的油猴扩展菜单，点击脚本的「进入漫画阅读模式」菜单项进入。

用于在支持站点以外的网站阅读漫画。开启后，将把当前网页中显示的所有宽高均大于 500 像素的图片作为图源加载。并且之后再次进入站点会自动运行脚本在右下角弹出阅读按钮，享受和其他支持站点一样的体验。

## 支持网站

部分网站除适配阅读模式外，还添加了一些增强功能，具体可点击跳转查看详情

- [百合会](#百合会)
  - [记录阅读进度](#记录阅读进度)
  - [关闭快捷导航的跳转](#关闭快捷导航的跳转)
  - [固定导航条](#固定导航条)
  - [修正点击页数时的跳转判定](#修正点击页数时的跳转判定)
  - 自动签到
- 百合会新站
- 动漫之家
  - 解锁隐藏漫画
- [ehentai](#ehentai)
  - [nhentai 匹配](#nhentai匹配)
- [nhentai](#nhentai)
  - [彻底屏蔽漫画](#彻底屏蔽漫画)
  - [自动翻页](#自动翻页)

<!-- supportSiteList -->

- 明日方舟泰拉记事社
- 禁漫天堂
- 拷贝漫画(copymanga)
- 漫画柜(manhuagui)
- 漫画DB(manhuadb)
- 漫画猫(manhuacat)
- 动漫屋(dm5)
- 绅士漫画(wnacg)
- mangabz
- welovemanga

<!-- supportSiteList -->

## 百合会

除了右下角的悬浮按钮外，将鼠标移动到帖子一楼的顶端也能看到一个新增的「漫画阅读」按钮

![百合会入口](/docs/images/百合会入口.jpg)

### 记录阅读进度

这个功能是用来快速回到帖子上次阅读进度的。开启后，每个帖子后面都会跟着一个跳转至上次阅读位置的TAG，点击即可跳转至上次阅读进度（阅读进度不仅包括了页数也包括了楼层数），后面跟着的数字是上次阅读后新增的回复数。

![百合会记录阅读进度功能](/docs/images/百合会记录阅读进度功能.jpg)

### 关闭快捷导航的跳转

顶部导航条的快捷导航可以方便地在各个板块之间跳转，但默认情况下只能通过鼠标悬浮的方式显示其板块菜单，直接点击的话会跳转至论坛主页，这在平板上很不方便，所以有了这个功能。功能很简单，就是关掉快捷导航的点击跳转，只保留悬浮显示菜单的功能。

### 固定导航条

快捷导航的跳转是很方便，但每次跳转都要把网页滚到顶部去就有点麻烦了。开启这个功能可以将顶部的导航条固定住，不管怎么滚动都始终保持在页面顶部。

### 修正点击页数时的跳转判定

明明在板块顶部有个“新窗”的选项来选择帖子的默认打开位置，但即使勾上了新窗，通过点击帖子后面的页数打开的页面还是会在当前页打开。开启这个功能可以补上这个缺漏。

## ehentai

![ehentai例图](/docs/images/ehentai例图.png)

除悬浮按钮外，也会在右侧边栏会增加一个「Load comic」按钮，功能和悬浮按钮一样。

### nhentai匹配

根据漫画标题匹配 nhentai 的本子，结果会以标签的形式显示在标签栏中，标签内容为 nhentai 上的漫画 ID ，鼠标悬停在标签上可以看到漫画标题。

点击标签后，标签菜单有两个选项：

1. Jump to nhentai：跳转至对应的 nhentai 网页
2. Load comic：直接在当前页加载 nhentai 的资源，加载完后可以直接用阅读模式阅读。相比 ehentai，nhentai 的资源加载更快，而且不会消耗配额

也可以直接右键标签点击「在新标签页中打开」跳至 nhentai。

> 不过目前因为 nhentai 加了 CloudFlare 的反爬风控，所以大部分情况下该功能会直接失败，需要手动进入一次 nhentai 页面刷新一下缓存才行。体感缓存很快就会失效，但目前也找不到什么好办法

## nhentai

除悬浮按钮外，也会在右侧边栏会增加一个「Load comic」按钮，功能和悬浮按钮一样。

### 彻底屏蔽漫画

nhentai 的屏蔽机制是在被屏蔽漫画封面加上一层半透明遮罩，所以对于那些屏蔽范围比较大的人来说，在首页或搜索结果里连续翻上几页都是满屏的被屏蔽漫画完全是家常便饭。开启此功能后，被屏蔽漫画将被彻底屏蔽，不会再出现在首页或搜索结果里了。

### 自动翻页

当网页滚动至底部时将自动在底部加载下一页的内容，加载时底部会有加载条表示正在加载，当加载条停止时表示已到最后页。
如果同时开启了「彻底屏蔽漫画」功能，将自动跳过没有结果的页面。

---

### 给老用户的碎碎念

久等了有好几年的彻底重构后的新版脚本终于更了，没记错的话应该在脚本发布后没多久就说了要重构，结果没想到居然会鸽这么久。虽然只是个油猴脚本但其实这几年我也是如鲠在喉，每次启动游戏都会想到脚本还没重构完，<del>然后玩起来就忘到脑后了，</del>所以姑且让我解释几句吧。

拖了这么长时间最主要的还是确实没时间，毕设毕业搬家求职996一条龙下来空闲时间确实不多。其次是脚本本身的迭代过多，随着前端技术的不断学习，新想法也在不断的冒出来，从整体架构到具体功能实现上改了超多版。框架从 vue 变到 react 再改到 solidjs，原本还用到了一堆外部库，但为了性能、代码大小、新功能实现等因素改成自己实现了，包括但不限于 UI 组件库、滚动条、toast 提示、拖拽支持、翻页等。因为脚本会在所有页面生效，所以为了尽量减少性能损耗，在整体架构上也改了好多次，在打包相关的代码上也花了很多时间，rollup 文档翻了不知道多少遍。除了代码本身外，在项目的目录结构、README、ci、组件样式等方面上也是纠结了好久，初版毕竟是我刚学前端时写出来的，整个项目从头到脚都是黑历史，<del>所以不是非必要我真的不想改旧版脚本，多看一眼就要抠出一栋房，</del>到现在这个项目我才感觉有点样子，可以放出来见见人。

最后提下新版的几个破坏性改动吧

- 在支持站点增加了右下角的悬浮按钮作为阅读模式按钮。原先嵌在页面上的按钮虽然和页面风格比较统一，但如果没看文档或者太久没用的话可能要找半天才能找到<del>（没错就是本人）</del>，所以干脆统一使用右下角的悬浮按钮。不过一些常用站点我自己都点习惯了所以之前的按钮还是会保留。
- 每个站点的功能设置也改成使用悬浮按钮来调整<del>（免得还要费劲构思新设置界面怎么画）</del>
