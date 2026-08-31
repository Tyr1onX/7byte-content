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

const statusCard = (icon: string, title: string, sub: string, color: string) => (
  <Rect width={450} height={210} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14}>
    <Icon icon={icon} size={58} color={color} />
    <Txt text={title} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={780} />
    <Txt text={sub} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={600} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookUsb = createRef<Rect>();
  const hookProgress = createRef<Rect>();
  const hookRisk = createRef<Rect>();

  const eject = createRef<Layout>();
  const q1 = createRef<Rect>();
  const q2 = createRef<Rect>();
  const q3 = createRef<Rect>();
  const safeBadge = createRef<Rect>();

  const policy = createRef<Layout>();
  const defaultBadge = createRef<Rect>();
  const quickCache = createRef<Rect>();
  const perfCache = createRef<Rect>();

  const warning = createRef<Layout>();
  const copyProgress = createRef<Rect>();
  const perfCard = createRef<Rect>();
  const warningBadge = createRef<Rect>();

  const final = createRef<Layout>();
  const finalArrow = createRef<Icon>();
  const finalSafe = createRef<Rect>();
  const finalNote = createRef<Rect>();

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
        <Txt y={-350} text={'直接拔 U 盘，不一定会坏'} fill={C.text} fontFamily={FONT} fontSize={66} fontWeight={850} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect ref={hookUsb} width={520} height={340} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            opacity={0} scale={0.96} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:usb'} size={92} color={C.accent} />
            <Txt text={'USB DRIVE'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={800} />
            <Layout layout direction={'row'} alignItems={'center'} gap={12}>
              <Icon icon={'lucide:unplug'} size={34} color={C.muted} />
              <Txt text={'直接拔出'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={680} />
            </Layout>
          </Rect>
          <Rect width={660} height={340} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
            <Layout layout direction={'row'} alignItems={'center'} gap={16}>
              <Icon icon={'lucide:hard-drive-upload'} size={56} color={C.amber} />
              <Txt text={'正在写入'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={800} />
            </Layout>
            <Rect width={500} height={54} radius={18} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
              <Rect ref={hookProgress} width={0} height={42} radius={13} fill={C.amber} />
            </Rect>
            <Txt text={'72% · WRITE IN PROGRESS'} fill={C.muted} fontFamily={MONO} fontSize={23} fontWeight={650} />
          </Rect>
        </Layout>
        <Rect ref={hookRisk} y={255} width={660} height={82} radius={24} fill={'#3B211F'} stroke={'#74433C'} lineWidth={2}
          opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:triangle-alert'} size={34} color={C.red} />
          <Txt text={'真正危险：还在写，你就拔了'} fill={C.red} fontFamily={FONT} fontSize={30} fontWeight={820} />
        </Rect>
      </Layout>

      <Layout ref={eject} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'“安全弹出”是在等写入收尾'} fill={C.text} fontFamily={FONT} fontSize={60} fontWeight={840} />
        <Layout y={-60} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={20}>
          <Rect ref={q1} width={260} height={170} radius={26} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0.28}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={8}>
            <Txt text={'WRITE 1'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={780} />
            <Txt text={'pending'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
          <Rect ref={q2} width={260} height={170} radius={26} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0.28}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={8}>
            <Txt text={'WRITE 2'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={780} />
            <Txt text={'pending'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
          <Rect ref={q3} width={260} height={170} radius={26} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0.28}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={8}>
            <Txt text={'WRITE 3'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={780} />
            <Txt text={'pending'} fill={C.muted} fontFamily={MONO} fontSize={20} />
          </Rect>
          <Icon icon={'lucide:arrow-right'} size={62} color={C.muted} />
          <Rect width={360} height={250} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:usb'} size={70} color={C.accent} />
            <Txt text={'U 盘'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={780} />
            <Txt text={'完成写入 → 停止占用'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={600} />
          </Rect>
        </Layout>
        <Rect ref={safeBadge} y={245} width={520} height={82} radius={24} fill={C.accentDark} stroke={'#46572A'} lineWidth={2}
          opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:circle-check'} size={36} color={C.accent} />
          <Txt text={'Safe to remove'} fill={C.accent} fontFamily={MONO} fontSize={31} fontWeight={820} />
        </Rect>
      </Layout>

      <Layout ref={policy} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'Windows 10 1809 起，默认是“快速删除”'} fill={C.text} fontFamily={FONT} fontSize={56} fontWeight={840} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={55}>
          <Rect width={700} height={390} radius={34} fill={C.surface} stroke={C.accent} lineWidth={3}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Layout layout direction={'row'} alignItems={'center'} gap={14}>
              <Icon icon={'lucide:zap'} size={46} color={C.accent} />
              <Txt text={'Quick removal'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
            </Layout>
            <Rect ref={defaultBadge} width={330} height={58} radius={18} fill={C.accentDark} opacity={0}
              layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'DEFAULT · 1809+'} fill={C.accent} fontFamily={MONO} fontSize={23} fontWeight={800} />
            </Rect>
            <Rect width={470} height={70} radius={20} fill={C.raised} padding={8} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Txt text={'Windows write cache'} fill={C.muted} fontFamily={MONO} fontSize={21} />
              <Rect ref={quickCache} width={110} height={44} radius={14} fill={'#3A3C36'} layout alignItems={'center'} justifyContent={'center'}>
                <Txt text={'OFF'} fill={C.muted} fontFamily={MONO} fontSize={20} fontWeight={800} />
              </Rect>
            </Rect>
          </Rect>
          <Rect width={700} height={390} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Layout layout direction={'row'} alignItems={'center'} gap={14}>
              <Icon icon={'lucide:gauge'} size={46} color={C.amber} />
              <Txt text={'Better performance'} fill={C.text} fontFamily={MONO} fontSize={32} fontWeight={800} />
            </Layout>
            <Txt text={'可手动选择'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={600} />
            <Rect width={470} height={70} radius={20} fill={C.raised} padding={8} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Txt text={'Windows write cache'} fill={C.muted} fontFamily={MONO} fontSize={21} />
              <Rect ref={perfCache} width={110} height={44} radius={14} fill={'#493D1E'} layout alignItems={'center'} justifyContent={'center'}>
                <Txt text={'ON'} fill={C.amber} fontFamily={MONO} fontSize={20} fontWeight={800} />
              </Rect>
            </Rect>
          </Rect>
        </Layout>
        <Txt y={260} text={'设备空闲时，Quick removal 让直接断开的风险比旧默认策略低'} fill={C.muted}
          fontFamily={FONT} fontSize={27} fontWeight={640} />
      </Layout>

      <Layout ref={warning} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'这两种情况，先别直接拔'} fill={C.text} fontFamily={FONT} fontSize={60} fontWeight={840} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect width={650} height={360} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
            <Icon icon={'lucide:copy'} size={62} color={C.amber} />
            <Txt text={'正在复制文件'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={790} />
            <Rect width={470} height={52} radius={17} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
              <Rect ref={copyProgress} width={90} height={40} radius={12} fill={C.amber} />
            </Rect>
            <Txt text={'68% · COPYING'} fill={C.muted} fontFamily={MONO} fontSize={22} />
          </Rect>
          <Rect ref={perfCard} width={650} height={360} radius={34} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
            <Icon icon={'lucide:gauge'} size={60} color={C.red} />
            <Txt text={'Better performance'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={800} />
            <Rect width={390} height={70} radius={20} fill={'#3B211F'} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={12}>
              <Icon icon={'lucide:database'} size={32} color={C.red} />
              <Txt text={'Write cache ON'} fill={C.red} fontFamily={MONO} fontSize={24} fontWeight={780} />
            </Rect>
          </Rect>
        </Layout>
        <Rect ref={warningBadge} y={255} width={560} height={80} radius={23} fill={'#3B211F'} stroke={'#74433C'} lineWidth={2}
          opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
          <Icon icon={'lucide:shield-alert'} size={34} color={C.red} />
          <Txt text={'这时先安全弹出'} fill={C.red} fontFamily={FONT} fontSize={31} fontWeight={820} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'最稳妥的规则，其实只有一句'} fill={C.text} fontFamily={FONT} fontSize={58} fontWeight={840} />
        <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={55}>
          {statusCard('lucide:circle-help', '不确定', '设备到底有没有写完？', C.amber)}
          <Icon ref={finalArrow} icon={'lucide:arrow-right'} size={72} color={C.accent} opacity={0} />
          <Rect ref={finalSafe} width={520} height={250} radius={34} fill={C.accentDark} stroke={'#46572A'} lineWidth={3} opacity={0}
            layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:circle-check'} size={64} color={C.accent} />
            <Txt text={'安全弹出'} fill={C.accent} fontFamily={FONT} fontSize={44} fontWeight={850} />
          </Rect>
        </Layout>
        <Rect ref={finalNote} y={250} width={800} height={78} radius={22} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}
          layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'空闲 + Quick removal：风险更低，但不写成“绝对安全”'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={650} />
        </Rect>
      </Layout>
    </>,
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.3),
    hookUsb().opacity(1, 0.45),
    hookUsb().scale(1, 0.6, easeInOutCubic),
    delay(0.45, hookProgress().width(360, 0.9, easeInOutCubic)),
    delay(1.1, hookRisk().opacity(1, 0.45)),
  );

  hook().opacity(0);
  eject().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    q1().opacity(1, 0.4),
    delay(0.45, q2().opacity(1, 0.4)),
    delay(0.9, q3().opacity(1, 0.4)),
    delay(1.55, q1().opacity(0.25, 0.4)),
    delay(1.8, q2().opacity(0.25, 0.4)),
    delay(2.05, q3().opacity(0.25, 0.4)),
    delay(2.45, safeBadge().opacity(1, 0.45)),
  );

  eject().opacity(0);
  policy().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    delay(0.55, defaultBadge().opacity(1, 0.45)),
    delay(1.15, quickCache().fill(C.accentDark, 0.45)),
    delay(1.15, perfCache().fill('#493D1E', 0.45)),
  );

  policy().opacity(0);
  warning().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    copyProgress().width(320, 1.0, easeInOutCubic),
    delay(0.75, perfCard().opacity(1, 0.45)),
    delay(1.55, warningBadge().opacity(1, 0.45)),
  );

  warning().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    delay(0.35, finalArrow().opacity(1, 0.35)),
    delay(0.7, finalSafe().opacity(1, 0.45)),
    delay(1.25, finalNote().opacity(1, 0.45)),
  );

  yield* waitFor(phase(5, 6));
  final().opacity(0);
});
