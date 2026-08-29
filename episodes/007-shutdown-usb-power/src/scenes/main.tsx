import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, easeInOutCubic, waitFor} from '@motion-canvas/core';
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
  blue: '#72A7FF',
  amber: '#F3C969',
  red: '#FF745F',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const smallCard = (icon: string, title: string, sub: string, color: string) => (
  <Rect width={300} height={175} radius={28} fill={C.surface} stroke={C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={12}>
    <Icon icon={icon} size={44} color={color} />
    <Txt text={title} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760} />
    <Txt text={sub} fill={C.muted} fontFamily={FONT} fontSize={19} fontWeight={560} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookPc = createRef<Rect>();
  const hookUsb = createRef<Layout>();
  const hookGlow = createRef<Rect>();

  const concept = createRef<Layout>();
  const conceptBadge = createRef<Rect>();
  const acBadge = createRef<Rect>();

  const standby = createRef<Layout>();
  const mainOff = createRef<Rect>();
  const standbyFill = createRef<Rect>();
  const standbyBadge = createRef<Rect>();

  const usb = createRef<Layout>();
  const usbUses = createRef<Layout>();
  const usbBranch = createRef<Rect>();
  const mouseLamp = createRef<Rect>();
  const usbBadge = createRef<Rect>();

  const bios = createRef<Layout>();
  const erpKnob = createRef<Rect>();
  const erpTrack = createRef<Rect>();
  const biosWarning = createRef<Rect>();

  const final = createRef<Layout>();
  const acLine = createRef<Rect>();
  const v5Line = createRef<Rect>();
  const g3Badge = createRef<Rect>();
  const takeaway = createRef<Txt>();

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
        <Txt y={-345} width={1660} text={'电脑都关机了，鼠标键盘怎么还亮？'} fill={C.text}
          fontFamily={FONT} fontSize={62} fontWeight={820} textAlign={'center'} />

        <Rect ref={hookPc} x={-250} y={-30} width={720} height={360} radius={36} fill={C.surface}
          stroke={C.border} lineWidth={2} opacity={0} scale={0.96}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
          <Icon icon={'lucide:monitor-off'} size={88} color={C.muted} />
          <Txt text={'系统已关机'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={780} />
          <Rect width={510} height={4} fill={C.border} />
          <Layout layout direction={'row'} alignItems={'center'} gap={14}>
            <Icon icon={'lucide:power'} size={34} color={C.muted} />
            <Txt text={'屏幕黑 · 主系统停止'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
          </Layout>
        </Rect>

        <Layout ref={hookUsb} x={520} y={-30} opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Rect width={260} height={260} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:mouse'} size={70} color={C.accent} />
            <Txt text={'鼠标'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={740} />
            <Rect ref={hookGlow} width={120} height={18} radius={9} fill={C.accent} opacity={0} />
          </Rect>
          <Rect width={260} height={260} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:keyboard'} size={72} color={C.accent} />
            <Txt text={'键盘'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={740} />
            <Txt text={'还亮着'} fill={C.accent} fontFamily={FONT} fontSize={25} fontWeight={760} />
          </Rect>
        </Layout>
      </Layout>

      <Layout ref={concept} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'关机和断电，是两回事'} fill={C.text} fontFamily={FONT} fontSize={58} fontWeight={820} />
        <Layout y={-35} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect width={560} height={340} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:power'} size={72} color={C.muted} />
            <Txt text={'系统关机'} fill={C.text} fontFamily={FONT} fontSize={40} fontWeight={780} />
            <Txt text={'Soft Off'} fill={C.muted} fontFamily={MONO} fontSize={27} fontWeight={680} />
          </Rect>
          <Txt text={'≠'} fill={C.accent} fontFamily={MONO} fontSize={96} fontWeight={900} />
          <Rect width={560} height={340} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:plug'} size={74} color={C.amber} />
            <Txt text={'交流电仍接通'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={780} />
            <Txt text={'AC PRESENT'} fill={C.amber} fontFamily={MONO} fontSize={25} fontWeight={720} />
          </Rect>
        </Layout>
        <Rect ref={conceptBadge} y={250} width={570} height={76} radius={22} fill={C.accentDark}
          stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'“关机”不等于“拔掉电源”'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={800} />
        </Rect>
        <Rect ref={acBadge} x={590} y={250} width={330} height={76} radius={22} fill={C.raised}
          stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'待机电仍可能存在'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={680} />
        </Rect>
      </Layout>

      <Layout ref={standby} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'ATX 电源里还有一路待机供电'} fill={C.text} fontFamily={FONT} fontSize={56} fontWeight={820} />
        <Rect x={-560} y={-35} width={520} height={390} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
          <Icon icon={'lucide:plug'} size={58} color={C.amber} />
          <Txt text={'ATX PSU'} fill={C.text} fontFamily={MONO} fontSize={39} fontWeight={820} />
          <Rect width={390} height={66} radius={18} fill={C.raised} padding={6} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Txt text={'Main Rails'} fill={C.muted} fontFamily={MONO} fontSize={22} fontWeight={650} />
            <Rect ref={mainOff} width={92} height={42} radius={14} fill={'#3D2521'} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'OFF'} fill={C.red} fontFamily={MONO} fontSize={20} fontWeight={800} />
            </Rect>
          </Rect>
          <Rect width={390} height={72} radius={18} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={standbyFill} width={0} height={60} radius={14} fill={C.accentDark}
              layout direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Txt text={'+5VSB  ON'} fill={C.accent} fontFamily={MONO} fontSize={22} fontWeight={820} />
            </Rect>
          </Rect>
        </Rect>
        <Icon icon={'lucide:arrow-right'} x={-115} y={-35} size={74} color={C.accent} />
        <Rect x={390} y={-35} width={650} height={390} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
          <Icon icon={'lucide:circuit-board'} size={84} color={C.blue} />
          <Txt text={'主板待机电路'} fill={C.text} fontFamily={FONT} fontSize={39} fontWeight={780} />
          <Txt text={'软开机 / 唤醒 / 部分 USB'} fill={C.muted} fontFamily={FONT} fontSize={26} fontWeight={600} />
        </Rect>
        <Rect ref={standbyBadge} y={255} width={650} height={78} radius={22} fill={C.accentDark}
          stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'Main OFF · +5VSB 仍可 ON'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={800} />
        </Rect>
      </Layout>

      <Layout ref={usb} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'待机电会留给部分待机功能'} fill={C.text} fontFamily={FONT} fontSize={54} fontWeight={820} />
        <Rect x={-650} y={-35} width={390} height={330} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
          <Icon icon={'lucide:circuit-board'} size={78} color={C.blue} />
          <Txt text={'主板'} fill={C.text} fontFamily={FONT} fontSize={42} fontWeight={790} />
          <Txt text={'+5VSB'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={820} />
        </Rect>
        <Icon icon={'lucide:arrow-right'} x={-350} y={-35} size={66} color={C.muted} />
        <Layout ref={usbUses} x={260} y={-35} opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          {smallCard('lucide:power', '开机按钮', 'Soft Power', C.accent)}
          {smallCard('lucide:radio-tower', '唤醒电路', 'Wake', C.blue)}
          <Rect width={330} height={175} radius={28} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={10}>
            <Icon icon={'lucide:usb'} size={44} color={C.accent} />
            <Txt text={'部分 USB'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={780} />
            <Rect ref={usbBranch} width={0} height={8} radius={4} fill={C.accent} />
          </Rect>
        </Layout>
        <Rect x={670} y={225} width={250} height={92} radius={22} fill={C.raised} stroke={C.border} lineWidth={2}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:mouse'} size={38} color={C.accent} />
          <Txt text={'鼠标灯'} fill={C.text} fontFamily={FONT} fontSize={25} fontWeight={720} />
          <Rect ref={mouseLamp} width={18} height={18} radius={9} fill={C.accent} opacity={0} />
        </Rect>
        <Rect ref={usbBadge} y={250} width={620} height={76} radius={22} fill={C.accentDark}
          stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'系统关机 ≠ USB 必然断电'} fill={C.accent} fontFamily={FONT} fontSize={30} fontWeight={800} />
        </Rect>
      </Layout>

      <Layout ref={bios} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'不想让它继续亮，可以检查 BIOS / UEFI'} fill={C.text} fontFamily={FONT} fontSize={52} fontWeight={820} />
        <Rect y={-40} width={1240} height={470} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          padding={42} layout direction={'column'} alignItems={'stretch'} justifyContent={'center'} gap={24}>
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Layout layout direction={'row'} alignItems={'center'} gap={14}>
              <Icon icon={'lucide:settings'} size={40} color={C.accent} />
              <Txt text={'APM / Power Management'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={760} />
            </Layout>
            <Txt text={'UEFI'} fill={C.muted} fontFamily={MONO} fontSize={25} fontWeight={680} />
          </Layout>
          <Rect width={1150} height={110} radius={22} fill={C.raised} padding={28}
            layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Layout layout direction={'column'} gap={5}>
              <Txt text={'ErP Ready'} fill={C.text} fontFamily={MONO} fontSize={29} fontWeight={780} />
              <Txt text={'S4 + S5 / S5'} fill={C.muted} fontFamily={MONO} fontSize={20} fontWeight={600} />
            </Layout>
            <Rect ref={erpTrack} width={130} height={58} radius={29} fill={C.border} padding={6} layout alignItems={'center'} justifyContent={'start'}>
              <Rect ref={erpKnob} width={46} height={46} radius={23} fill={C.muted} />
            </Rect>
          </Rect>
          <Rect width={1150} height={92} radius={22} fill={C.raised} padding={28}
            layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Txt text={'USB Power in S5'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={730} />
            <Txt text={'名称因主板而异'} fill={C.amber} fontFamily={FONT} fontSize={23} fontWeight={680} />
          </Rect>
        </Rect>
        <Rect ref={biosWarning} y={255} width={760} height={78} radius={22} fill={'#342C1A'} stroke={'#5B4B25'} lineWidth={2}
          opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:triangle-alert'} size={32} color={C.amber} />
          <Txt text={'可能同时影响关机充电 / 唤醒功能'} fill={C.amber} fontFamily={FONT} fontSize={27} fontWeight={720} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'真正完全断电：切断交流电源'} fill={C.text} fontFamily={FONT} fontSize={56} fontWeight={820} />
        <Rect x={-610} y={-45} width={430} height={350} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
          <Icon icon={'lucide:plug'} size={76} color={C.amber} />
          <Txt text={'AC'} fill={C.text} fontFamily={MONO} fontSize={44} fontWeight={820} />
          <Txt text={'排插 / PSU 开关'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
        </Rect>
        <Rect ref={acLine} x={-180} y={-45} width={310} height={12} radius={6} fill={C.amber} />
        <Rect x={300} y={-45} width={650} height={350} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Icon icon={'lucide:power-off'} size={78} color={C.muted} />
          <Txt text={'Standby Power'} fill={C.text} fontFamily={MONO} fontSize={36} fontWeight={800} />
          <Rect width={440} height={62} radius={18} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={v5Line} width={420} height={50} radius={14} fill={C.accent} />
          </Rect>
          <Txt text={'+5VSB'} fill={C.accent} fontFamily={MONO} fontSize={28} fontWeight={800} />
        </Rect>
        <Rect ref={g3Badge} y={215} width={500} height={78} radius={22} fill={C.raised} stroke={C.border} lineWidth={2}
          opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'G3 · Mechanical Off'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={800} />
        </Rect>
        <Txt ref={takeaway} y={300} text={'关机 ≠ 物理断电'} fill={C.accent} fontFamily={FONT} fontSize={46} fontWeight={850} opacity={0} />
      </Layout>
    </>,
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.3),
    hookPc().opacity(1, 0.5),
    hookPc().scale(1, 0.6, easeInOutCubic),
    delay(0.45, hookUsb().opacity(1, 0.5)),
    delay(1.1, hookGlow().opacity(1, 0.45)),
  );

  hook().opacity(0);
  concept().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.5, conceptBadge().opacity(1, 0.45)),
    delay(1.5, acBadge().opacity(1, 0.45)),
  );

  concept().opacity(0);
  standby().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    delay(0.25, mainOff().opacity(1, 0.45)),
    delay(0.65, standbyFill().width(390, 1.0, easeInOutCubic)),
    delay(1.8, standbyBadge().opacity(1, 0.45)),
  );

  standby().opacity(0);
  usb().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    usbUses().opacity(1, 0.5),
    delay(0.9, usbBranch().width(210, 0.8, easeInOutCubic)),
    delay(1.65, mouseLamp().opacity(1, 0.35)),
    delay(2.25, usbBadge().opacity(1, 0.45)),
  );

  usb().opacity(0);
  bios().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    delay(0.6, erpTrack().fill(C.accentDark, 0.45)),
    delay(0.6, erpKnob().position.x(66, 0.6, easeInOutCubic)),
    delay(0.6, erpKnob().fill(C.accent, 0.45)),
    delay(1.7, biosWarning().opacity(1, 0.45)),
  );

  bios().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(5, 6)),
    delay(0.45, acLine().width(0, 0.75, easeInOutCubic)),
    delay(1.05, v5Line().width(0, 0.9, easeInOutCubic)),
    delay(1.7, g3Badge().opacity(1, 0.45)),
    delay(2.15, takeaway().opacity(1, 0.45)),
  );

  final().opacity(0);
});
