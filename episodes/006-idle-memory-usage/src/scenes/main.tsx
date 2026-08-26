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

const labelCard = (icon: string, title: string, sub: string, color: string) => (
  <Rect
    width={290}
    height={148}
    radius={26}
    fill={C.surface}
    stroke={C.border}
    lineWidth={2}
    layout
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    gap={10}
  >
    <Icon icon={icon} size={38} color={color} />
    <Txt text={title} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={760} />
    <Txt text={sub} fill={C.muted} fontFamily={FONT} fontSize={20} fontWeight={560} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookCard = createRef<Rect>();
  const hookFill = createRef<Rect>();
  const hookQuestion = createRef<Txt>();

  const sources = createRef<Layout>();
  const segSystem = createRef<Rect>();
  const segDriver = createRef<Rect>();
  const segService = createRef<Rect>();
  const segApps = createRef<Rect>();
  const sourceCards = createRef<Layout>();
  const sourceBadge = createRef<Rect>();

  const cache = createRef<Layout>();
  const recentFile = createRef<Rect>();
  const standbyBox = createRef<Rect>();
  const standbyFill = createRef<Rect>();
  const availableBadge = createRef<Rect>();

  const reclaim = createRef<Layout>();
  const reclaimCacheFill = createRef<Rect>();
  const reclaimAppFill = createRef<Rect>();
  const reclaimArrow = createRef<Icon>();
  const reclaimBadge = createRef<Rect>();

  const final = createRef<Layout>();
  const finalUsed = createRef<Rect>();
  const finalChecks = createRef<Layout>();
  const finalTakeaway = createRef<Txt>();

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

      {/* Canonical top-left header is applied exactly once during final composition. */}

      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt
          y={-345}
          width={1660}
          text={'16GB 内存，刚开机就用了一半？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={64}
          fontWeight={820}
          textAlign={'center'}
        />

        <Rect
          ref={hookCard}
          y={-40}
          width={1040}
          height={345}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={22}
        >
          <Layout width={850} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Layout layout direction={'row'} alignItems={'center'} gap={16}>
              <Icon icon={'lucide:memory-stick'} size={44} color={C.accent} />
              <Txt text={'内存'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
            </Layout>
            <Txt text={'16.0 GB'} fill={C.muted} fontFamily={MONO} fontSize={30} fontWeight={720} />
          </Layout>

          <Rect width={850} height={86} radius={24} fill={C.raised} stroke={C.border} lineWidth={2} padding={8} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={hookFill} width={0} height={68} radius={18} fill={C.accent} />
          </Rect>

          <Layout width={850} layout direction={'row'} alignItems={'end'} justifyContent={'space-between'}>
            <Layout layout direction={'column'} gap={4}>
              <Txt text={'已使用'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={600} />
              <Txt text={'7.4 GB'} fill={C.text} fontFamily={MONO} fontSize={50} fontWeight={850} />
            </Layout>
            <Txt text={'46%'} fill={C.accent} fontFamily={MONO} fontSize={58} fontWeight={860} />
          </Layout>
        </Rect>

        <Txt
          ref={hookQuestion}
          y={250}
          text={'什么都没开，内存去哪了？'}
          fill={C.accent}
          fontFamily={FONT}
          fontSize={38}
          fontWeight={760}
          opacity={0}
        />
      </Layout>

      <Layout ref={sources} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'“已使用”不只等于应用列表'} fill={C.text} fontFamily={FONT} fontSize={54} fontWeight={800} />

        <Rect
          y={-145}
          width={1360}
          height={132}
          radius={28}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          padding={10}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'start'}
          gap={8}
        >
          <Rect ref={segSystem} width={330} height={108} radius={20} fill={'#46572A'} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'Windows / 内核'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
          </Rect>
          <Rect ref={segDriver} width={240} height={108} radius={20} fill={'#304A72'} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'驱动'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
          </Rect>
          <Rect ref={segService} width={300} height={108} radius={20} fill={'#5C4B25'} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'后台服务'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
          </Rect>
          <Rect ref={segApps} width={430} height={108} radius={20} fill={C.accentDark} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'应用工作集'} fill={C.accent} fontFamily={FONT} fontSize={24} fontWeight={760} />
          </Rect>
        </Rect>

        <Layout ref={sourceCards} y={70} opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
          {labelCard('lucide:cpu', '系统 / 内核', '操作系统本身', C.accent)}
          {labelCard('lucide:circuit-board', '设备驱动', '硬件也要内存', C.blue)}
          {labelCard('lucide:settings', '后台服务', '没有窗口也在跑', C.amber)}
          {labelCard('lucide:app-window', '应用进程', '工作集占用', C.accent)}
        </Layout>

        <Rect
          ref={sourceBadge}
          y={275}
          width={650}
          height={76}
          radius={22}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'整机占用 ≠ 进程列表简单相加'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780} />
        </Rect>
      </Layout>

      <Layout ref={cache} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'Windows 还会利用 RAM 做缓存'} fill={C.text} fontFamily={FONT} fontSize={54} fontWeight={800} />

        <Rect
          ref={recentFile}
          x={-610}
          y={-55}
          width={330}
          height={250}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={16}
        >
          <Icon icon={'lucide:file'} size={62} color={C.blue} />
          <Txt text={'最近用过的文件'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={740} />
          <Txt text={'下次读取更快'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={580} />
        </Rect>

        <Icon icon={'lucide:arrow-right'} x={-315} y={-55} size={58} color={C.muted} />

        <Rect
          ref={standbyBox}
          x={0}
          y={-55}
          width={500}
          height={250}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={18}
        >
          <Layout layout direction={'row'} alignItems={'center'} gap={14}>
            <Icon icon={'lucide:database'} size={48} color={C.accent} />
            <Txt text={'Standby Cache'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={800} />
          </Layout>
          <Rect width={390} height={58} radius={18} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={standbyFill} width={0} height={46} radius={14} fill={C.accent} />
          </Rect>
          <Txt text={'缓存数据 · 非主动使用'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={580} />
        </Rect>

        <Layout x={585} y={-55} layout direction={'column'} gap={20} alignItems={'center'} justifyContent={'center'}>
          <Rect width={360} height={108} radius={24} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={30}>
            <Txt text={'缓存'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={620} />
            <Txt text={'3.8 GB'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
          </Rect>
          <Rect width={360} height={108} radius={24} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={30}>
            <Txt text={'可用'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={620} />
            <Txt text={'8.1 GB'} fill={C.accent} fontFamily={MONO} fontSize={34} fontWeight={820} />
          </Rect>
        </Layout>

        <Rect
          ref={availableBadge}
          y={255}
          width={560}
          height={78}
          radius={22}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'Standby 属于 Available / 可用'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780} />
        </Rect>
      </Layout>

      <Layout ref={reclaim} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'程序真正需要时，待机缓存可以让位'} fill={C.text} fontFamily={FONT} fontSize={52} fontWeight={800} />

        <Rect
          x={-450}
          y={-50}
          width={620}
          height={290}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={18}
        >
          <Layout layout direction={'row'} alignItems={'center'} gap={14}>
            <Icon icon={'lucide:database'} size={44} color={C.accent} />
            <Txt text={'待机缓存'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
          </Layout>
          <Rect width={520} height={74} radius={20} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={reclaimCacheFill} width={500} height={62} radius={16} fill={C.accent} />
          </Rect>
          <Txt text={'3.8 GB'} fill={C.muted} fontFamily={MONO} fontSize={28} fontWeight={700} />
        </Rect>

        <Icon ref={reclaimArrow} icon={'lucide:arrow-right'} x={0} y={-50} size={74} color={C.muted} opacity={0.45} />

        <Rect
          x={450}
          y={-50}
          width={620}
          height={290}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={18}
        >
          <Layout layout direction={'row'} alignItems={'center'} gap={14}>
            <Icon icon={'lucide:app-window'} size={44} color={C.blue} />
            <Txt text={'新应用'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
          </Layout>
          <Rect width={520} height={74} radius={20} fill={C.raised} padding={6} layout alignItems={'center'} justifyContent={'start'}>
            <Rect ref={reclaimAppFill} width={0} height={62} radius={16} fill={C.blue} />
          </Rect>
          <Txt text={'需要 2.0 GB'} fill={C.muted} fontFamily={MONO} fontSize={28} fontWeight={700} />
        </Rect>

        <Rect
          ref={reclaimBadge}
          y={250}
          width={520}
          height={80}
          radius={22}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'缓存占着 ≠ 被锁死'} fill={C.accent} fontFamily={FONT} fontSize={33} fontWeight={800} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-345} text={'判断内存够不够，看压力，不只看开机占用'} fill={C.text} fontFamily={FONT} fontSize={50} fontWeight={800} />

        <Rect
          ref={finalUsed}
          x={-610}
          y={-35}
          width={360}
          height={320}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={12}
        >
          <Txt text={'46%'} fill={C.muted} fontFamily={MONO} fontSize={82} fontWeight={850} />
          <Txt text={'已使用'} fill={C.muted} fontFamily={FONT} fontSize={26} fontWeight={650} />
          <Rect width={250} height={2} fill={C.border} />
          <Txt text={'单看这个不够'} fill={C.red} fontFamily={FONT} fontSize={24} fontWeight={720} />
        </Rect>

        <Layout ref={finalChecks} x={230} y={-35} opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Rect width={350} height={300} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:gauge'} size={54} color={C.accent} />
            <Txt text={'可用长期很低'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760} />
            <Txt text={'持续内存压力'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={580} />
          </Rect>
          <Rect width={350} height={300} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:layers-3'} size={54} color={C.blue} />
            <Txt text={'常用软件后满载'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760} />
            <Txt text={'而不是刚开机'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={580} />
          </Rect>
          <Rect width={350} height={300} radius={30} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:triangle-alert'} size={54} color={C.amber} />
            <Txt text={'明显卡顿'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760} />
            <Txt text={'真实体验变差'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={580} />
          </Rect>
        </Layout>

        <Txt
          ref={finalTakeaway}
          y={275}
          text={'别只盯“已使用”'}
          fill={C.accent}
          fontFamily={FONT}
          fontSize={42}
          fontWeight={820}
          opacity={0}
        />
      </Layout>
    </>,
  );

  // Shot 1: establish the familiar Task Manager problem.
  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.35),
    hookCard().opacity(1, 0.55),
    hookCard().scale(1, 0.65, easeInOutCubic),
    delay(0.35, hookFill().width(382, 1.1, easeInOutCubic)),
    delay(1.25, hookQuestion().opacity(1, 0.45)),
  );

  hook().opacity(0);
  sources().opacity(1);

  // Shot 2: reveal the categories that contribute to whole-system in-use memory.
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.15, segSystem().opacity(1, 0.45)),
    delay(0.65, segDriver().opacity(1, 0.45)),
    delay(1.15, segService().opacity(1, 0.45)),
    delay(1.65, segApps().opacity(1, 0.45)),
    delay(2.15, sourceCards().opacity(1, 0.55)),
    delay(3.3, sourceBadge().opacity(1, 0.5)),
  );

  sources().opacity(0);
  cache().opacity(1);

  // Shot 3: standby cache is useful and belongs to available memory.
  yield* all(
    waitFor(phase(2, 3)),
    recentFile().opacity(1, 0.45),
    standbyBox().opacity(1, 0.45),
    delay(0.5, standbyFill().width(340, 1.0, easeInOutCubic)),
    delay(1.6, availableBadge().opacity(1, 0.5)),
  );

  cache().opacity(0);
  reclaim().opacity(1);

  // Shot 4: one causal transfer — standby yields space, the app receives it.
  yield* all(
    waitFor(phase(3, 4)),
    reclaimArrow().opacity(1, 0.4),
    delay(0.45, reclaimCacheFill().width(245, 0.9, easeInOutCubic)),
    delay(1.4, reclaimAppFill().width(255, 0.9, easeInOutCubic)),
    delay(2.45, reclaimBadge().opacity(1, 0.45)),
  );

  reclaim().opacity(0);
  final().opacity(1);

  // Shot 5: return to a practical diagnostic rule and hold the result.
  yield* all(
    waitFor(phase(4, 5)),
    finalUsed().opacity(1, 0.45),
    delay(0.55, finalChecks().opacity(1, 0.55)),
    delay(1.8, finalTakeaway().opacity(1, 0.5)),
  );

  // Capture continues briefly past BODY_END, but final assembly trims exactly at T5.
  final().opacity(0);
});
