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
  red: '#FF745F',
  blue: '#72A7FF',
  amber: '#F3C969',
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
  const hookLeft = createRef<Rect>();
  const hookRight = createRef<Rect>();
  const connector = createRef<Layout>();
  const dataQ = createRef<Rect>();
  const displayQ = createRef<Rect>();
  const powerQ = createRef<Rect>();
  const data = createRef<Layout>();
  const usb2 = createRef<Rect>();
  const usb4 = createRef<Rect>();
  const display = createRef<Layout>();
  const dp = createRef<Rect>();
  const usb4Display = createRef<Rect>();
  const powerCable = createRef<Layout>();
  const pd = createRef<Rect>();
  const cable = createRef<Rect>();
  const final = createRef<Layout>();
  const dataFinal = createRef<Rect>();
  const displayFinal = createRef<Rect>();
  const powerFinal = createRef<Rect>();
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
        <Txt y={-365} text={'同样 USB-C，功能可以完全不同'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={56}>
          <Rect ref={hookLeft} width={600} height={350} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:usb'} size={72} color={C.text} />
            <Icon icon={'lucide:monitor-check'} size={68} color={C.accent} />
            {badge('DISPLAY  ✓', C.accent, C.accentDark)}
          </Rect>
          <Rect ref={hookRight} width={600} height={350} radius={34} fill={C.surface} stroke={C.red} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:usb'} size={72} color={C.text} />
            <Icon icon={'lucide:monitor-x'} size={68} color={C.red} />
            {badge('NO SIGNAL  ×', C.red, '#3B211F')}
          </Rect>
        </Layout>
        <Txt y={295} text={'外形一样  ≠  能力一样'} fill={C.muted} fontFamily={FONT} fontSize={30} fontWeight={760} />
      </Layout>

      <Layout ref={connector} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'USB-C = CONNECTOR，不是功能清单'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850} />
        <Rect y={-70} width={420} height={260} radius={36} fill={C.surface} stroke={C.accent} lineWidth={3}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
          <Icon icon={'lucide:usb'} size={92} color={C.accent} />
          <Txt text={'USB TYPE-C'} fill={C.text} fontFamily={MONO} fontSize={32} fontWeight={860} />
        </Rect>
        <Layout y={245} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Rect ref={dataQ} width={310} height={110} radius={25} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
            layout alignItems={'center'} justifyContent={'center'}><Txt text={'DATA ?'} fill={C.muted} fontFamily={MONO} fontSize={27} fontWeight={820} /></Rect>
          <Rect ref={displayQ} width={310} height={110} radius={25} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
            layout alignItems={'center'} justifyContent={'center'}><Txt text={'DISPLAY ?'} fill={C.muted} fontFamily={MONO} fontSize={27} fontWeight={820} /></Rect>
          <Rect ref={powerQ} width={310} height={110} radius={25} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
            layout alignItems={'center'} justifyContent={'center'}><Txt text={'POWER ?'} fill={C.muted} fontFamily={MONO} fontSize={27} fontWeight={820} /></Rect>
        </Layout>
      </Layout>

      <Layout ref={data} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'数据协议，也可能完全不同'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-20} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect ref={usb2} width={560} height={330} radius={34} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
            <Icon icon={'lucide:database'} size={70} color={C.muted} />
            <Txt text={'USB 2.0'} fill={C.text} fontFamily={MONO} fontSize={42} fontWeight={880} />
            {badge('BASIC DATA', C.muted, C.raised)}
          </Rect>
          <Rect ref={usb4} width={560} height={330} radius={34} fill={C.surface} stroke={C.blue} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
            <Icon icon={'lucide:gauge'} size={70} color={C.blue} />
            <Txt text={'USB4'} fill={C.text} fontFamily={MONO} fontSize={42} fontWeight={880} />
            {badge('HIGHER CAPABILITY', C.blue, '#1E2C45')}
          </Rect>
        </Layout>
        <Txt y={285} text={'接口外形相同，不代表数据能力相同'} fill={C.muted} fontFamily={FONT} fontSize={29} fontWeight={720} />
      </Layout>

      <Layout ref={display} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'能不能出画面，还要看显示能力'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={42}>
          <Rect width={420} height={300} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:usb'} size={78} color={C.accent} />
            <Txt text={'USB-C PORT'} fill={C.text} fontFamily={MONO} fontSize={29} fontWeight={850} />
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={70} color={C.muted} />
          <Rect width={500} height={300} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:monitor'} size={76} color={C.text} />
            <Txt text={'DISPLAY'} fill={C.text} fontFamily={MONO} fontSize={32} fontWeight={850} />
          </Rect>
        </Layout>
        <Layout y={260} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Rect ref={dp} height={80} radius={24} padding={[0, 30]} fill={C.accentDark} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'DisplayPort Alt Mode'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={820} />
          </Rect>
          <Rect ref={usb4Display} height={80} radius={24} padding={[0, 30]} fill={'#1E2C45'} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'USB4 DISPLAY'} fill={C.blue} fontFamily={MONO} fontSize={25} fontWeight={820} />
          </Rect>
        </Layout>
      </Layout>

      <Layout ref={powerCable} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'供电和线材，也要单独看'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850} />
        <Layout y={-35} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect ref={pd} width={560} height={330} radius={34} fill={C.surface} stroke={C.amber} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:battery-charging'} size={72} color={C.amber} />
            <Txt text={'USB PD'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={880} />
            <Txt text={'POWER CAPABILITY'} fill={C.amber} fontFamily={MONO} fontSize={23} fontWeight={760} />
          </Rect>
          <Rect ref={cable} width={560} height={330} radius={34} fill={C.surface} stroke={C.blue} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:cable'} size={72} color={C.blue} />
            <Txt text={'CABLE'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={880} />
            <Txt text={'DATA / VIDEO / POWER'} fill={C.blue} fontFamily={MONO} fontSize={22} fontWeight={760} />
          </Rect>
        </Layout>
        <Rect y={280} width={760} height={86} radius={24} fill={C.raised} stroke={C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'端口支持 + 线材支持，缺一项都可能降级'} fill={C.muted} fontFamily={FONT} fontSize={28} fontWeight={720} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'买之前，看这三项'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860} />
        <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={32}>
          <Rect ref={dataFinal} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:gauge'} size={58} color={C.blue} />
            <Txt text={'数据'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={830} />
            <Txt text={'DATA'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
          <Rect ref={displayFinal} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:monitor'} size={58} color={C.accent} />
            <Txt text={'视频'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={830} />
            <Txt text={'DISPLAY'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
          <Rect ref={powerFinal} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:battery-charging'} size={58} color={C.amber} />
            <Txt text={'供电'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={830} />
            <Txt text={'POWER'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
        </Layout>
        <Rect ref={conclusion} y={250} width={680} height={94} radius={26} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0}
          layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'别只看 “Type-C”'} fill={C.accent} fontFamily={FONT} fontSize={34} fontWeight={860} />
        </Rect>
      </Layout>
    </>
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.18),
    delay(0.18, hookLeft().scale(1.02, 0.28).to(1, 0.22)),
    delay(0.42, hookRight().scale(1.02, 0.28).to(1, 0.22)),
  );

  hook().opacity(0);
  connector().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    dataQ().opacity(1, 0.3),
    delay(0.35, displayQ().opacity(1, 0.3)),
    delay(0.7, powerQ().opacity(1, 0.3)),
  );

  connector().opacity(0);
  data().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    usb2().opacity(1, 0.35),
    delay(0.5, usb4().opacity(1, 0.35)),
  );

  data().opacity(0);
  display().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    dp().opacity(1, 0.35),
    delay(0.65, usb4Display().opacity(1, 0.35)),
  );

  display().opacity(0);
  powerCable().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    pd().opacity(1, 0.35),
    delay(0.6, cable().opacity(1, 0.35)),
  );

  powerCable().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(5, 6)),
    dataFinal().opacity(1, 0.3),
    delay(0.35, displayFinal().opacity(1, 0.3)),
    delay(0.7, powerFinal().opacity(1, 0.3)),
    delay(1.05, conclusion().opacity(1, 0.35)),
  );
});
