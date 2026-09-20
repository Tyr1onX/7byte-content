import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const badge = (text: string, fill: string = C.accentDark, color: string = C.accent) => (
  <Rect radius={18} padding={[12, 24]} fill={fill} layout alignItems={'center'} justifyContent={'center'}>
    <Txt text={text} fill={color} fontFamily={FONT} fontSize={27} fontWeight={760}/>
  </Rect>
);

const panel = (icon: string, title: string, detail: string, result: string, positive = true) => (
  <Rect width={570} height={390} radius={32} fill={C.surface} stroke={positive ? C.accent : C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24} padding={28}>
    <Icon icon={icon} size={76} color={positive ? C.accent : C.muted}/>
    <Txt text={title} fill={C.text} fontFamily={FONT} fontSize={40} fontWeight={830}/>
    <Txt text={detail} fill={C.muted} fontFamily={FONT} fontSize={27}/>
    {badge(result, positive ? C.accentDark : C.raised, positive ? C.accent : C.text)}
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);
  const hook = createRef<Layout>();
  const hookResult = createRef<Rect>();
  const local = createRef<Layout>();
  const history = createRef<Layout>();
  const removed = createRef<Rect>();
  const files = createRef<Layout>();
  const fileBadge = createRef<Rect>();
  const network = createRef<Layout>();
  const networkBadge = createRef<Rect>();
  const final = createRef<Layout>();
  const finalBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'无痕 ≠ 匿名'} fill={C.text} fontFamily={FONT} fontSize={82} fontWeight={880}/>
      <Layout y={-25} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={48}>
        {panel('lucide:history', '本机浏览历史', '关闭无痕会话后', '不保留', true)}
        {panel('lucide:globe', '网络上的活动', '网站与网络仍可能观察', '不是隐身', false)}
      </Layout>
      <Rect ref={hookResult} y={270} width={820} height={72} radius={23} fill={C.accentDark} opacity={1}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'保护本机隐私，不等于隐藏网络身份'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>

    <Layout ref={local} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'无痕：少留本机浏览记录'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Rect y={-25} width={1160} height={440} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24} padding={30}>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={22}>
          <Icon icon={'lucide:app-window'} size={60} color={C.accent}/>
          <Txt text={'无痕浏览会话'} fill={C.text} fontFamily={FONT} fontSize={42} fontWeight={830}/>
        </Layout>
        <Rect width={960} height={118} radius={22} fill={C.raised} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={28}>
          <Icon icon={'lucide:history'} size={45} color={C.muted}/>
          <Txt text={'本机历史'} fill={C.text} fontFamily={FONT} fontSize={32}/>
          <Txt text={'→'} fill={C.muted} fontFamily={MONO} fontSize={36}/>
          {badge('会话结束后不保留')}
        </Rect>
        <Txt text={'浏览时仍会临时使用 Cookie 与网站数据'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
      </Rect>
      <Rect y={275} width={670} height={72} radius={23} fill={C.raised} layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'要关闭所有无痕窗口'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={750}/>
      </Rect>
    </Layout>

    <Layout ref={history} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'关闭窗口后，普通历史不保留'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Rect y={-40} width={1120} height={425} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={26}>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:history'} size={65} color={C.muted}/>
          <Txt text={'这次的浏览历史'} fill={C.text} fontFamily={FONT} fontSize={39} fontWeight={820}/>
        </Layout>
        <Rect width={870} height={96} radius={22} fill={C.raised} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'example.com  ·  示例页面'} fill={C.muted} fontFamily={MONO} fontSize={27}/>
        </Rect>
        <Rect ref={removed} width={870} height={100} radius={22} fill={C.accentDark} opacity={0}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={20}>
          <Icon icon={'lucide:check-circle'} size={40} color={C.accent}/>
          <Txt text={'会话结束后不保留'} fill={C.accent} fontFamily={FONT} fontSize={34} fontWeight={800}/>
        </Rect>
      </Rect>
    </Layout>

    <Layout ref={files} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'但下载文件和书签可能还在'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Layout y={-35} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={60}>
        {panel('lucide:file-down', '下载的文件', '保存在设备上的文件', '不会自动删除', false)}
        {panel('lucide:bookmark', '保存的书签', '主动保存的网页入口', '仍会保留', true)}
      </Layout>
      <Rect ref={fileBadge} y={285} width={860} height={72} radius={22} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'关闭无痕窗口 ≠ 删除下载文件'} fill={C.accent} fontFamily={FONT} fontSize={30} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={network} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'无痕不会让网络活动隐身'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={28}>
        <Rect width={420} height={275} radius={30} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:app-window'} size={64} color={C.accent}/>
          <Txt text={'无痕浏览器'} fill={C.text} fontFamily={FONT} fontSize={33} fontWeight={810}/>
        </Rect>
        <Icon icon={'lucide:arrow-right'} size={52} color={C.muted}/>
        <Rect width={420} height={275} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:network'} size={64} color={C.muted}/>
          <Txt text={'学校 / 公司网络'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={810}/>
        </Rect>
        <Icon icon={'lucide:arrow-right'} size={52} color={C.muted}/>
        <Rect width={420} height={275} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:globe'} size={64} color={C.muted}/>
          <Txt text={'访问的网站'} fill={C.text} fontFamily={FONT} fontSize={33} fontWeight={810}/>
        </Rect>
      </Layout>
      <Rect ref={networkBadge} y={245} width={940} height={95} radius={24} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'可能观察活动  ·  不等于能看见全部内容'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={720}/>
      </Rect>
    </Layout>

    <Layout ref={final} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'无痕能做什么？不能做什么？'} fill={C.text} fontFamily={FONT} fontSize={63} fontWeight={850}/>
      <Layout y={-45} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={58}>
        {panel('lucide:history', '少留本机记录', '关闭会话后', '可以用无痕', true)}
        {panel('lucide:eye-off', '隐藏网络身份', '无痕不提供匿名功能', '不能只靠它', false)}
      </Layout>
      <Rect ref={finalBadge} y={285} width={850} height={72} radius={22} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'本机隐私  ≠  网络匿名'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={820}/>
      </Rect>
    </Layout>
  </>);

  yield* waitFor(phase(0, 1));
  hook().opacity(0); local().opacity(1);
  yield* waitFor(phase(1, 2));
  local().opacity(0); history().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.45, removed().opacity(1, 0.35)));
  history().opacity(0); files().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.35, fileBadge().opacity(1, 0.35)));
  files().opacity(0); network().opacity(1);
  yield* all(waitFor(phase(4, 5)), delay(0.4, networkBadge().opacity(1, 0.35)));
  network().opacity(0); final().opacity(1);
  yield* all(waitFor(phase(5, 6)), delay(0.4, finalBadge().opacity(1, 0.35)));
});
