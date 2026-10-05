import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const WARNING = '#FF745F';
const phase = (from: number, to: number) => T[to] - T[from];

const metricCard = (
  label: string,
  value: string,
  sub: string,
  accent = false,
  warning = false,
  width = 620,
  height = 360,
) => (
  <Rect
    width={width}
    height={height}
    radius={32}
    fill={C.surface}
    stroke={warning ? WARNING : accent ? C.accent : C.border}
    lineWidth={2}
    layout
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    gap={20}
    padding={34}
  >
    <Txt text={label} fill={C.muted} fontFamily={MONO} fontSize={25} fontWeight={720}/>
    <Txt
      text={value}
      fill={warning ? WARNING : accent ? C.accent : C.text}
      fontFamily={MONO}
      fontSize={64}
      fontWeight={900}
    />
    <Txt text={sub} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={700}/>
  </Rect>
);

const smallMetric = (label: string, value: string, active = false) => (
  <Rect
    width={330}
    height={250}
    radius={28}
    fill={active ? C.accentDark : C.surface}
    stroke={active ? C.accent : C.border}
    lineWidth={2}
    layout
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    gap={20}
    padding={24}
  >
    <Txt text={label} fill={C.muted} fontFamily={MONO} fontSize={23} fontWeight={700}/>
    <Txt text={value} fill={active ? C.accent : C.text} fontFamily={MONO} fontSize={38} fontWeight={850}/>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const explain = createRef<Layout>();
  const explainBadge = createRef<Rect>();
  const inspect = createRef<Layout>();
  const inspectBadge = createRef<Rect>();
  const conclude = createRef<Layout>();
  const concludeBadge = createRef<Rect>();

  view.add(
    <>
      <Txt
        text={C.watermark.text}
        x={C.watermark.x}
        y={C.watermark.y}
        opacity={C.watermark.opacity}
        fill={C.text}
        fontFamily={MONO}
        fontSize={C.watermark.fontSize}
        fontWeight={C.watermark.fontWeight}
        letterSpacing={C.watermark.letterSpacing}
      />

      <Layout ref={hook} width={1920} height={1080} opacity={1}>
        <Txt
          y={-350}
          text={'测速500 Mbps，游戏为什么还会卡？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={64}
          fontWeight={880}
        />
        <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={52}>
          {metricCard('DOWNLOAD', '500 Mbps', '下载很快', true)}
          {metricCard('PING', '180 ms', '但响应仍可能很慢', false, true)}
        </Layout>
        <Rect
          y={286}
          width={820}
          height={74}
          radius={24}
          fill={C.accentDark}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'500 Mbps ≠ 低延迟'} fill={C.accent} fontFamily={FONT} fontSize={33} fontWeight={850}/>
        </Rect>
      </Layout>

      <Layout ref={explain} width={1920} height={1080} opacity={0}>
        <Txt
          y={-350}
          text={'一个看“传多少”，一个看“等多久”'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={62}
          fontWeight={860}
        />
        <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
          {metricCard('THROUGHPUT', 'Mbps', '单位时间传多少数据', true, false, 650, 390)}
          <Rect
            width={650}
            height={390}
            radius={32}
            fill={C.surface}
            stroke={C.border}
            lineWidth={2}
            layout
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={20}
            padding={34}
          >
            <Txt text={'LATENCY / RTT'} fill={C.muted} fontFamily={MONO} fontSize={25} fontWeight={720}/>
            <Icon icon={'lucide:arrow-left-right'} size={74} color={C.accent}/>
            <Txt text={'一次往返'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={850}/>
            <Txt text={'要等多久'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={700}/>
          </Rect>
        </Layout>
        <Rect
          ref={explainBadge}
          y={286}
          width={900}
          height={72}
          radius={23}
          fill={C.raised}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'下载速率高，并不会自动把往返时间变短'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760}/>
        </Rect>
      </Layout>

      <Layout ref={inspect} width={1920} height={1080} opacity={0}>
        <Txt
          y={-350}
          text={'测速时，别只看 Mbps'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={66}
          fontWeight={870}
        />
        <Layout y={-75} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          {smallMetric('DOWNLOAD', '500 Mbps')}
          {smallMetric('LATENCY', 'PING / RTT', true)}
          {smallMetric('JITTER', '波动', true)}
          {smallMetric('PACKET LOSS', '丢包', true)}
        </Layout>
        <Rect
          ref={inspectBadge}
          y={286}
          width={860}
          height={72}
          radius={23}
          fill={C.accentDark}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'实时游戏还要看延迟、抖动和丢包'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={800}/>
        </Rect>
      </Layout>

      <Layout ref={conclude} width={1920} height={1080} opacity={0}>
        <Txt
          y={-350}
          text={'同样500 Mbps，实时体验也能完全不同'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={60}
          fontWeight={850}
        />
        <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
          <Rect
            width={650}
            height={400}
            radius={32}
            fill={C.surface}
            stroke={C.accent}
            lineWidth={2}
            layout
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={18}
          >
            <Txt text={'EXAMPLE A'} fill={C.muted} fontFamily={MONO} fontSize={23}/>
            <Txt text={'500 Mbps'} fill={C.text} fontFamily={MONO} fontSize={43} fontWeight={850}/>
            <Txt text={'LOWER LATENCY'} fill={C.accent} fontFamily={MONO} fontSize={31} fontWeight={850}/>
            <Txt text={'响应更快'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={720}/>
          </Rect>
          <Rect
            width={650}
            height={400}
            radius={32}
            fill={C.surface}
            stroke={WARNING}
            lineWidth={2}
            layout
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={18}
          >
            <Txt text={'EXAMPLE B'} fill={C.muted} fontFamily={MONO} fontSize={23}/>
            <Txt text={'500 Mbps'} fill={C.text} fontFamily={MONO} fontSize={43} fontWeight={850}/>
            <Txt text={'HIGHER LATENCY / JITTER / LOSS'} fill={WARNING} fontFamily={MONO} fontSize={27} fontWeight={820}/>
            <Txt text={'体验可能更差'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={720}/>
          </Rect>
        </Layout>
        <Rect
          ref={concludeBadge}
          y={286}
          width={780}
          height={72}
          radius={23}
          fill={C.accentDark}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'下载快 ≠ 游戏网络一定好'} fill={C.accent} fontFamily={FONT} fontSize={30} fontWeight={820}/>
        </Rect>
      </Layout>
    </>,
  );

  yield* waitFor(phase(0, 1));
  hook().opacity(0);
  explain().opacity(1);
  yield* all(waitFor(phase(1, 2)), delay(0.35, explainBadge().opacity(1, 0.3)));

  explain().opacity(0);
  inspect().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.35, inspectBadge().opacity(1, 0.3)));

  inspect().opacity(0);
  conclude().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.35, concludeBadge().opacity(1, 0.3)));
});
