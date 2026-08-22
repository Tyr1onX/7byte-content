import {Icon, Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
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
};
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const ssd = createRef<Rect>();
  const windowsDrive = createRef<Rect>();
  const question = createRef<Txt>();

  const decimal = createRef<Layout>();
  const bytePoolA = createRef<Rect>();
  const decimalRuler = createRef<Layout>();
  const decimalResult = createRef<Rect>();

  const binary = createRef<Layout>();
  const bytePoolB = createRef<Rect>();
  const binaryRuler = createRef<Layout>();
  const gibBadge = createRef<Rect>();
  const binaryPreview = createRef<Rect>();

  const calc = createRef<Layout>();
  const calcLeft = createRef<Rect>();
  const calcDivide = createRef<Rect>();
  const calcRight = createRef<Rect>();

  const final = createRef<Layout>();
  const finalDrive = createRef<Rect>();
  const finalBar = createRef<Line>();
  const formatChip = createRef<Rect>();
  const partitionChip = createRef<Rect>();
  const finalModel = createRef<Txt>();

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
          y={-350}
          width={1600}
          text={'500GB 硬盘，为什么电脑只显示 465GB？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={60}
          fontWeight={800}
          textAlign={'center'}
        />

        <Rect
          ref={ssd}
          x={-430}
          y={-30}
          width={620}
          height={300}
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
          gap={18}
        >
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:hard-drive'} size={40} color={C.accent} />
            <Txt text={'硬盘包装'} fill={C.muted} fontFamily={FONT} fontSize={26} fontWeight={620} />
          </Layout>
          <Layout layout direction={'row'} alignItems={'baseline'} justifyContent={'center'} gap={14}>
            <Txt text={'500'} fill={C.text} fontFamily={MONO} fontSize={96} fontWeight={850} />
            <Txt text={'GB'} fill={C.accent} fontFamily={MONO} fontSize={44} fontWeight={800} />
          </Layout>
          <Rect width={420} height={16} radius={8} fill={C.raised} stroke={C.border} lineWidth={1} />
        </Rect>

        <Rect
          ref={windowsDrive}
          x={430}
          y={-30}
          width={620}
          height={300}
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
          gap={16}
        >
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={14}>
            <Icon icon={'lucide:monitor'} size={38} color={C.blue} />
            <Txt text={'Windows 磁盘'} fill={C.muted} fontFamily={FONT} fontSize={26} fontWeight={620} />
          </Layout>
          <Layout layout direction={'row'} alignItems={'baseline'} justifyContent={'center'} gap={14}>
            <Txt text={'465'} fill={C.text} fontFamily={MONO} fontSize={96} fontWeight={850} />
            <Txt text={'GB'} fill={C.blue} fontFamily={MONO} fontSize={44} fontWeight={800} />
          </Layout>
          <Rect width={440} height={20} radius={10} fill={C.raised} stroke={C.border} lineWidth={1} layout alignItems={'start'}>
            <Rect width={408} height={14} radius={7} fill={C.accent} />
          </Rect>
        </Rect>

        <Txt
          ref={question}
          y={235}
          text={'35GB 去哪了？'}
          fill={C.accent}
          fontFamily={FONT}
          fontSize={40}
          fontWeight={780}
          opacity={0}
        />
      </Layout>

      <Layout ref={decimal} width={1920} height={1080} opacity={0}>
        <Rect
          x={-650}
          y={-300}
          width={270}
          height={70}
          radius={20}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'厂商 · 十进制'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={760} />
        </Rect>
        <Rect
          ref={bytePoolA}
          y={-95}
          width={920}
          height={220}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={22}
        >
          <Icon icon={'lucide:database'} size={56} color={C.accent} />
          <Layout layout direction={'column'} gap={8} alignItems={'start'} justifyContent={'center'}>
            <Txt text={'500,000,000,000'} fill={C.text} fontFamily={MONO} fontSize={56} fontWeight={820} />
            <Txt text={'Bytes · 同一堆真实数据'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={600} />
          </Layout>
        </Rect>
        <Layout ref={decimalRuler} y={135} layout direction={'row'} gap={24} alignItems={'center'} justifyContent={'center'} opacity={0}>
          {[0, 1, 2].map(index => (
            <Rect key={`d-${index}`} width={210} height={100} radius={24} fill={C.raised} stroke={C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'÷ 1000'} fill={C.accent} fontFamily={MONO} fontSize={32} fontWeight={800} />
            </Rect>
          ))}
        </Layout>
        <Rect ref={decimalResult} y={275} width={300} height={80} radius={22} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'= 500 GB'} fill={C.accent} fontFamily={MONO} fontSize={38} fontWeight={850} />
        </Rect>
      </Layout>

      <Layout ref={binary} width={1920} height={1080} opacity={0}>
        <Rect
          x={-625}
          y={-300}
          width={320}
          height={70}
          radius={20}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'Windows · 1024 尺子'} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={740} />
        </Rect>
        <Rect
          ref={bytePoolB}
          y={-105}
          width={840}
          height={180}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={20}
        >
          <Icon icon={'lucide:database'} size={48} color={C.accent} />
          <Txt text={'500,000,000,000 Bytes'} fill={C.text} fontFamily={MONO} fontSize={44} fontWeight={800} />
        </Rect>
        <Layout ref={binaryRuler} y={100} layout direction={'row'} gap={18} alignItems={'center'} justifyContent={'center'} opacity={0}>
          {['÷1024 → KB', '÷1024 → MB', '÷1024 → ?'].map((label, index) => (
            <Rect key={`b-${index}`} width={300} height={105} radius={24} fill={C.raised} stroke={C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={label} fill={index === 2 ? C.accent : C.text} fontFamily={MONO} fontSize={27} fontWeight={760} />
            </Rect>
          ))}
        </Layout>
        <Rect ref={gibBadge} x={-250} y={265} width={340} height={74} radius={22} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0} scale={0.9} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'更准确：GiB'} fill={C.accent} fontFamily={MONO} fontSize={34} fontWeight={850} />
        </Rect>
        <Rect ref={binaryPreview} x={310} y={265} width={390} height={74} radius={22} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'Windows 常仍写成 GB'} fill={C.muted} fontFamily={FONT} fontSize={26} fontWeight={650} />
        </Rect>
      </Layout>

      <Layout ref={calc} width={1920} height={1080} opacity={0}>
        <Txt y={-315} text={'同一堆 Bytes，换一把尺子'} fill={C.text} fontFamily={FONT} fontSize={44} fontWeight={760} />
        <Rect ref={calcLeft} x={-555} y={-20} width={560} height={240} radius={32} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0} scale={0.96} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={10}>
          <Txt text={'500,000,000,000'} fill={C.text} fontFamily={MONO} fontSize={48} fontWeight={820} />
          <Txt text={'Bytes'} fill={C.muted} fontFamily={MONO} fontSize={30} fontWeight={700} />
        </Rect>
        <Rect ref={calcDivide} y={-20} width={250} height={150} radius={30} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0} scale={0.9} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'÷ 1024³'} fill={C.accent} fontFamily={MONO} fontSize={42} fontWeight={850} />
        </Rect>
        <Rect ref={calcRight} x={555} y={-20} width={480} height={240} radius={32} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0} scale={0.96} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={8}>
          <Txt text={'465.7'} fill={C.text} fontFamily={MONO} fontSize={82} fontWeight={860} />
          <Txt text={'≈ GiB'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={780} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Rect ref={finalDrive} y={-80} width={980} height={330} radius={36} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={18}>
          <Layout layout direction={'row'} gap={16} alignItems={'center'} justifyContent={'center'}>
            <Icon icon={'lucide:hard-drive'} size={42} color={C.blue} />
            <Txt text={'Windows 磁盘容量'} fill={C.muted} fontFamily={FONT} fontSize={28} fontWeight={650} />
          </Layout>
          <Layout layout direction={'row'} gap={14} alignItems={'baseline'} justifyContent={'center'}>
            <Txt text={'≈465'} fill={C.text} fontFamily={MONO} fontSize={92} fontWeight={860} />
            <Txt text={'GB'} fill={C.blue} fontFamily={MONO} fontSize={42} fontWeight={800} />
          </Layout>
          <Line ref={finalBar} points={[[-360, 0], [360, 0]]} lineWidth={16} stroke={C.accent} radius={8} end={0} />
        </Rect>
        <Layout y={150} layout direction={'row'} gap={26} alignItems={'center'} justifyContent={'center'}>
          <Rect ref={formatChip} width={260} height={72} radius={22} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'格式化 · 少量占用'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={650} />
          </Rect>
          <Rect ref={partitionChip} width={330} height={72} radius={22} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'系统 / 恢复分区 · 可能占用'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={650} />
          </Rect>
        </Layout>
        <Txt ref={finalModel} y={280} text={'同一堆 Bytes · 两把不同的尺子'} fill={C.accent} fontFamily={FONT} fontSize={38} fontWeight={780} opacity={0} />
      </Layout>
    </>,
  );

  hook().opacity(1);
  yield* all(
    waitFor(phase(0, 1)),
    ssd().opacity(1, 0.45, easeInOutCubic),
    ssd().scale(1, 0.45, easeInOutCubic),
    delay(0.45, all(windowsDrive().opacity(1, 0.45, easeInOutCubic), windowsDrive().scale(1, 0.45, easeInOutCubic))),
    delay(1.15, question().opacity(1, 0.35, easeInOutCubic)),
  );

  hook().opacity(0);
  decimal().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    bytePoolA().opacity(1, 0.4, easeInOutCubic),
    bytePoolA().scale(1, 0.4, easeInOutCubic),
    delay(0.9, decimalRuler().opacity(1, 0.45, easeInOutCubic)),
    delay(2.0, decimalResult().opacity(1, 0.4, easeInOutCubic)),
  );

  decimal().opacity(0);
  binary().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    binaryRuler().opacity(1, 0.5, easeInOutCubic),
    delay(Math.max(1.8, phase(2, 3) * 0.48), all(gibBadge().opacity(1, 0.42, easeInOutCubic), gibBadge().scale(1, 0.42, easeInOutCubic))),
    delay(Math.max(2.5, phase(2, 3) * 0.62), binaryPreview().opacity(1, 0.42, easeInOutCubic)),
  );

  binary().opacity(0);
  calc().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    calcLeft().opacity(1, 0.38, easeInOutCubic),
    calcLeft().scale(1, 0.38, easeInOutCubic),
    delay(0.7, all(calcDivide().opacity(1, 0.38, easeInOutCubic), calcDivide().scale(1, 0.38, easeInOutCubic))),
    delay(1.5, all(calcRight().opacity(1, 0.46, easeInOutCubic), calcRight().scale(1, 0.46, easeInOutCubic))),
  );

  calc().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    finalBar().end(0.93, 1.0, easeInOutCubic),
    delay(0.8, formatChip().opacity(1, 0.35, easeInOutCubic)),
    delay(1.15, partitionChip().opacity(1, 0.35, easeInOutCubic)),
    delay(2.0, finalModel().opacity(1, 0.42, easeInOutCubic)),
  );
});
