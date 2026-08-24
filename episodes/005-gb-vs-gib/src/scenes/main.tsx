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
  amber: '#F3C969',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const driveCard = createRef<Rect>();
  const windowsCard = createRef<Rect>();
  const hookQuestion = createRef<Txt>();

  const standard = createRef<Layout>();
  const bytePool = createRef<Rect>();
  const gbCard = createRef<Rect>();
  const gibCard = createRef<Rect>();
  const standardBadge = createRef<Rect>();

  const history = createRef<Layout>();
  const oldComputer = createRef<Rect>();
  const count1024 = createRef<Rect>();
  const count1000 = createRef<Rect>();
  const approxBadge = createRef<Rect>();
  const oldLabels = createRef<Layout>();

  const iec = createRef<Layout>();
  const iecDoc = createRef<Rect>();
  const decimalLane = createRef<Rect>();
  const binaryLane = createRef<Rect>();
  const pairBadge = createRef<Rect>();

  const legacy = createRef<Layout>();
  const explorer = createRef<Rect>();
  const timeline = createRef<Line>();
  const year1998 = createRef<Rect>();
  const today = createRef<Rect>();
  const labelNote = createRef<Rect>();

  const final = createRef<Layout>();
  const finalGb = createRef<Rect>();
  const finalGib = createRef<Rect>();
  const finalMapping = createRef<Rect>();
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
          y={-350}
          width={1640}
          text={'同样是 1GB，为什么会有两种算法？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={60}
          fontWeight={800}
          textAlign={'center'}
        />

        <Rect
          ref={driveCard}
          x={-430}
          y={-45}
          width={610}
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
            <Icon icon={'lucide:hard-drive'} size={42} color={C.accent} />
            <Txt text={'硬盘厂商'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={650} />
          </Layout>
          <Layout layout direction={'row'} alignItems={'baseline'} justifyContent={'center'} gap={12}>
            <Txt text={'500'} fill={C.text} fontFamily={MONO} fontSize={94} fontWeight={850} />
            <Txt text={'GB'} fill={C.accent} fontFamily={MONO} fontSize={44} fontWeight={820} />
          </Layout>
          <Txt text={'十进制标注'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={600} />
        </Rect>

        <Rect
          ref={windowsCard}
          x={430}
          y={-45}
          width={610}
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
            <Icon icon={'lucide:monitor'} size={40} color={C.blue} />
            <Txt text={'Windows'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={650} />
          </Layout>
          <Layout layout direction={'row'} alignItems={'baseline'} justifyContent={'center'} gap={12}>
            <Txt text={'465'} fill={C.text} fontFamily={MONO} fontSize={94} fontWeight={850} />
            <Txt text={'GB'} fill={C.blue} fontFamily={MONO} fontSize={44} fontWeight={820} />
          </Layout>
          <Txt text={'1024-based 换算'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={600} />
        </Rect>

        <Txt
          ref={hookQuestion}
          y={240}
          text={'为什么不直接统一单位？'}
          fill={C.accent}
          fontFamily={FONT}
          fontSize={40}
          fontWeight={780}
          opacity={0}
        />
      </Layout>

      <Layout ref={standard} width={1920} height={1080} opacity={0}>
        <Rect
          ref={standardBadge}
          y={-320}
          width={410}
          height={72}
          radius={22}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={1}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'标准其实已经分开'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780} />
        </Rect>

        <Rect
          ref={bytePool}
          y={-135}
          width={760}
          height={150}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={18}
        >
          <Icon icon={'lucide:database'} size={48} color={C.text} />
          <Txt text={'同一份 Bytes'} fill={C.text} fontFamily={FONT} fontSize={42} fontWeight={760} />
        </Rect>

        <Layout y={105} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect
            ref={gbCard}
            width={650}
            height={230}
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
            gap={12}
          >
            <Txt text={'GB'} fill={C.accent} fontFamily={MONO} fontSize={66} fontWeight={860} />
            <Txt text={'1,000,000,000 B'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={760} />
            <Txt text={'10⁹ · 十进制'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={620} />
          </Rect>
          <Rect
            ref={gibCard}
            width={650}
            height={230}
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
            gap={12}
          >
            <Txt text={'GiB'} fill={C.blue} fontFamily={MONO} fontSize={66} fontWeight={860} />
            <Txt text={'1,073,741,824 B'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={760} />
            <Txt text={'2³⁰ · 二进制'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={620} />
          </Rect>
        </Layout>
      </Layout>

      <Layout ref={history} width={1920} height={1080} opacity={0}>
        <Txt y={-330} text={'为什么以前会把两套算法叫同一个名字？'} fill={C.text} fontFamily={FONT} fontSize={44} fontWeight={760} />

        <Rect
          ref={oldComputer}
          x={-565}
          y={-45}
          width={430}
          height={330}
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
          gap={18}
        >
          <Icon icon={'lucide:memory-stick'} size={78} color={C.blue} />
          <Txt text={'早期计算机'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
          <Txt text={'天然围绕 2 的幂'} fill={C.muted} fontFamily={FONT} fontSize={24} fontWeight={620} />
        </Rect>

        <Rect
          ref={count1024}
          x={-80}
          y={-75}
          width={330}
          height={170}
          radius={28}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={8}
        >
          <Txt text={'1024'} fill={C.text} fontFamily={MONO} fontSize={60} fontWeight={850} />
          <Txt text={'2¹⁰'} fill={C.blue} fontFamily={MONO} fontSize={27} fontWeight={760} />
        </Rect>

        <Rect
          ref={count1000}
          x={380}
          y={-75}
          width={330}
          height={170}
          radius={28}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={8}
        >
          <Txt text={'1000'} fill={C.text} fontFamily={MONO} fontSize={60} fontWeight={850} />
          <Txt text={'10³'} fill={C.accent} fontFamily={MONO} fontSize={27} fontWeight={760} />
        </Rect>

        <Rect
          ref={approxBadge}
          x={150}
          y={105}
          width={360}
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
          <Txt text={'1024 ≈ 1000'} fill={C.accent} fontFamily={MONO} fontSize={36} fontWeight={840} />
        </Rect>

        <Layout ref={oldLabels} x={150} y={230} layout direction={'row'} gap={18} alignItems={'center'} justifyContent={'center'} opacity={0}>
          {['KB', 'MB', 'GB'].map(label => (
            <Rect key={label} width={150} height={66} radius={20} fill={C.surface} stroke={C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={label} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={800} />
            </Rect>
          ))}
        </Layout>
      </Layout>

      <Layout ref={iec} width={1920} height={1080} opacity={0}>
        <Rect
          ref={iecDoc}
          y={-285}
          width={500}
          height={120}
          radius={28}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={18}
        >
          <Icon icon={'lucide:file-check-2'} size={44} color={C.accent} />
          <Layout layout direction={'column'} alignItems={'start'} justifyContent={'center'} gap={4}>
            <Txt text={'IEC · 1998'} fill={C.text} fontFamily={MONO} fontSize={36} fontWeight={820} />
            <Txt text={'二进制前缀正式引入'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={620} />
          </Layout>
        </Rect>

        <Rect
          ref={decimalLane}
          y={-75}
          width={1180}
          height={150}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={44}
        >
          <Txt text={'十进制'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={650} />
          {['kB', 'MB', 'GB'].map((label, index) => (
            <Rect key={`dec-${label}`} width={190} height={80} radius={22} fill={index === 2 ? C.accentDark : C.raised} stroke={index === 2 ? '#46572A' : C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={label} fill={index === 2 ? C.accent : C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
            </Rect>
          ))}
        </Rect>

        <Rect
          ref={binaryLane}
          y={115}
          width={1180}
          height={150}
          radius={30}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={44}
        >
          <Txt text={'二进制'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={650} />
          {['KiB', 'MiB', 'GiB'].map((label, index) => (
            <Rect key={`bin-${label}`} width={190} height={80} radius={22} fill={index === 2 ? '#18243A' : C.raised} stroke={index === 2 ? '#37547D' : C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={label} fill={index === 2 ? C.blue : C.text} fontFamily={MONO} fontSize={34} fontWeight={820} />
            </Rect>
          ))}
        </Rect>

        <Rect
          ref={pairBadge}
          y={275}
          width={500}
          height={76}
          radius={22}
          fill={C.raised}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'GB ≠ GiB · 名字终于分开'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={740} />
        </Rect>
      </Layout>

      <Layout ref={legacy} width={1920} height={1080} opacity={0}>
        <Txt y={-330} text={'标准变了，显示习惯却没有一起变'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={770} />

        <Rect
          ref={explorer}
          y={-70}
          width={1120}
          height={320}
          radius={34}
          fill={C.surface}
          stroke={C.border}
          lineWidth={2}
          opacity={0}
          scale={0.97}
          layout
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={20}
        >
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={16}>
            <Icon icon={'lucide:folder-open'} size={42} color={C.blue} />
            <Txt text={'Windows Explorer'} fill={C.muted} fontFamily={FONT} fontSize={28} fontWeight={650} />
          </Layout>
          <Layout layout direction={'row'} alignItems={'baseline'} justifyContent={'center'} gap={14}>
            <Txt text={'465'} fill={C.text} fontFamily={MONO} fontSize={90} fontWeight={860} />
            <Txt text={'GB'} fill={C.blue} fontFamily={MONO} fontSize={42} fontWeight={820} />
          </Layout>
          <Rect width={760} height={22} radius={11} fill={C.raised} stroke={C.border} lineWidth={1} layout alignItems={'start'}>
            <Rect width={700} height={16} radius={8} fill={C.accent} />
          </Rect>
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={30}>
            <Txt text={'计算口径：1024-based'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={620} />
            <Txt text={'显示标签：GB'} fill={C.text} fontFamily={FONT} fontSize={23} fontWeight={680} />
          </Layout>
        </Rect>

        <Line ref={timeline} y={190} points={[[-430, 0], [430, 0]]} stroke={C.border} lineWidth={5} end={0} />
        <Rect ref={year1998} x={-430} y={190} width={180} height={64} radius={20} fill={C.accentDark} stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'1998 IEC'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={800} />
        </Rect>
        <Rect ref={today} x={430} y={190} width={180} height={64} radius={20} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'今天'} fill={C.text} fontFamily={FONT} fontSize={26} fontWeight={740} />
        </Rect>
        <Rect ref={labelNote} y={285} width={560} height={72} radius={22} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'定义已分开 · 旧标签仍被沿用'} fill={C.muted} fontFamily={FONT} fontSize={27} fontWeight={660} />
        </Rect>
      </Layout>

      <Layout ref={final} width={1920} height={1080} opacity={0}>
        <Txt y={-330} text={'真正没完全统一的是“显示习惯”'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={780} />

        <Layout y={-90} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={70}>
          <Rect
            ref={finalGb}
            width={620}
            height={230}
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
            gap={12}
          >
            <Txt text={'1 GB'} fill={C.accent} fontFamily={MONO} fontSize={62} fontWeight={860} />
            <Txt text={'10⁹ Bytes'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={780} />
            <Txt text={'国际标准 · 十进制'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={620} />
          </Rect>
          <Rect
            ref={finalGib}
            width={620}
            height={230}
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
            gap={12}
          >
            <Txt text={'1 GiB'} fill={C.blue} fontFamily={MONO} fontSize={62} fontWeight={860} />
            <Txt text={'2³⁰ Bytes'} fill={C.text} fontFamily={MONO} fontSize={38} fontWeight={780} />
            <Txt text={'IEC · 二进制'} fill={C.muted} fontFamily={FONT} fontSize={23} fontWeight={620} />
          </Rect>
        </Layout>

        <Rect
          ref={finalMapping}
          y={160}
          width={760}
          height={100}
          radius={28}
          fill={C.accentDark}
          stroke={'#46572A'}
          lineWidth={2}
          opacity={0}
          scale={0.96}
          layout
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Txt text={'500 GB  ≈  465.7 GiB'} fill={C.accent} fontFamily={MONO} fontSize={42} fontWeight={850} />
        </Rect>

        <Txt
          ref={finalTakeaway}
          y={285}
          text={'先看单位定义，再判断“虚标”'}
          fill={C.muted}
          fontFamily={FONT}
          fontSize={31}
          fontWeight={680}
          opacity={0}
        />
      </Layout>
    </>,
  );

  hook().opacity(1);
  yield* all(
    waitFor(phase(0, 1)),
    driveCard().opacity(1, 0.5, easeInOutCubic),
    driveCard().scale(1, 0.5, easeInOutCubic),
    delay(0.55, all(windowsCard().opacity(1, 0.5, easeInOutCubic), windowsCard().scale(1, 0.5, easeInOutCubic))),
    delay(1.35, hookQuestion().opacity(1, 0.4, easeInOutCubic)),
  );

  hook().opacity(0);
  standard().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    standardBadge().opacity(1, 0.4, easeInOutCubic),
    delay(0.45, all(bytePool().opacity(1, 0.45, easeInOutCubic), bytePool().scale(1, 0.45, easeInOutCubic))),
    delay(1.15, all(gbCard().opacity(1, 0.55, easeInOutCubic), gbCard().scale(1, 0.55, easeInOutCubic))),
    delay(2.15, all(gibCard().opacity(1, 0.55, easeInOutCubic), gibCard().scale(1, 0.55, easeInOutCubic))),
  );

  standard().opacity(0);
  history().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    oldComputer().opacity(1, 0.55, easeInOutCubic),
    oldComputer().scale(1, 0.55, easeInOutCubic),
    delay(0.75, count1024().opacity(1, 0.5, easeInOutCubic)),
    delay(1.35, count1000().opacity(1, 0.5, easeInOutCubic)),
    delay(2.1, approxBadge().opacity(1, 0.45, easeInOutCubic)),
    delay(3.0, oldLabels().opacity(1, 0.5, easeInOutCubic)),
  );

  history().opacity(0);
  iec().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    iecDoc().opacity(1, 0.5, easeInOutCubic),
    iecDoc().scale(1, 0.5, easeInOutCubic),
    delay(0.85, decimalLane().opacity(1, 0.55, easeInOutCubic)),
    delay(1.65, binaryLane().opacity(1, 0.55, easeInOutCubic)),
    delay(Math.max(2.7, phase(3, 4) * 0.55), pairBadge().opacity(1, 0.5, easeInOutCubic)),
  );

  iec().opacity(0);
  legacy().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    explorer().opacity(1, 0.55, easeInOutCubic),
    explorer().scale(1, 0.55, easeInOutCubic),
    delay(0.9, timeline().end(1, 1.0, easeInOutCubic)),
    delay(1.0, year1998().opacity(1, 0.4, easeInOutCubic)),
    delay(1.75, today().opacity(1, 0.4, easeInOutCubic)),
    delay(2.6, labelNote().opacity(1, 0.45, easeInOutCubic)),
  );

  legacy().opacity(0);
  final().opacity(1);
  yield* all(
    waitFor(phase(5, 6)),
    finalGb().opacity(1, 0.5, easeInOutCubic),
    finalGb().scale(1, 0.5, easeInOutCubic),
    delay(0.65, all(finalGib().opacity(1, 0.5, easeInOutCubic), finalGib().scale(1, 0.5, easeInOutCubic))),
    delay(1.55, all(finalMapping().opacity(1, 0.5, easeInOutCubic), finalMapping().scale(1, 0.5, easeInOutCubic))),
    delay(2.55, finalTakeaway().opacity(1, 0.45, easeInOutCubic)),
  );
});
