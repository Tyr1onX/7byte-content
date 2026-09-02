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
  amber: '#F3C969',
  red: '#FF745F',
  blue: '#72A7FF',
};
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const pill = (text: string, color: string, fill: string) => (
  <Rect height={64} radius={20} padding={[0, 24]} fill={fill} layout alignItems={'center'} justifyContent={'center'}>
    <Txt text={text} fill={color} fontFamily={MONO} fontSize={22} fontWeight={800} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const restartBadge = createRef<Rect>();
  const save = createRef<Layout>();
  const userState = createRef<Rect>();
  const kernelState = createRef<Rect>();
  const hiber = createRef<Rect>();
  const saveArrow = createRef<Icon>();
  const restore = createRef<Layout>();
  const restoreArrow = createRef<Icon>();
  const restoreBadge = createRef<Rect>();
  const restart = createRef<Layout>();
  const k = createRef<Rect>();
  const d = createRef<Rect>();
  const s = createRef<Rect>();
  const fullBoot = createRef<Rect>();
  const final = createRef<Layout>();
  const issue1 = createRef<Rect>();
  const issue2 = createRef<Rect>();
  const issue3 = createRef<Rect>();
  const finalArrow = createRef<Icon>();
  const finalBadge = createRef<Rect>();

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
        <Txt y={-360} text={'电脑卡了，重启反而可能更彻底'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={860} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect width={620} height={360} radius={36} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
            <Icon icon={'lucide:power'} size={72} color={C.muted} />
            <Txt text={'Shut down → Power on'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={780} />
            {pill('FAST STARTUP MAY APPLY', C.amber, '#493D1E')}
          </Rect>
          <Rect width={620} height={360} radius={36} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
            <Icon icon={'lucide:rotate-cw'} size={76} color={C.accent} />
            <Txt text={'Restart'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
            <Rect ref={restartBadge} height={64} radius={20} padding={[0, 28]} fill={C.accentDark} opacity={0}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'FULL BOOT'} fill={C.accent} fontFamily={MONO} fontSize={24} fontWeight={850} />
            </Rect>
          </Rect>
        </Layout>
        <Txt y={300} text={'排故时，这个差别很重要'} fill={C.muted} fontFamily={FONT} fontSize={28} fontWeight={650} />
      </Layout>

      <Layout ref={save} width={1920} height={1080} opacity={0}>
        <Txt y={-360} text={'如果开启了“快速启动”'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850} />
        <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={34}>
          <Layout layout direction={'column'} gap={24}>
            <Rect ref={userState} width={460} height={150} radius={28} fill={C.surface} stroke={C.border} lineWidth={2}
              layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={18}>
              <Icon icon={'lucide:user-round'} size={48} color={C.muted} />
              <Txt text={'User session'} fill={C.text} fontFamily={MONO} fontSize={28} fontWeight={760} />
            </Rect>
            <Rect ref={kernelState} width={460} height={190} radius={28} fill={C.surface} stroke={C.amber} lineWidth={2}
              layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
              <Layout layout direction={'row'} gap={14} alignItems={'center'}>
                <Icon icon={'lucide:cpu'} size={46} color={C.amber} />
                <Txt text={'Kernel + Drivers'} fill={C.text} fontFamily={MONO} fontSize={28} fontWeight={800} />
              </Layout>
              <Txt text={'system state'} fill={C.muted} fontFamily={MONO} fontSize={20} />
            </Rect>
          </Layout>
          <Icon ref={saveArrow} icon={'lucide:arrow-right'} size={76} color={C.amber} opacity={0} />
          <Rect ref={hiber} width={510} height={300} radius={34} fill={C.raised} stroke={C.amber} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:file-archive'} size={66} color={C.amber} />
            <Txt text={'hiberfil.sys'} fill={C.text} fontFamily={MONO} fontSize={35} fontWeight={820} />
            <Txt text={'保存内核 / 驱动状态'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={620} />
          </Rect>
        </Layout>
        <Rect y={285} width={650} height={80} radius={24} fill={'#2B2C27'} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'用户注销 · 系统状态部分保存'} fill={C.muted} fontFamily={FONT} fontSize={29} fontWeight={700} />
        </Rect>
      </Layout>

      <Layout ref={restore} width={1920} height={1080} opacity={0}>
        <Txt y={-355} text={'下次开机：恢复，而不是从零重建'} fill={C.text} fontFamily={FONT} fontSize={60} fontWeight={850} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={55}>
          <Rect width={520} height={320} radius={34} fill={C.raised} stroke={C.amber} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:file-archive'} size={68} color={C.amber} />
            <Txt text={'hiberfil.sys'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
            <Txt text={'saved system state'} fill={C.muted} fontFamily={MONO} fontSize={21} />
          </Rect>
          <Icon ref={restoreArrow} icon={'lucide:arrow-right'} size={82} color={C.amber} opacity={0} />
          <Rect width={600} height={320} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Layout layout direction={'row'} gap={18} alignItems={'center'}>
              <Icon icon={'lucide:cpu'} size={60} color={C.amber} />
              <Icon icon={'lucide:blocks'} size={60} color={C.amber} />
            </Layout>
            <Txt text={'Kernel + Drivers'} fill={C.text} fontFamily={MONO} fontSize={32} fontWeight={800} />
            <Txt text={'restored'} fill={C.muted} fontFamily={MONO} fontSize={22} />
          </Rect>
        </Layout>
        <Rect ref={restoreBadge} y={275} width={650} height={82} radius={24} fill={'#493D1E'} opacity={0}
          layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'RESTORE  →  faster startup'} fill={C.amber} fontFamily={MONO} fontSize={28} fontWeight={820} />
        </Rect>
      </Layout>

      <Layout ref={restart} width={1920} height={1080} opacity={0}>
        <Txt y={-355} text={'但“重启”不走 Fast Startup'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850} />
        <Layout y={-50} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
          <Rect ref={k} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:cpu'} size={58} color={C.muted} />
            <Txt text={'KERNEL'} fill={C.text} fontFamily={MONO} fontSize={29} fontWeight={800} />
            <Txt text={'reinitialize'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
          <Rect ref={d} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:blocks'} size={58} color={C.muted} />
            <Txt text={'DRIVERS'} fill={C.text} fontFamily={MONO} fontSize={29} fontWeight={800} />
            <Txt text={'reinitialize'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
          <Rect ref={s} width={360} height={230} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0.35}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:settings'} size={58} color={C.muted} />
            <Txt text={'SERVICES'} fill={C.text} fontFamily={MONO} fontSize={29} fontWeight={800} />
            <Txt text={'restart'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Rect>
        </Layout>
        <Rect ref={fullBoot} y={250} width={570} height={86} radius={25} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0}
          layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:rotate-cw'} size={38} color={C.accent} />
          <Txt text={'FULL BOOT CYCLE'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={850} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-355} text={'排故时，优先试一次 Restart'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850} />
        <Layout y={-65} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={26}>
          <Rect ref={issue1} width={330} height={190} radius={28} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:blocks'} size={50} color={C.red} />
            <Txt text={'驱动异常'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780} />
          </Rect>
          <Rect ref={issue2} width={330} height={190} radius={28} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:download'} size={50} color={C.amber} />
            <Txt text={'更新未完成'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780} />
          </Rect>
          <Rect ref={issue3} width={330} height={190} radius={28} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:bug'} size={50} color={C.blue} />
            <Txt text={'状态异常'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780} />
          </Rect>
          <Icon ref={finalArrow} icon={'lucide:arrow-right'} size={70} color={C.accent} opacity={0} />
          <Rect ref={finalBadge} width={430} height={230} radius={34} fill={C.accentDark} stroke={'#46572A'} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:rotate-cw'} size={64} color={C.accent} />
            <Txt text={'Restart first'} fill={C.accent} fontFamily={MONO} fontSize={34} fontWeight={850} />
          </Rect>
        </Layout>
        <Rect y={265} width={760} height={80} radius={24} fill={C.raised} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'平时关机没问题 · 排故先重启'} fill={C.muted} fontFamily={FONT} fontSize={30} fontWeight={720} />
        </Rect>
      </Layout>
    </>,
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.25),
    delay(0.25, restartBadge().opacity(1, 0.35)),
  );

  hook().opacity(0);
  save().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.35, userState().opacity(0.45, 0.35)),
    delay(0.75, saveArrow().opacity(1, 0.35)),
    delay(1.05, hiber().opacity(1, 0.5)),
    delay(1.15, kernelState().scale(0.96, 0.5, easeInOutCubic)),
  );

  save().opacity(0);
  restore().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    delay(0.35, restoreArrow().opacity(1, 0.4)),
    delay(0.85, restoreBadge().opacity(1, 0.45)),
  );

  restore().opacity(0);
  restart().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    k().opacity(1, 0.4),
    delay(0.45, d().opacity(1, 0.4)),
    delay(0.9, s().opacity(1, 0.4)),
    delay(1.35, fullBoot().opacity(1, 0.45)),
  );

  restart().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    issue1().opacity(1, 0.35),
    delay(0.35, issue2().opacity(1, 0.35)),
    delay(0.7, issue3().opacity(1, 0.35)),
    delay(1.05, finalArrow().opacity(1, 0.35)),
    delay(1.35, finalBadge().opacity(1, 0.45)),
  );

  yield* waitFor(phase(5, 6));
  final().opacity(0);
});
