import {Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const metricCard = (kicker: string, value: string, sub: string, accent = false) => (
  <Rect width={640} height={390} radius={34} fill={C.surface}
    stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
    <Txt text={kicker} fill={C.muted} fontFamily={MONO} fontSize={28} fontWeight={760}/>
    <Txt text={value} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={78} fontWeight={900}/>
    <Txt text={sub} fill={C.muted} fontFamily={FONT} fontSize={26}/>
  </Rect>
);

const pingRow = (value: string, label: string, accent = false) => (
  <Rect width={430} height={86} radius={18} fill={accent ? C.accentDark : C.raised}
    stroke={accent ? C.accent : C.border} lineWidth={accent ? 2 : 1}
    layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={[14,24]}>
    <Txt text={value} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={28} fontWeight={820}/>
    <Txt text={label} fill={C.muted} fontFamily={MONO} fontSize={22}/>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const explain = createRef<Layout>();
  const explainBadge = createRef<Rect>();
  const inspect = createRef<Layout>();
  const inspectBadge = createRef<Rect>();
  const stable = createRef<Layout>();
  const stableBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y}
      opacity={C.watermark.opacity} fill={C.text} fontFamily={MONO}
      fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'测速500M，为什么打游戏还是会卡？'} fill={C.text}
        fontFamily={FONT} fontSize={64} fontWeight={880}/>
      <Layout y={-65} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={52}>
        {metricCard('DOWNLOAD', '512 Mbps', '吞吐量', true)}
        {metricCard('PING', '180 ms', '往返延迟')}
      </Layout>
      <Rect y={290} width={760} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'500M ≠ 低延迟'} fill={C.accent} fontFamily={FONT} fontSize={34} fontWeight={850}/>
      </Rect>
    </Layout>

    <Layout ref={explain} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'一个是“能传多少”，一个是“要等多久”'} fill={C.text}
        fontFamily={FONT} fontSize={61} fontWeight={860}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={62}>
        <Rect width={650} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={26} padding={34}>
          <Txt text={'THROUGHPUT'} fill={C.accent} fontFamily={MONO} fontSize={28} fontWeight={840}/>
          <Layout layout direction={'row'} alignItems={'center'} gap={16}>
            <Rect width={90} height={64} radius={12} fill={C.accent}/>
            <Rect width={90} height={64} radius={12} fill={C.accent}/>
            <Rect width={90} height={64} radius={12} fill={C.accent}/>
            <Rect width={90} height={64} radius={12} fill={C.accent}/>
          </Layout>
          <Txt text={'DATA / SECOND'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
          <Txt text={'单位时间能传多少'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={720}/>
        </Rect>

        <Rect width={650} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24} padding={34}>
          <Txt text={'ROUND TRIP'} fill={C.accent} fontFamily={MONO} fontSize={28} fontWeight={840}/>
          <Layout layout direction={'row'} alignItems={'center'} gap={20}>
            <Rect width={150} height={92} radius={18} fill={C.raised} stroke={C.border} lineWidth={1}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'YOU'} fill={C.text} fontFamily={MONO} fontSize={25} fontWeight={800}/>
            </Rect>
            <Txt text={'⇄'} fill={C.accent} fontFamily={MONO} fontSize={62} fontWeight={900}/>
            <Rect width={230} height={92} radius={18} fill={C.raised} stroke={C.border} lineWidth={1}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'GAME SERVER'} fill={C.text} fontFamily={MONO} fontSize={24} fontWeight={800}/>
            </Rect>
          </Layout>
          <Txt text={'PING / LATENCY'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
          <Txt text={'一次交互要等多久'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={720}/>
        </Rect>
      </Layout>
      <Rect ref={explainBadge} y={292} width={820} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'下载再快，也不能把往返等待变成 0'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={780}/>
      </Rect>
    </Layout>

    <Layout ref={inspect} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'排查游戏卡顿，先看真正的 PING'} fill={C.text}
        fontFamily={FONT} fontSize={63} fontWeight={860}/>
      <Layout y={-60} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={56}>
        <Rect width={560} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={28}>
          <Txt text={'SPEED TEST'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
          <Txt text={'512 Mbps'} fill={C.text} fontFamily={MONO} fontSize={62} fontWeight={900}/>
          <Txt text={'测试节点'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
        </Rect>
        <Txt text={'≠'} fill={C.muted} fontFamily={MONO} fontSize={72} fontWeight={900}/>
        <Rect width={650} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Txt text={'GAME NETWORK'} fill={C.accent} fontFamily={MONO} fontSize={24} fontWeight={820}/>
          <Txt text={'PING 180 ms'} fill={C.accent} fontFamily={MONO} fontSize={58} fontWeight={900}/>
          <Txt text={'到游戏服务器'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={700}/>
        </Rect>
      </Layout>
      <Rect ref={inspectBadge} y={292} width={760} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'测速节点 ≠ 游戏服务器'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={stable} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'还要看延迟稳不稳定'} fill={C.text}
        fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={64}>
        <Rect width={580} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
          <Txt text={'STABLE'} fill={C.muted} fontFamily={MONO} fontSize={24}/>
          {pingRow('42 ms', 'PING')}
          {pingRow('45 ms', 'PING')}
          {pingRow('43 ms', 'PING')}
        </Rect>
        <Rect width={580} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
          <Txt text={'JITTER ↑'} fill={C.accent} fontFamily={MONO} fontSize={24} fontWeight={820}/>
          {pingRow('42 ms', 'PING')}
          {pingRow('160 ms', 'PING', true)}
          {pingRow('55 ms', 'PING')}
        </Rect>
      </Layout>
      <Rect ref={stableBadge} y={292} width={920} height={72} radius={23} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'Ping 忽高忽低，再看抖动和 PACKET LOSS'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={770}/>
      </Rect>
    </Layout>
  </>);

  yield* waitFor(phase(0, 1));

  hook().opacity(0);
  explain().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.35, explainBadge().opacity(1, 0.3)),
  );

  explain().opacity(0);
  inspect().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    delay(0.35, inspectBadge().opacity(1, 0.3)),
  );

  inspect().opacity(0);
  stable().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    delay(0.35, stableBadge().opacity(1, 0.3)),
  );
});
