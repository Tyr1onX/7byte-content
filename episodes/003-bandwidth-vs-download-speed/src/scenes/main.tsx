import {
  Icon,
  Layout,
  Line,
  Rect,
  Txt,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  all,
  createRef,
  delay,
  easeInOutCubic,
  waitFor,
} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';

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
  danger: '#FF6B67',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';

// The body now ends when the canonical outro narration begins.
// 45.592s is the start of “这里是 7BYTE，把计算机讲简单一点。”
const T = [0, 8.53, 16.314, 32.19, 40.051, 45.592];
const phase = (from: number, to: number) => T[to] - T[from];

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookLeft = createRef<Rect>();
  const hookRight = createRef<Rect>();
  const hookQuestion = createRef<Txt>();
  const hookSmallB = createRef<Txt>();
  const hookCapitalB = createRef<Txt>();

  const unitShot = createRef<Layout>();
  const bitRow = createRef<Layout>();
  const bitCells = Array.from({length: 8}, () => createRef<Rect>());
  const byteFrame = createRef<Rect>();
  const byteBadge = createRef<Rect>();
  const unitEquation = createRef<Txt>();

  const conversion = createRef<Layout>();
  const conversionLeft = createRef<Rect>();
  const divide = createRef<Rect>();
  const conversionRight = createRef<Rect>();
  const theoryBadge = createRef<Rect>();

  const reality = createRef<Layout>();
  const theoryPill = createRef<Rect>();
  const serverCard = createRef<Rect>();
  const protocolCard = createRef<Rect>();
  const actualCard = createRef<Rect>();
  const networkLine1 = createRef<Line>();
  const networkLine2 = createRef<Line>();
  const actualBar = createRef<Line>();
  const actualValue = createRef<Txt>();
  const deviceState = createRef<Rect>();

  const takeaway = createRef<Layout>();
  const finalLeft = createRef<Rect>();
  const finalDivide = createRef<Rect>();
  const finalRight = createRef<Rect>();
  const finalEquation = createRef<Txt>();

  view.add(
    <>
      {/* Canonical EP002 watermark: fixed across horizontal episodes. */}
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

      {/* Canonical top-left header is applied once during final composition. */}

      {/* SHOT 1 — Hook */}
      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt
          y={-345}
          width={1640}
          text={'1000M 宽带，为什么下载只有 100MB/s？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={62}
          fontWeight={800}
          textAlign={'center'}
        />

        <Rect
          ref={hookLeft}
          x={-440}
          y={-25}
          width={650}
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
          gap={22}
          padding={30}
        >
          <Layout layout direction={'row'} gap={12} alignItems={'center'} justifyContent={'center'}>
            <Icon icon={'lucide:gauge'} size={30} color={C.accent} />
            <Txt text={'运营商套餐'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={600} />
          </Layout>
          <Layout layout direction={'row'} gap={20} alignItems={'center'} justifyContent={'center'}>
            <Txt text={'1000'} fill={C.text} fontFamily={MONO} fontSize={92} fontWeight={800} />
            <Layout layout direction={'row'} gap={0} alignItems={'center'} justifyContent={'center'}>
              <Txt text={'M'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
              <Txt ref={hookSmallB} text={'b'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={800} />
              <Txt text={'ps'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
            </Layout>
          </Layout>
        </Rect>

        <Rect
          ref={hookRight}
          x={440}
          y={-25}
          width={650}
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
          gap={20}
          padding={28}
        >
          <Layout layout direction={'row'} gap={12} alignItems={'center'} justifyContent={'center'}>
            <Icon icon={'lucide:download'} size={30} color={C.blue} />
            <Txt text={'下载软件'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={600} />
          </Layout>
          <Layout layout direction={'row'} gap={20} alignItems={'center'} justifyContent={'center'}>
            <Txt text={'≈100'} fill={C.text} fontFamily={MONO} fontSize={92} fontWeight={800} />
            <Layout layout direction={'row'} gap={0} alignItems={'center'} justifyContent={'center'}>
              <Txt text={'M'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
              <Txt ref={hookCapitalB} text={'B'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={800} />
              <Txt text={'/s'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
            </Layout>
          </Layout>
          <Rect width={490} height={12} radius={6} fill={'#10110F'} stroke={C.border} lineWidth={1}>
            <Rect x={-57} width={375} height={8} radius={4} fill={C.accent} />
          </Rect>
        </Rect>

        <Txt
          ref={hookQuestion}
          y={220}
          text={'差了十倍？'}
          fill={C.accent}
          fontFamily={FONT}
          fontSize={36}
          fontWeight={760}
          opacity={0}
        />
      </Layout>

      {/* SHOT 2 — bit vs Byte */}
      <Layout ref={unitShot} width={1920} height={1080} opacity={0}>
        <Layout y={-305} layout direction={'row'} gap={160} alignItems={'center'} justifyContent={'center'}>
          <Rect
            width={540}
            height={125}
            radius={24}
            fill={C.surface}
            stroke={C.border}
            lineWidth={2}
            layout
            direction={'row'}
            gap={16}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Txt text={'小写'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={560} />
            <Txt text={'b'} fill={C.accent} fontFamily={MONO} fontSize={48} fontWeight={850} />
            <Txt text={'= bit'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={720} />
          </Rect>
          <Rect
            width={540}
            height={125}
            radius={24}
            fill={C.surface}
            stroke={C.border}
            lineWidth={2}
            layout
            direction={'row'}
            gap={16}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Txt text={'大写'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={560} />
            <Txt text={'B'} fill={C.accent} fontFamily={MONO} fontSize={48} fontWeight={850} />
            <Txt text={'= Byte'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={720} />
          </Rect>
        </Layout>

        <Layout
          ref={bitRow}
          y={0}
          layout
          direction={'row'}
          gap={16}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {bitCells.map((cell, index) => (
            <Rect
              ref={cell}
              key={`bit-${index}`}
              width={90}
              height={90}
              radius={18}
              fill={C.raised}
              stroke={C.border}
              lineWidth={2}
              opacity={0}
              scale={0.86}
              layout
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Txt text={'b'} fill={C.accent} fontFamily={MONO} fontSize={36} fontWeight={800} />
            </Rect>
          ))}
        </Layout>

        <Rect
          ref={byteFrame}
          y={5}
          width={940}
          height={210}
          radius={28}
          fill={'rgba(0,0,0,0)'}
          stroke={C.accent}
          lineWidth={3}
          opacity={0}
          scale={0.96}
        />

        <Rect
          ref={byteBadge}
          y={132}
          width={210}
          height={54}
          radius={16}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'1 Byte'} fill={C.accent} fontFamily={MONO} fontSize={26} fontWeight={800} />
        </Rect>

        <Txt
          ref={unitEquation}
          y={260}
          text={'8 bit = 1 Byte'}
          fill={C.accent}
          fontFamily={MONO}
          fontSize={48}
          fontWeight={800}
          opacity={0}
        />
      </Layout>

      {/* SHOT 3 — Conversion */}
      <Layout ref={conversion} width={1920} height={1080} opacity={0}>
        <Txt y={-320} text={'单位换算'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={760} />

        <Rect
          ref={conversionLeft}
          x={-535}
          y={-15}
          width={520}
          height={250}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={14}
        >
          <Icon icon={'lucide:radio-tower'} size={34} color={C.muted} />
          <Txt text={'1000'} fill={C.text} fontFamily={MONO} fontSize={76} fontWeight={820} />
          <Txt text={'Mbps'} fill={C.muted} fontFamily={MONO} fontSize={34} fontWeight={700} />
        </Rect>

        <Rect
          ref={divide}
          y={-15}
          width={220}
          height={150}
          radius={30}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          scale={0.88}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'÷ 8'} fill={C.accent} fontFamily={MONO} fontSize={54} fontWeight={850} />
        </Rect>

        <Rect
          ref={conversionRight}
          x={535}
          y={-15}
          width={520}
          height={250}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={14}
        >
          <Icon icon={'lucide:download'} size={34} color={C.accent} />
          <Txt text={'125'} fill={C.accent} fontFamily={MONO} fontSize={76} fontWeight={820} />
          <Txt text={'MB/s'} fill={C.muted} fontFamily={MONO} fontSize={34} fontWeight={700} />
        </Rect>

        <Rect
          ref={theoryBadge}
          x={535}
          y={185}
          width={220}
          height={58}
          radius={18}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'理论换算值'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={650} />
        </Rect>
      </Layout>

      {/* SHOT 4 — Real download path: identifiable UI, not text-only pills. */}
      <Layout ref={reality} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'为什么实际还会低一点？'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={760} />

        <Rect
          ref={theoryPill}
          x={-605}
          y={-235}
          width={300}
          height={66}
          radius={20}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          layout
          direction={'row'}
          gap={12}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'理论'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={620} />
          <Txt text={'125 MB/s'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={780} />
        </Rect>

        <Rect
          ref={serverCard}
          x={-610}
          y={35}
          width={300}
          height={230}
          radius={28}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={15}
        >
          <Icon icon={'lucide:server'} size={58} color={C.blue} />
          <Txt text={'服务器'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={740} />
          <Txt text={'供给速度'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={560} />
        </Rect>

        <Rect
          ref={protocolCard}
          x={-190}
          y={35}
          width={300}
          height={230}
          radius={28}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={14}
        >
          <Icon icon={'lucide:network'} size={55} color={C.accent} />
          <Txt text={'协议开销'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={740} />
          <Layout layout direction={'row'} gap={8} alignItems={'center'} justifyContent={'center'}>
            {['TCP', 'TLS', 'IP'].map(label => (
              <Rect
                key={label}
                width={70}
                height={34}
                radius={10}
                fill={C.raised}
                stroke={C.border}
                lineWidth={1}
                layout
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Txt text={label} fill={C.muted} fontFamily={MONO} fontSize={15} fontWeight={650} />
              </Rect>
            ))}
          </Layout>
        </Rect>

        <Line
          ref={networkLine1}
          points={[[-460, 35], [-340, 35]]}
          stroke={C.accent}
          lineWidth={7}
          lineCap={'round'}
          end={0}
        />
        <Line
          ref={networkLine2}
          points={[[-40, 35], [75, 35]]}
          stroke={C.accent}
          lineWidth={7}
          lineCap={'round'}
          end={0}
        />

        <Rect
          ref={actualCard}
          x={410}
          y={35}
          width={650}
          height={330}
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
          padding={[24, 34]}
        >
          <Layout width={540} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Layout layout direction={'row'} gap={10} alignItems={'center'}>
              <Icon icon={'lucide:download'} size={27} color={C.accent} />
              <Txt text={'下载任务'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={700} />
            </Layout>
            <Txt text={'1000M 宽带'} fill={C.muted} fontFamily={MONO} fontSize={17} fontWeight={600} />
          </Layout>

          <Txt ref={actualValue} text={'≈100 MB/s'} fill={C.accent} fontFamily={MONO} fontSize={62} fontWeight={820} opacity={0} />

          <Rect width={520} height={24} radius={12} fill={'#10110F'} stroke={C.border} lineWidth={1}>
            <Line
              ref={actualBar}
              points={[[-248, 0], [248, 0]]}
              stroke={C.accent}
              lineWidth={14}
              lineCap={'round'}
              opacity={0}
              end={0}
            />
          </Rect>

          <Rect
            ref={deviceState}
            width={520}
            height={68}
            radius={18}
            fill={C.raised}
            stroke={C.border}
            lineWidth={1.5}
            opacity={0}
            layout
            direction={'row'}
            gap={14}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Icon icon={'lucide:laptop'} size={30} color={C.text} />
            <Txt text={'设备 / 写盘也会影响最终速度'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={580} />
          </Rect>
        </Rect>
      </Layout>

      {/* SHOT 5 — Final model; ends before canonical outro narration. */}
      <Layout ref={takeaway} width={1920} height={1080} opacity={0}>
        <Txt y={-320} text={'换算关系'} fill={C.text} fontFamily={FONT} fontSize={50} fontWeight={790} />

        <Rect
          ref={finalLeft}
          x={-500}
          y={-20}
          width={520}
          height={245}
          radius={32}
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
          <Icon icon={'lucide:radio-tower'} size={36} color={C.muted} />
          <Txt text={'运营商'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
          <Txt text={'Mbps'} fill={C.text} fontFamily={MONO} fontSize={66} fontWeight={820} />
        </Rect>

        <Rect
          ref={finalDivide}
          y={-20}
          width={220}
          height={150}
          radius={30}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          scale={0.90}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'÷ 8'} fill={C.accent} fontFamily={MONO} fontSize={52} fontWeight={850} />
        </Rect>

        <Rect
          ref={finalRight}
          x={500}
          y={-20}
          width={520}
          height={245}
          radius={32}
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
          <Icon icon={'lucide:download'} size={36} color={C.accent} />
          <Txt text={'下载软件'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
          <Txt text={'MB/s'} fill={C.text} fontFamily={MONO} fontSize={66} fontWeight={820} />
        </Rect>

        <Txt
          ref={finalEquation}
          y={220}
          text={'1000 Mbps  →  理论约 125 MB/s'}
          fill={C.accent}
          fontFamily={MONO}
          fontSize={38}
          fontWeight={760}
          opacity={0}
        />
      </Layout>
    </>,
  );

  // Phase 1 — Hook.
  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.25),
    hookLeft().opacity(1, 0.42, easeInOutCubic),
    hookLeft().scale(1, 0.42, easeInOutCubic),
    delay(
      1.15,
      all(
        hookRight().opacity(1, 0.42, easeInOutCubic),
        hookRight().scale(1, 0.42, easeInOutCubic),
      ),
    ),
    delay(2.55, hookQuestion().opacity(1, 0.28, easeInOutCubic)),
    delay(
      3.45,
      all(
        hookSmallB().fill(C.accent, 0.24, easeInOutCubic),
        hookCapitalB().fill(C.accent, 0.24, easeInOutCubic),
      ),
    ),
  );

  // Phase 2 — bit vs Byte.
  hook().opacity(0);
  unitShot().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    ...bitCells.map((cell, index) =>
      delay(
        0.82 + index * 0.055,
        all(
          cell().opacity(1, 0.18, easeInOutCubic),
          cell().scale(1, 0.22, easeInOutCubic),
        ),
      ),
    ),
    delay(1.95, bitRow().gap(10, 0.72, easeInOutCubic)),
    delay(
      2.35,
      all(
        byteFrame().opacity(1, 0.32, easeInOutCubic),
        byteFrame().scale(1, 0.36, easeInOutCubic),
        byteBadge().opacity(1, 0.32, easeInOutCubic),
      ),
    ),
    delay(3.05, unitEquation().opacity(1, 0.28, easeInOutCubic)),
  );

  // Phase 3 — 1000 ÷ 8 = 125.
  unitShot().opacity(0);
  conversion().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    all(
      conversionLeft().opacity(1, 0.34, easeInOutCubic),
      conversionLeft().scale(1, 0.34, easeInOutCubic),
    ),
    delay(
      1.15,
      all(
        divide().opacity(1, 0.28, easeInOutCubic),
        divide().scale(1, 0.34, easeInOutCubic),
      ),
    ),
    delay(
      2.15,
      all(
        conversionRight().opacity(1, 0.36, easeInOutCubic),
        conversionRight().scale(1, 0.36, easeInOutCubic),
      ),
    ),
    delay(3.15, theoryBadge().opacity(1, 0.28, easeInOutCubic)),
  );

  // Phase 4 — identifiable server → protocol → download UI.
  conversion().opacity(0);
  reality().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    theoryPill().opacity(1, 0.28, easeInOutCubic),
    serverCard().opacity(1, 0.34, easeInOutCubic),
    delay(0.55, networkLine1().end(1, 0.48, easeInOutCubic)),
    delay(0.92, protocolCard().opacity(1, 0.34, easeInOutCubic)),
    delay(1.34, networkLine2().end(1, 0.48, easeInOutCubic)),
    delay(1.72, actualCard().opacity(1, 0.36, easeInOutCubic)),
    delay(2.12, actualValue().opacity(1, 0.28, easeInOutCubic)),
    delay(
      2.38,
      all(
        actualBar().opacity(1, 0.16, easeInOutCubic),
        actualBar().end(0.80, 0.92, easeInOutCubic),
      ),
    ),
    delay(3.05, deviceState().opacity(1, 0.32, easeInOutCubic)),
  );

  // Phase 5 — final model; the canonical outro starts immediately after this phase.
  reality().opacity(0);
  takeaway().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    finalLeft().opacity(1, 0.34, easeInOutCubic),
    delay(
      0.65,
      all(
        finalDivide().opacity(1, 0.28, easeInOutCubic),
        finalDivide().scale(1, 0.34, easeInOutCubic),
      ),
    ),
    delay(1.25, finalRight().opacity(1, 0.34, easeInOutCubic)),
    delay(1.90, finalEquation().opacity(1, 0.30, easeInOutCubic)),
  );
});
