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

const battery = (percent: number, width = 620, height = 230) => (
  <Layout width={width + 40} height={height} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={12}>
    <Rect width={width} height={height} radius={34} fill={C.surface} stroke={C.text} lineWidth={5}
      layout alignItems={'start'} justifyContent={'center'} padding={14}>
      <Rect width={(width - 28) * percent / 100} height={height - 28} radius={23} fill={C.accentDark} stroke={C.accent} lineWidth={2}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={`${percent}%`} fill={C.accent} fontFamily={MONO} fontSize={82} fontWeight={860}/>
      </Rect>
    </Rect>
    <Rect width={22} height={78} radius={8} fill={C.text}/>
  </Layout>
);

const strategyCard = (label: string, value: string, accent = false) => (
  <Rect width={390} height={250} radius={30} fill={C.surface} stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18} padding={26}>
    <Txt text={label} fill={C.muted} fontFamily={FONT} fontSize={26}/>
    <Txt text={value} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={48} fontWeight={830}/>
    <Txt text={'厂商策略示意'} fill={C.muted} fontFamily={FONT} fontSize={21}/>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const hookBadge = createRef<Rect>();
  const smart = createRef<Layout>();
  const smartBadge = createRef<Rect>();
  const vary = createRef<Layout>();
  const varyBadge = createRef<Rect>();
  const action = createRef<Layout>();
  const actionBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'插着电，为什么停在 80%？'} fill={C.text} fontFamily={FONT} fontSize={72} fontWeight={880}/>
      <Layout y={-45} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={34}>
        {battery(80)}
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          {chip('PLUGGED IN ✓', true)}
          <Rect ref={hookBadge} opacity={0.52}>{chip('NOT CHARGING')}</Rect>
        </Layout>
      </Layout>
      <Rect y={286} width={760} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'不一定是电池坏了'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={800}/>
      </Rect>
    </Layout>

    <Layout ref={smart} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'有些机器是在主动“限充”'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860}/>
      <Rect y={-65} width={1330} height={475} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={34} padding={40}>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={28}>
          <Icon icon={'lucide:heart-pulse'} size={72} color={C.accent}/>
          <Layout layout direction={'column'} alignItems={'start'} justifyContent={'center'} gap={8}>
            <Txt text={'SMART CHARGING'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={800}/>
            <Txt text={'减少长期满电停留'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
          </Layout>
        </Layout>
        <Layout width={1100} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
          <Rect width={1100} height={86} radius={24} fill={C.raised} padding={8} layout alignItems={'start'} justifyContent={'center'}>
            <Rect width={860} height={70} radius={18} fill={C.accentDark} stroke={C.accent} lineWidth={2}/>
          </Rect>
          <Layout width={1100} layout direction={'row'} justifyContent={'space-between'}>
            <Txt text={'0%'} fill={C.muted} fontFamily={MONO} fontSize={22}/>
            <Txt text={'80% LIMIT'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={800}/>
            <Txt text={'100%'} fill={C.muted} fontFamily={MONO} fontSize={22}/>
          </Layout>
        </Layout>
      </Rect>
      <Rect ref={smartBadge} y={286} width={820} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'主动限制最高电量，不是“充不进去”'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={760}/>
      </Rect>
    </Layout>

    <Layout ref={vary} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'不同厂商，不一定卡在同一个数字'} fill={C.text} fontFamily={FONT} fontSize={63} fontWeight={850}/>
      <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={34}>
        {strategyCard('设备 A', '80%', true)}
        {strategyCard('设备 B', '75–80%')}
        {strategyCard('设备 C', 'ADAPTIVE')}
      </Layout>
      <Rect ref={varyBadge} y={270} width={760} height={72} radius={23} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'80% 只是常见策略之一'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={770}/>
      </Rect>
    </Layout>

    <Layout ref={action} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'直接看你接下来要怎么用'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
        <Rect width={620} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={25} padding={30}>
          <Icon icon={'lucide:briefcase'} size={72} color={C.text}/>
          <Txt text={'马上要出门'} fill={C.muted} fontFamily={FONT} fontSize={28}/>
          <Txt text={'临时恢复满充'} fill={C.text} fontFamily={FONT} fontSize={43} fontWeight={840}/>
          {chip('NEED RANGE')}
        </Rect>
        <Rect width={620} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={25} padding={30}>
          <Icon icon={'lucide:plug-zap'} size={72} color={C.accent}/>
          <Txt text={'长期插电'} fill={C.muted} fontFamily={FONT} fontSize={28}/>
          <Txt text={'保持限制'} fill={C.text} fontFamily={FONT} fontSize={43} fontWeight={840}/>
          {chip('BATTERY HEALTH', true)}
        </Rect>
      </Layout>
      <Rect ref={actionBadge} y={286} width={900} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'先查厂商的“电池 / 充电”设置'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={790}/>
      </Rect>
    </Layout>
  </>);

  yield* all(waitFor(phase(0, 1)), delay(0.45, hookBadge().opacity(1, 0.28)));
  hook().opacity(0); smart().opacity(1);
  yield* all(waitFor(phase(1, 2)), delay(0.45, smartBadge().opacity(1, 0.3)));
  smart().opacity(0); vary().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.4, varyBadge().opacity(1, 0.3)));
  vary().opacity(0); action().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.4, actionBadge().opacity(1, 0.3)));
});
