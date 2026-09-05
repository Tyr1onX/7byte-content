import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = {
  bg: HORIZONTAL_BRAND.background,
  surface: HORIZONTAL_BRAND.surface,
  raised: HORIZONTAL_BRAND.raised,
  border: HORIZONTAL_BRAND.border,
  text: HORIZONTAL_BRAND.text,
  muted: HORIZONTAL_BRAND.muted,
  accent: HORIZONTAL_BRAND.accent,
  accentDark: HORIZONTAL_BRAND.accentDark,
  amber: '#F3C969',
  red: '#FF745F',
  blue: '#72A7FF',
};
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const badge = (text: string, color: string, fill: string) => (
  <Rect height={62} radius={20} padding={[0, 24]} fill={fill} layout alignItems={'center'} justifyContent={'center'}>
    <Txt text={text} fill={color} fontFamily={MONO} fontSize={23} fontWeight={850} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookMeter = createRef<Rect>();
  const max = createRef<Layout>();
  const maxBadge = createRef<Rect>();
  const negotiation = createRef<Layout>();
  const capCard = createRef<Rect>();
  const requestCard = createRef<Rect>();
  const acceptCard = createRef<Rect>();
  const contracted = createRef<Layout>();
  const negotiatedBadge = createRef<Rect>();
  const limits = createRef<Layout>();
  const battery = createRef<Rect>();
  const thermal = createRef<Rect>();
  const cable = createRef<Rect>();
  const lowerBadge = createRef<Rect>();
  const final = createRef<Layout>();
  const deviceFinal = createRef<Rect>();
  const protocolFinal = createRef<Rect>();
  const cableFinal = createRef<Rect>();
  const conclusion = createRef<Rect>();

  view.add(
    <>
      <Txt
        text={HORIZONTAL_BRAND.watermark.text}
        x={HORIZONTAL_BRAND.watermark.x}
        y={HORIZONTAL_BRAND.watermark.y}
        fill={C.text}
        opacity={HORIZONTAL_BRAND.watermark.opacity}
        fontFamily={MONO}
        fontSize={HORIZONTAL_BRAND.watermark.fontSize}
        fontWeight={HORIZONTAL_BRAND.watermark.fontWeight}
        letterSpacing={HORIZONTAL_BRAND.watermark.letterSpacing}
      />

      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt y={-365} text={'100W，不会硬塞进手机'} fill={C.text} fontFamily={FONT} fontSize={68} fontWeight={860} />
        <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={48}>
          <Rect width={470} height={330} radius={34} fill={C.surface} stroke={C.amber} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:plug-zap'} size={72} color={C.amber} />
            <Txt text={'USB-C CHARGER'} fill={C.text} fontFamily={MONO} fontSize={28} fontWeight={800} />
            {badge('100W MAX', C.amber, '#493D1E')}
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={74} color={C.muted} />
          <Rect width={470} height={330} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:smartphone'} size={78} color={C.accent} />
            <Txt text={'PHONE'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={820} />
            {badge('25W LIMIT', C.accent, C.accentDark)}
          </Rect>
        </Layout>
        <Rect ref={hookMeter} y={255} width={660} height={84} radius={24} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:gauge'} size={38} color={C.accent} />
          <Txt text={'NEGOTIATED  ≈ 25W'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={850} />
        </Rect>
      </Layout>

      <Layout ref={max} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'100W = 充电器的最大能力'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={58}>
          <Rect width={610} height={360} radius={34} fill={C.surface} stroke={C.amber} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Layout layout direction={'row'} alignItems={'center'} gap={18}>
              <Icon icon={'lucide:plug-zap'} size={56} color={C.amber} />
              <Txt text={'SOURCE'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={850} />
            </Layout>
            <Layout layout direction={'row'} gap={12} alignItems={'center'} justifyContent={'center'}>
              {badge('5V', C.muted, C.raised)}
              {badge('9V', C.muted, C.raised)}
              {badge('15V', C.muted, C.raised)}
              {badge('20V', C.muted, C.raised)}
            </Layout>
            <Rect ref={maxBadge} height={64} radius={20} padding={[0, 30]} fill={'#493D1E'} opacity={0}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'MAX CAPABILITY  100W'} fill={C.amber} fontFamily={MONO} fontSize={26} fontWeight={850} />
            </Rect>
          </Rect>
          <Rect width={520} height={360} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:smartphone'} size={72} color={C.accent} />
            <Txt text={'SINK / PHONE'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={820} />
            {badge('DEVICE LIMIT  25W', C.accent, C.accentDark)}
          </Rect>
        </Layout>
        <Txt y={275} text={'MAX 不是固定输出'} fill={C.muted} fontFamily={FONT} fontSize={30} fontWeight={720} />
      </Layout>

      <Layout ref={negotiation} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'USB PD：先协商，再升功率'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-35} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={26}>
          <Rect ref={capCard} width={430} height={250} radius={30} fill={C.surface} stroke={C.amber} lineWidth={3} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:list-tree'} size={52} color={C.amber} />
            <Txt text={'Source_Capabilities'} fill={C.text} fontFamily={MONO} fontSize={24} fontWeight={820} />
            <Txt text={'我能提供这些档位'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={650} />
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={58} color={C.muted} />
          <Rect ref={requestCard} width={390} height={250} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:hand'} size={52} color={C.accent} />
            <Txt text={'Request'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={840} />
            <Txt text={'我要这一档'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={650} />
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={58} color={C.muted} />
          <Rect ref={acceptCard} width={390} height={250} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:badge-check'} size={52} color={C.accent} />
            <Txt text={'Accept'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={840} />
            <Txt text={'建立供电合约'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={650} />
          </Rect>
        </Layout>
        <Rect y={255} width={850} height={82} radius={24} fill={C.raised} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'不是“100W 全开”，而是双方先选共同支持的条件'} fill={C.muted} fontFamily={FONT} fontSize={28} fontWeight={700} />
        </Rect>
      </Layout>

      <Layout ref={contracted} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'协商完成，才按结果输出'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-50} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={52}>
          <Rect width={520} height={320} radius={34} fill={C.surface} stroke={C.amber} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:plug-zap'} size={68} color={C.amber} />
            <Txt text={'100W MAX'} fill={C.amber} fontFamily={MONO} fontSize={38} fontWeight={880} />
            <Txt text={'source capability'} fill={C.muted} fontFamily={MONO} fontSize={21} />
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={78} color={C.accent} />
          <Rect width={620} height={320} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:battery-charging'} size={72} color={C.accent} />
            <Rect ref={negotiatedBadge} height={72} radius={22} padding={[0, 34]} fill={C.accentDark} opacity={0}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'NEGOTIATED  ≈ 25W'} fill={C.accent} fontFamily={MONO} fontSize={31} fontWeight={880} />
            </Rect>
            <Txt text={'example: lower than charger max'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
        </Layout>
      </Layout>

      <Layout ref={limits} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'实际功率，还可能继续变低'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-60} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={34}>
          <Rect ref={battery} width={350} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={15}>
            <Icon icon={'lucide:battery-medium'} size={58} color={C.amber} />
            <Txt text={'电量'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={800} />
            <Txt text={'charge state'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
          <Rect ref={thermal} width={350} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={15}>
            <Icon icon={'lucide:thermometer'} size={58} color={C.red} />
            <Txt text={'温度'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={800} />
            <Txt text={'thermal limit'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
          <Rect ref={cable} width={350} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={15}>
            <Icon icon={'lucide:cable'} size={58} color={C.blue} />
            <Txt text={'线材'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={800} />
            <Txt text={'cable capability'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
        </Layout>
        <Rect ref={lowerBadge} y={245} width={680} height={88} radius={25} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:gauge'} size={40} color={C.accent} />
          <Txt text={'ACTUAL POWER  ≤  DEVICE LIMIT'} fill={C.accent} fontFamily={MONO} fontSize={27} fontWeight={850} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'充多快，看这三件事'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860} />
        <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
          <Rect ref={deviceFinal} width={330} height={210} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:smartphone'} size={54} color={C.accent} />
            <Txt text={'设备'} fill={C.text} fontFamily={FONT} fontSize={32} fontWeight={820} />
          </Rect>
          <Txt text={'×'} fill={C.muted} fontFamily={MONO} fontSize={52} fontWeight={800} />
          <Rect ref={protocolFinal} width={330} height={210} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:handshake'} size={54} color={C.amber} />
            <Txt text={'协议'} fill={C.text} fontFamily={FONT} fontSize={32} fontWeight={820} />
          </Rect>
          <Txt text={'×'} fill={C.muted} fontFamily={MONO} fontSize={52} fontWeight={800} />
          <Rect ref={cableFinal} width={330} height={210} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:cable'} size={54} color={C.blue} />
            <Txt text={'线材'} fill={C.text} fontFamily={FONT} fontSize={32} fontWeight={820} />
          </Rect>
        </Layout>
        <Rect ref={conclusion} y={235} width={770} height={92} radius={26} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={16}>
          <Icon icon={'lucide:shield-check'} size={42} color={C.accent} />
          <Txt text={'100W MAX  ≠  强制输出 100W'} fill={C.accent} fontFamily={MONO} fontSize={29} fontWeight={870} />
        </Rect>
      </Layout>
    </>,
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.2),
    delay(0.25, hookMeter().opacity(1, 0.35)),
  );

  hook().opacity(0);
  max().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.35, maxBadge().opacity(1, 0.4)),
  );

  max().opacity(0);
  negotiation().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    capCard().opacity(1, 0.45),
    delay(0.75, requestCard().opacity(1, 0.45)),
    delay(1.5, acceptCard().opacity(1, 0.45)),
  );

  negotiation().opacity(0);
  contracted().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    delay(0.35, negotiatedBadge().opacity(1, 0.45)),
  );

  contracted().opacity(0);
  limits().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    battery().opacity(1, 0.4),
    delay(0.55, thermal().opacity(1, 0.4)),
    delay(1.1, cable().opacity(1, 0.4)),
    delay(1.65, lowerBadge().opacity(1, 0.4)),
  );

  limits().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(5, 6)),
    deviceFinal().opacity(1, 0.35),
    delay(0.45, protocolFinal().opacity(1, 0.35)),
    delay(0.9, cableFinal().opacity(1, 0.35)),
    delay(1.35, conclusion().opacity(1, 0.4)),
  );
});
