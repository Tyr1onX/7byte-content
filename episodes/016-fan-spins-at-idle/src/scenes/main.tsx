import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const chip = (text: string, accent = false) => (
  <Rect radius={18} padding={[11, 20]} fill={accent ? C.accentDark : C.raised}
    stroke={accent ? C.accent : C.border} lineWidth={accent ? 2 : 1}
    layout alignItems={'center'} justifyContent={'center'}>
    <Txt text={text} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={25} fontWeight={760}/>
  </Rect>
);

const activityBar = (width: number, accent = false) => (
  <Rect width={430} height={34} radius={15} fill={C.raised} padding={5} layout alignItems={'start'} justifyContent={'center'}>
    <Rect width={width} height={24} radius={11} fill={accent ? C.accent : C.muted} opacity={accent ? 1 : 0.48}/>
  </Rect>
);

const processRow = (icon: string, label: string, width: number, accent = false) => (
  <Layout width={1150} height={104} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={24}>
    <Layout width={560} layout direction={'row'} alignItems={'center'} gap={22}>
      <Icon icon={icon} size={44} color={accent ? C.accent : C.text}/>
      <Txt text={label} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={700}/>
    </Layout>
    {activityBar(width, accent)}
  </Layout>
);

const decisionCard = (icon: string, kicker: string, result: string, accent = false) => (
  <Rect width={620} height={400} radius={32} fill={C.surface} stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24} padding={34}>
    <Icon icon={icon} size={70} color={accent ? C.accent : C.text}/>
    <Txt text={kicker} fill={C.muted} fontFamily={FONT} fontSize={28}/>
    <Txt text={result} fill={accent ? C.accent : C.text} fontFamily={FONT} fontSize={42} fontWeight={840}/>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const hookPulse = createRef<Rect>();
  const background = createRef<Layout>();
  const backgroundBadge = createRef<Rect>();
  const inspect = createRef<Layout>();
  const inspectBadge = createRef<Rect>();
  const decide = createRef<Layout>();
  const decideBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'什么都没开，风扇为什么突然狂转？'} fill={C.text} fontFamily={FONT} fontSize={65} fontWeight={880}/>
      <Layout y={-65} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={42}>
        <Rect width={820} height={430} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={30} padding={36}>
          <Layout width={690} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Layout layout direction={'row'} alignItems={'center'} gap={16}>
              <Icon icon={'lucide:monitor'} size={54} color={C.text}/>
              <Txt text={'DESKTOP'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={800}/>
            </Layout>
            {chip('NO APP WINDOWS')}
          </Layout>
          <Rect width={690} height={225} radius={26} fill={C.raised} stroke={C.border} lineWidth={1}
            layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'桌面空空的'} fill={C.muted} fontFamily={FONT} fontSize={31}/>
          </Rect>
        </Rect>

        <Layout width={430} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={26}>
          <Rect width={430} height={185} radius={30} fill={C.surface} stroke={C.accent} lineWidth={2}
            layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
            <Icon icon={'lucide:cpu'} size={66} color={C.accent}/>
            <Layout layout direction={'column'} alignItems={'start'} gap={6}>
              <Txt text={'CPU'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
              <Txt text={'ACTIVITY ↑'} fill={C.accent} fontFamily={MONO} fontSize={36} fontWeight={820}/>
            </Layout>
          </Rect>
          <Rect ref={hookPulse} width={430} height={185} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.72}
            layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
            <Icon icon={'lucide:fan'} size={74} color={C.text}/>
            <Layout layout direction={'column'} alignItems={'start'} gap={6}>
              <Txt text={'FAN'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
              <Txt text={'HIGH RPM'} fill={C.text} fontFamily={MONO} fontSize={36} fontWeight={820}/>
            </Layout>
          </Rect>
        </Layout>
      </Layout>
      <Rect y={286} width={760} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'没窗口 ≠ 没任务'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={820}/>
      </Rect>
    </Layout>

    <Layout ref={background} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'后台任务也会让 CPU 忙起来'} fill={C.text} fontFamily={FONT} fontSize={65} fontWeight={860}/>
      <Rect y={-60} width={1370} height={500} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18} padding={38}>
        <Layout width={1150} layout direction={'row'} justifyContent={'space-between'}>
          <Txt text={'BACKGROUND TASKS'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
          <Txt text={'CPU ACTIVITY'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
        </Layout>
        {processRow('lucide:refresh-cw', 'Windows Update', 330, true)}
        {processRow('lucide:shield-check', 'Defender Scan', 250)}
        {processRow('lucide:search', 'Search Index', 185)}
      </Rect>
      <Rect ref={backgroundBadge} y={286} width={860} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'它们不需要先打开一个窗口'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={770}/>
      </Rect>
    </Layout>

    <Layout ref={inspect} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'先别猜，直接看是谁在占 CPU'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={55}>
        <Rect width={480} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={28}>
          <Icon icon={'lucide:keyboard'} size={72} color={C.text}/>
          <Txt text={'CTRL + SHIFT + ESC'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={820}/>
          <Txt text={'打开任务管理器'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
        </Rect>
        <Rect width={820} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18} padding={32}>
          <Layout width={690} layout direction={'row'} justifyContent={'space-between'}>
            <Txt text={'PROCESS'} fill={C.muted} fontFamily={MONO} fontSize={23}/>
            <Txt text={'CPU ↓'} fill={C.accent} fontFamily={MONO} fontSize={27} fontWeight={820}/>
          </Layout>
          <Rect width={690} height={88} radius={18} fill={C.accentDark} stroke={C.accent} lineWidth={2}
            layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={[18, 26]}>
            <Txt text={'Background task'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={720}/>
            <Txt text={'HIGH'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={820}/>
          </Rect>
          <Rect width={690} height={76} radius={18} fill={C.raised}
            layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={[16, 26]}>
            <Txt text={'Other process'} fill={C.muted} fontFamily={FONT} fontSize={26}/>
            <Txt text={'LOW'} fill={C.muted} fontFamily={MONO} fontSize={23}/>
          </Rect>
        </Rect>
      </Layout>
      <Rect ref={inspectBadge} y={286} width={770} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'按 CPU 排序，看最上面是谁'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={decide} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'关键不是“响不响”，而是会不会一直高'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
        {decisionCard('lucide:clock-3', '偶尔几分钟', '先观察')}
        {decisionCard('lucide:thermometer', '长期高占用 + 高温', '继续排查', true)}
      </Layout>
      <Rect ref={decideBadge} y={286} width={860} height={72} radius={23} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'先找占用来源，再决定下一步'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>
  </>);

  yield* all(waitFor(phase(0, 1)), delay(0.35, hookPulse().opacity(1, 0.25)));
  hook().opacity(0); background().opacity(1);
  yield* all(waitFor(phase(1, 2)), delay(0.35, backgroundBadge().opacity(1, 0.28)));
  background().opacity(0); inspect().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.35, inspectBadge().opacity(1, 0.28)));
  inspect().opacity(0); decide().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.35, decideBadge().opacity(1, 0.28)));
});
