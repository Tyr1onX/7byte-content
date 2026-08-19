import {
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

const C = {
  bg: '#111210',
  surface: '#1B1D1A',
  raised: '#242620',
  border: '#3A3D35',
  text: '#F3F1E8',
  muted: '#A7AAA1',
  accent: '#D8FF68',
  accentDark: '#202812',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';

// Provisional V1 timing for composition preview only.
// Replace with final Yunyang TTS cue boundaries before final animation alignment.
const T = [0, 5.4, 15.2, 24.8, 35.5, 43.5];
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
  const unitEquation = createRef<Txt>();

  const conversion = createRef<Layout>();
  const conversionLeft = createRef<Rect>();
  const divide = createRef<Rect>();
  const conversionRight = createRef<Rect>();
  const theoryBadge = createRef<Rect>();

  const reality = createRef<Layout>();
  const theoryCard = createRef<Rect>();
  const actualCard = createRef<Rect>();
  const actualBar = createRef<Line>();
  const actualValue = createRef<Txt>();
  const factors = createRef<Layout>();

  const takeaway = createRef<Layout>();
  const finalLeft = createRef<Rect>();
  const finalDivide = createRef<Rect>();
  const finalRight = createRef<Rect>();
  const finalEquation = createRef<Txt>();

  view.add(
    <>
      <Txt
        text={'7BYTE'}
        y={8}
        fill={C.text}
        opacity={0.026}
        fontFamily={MONO}
        fontSize={250}
        fontWeight={800}
        letterSpacing={18}
      />

      {/* SHOT 1 — Hook */}
      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt
          y={-365}
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
          y={-30}
          width={650}
          height={290}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
        >
          <Txt
            y={-74}
            text={'运营商写的是'}
            fill={C.muted}
            fontFamily={FONT}
            fontSize={25}
            fontWeight={560}
          />
          <Layout y={25} layout direction={'row'} gap={20} alignItems={'center'}>
            <Txt
              text={'1000'}
              fill={C.text}
              fontFamily={MONO}
              fontSize={92}
              fontWeight={800}
            />
            <Layout layout direction={'row'} gap={0} alignItems={'center'}>
              <Txt text={'M'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
              <Txt ref={hookSmallB} text={'b'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={800} />
              <Txt text={'ps'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
            </Layout>
          </Layout>
        </Rect>

        <Rect
          ref={hookRight}
          x={440}
          y={-30}
          width={650}
          height={290}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
        >
          <Txt
            y={-74}
            text={'下载软件显示'}
            fill={C.muted}
            fontFamily={FONT}
            fontSize={25}
            fontWeight={560}
          />
          <Layout y={25} layout direction={'row'} gap={20} alignItems={'center'}>
            <Txt
              text={'≈100'}
              fill={C.text}
              fontFamily={MONO}
              fontSize={92}
              fontWeight={800}
            />
            <Layout layout direction={'row'} gap={0} alignItems={'center'}>
              <Txt text={'M'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
              <Txt ref={hookCapitalB} text={'B'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={800} />
              <Txt text={'/s'} fill={C.muted} fontFamily={MONO} fontSize={42} fontWeight={760} />
            </Layout>
          </Layout>
        </Rect>

        <Txt
          ref={hookQuestion}
          y={205}
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
        <Layout y={-320} layout direction={'row'} gap={210} alignItems={'center'}>
          <Rect
            width={520}
            height={120}
            radius={24}
            fill={C.surface}
            stroke={C.border}
            lineWidth={2}
          >
            <Layout layout direction={'row'} gap={16} alignItems={'center'}>
              <Txt text={'小写'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={560} />
              <Txt text={'b'} fill={C.accent} fontFamily={MONO} fontSize={48} fontWeight={850} />
              <Txt text={'= bit'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={720} />
            </Layout>
          </Rect>
          <Rect
            width={520}
            height={120}
            radius={24}
            fill={C.surface}
            stroke={C.border}
            lineWidth={2}
          >
            <Layout layout direction={'row'} gap={16} alignItems={'center'}>
              <Txt text={'大写'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={560} />
              <Txt text={'B'} fill={C.accent} fontFamily={MONO} fontSize={48} fontWeight={850} />
              <Txt text={'= Byte'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={720} />
            </Layout>
          </Rect>
        </Layout>

        <Txt
          y={-155}
          text={'8 个 bit，组成 1 个 Byte'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={38}
          fontWeight={720}
        />

        <Layout
          ref={bitRow}
          y={20}
          layout
          direction={'row'}
          gap={18}
          alignItems={'center'}
        >
          {bitCells.map((cell, index) => (
            <Rect
              ref={cell}
              key={`bit-${index}`}
              width={72}
              height={72}
              radius={16}
              fill={C.raised}
              stroke={C.border}
              lineWidth={2}
              opacity={0}
              scale={0.86}
            >
              <Txt
                text={'b'}
                fill={C.accent}
                fontFamily={MONO}
                fontSize={30}
                fontWeight={800}
              />
            </Rect>
          ))}
        </Layout>

        <Rect
          ref={byteFrame}
          y={22}
          width={790}
          height={168}
          radius={28}
          fill={'rgba(0,0,0,0)'}
          stroke={C.accent}
          lineWidth={3}
          opacity={0}
          scale={0.96}
        >
          <Rect
            y={104}
            width={180}
            height={48}
            radius={16}
            fill={C.accentDark}
            stroke={'#46572A'}
            lineWidth={2}
          >
            <Txt text={'1 Byte'} fill={C.accent} fontFamily={MONO} fontSize={24} fontWeight={800} />
          </Rect>
        </Rect>

        <Txt
          ref={unitEquation}
          y={230}
          text={'8 bit = 1 Byte'}
          fill={C.accent}
          fontFamily={MONO}
          fontSize={42}
          fontWeight={800}
          opacity={0}
        />
      </Layout>

      {/* SHOT 3 — Conversion */}
      <Layout ref={conversion} width={1920} height={1080} opacity={0}>
        <Txt
          y={-330}
          text={'换成下载软件的单位，要先除以 8'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={46}
          fontWeight={760}
        />

        <Rect
          ref={conversionLeft}
          x={-535}
          y={-20}
          width={520}
          height={245}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
        >
          <Txt y={-48} text={'1000'} fill={C.text} fontFamily={MONO} fontSize={82} fontWeight={820} />
          <Txt y={58} text={'Mbps'} fill={C.muted} fontFamily={MONO} fontSize={36} fontWeight={700} />
        </Rect>

        <Rect
          ref={divide}
          y={-20}
          width={220}
          height={150}
          radius={30}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          scale={0.88}
        >
          <Txt text={'÷ 8'} fill={C.accent} fontFamily={MONO} fontSize={54} fontWeight={850} />
        </Rect>

        <Rect
          ref={conversionRight}
          x={535}
          y={-20}
          width={520}
          height={245}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
        >
          <Txt y={-48} text={'125'} fill={C.accent} fontFamily={MONO} fontSize={82} fontWeight={820} />
          <Txt y={58} text={'MB/s'} fill={C.muted} fontFamily={MONO} fontSize={36} fontWeight={700} />
        </Rect>

        <Rect
          ref={theoryBadge}
          x={535}
          y={165}
          width={220}
          height={56}
          radius={18}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
        >
          <Txt text={'理论上限'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={650} />
        </Rect>
      </Layout>

      {/* SHOT 4 — Theory vs actual */}
      <Layout ref={reality} width={1920} height={1080} opacity={0}>
        <Txt
          y={-340}
          text={'实际下载通常还会低于理论值'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={46}
          fontWeight={760}
        />

        <Rect
          ref={theoryCard}
          x={-430}
          y={-35}
          width={650}
          height={300}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
        >
          <Txt y={-90} text={'理论换算'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={600} />
          <Txt y={5} text={'125 MB/s'} fill={C.text} fontFamily={MONO} fontSize={74} fontWeight={820} />
          <Txt y={92} text={'1000 Mbps ÷ 8'} fill={C.muted} fontFamily={MONO} fontSize={24} fontWeight={620} />
        </Rect>

        <Rect
          ref={actualCard}
          x={430}
          y={-35}
          width={650}
          height={300}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
        >
          <Txt y={-90} text={'实际下载示意'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={600} />
          <Txt ref={actualValue} y={-2} text={'≈100 MB/s'} fill={C.accent} fontFamily={MONO} fontSize={64} fontWeight={820} opacity={0} />
          <Line
            ref={actualBar}
            y={92}
            points={[[-230, 0], [230, 0]]}
            stroke={C.accent}
            lineWidth={18}
            lineCap={'round'}
            end={0}
          />
        </Rect>

        <Layout ref={factors} y={245} layout direction={'row'} gap={22} alignItems={'center'} opacity={0}>
          {['协议开销', '服务器', '网络链路', '设备'].map(label => (
            <Rect
              key={label}
              width={230}
              height={62}
              radius={20}
              fill={C.raised}
              stroke={C.border}
              lineWidth={2}
            >
              <Txt text={label} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={600} />
            </Rect>
          ))}
        </Layout>
      </Layout>

      {/* SHOT 5 — Final model */}
      <Layout ref={takeaway} width={1920} height={1080} opacity={0}>
        <Txt
          y={-330}
          text={'Mbps 和 MB/s，不是同一个单位'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={50}
          fontWeight={790}
        />

        <Rect
          ref={finalLeft}
          x={-500}
          y={-30}
          width={520}
          height={235}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
        >
          <Txt y={-50} text={'运营商'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
          <Txt y={34} text={'Mbps'} fill={C.text} fontFamily={MONO} fontSize={66} fontWeight={820} />
        </Rect>

        <Rect
          ref={finalDivide}
          y={-30}
          width={220}
          height={150}
          radius={30}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          scale={0.90}
        >
          <Txt text={'÷ 8'} fill={C.accent} fontFamily={MONO} fontSize={52} fontWeight={850} />
        </Rect>

        <Rect
          ref={finalRight}
          x={500}
          y={-30}
          width={520}
          height={235}
          radius={32}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
        >
          <Txt y={-50} text={'下载软件'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={600} />
          <Txt y={34} text={'MB/s'} fill={C.text} fontFamily={MONO} fontSize={66} fontWeight={820} />
        </Rect>

        <Txt
          ref={finalEquation}
          y={215}
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
    delay(phase(0, 1) - 0.34, hook().opacity(0, 0.34, easeInOutCubic)),
  );

  // Phase 2 — bit vs Byte.
  yield* all(
    waitFor(phase(1, 2)),
    unitShot().opacity(1, 0.30, easeInOutCubic),
    ...bitCells.map((cell, index) =>
      delay(
        0.95 + index * 0.055,
        all(
          cell().opacity(1, 0.18, easeInOutCubic),
          cell().scale(1, 0.22, easeInOutCubic),
        ),
      ),
    ),
    delay(2.15, bitRow().gap(10, 0.72, easeInOutCubic)),
    delay(
      2.55,
      all(
        byteFrame().opacity(1, 0.32, easeInOutCubic),
        byteFrame().scale(1, 0.36, easeInOutCubic),
      ),
    ),
    delay(3.25, unitEquation().opacity(1, 0.28, easeInOutCubic)),
    delay(phase(1, 2) - 0.34, unitShot().opacity(0, 0.34, easeInOutCubic)),
  );

  // Phase 3 — 1000 ÷ 8 = 125.
  yield* all(
    waitFor(phase(2, 3)),
    conversion().opacity(1, 0.30, easeInOutCubic),
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
    delay(phase(2, 3) - 0.34, conversion().opacity(0, 0.34, easeInOutCubic)),
  );

  // Phase 4 — Theory vs actual.
  yield* all(
    waitFor(phase(3, 4)),
    reality().opacity(1, 0.30, easeInOutCubic),
    theoryCard().opacity(1, 0.34, easeInOutCubic),
    delay(0.75, actualCard().opacity(1, 0.34, easeInOutCubic)),
    delay(1.30, actualBar().end(0.80, 0.92, easeInOutCubic)),
    delay(1.75, actualValue().opacity(1, 0.30, easeInOutCubic)),
    delay(2.60, factors().opacity(1, 0.34, easeInOutCubic)),
    delay(phase(3, 4) - 0.34, reality().opacity(0, 0.34, easeInOutCubic)),
  );

  // Phase 5 — Final model.
  yield* all(
    waitFor(phase(4, 5)),
    takeaway().opacity(1, 0.30, easeInOutCubic),
    finalLeft().opacity(1, 0.34, easeInOutCubic),
    delay(
      0.75,
      all(
        finalDivide().opacity(1, 0.28, easeInOutCubic),
        finalDivide().scale(1, 0.34, easeInOutCubic),
      ),
    ),
    delay(1.45, finalRight().opacity(1, 0.34, easeInOutCubic)),
    delay(2.35, finalEquation().opacity(1, 0.30, easeInOutCubic)),
  );
});
