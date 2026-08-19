import {
  Circle,
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

const C = {
  bg: '#0F100E',
  surface: '#191A17',
  raised: '#22231F',
  border: '#383B33',
  text: '#F4F1E8',
  muted: '#969A90',
  accent: '#D8FF68',
  accentDark: '#1D2411',
  danger: '#FF6B67',
  blue: '#72A7FF',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';

const T = [
  0.0,
  4.005,
  8.214,
  14.03,
  19.693,
  23.329,
  30.663,
  37.869,
  45.063,
  49.005,
  52.882,
  57.487,
];
const phase = (from: number, to: number) => T[to] - T[from];

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookLoader = createRef<Icon>();

  const local = createRef<Layout>();
  const localPhone = createRef<Rect>();
  const localRouter = createRef<Rect>();
  const localInternet = createRef<Rect>();
  const localWifiLine = createRef<Line>();
  const localInternetLine = createRef<Line>();
  const localBadge = createRef<Rect>();

  const chain = createRef<Layout>();
  const chainWorld = createRef<Layout>();
  const chainPhone = createRef<Rect>();
  const chainRouter = createRef<Rect>();
  const chainIsp = createRef<Rect>();
  const chainDns = createRef<Rect>();
  const chainServer = createRef<Rect>();
  const c1 = createRef<Line>();
  const c2 = createRef<Line>();
  const c3 = createRef<Line>();
  const c4 = createRef<Line>();
  const ispFail = createRef<Txt>();
  const dnsFail = createRef<Txt>();
  const serverFail = createRef<Txt>();
  const byteRefs = Array.from({length: 7}, () => createRef<Rect>());

  const handoffDevice = createRef<Rect>();
  const handoffTitle = createRef<Txt>();
  const handoffStatus = createRef<Txt>();
  const diagnostic = createRef<Layout>();
  const diagTitle = createRef<Txt>();
  const diagWeb = createRef<Rect>();
  const diagOther = createRef<Rect>();
  const otherState = createRef<Txt>();
  const diagResult = createRef<Rect>();

  const takeaway = createRef<Layout>();

  view.add(
    <>
      <Txt
        text={'7BYTE'}
        y={10}
        fill={C.text}
        opacity={0.028}
        fontFamily={MONO}
        fontSize={250}
        fontWeight={800}
        letterSpacing={18}
      />

      {/* SHOT 1 — hook */}
      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt
          y={-415}
          width={1600}
          text={'Wi-Fi 明明满格，为什么网页还是打不开？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={64}
          fontWeight={800}
          textAlign={'center'}
        />
        <Rect
          x={-300}
          y={20}
          width={430}
          height={500}
          radius={40}
          fill={C.surface}
          stroke={C.border}
          lineWidth={3}
        >
          <Rect
            y={-190}
            width={360}
            height={62}
            radius={31}
            fill={C.raised}
            layout
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={[0, 22]}
          >
            <Txt text={'10:24'} fill={C.muted} fontFamily={MONO} fontSize={20} fontWeight={650} />
            <Icon icon={'lucide:wifi'} size={31} color={C.accent} />
          </Rect>
          <Rect y={35} width={360} height={330} radius={24} fill={'#11120F'} stroke={C.border} lineWidth={2}>
            <Rect y={-112} width={285} height={50} radius={25} fill={C.raised} stroke={C.border} lineWidth={2}>
              <Txt text={'example.com'} fill={C.text} fontFamily={MONO} fontSize={20} fontWeight={650} />
            </Rect>
            <Icon ref={hookLoader} icon={'lucide:loader-circle'} y={-8} size={62} color={C.muted} />
            <Txt y={104} text={'网页打不开'} fill={C.danger} fontFamily={FONT} fontSize={25} fontWeight={680} />
          </Rect>
        </Rect>
        <Rect x={345} y={0} width={610} height={250} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}>
          <Layout layout direction={'column'} gap={24} alignItems={'start'} width={500}>
            <Layout layout direction={'row'} gap={20} alignItems={'center'}>
              <Icon icon={'lucide:wifi'} size={42} color={C.accent} />
              <Txt text={'Wi-Fi 信号'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={720} />
              <Txt text={'满格'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={760} />
            </Layout>
            <Layout layout direction={'row'} gap={20} alignItems={'center'}>
              <Icon icon={'lucide:globe-2'} size={42} color={C.blue} />
              <Txt text={'网页状态'} fill={C.text} fontFamily={FONT} fontSize={30} fontWeight={720} />
              <Txt text={'打不开'} fill={C.danger} fontFamily={FONT} fontSize={28} fontWeight={760} />
            </Layout>
          </Layout>
        </Rect>
      </Layout>

      {/* SHOT 2 — local wireless segment */}
      <Layout ref={local} width={1920} height={1080} opacity={0}>
        <Rect ref={localPhone} x={-640} y={-30} width={360} height={420} radius={36} fill={C.surface} stroke={C.border} lineWidth={3}>
          <Rect y={-158} width={300} height={56} radius={28} fill={C.raised} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={[0, 20]}>
            <Txt text={'10:24'} fill={C.muted} fontFamily={MONO} fontSize={18} fontWeight={650} />
            <Icon icon={'lucide:wifi'} size={29} color={C.accent} />
          </Rect>
          <Rect y={26} width={300} height={265} radius={22} fill={'#11120F'} stroke={C.border} lineWidth={2}>
            <Txt y={-60} text={'example.com'} fill={C.text} fontFamily={MONO} fontSize={18} fontWeight={650} />
            <Icon icon={'lucide:circle-x'} y={20} size={54} color={C.danger} />
            <Txt y={92} text={'网页打不开'} fill={C.danger} fontFamily={FONT} fontSize={22} fontWeight={680} />
          </Rect>
        </Rect>

        <Rect ref={localRouter} x={30} y={-30} width={360} height={170} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}>
          <Icon icon={'lucide:router'} x={-112} size={55} color={C.accent} />
          <Txt x={38} y={-25} text={'路由器'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={740} />
          <Txt x={38} y={27} text={'家里的无线接入点'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={500} />
        </Rect>

        <Rect ref={localInternet} x={650} y={-30} width={390} height={170} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}>
          <Icon icon={'lucide:cloud'} x={-125} size={55} color={C.blue} />
          <Txt x={38} y={-25} text={'互联网'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={740} />
          <Txt x={38} y={27} text={'状态要另外判断'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={500} />
        </Rect>

        <Line ref={localWifiLine} points={() => [localPhone().right(), localRouter().left()]} stroke={C.accent} lineWidth={8} lineCap={'round'} end={0} />
        <Line ref={localInternetLine} points={() => [localRouter().right(), localInternet().left()]} stroke={C.border} lineWidth={6} lineCap={'round'} end={0} />

        <Rect ref={localBadge} x={-300} y={88} width={230} height={54} radius={18} fill={C.accentDark} stroke={'#415124'} lineWidth={2}>
          <Txt text={'Wi-Fi 信号强度'} fill={C.accent} fontFamily={FONT} fontSize={21} fontWeight={720} />
        </Rect>
      </Layout>

      {/* SHOT 3 — topology inside a continuous camera world */}
      <Layout ref={chain} width={1920} height={1080} opacity={0}>
        <Layout ref={chainWorld} width={1920} height={1080}>
          <Rect ref={chainPhone} x={-760} y={-30} width={166} height={184} radius={30} fill={'#141512'} stroke={C.border} lineWidth={2}>
            <Icon icon={'lucide:smartphone'} y={-26} size={70} color={C.text} />
            <Txt y={48} text={'设备'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
          </Rect>

          <Rect ref={chainRouter} x={-420} y={-30} width={280} height={145} radius={22} fill={C.surface} stroke={C.border} lineWidth={2}>
            <Rect y={-68} width={236} height={5} radius={3} fill={C.accent} opacity={0.78} />
            <Icon icon={'lucide:router'} x={-86} y={-5} size={48} color={C.accent} />
            <Txt x={35} y={-18} text={'路由器'} fill={C.text} fontFamily={FONT} fontSize={26} fontWeight={730} />
            <Txt x={35} y={22} text={'无线接入'} fill={C.muted} fontFamily={FONT} fontSize={18} fontWeight={520} />
          </Rect>

          <Rect ref={chainIsp} x={-40} y={-30} width={290} height={170} radius={18} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}>
            <Rect y={-80} width={250} height={5} radius={3} fill={C.blue} opacity={0.72} />
            <Icon icon={'lucide:network'} x={-92} y={-8} size={46} color={C.blue} />
            <Txt x={38} y={-21} text={'运营商网络'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
            <Txt x={38} y={23} text={'WAN'} fill={C.muted} fontFamily={MONO} fontSize={17} fontWeight={620} />
            <Txt ref={ispFail} x={118} y={-62} text={'×'} fill={C.danger} fontFamily={FONT} fontSize={40} fontWeight={850} opacity={0} />
          </Rect>

          <Rect ref={chainDns} x={370} y={-30} width={250} height={166} radius={12} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}>
            <Rect x={-103} width={5} height={126} radius={3} fill={C.accent} opacity={0.64} />
            <Icon icon={'lucide:book-key'} x={-65} y={-18} size={42} color={C.accent} />
            <Txt x={35} y={-24} text={'DNS'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={770} />
            <Txt x={35} y={20} text={'解析服务'} fill={C.muted} fontFamily={FONT} fontSize={18} fontWeight={520} />
            <Txt ref={dnsFail} x={100} y={-60} text={'×'} fill={C.danger} fontFamily={FONT} fontSize={40} fontWeight={850} opacity={0} />
          </Rect>

          <Rect ref={chainServer} x={750} y={-30} width={250} height={166} radius={12} fill={C.raised} stroke={C.border} lineWidth={2} opacity={0}>
            <Rect x={-103} width={5} height={126} radius={3} fill={C.blue} opacity={0.58} />
            <Icon icon={'lucide:server'} x={-65} y={-18} size={42} color={C.text} />
            <Txt x={35} y={-24} text={'网站'} fill={C.text} fontFamily={FONT} fontSize={25} fontWeight={730} />
            <Txt x={35} y={20} text={'目标服务器'} fill={C.muted} fontFamily={FONT} fontSize={18} fontWeight={520} />
            <Txt ref={serverFail} x={100} y={-60} text={'×'} fill={C.danger} fontFamily={FONT} fontSize={40} fontWeight={850} opacity={0} />
          </Rect>

          <Line ref={c1} points={() => [chainPhone().right(), chainRouter().left()]} stroke={C.accent} lineWidth={6} lineCap={'round'} end={0} />
          <Line ref={c2} points={() => [chainRouter().right(), chainIsp().left()]} stroke={C.border} lineWidth={6} lineCap={'round'} end={0} />
          <Line ref={c3} points={() => [chainIsp().right(), chainDns().left()]} stroke={C.border} lineWidth={6} lineCap={'round'} end={0} />
          <Line ref={c4} points={() => [chainDns().right(), chainServer().left()]} stroke={C.border} lineWidth={6} lineCap={'round'} end={0} />

          {byteRefs.map((byte, index) => (
            <Rect
              ref={byte}
              key={`byte-${index}`}
              x={-660}
              y={-30}
              width={14}
              height={14}
              radius={3}
              fill={C.accent}
              opacity={0}
              scale={0.78}
            />
          ))}

          <Layout y={205} layout direction={'row'} gap={42} alignItems={'center'}>
            <Layout layout direction={'row'} gap={12} alignItems={'center'}>
              <Circle size={13} fill={C.accent} />
              <Txt text={'Wi-Fi 图标能反映'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={560} />
            </Layout>
            <Layout layout direction={'row'} gap={12} alignItems={'center'}>
              <Circle size={13} fill={C.border} />
              <Txt text={'后续网络需另外判断'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={560} />
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      {/* Handoff proxy: exact Shot 3 geometry, with an explicit lifecycle. */}
      <Rect ref={handoffDevice} x={-760} y={-30} width={166} height={184} radius={30} fill={'#141512'} stroke={C.border} lineWidth={2} opacity={0}>
        <Icon icon={'lucide:smartphone'} y={-26} size={70} color={C.text} />
        <Txt ref={handoffTitle} y={44} text={'设备'} fill={C.text} fontFamily={FONT} fontSize={23} fontWeight={720} />
        <Txt ref={handoffStatus} y={76} text={'× 上不了网'} fill={C.danger} fontFamily={FONT} fontSize={17} fontWeight={700} opacity={0} />
      </Rect>

      {/* SHOT 4 — open diagnostic composition, no full-page panel swap. */}
      <Layout ref={diagnostic} width={1920} height={1080} opacity={0}>
        <Txt ref={diagTitle} y={-330} text={'快速判断：问题在哪一侧？'} fill={C.text} fontFamily={FONT} fontSize={44} fontWeight={780} />

        <Rect ref={diagWeb} x={-565} y={-20} width={320} height={200} radius={26} fill={C.surface} stroke={C.border} lineWidth={2}>
          <Icon icon={'lucide:globe-2'} y={-48} size={52} color={C.blue} />
          <Txt y={22} text={'换一个网站'} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={700} />
          <Txt y={66} text={'仍然打不开'} fill={C.danger} fontFamily={FONT} fontSize={21} fontWeight={700} />
        </Rect>

        <Icon icon={'lucide:arrow-right'} x={-350} y={-20} size={42} color={C.muted} />
        <Icon icon={'lucide:arrow-right'} x={80} y={-20} size={42} color={C.muted} />

        <Rect ref={diagOther} x={350} y={-20} width={310} height={220} radius={28} fill={C.surface} stroke={C.border} lineWidth={2} opacity={0}>
          <Icon icon={'lucide:tablet-smartphone'} y={-55} size={58} color={C.text} />
          <Txt y={20} text={'另一台设备'} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={700} />
          <Txt ref={otherState} y={73} text={'等待检查'} fill={C.muted} fontFamily={FONT} fontSize={22} fontWeight={650} />
        </Rect>

        <Rect ref={diagResult} y={270} width={920} height={82} radius={22} fill={'#11120F'} stroke={C.border} lineWidth={2} opacity={0}>
          <Txt text={'多个设备都失败 → 优先检查网络侧'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={720} />
        </Rect>
      </Layout>

      {/* SHOT 5 — final model */}
      <Layout ref={takeaway} width={1920} height={1080} opacity={0}>
        <Layout layout direction={'column'} gap={42} alignItems={'center'}>
          <Layout layout direction={'row'} gap={30} alignItems={'center'}>
            <Layout layout direction={'row'} gap={18} alignItems={'center'}>
              <Icon icon={'lucide:wifi'} size={54} color={C.accent} />
              <Txt text={'Wi-Fi 满格'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
            </Layout>
            <Icon icon={'lucide:arrow-right'} size={42} color={C.muted} />
            <Rect width={520} height={118} radius={26} fill={C.accentDark} stroke={'#415124'} lineWidth={2} layout direction={'column'} gap={7} alignItems={'center'} justifyContent={'center'}>
              <Txt text={'手机 ↔ 路由器'} fill={C.accent} fontFamily={FONT} fontSize={32} fontWeight={780} />
              <Txt text={'这一小段信号很好'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={520} />
            </Rect>
          </Layout>

          <Txt text={'≠'} fill={C.danger} fontFamily={FONT} fontSize={54} fontWeight={850} />

          <Layout layout direction={'row'} gap={30} alignItems={'center'}>
            <Layout layout direction={'row'} gap={18} alignItems={'center'}>
              <Icon icon={'lucide:globe-2'} size={54} color={C.blue} />
              <Txt text={'互联网畅通'} fill={C.text} fontFamily={FONT} fontSize={34} fontWeight={760} />
            </Layout>
            <Icon icon={'lucide:arrow-right'} size={42} color={C.muted} />
            <Rect width={610} height={118} radius={26} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'column'} gap={7} alignItems={'center'} justifyContent={'center'}>
              <Txt text={'整条网络路径都正常'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={750} />
              <Txt text={'路由器 · 运营商 · DNS · 网站'} fill={C.muted} fontFamily={FONT} fontSize={21} fontWeight={520} />
            </Rect>
          </Layout>
        </Layout>
      </Layout>
    </>,
  );

  const byteDurations = [0.58, 0.59, 0.60, 0.61, 0.62, 0.63, 0.64];

  function* focusHop(
    revealedNodes: Rect[],
    visibleLines: Line[],
    source: Rect,
    target: Rect,
    activeLine: Line,
  ) {
    yield* all(
      ...revealedNodes.map(node =>
        node.opacity(node === target ? 1 : node === source ? 0.70 : 0.36, 0.18, easeInOutCubic),
      ),
      ...visibleLines.map(line =>
        all(
          line.opacity(line === activeLine ? 1 : 0.24, 0.18, easeInOutCubic),
          line.lineWidth(line === activeLine ? 8 : 4, 0.18, easeInOutCubic),
          line.stroke(line === activeLine ? C.accent : C.border, 0.18, easeInOutCubic),
        ),
      ),
    );
  }

  function* sendHop(startX: number, endX: number, target: Rect) {
    byteRefs.forEach(byte => {
      byte().x(startX);
      byte().y(-30);
      byte().opacity(0);
      byte().scale(0.78);
    });

    yield* all(
      ...byteRefs.map((byte, index) =>
        delay(
          index * 0.045,
          all(
            byte().opacity(1, 0.10, easeInOutCubic),
            byte().scale(1, 0.13, easeInOutCubic),
            byte().x(endX, byteDurations[index], easeInOutCubic),
            delay(byteDurations[index] - 0.13, byte().opacity(0, 0.13, easeInOutCubic)),
          ),
        ),
      ),
      delay(
        0.84,
        all(
          target.stroke(C.accent, 0.10),
          target.lineWidth(3.5, 0.10),
          target.scale(1.012, 0.10, easeInOutCubic),
        ),
      ),
    );

    yield* all(
      target.stroke(C.border, 0.18),
      target.lineWidth(2, 0.18),
      target.scale(1, 0.18, easeInOutCubic),
    );
  }

  // 0.000–4.005 — Hook.
  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.35),
    hookLoader().rotation(320, 3.4, easeInOutCubic),
  );

  // 4.005–8.214 — Wi-Fi and Internet are different states.
  yield* all(
    waitFor(phase(1, 2)),
    hook().opacity(0, 0.18),
    delay(0.14, local().opacity(1, 0.24)),
    delay(0.65, localWifiLine().end(1, 0.8, easeInOutCubic)),
    delay(1.65, localInternetLine().end(1, 0.65, easeInOutCubic)),
  );

  // 8.214–14.030 — Focus on phone ↔ router.
  yield* all(
    waitFor(phase(2, 3)),
    localInternet().opacity(0.28, 0.4),
    localInternetLine().opacity(0.25, 0.4),
    localRouter().stroke(C.accent, 0.45),
    localWifiLine().lineWidth(11, 0.45),
  );

  // 14.030–19.693 — Hold.
  yield* all(
    waitFor(phase(3, 4)),
    localRouter().stroke(C.border, 0.35),
    localWifiLine().lineWidth(8, 0.35),
  );

  // 19.693–23.329 — V21 shared-element handoff: geometry converges first, appearance follows.
  c1().end(1);
  yield* all(
    waitFor(phase(4, 5)),
    localInternetLine().end(0, 0.46, easeInOutCubic),
    localInternet().opacity(0, 0.38, easeInOutCubic),
    localBadge().opacity(0, 0.32, easeInOutCubic),
    delay(
      0.16,
      all(
        localPhone().x(-760, 1.10, easeInOutCubic),
        localPhone().scale(0.46, 1.10, easeInOutCubic),
        localRouter().x(-420, 1.10, easeInOutCubic),
        localRouter().scale(0.78, 1.10, easeInOutCubic),
        localWifiLine().lineWidth(6, 0.82, easeInOutCubic),
      ),
    ),
    // Retire detailed UI first; introduce simplified nodes a few frames later.
    // This avoids the double-image ghost that a long symmetric crossfade creates.
    delay(1.12, localPhone().opacity(0, 0.16, easeInOutCubic)),
    delay(1.12, localRouter().opacity(0, 0.16, easeInOutCubic)),
    delay(1.12, localWifiLine().opacity(0, 0.16, easeInOutCubic)),
    delay(1.20, chain().opacity(1, 0.18, easeInOutCubic)),
    delay(1.42, local().opacity(0, 0.02)),
  );

  // 23.329–30.663 — V21 camera: preserve the accepted continuous move.
  chainWorld().x(0);
  chainWorld().scale(1);
  yield* all(
    waitFor(phase(5, 6)),
    (function* () {
      yield* all(
        chainWorld().x(260, 0.62, easeInOutCubic),
        chainWorld().scale(1.22, 0.62, easeInOutCubic),
      );
    })(),
    delay(0.58, chainWorld().x(-430, phase(5, 6) - 0.58, easeInOutCubic)),
    (function* () {
      yield* focusHop([chainPhone(), chainRouter()], [c1()], chainPhone(), chainRouter(), c1());
      yield* sendHop(-670, -555, chainRouter());

      yield* all(chainIsp().opacity(0.34, 0.24), c2().end(1, 0.38, easeInOutCubic));
      yield* focusHop([chainPhone(), chainRouter(), chainIsp()], [c1(), c2()], chainRouter(), chainIsp(), c2());
      yield* sendHop(-285, -195, chainIsp());

      yield* all(chainDns().opacity(0.34, 0.24), c3().end(1, 0.38, easeInOutCubic));
      yield* focusHop([chainPhone(), chainRouter(), chainIsp(), chainDns()], [c1(), c2(), c3()], chainIsp(), chainDns(), c3());
      yield* sendHop(115, 235, chainDns());

      yield* all(chainServer().opacity(0.34, 0.24), c4().end(1, 0.38, easeInOutCubic));
      yield* focusHop([chainPhone(), chainRouter(), chainIsp(), chainDns(), chainServer()], [c1(), c2(), c3(), c4()], chainDns(), chainServer(), c4());
      yield* sendHop(505, 615, chainServer());
    })(),
  );

  // 30.663–37.869 — Pull back once, then compare failure locations.
  yield* all(
    waitFor(phase(6, 7)),
    chainWorld().x(0, 0.72, easeInOutCubic),
    chainWorld().scale(1, 0.72, easeInOutCubic),
    chainPhone().opacity(0.72, 0.22),
    chainRouter().opacity(0.72, 0.22),
    chainIsp().opacity(1, 0.22),
    chainDns().opacity(0.72, 0.22),
    chainServer().opacity(0.72, 0.22),
    c1().opacity(0.45, 0.22),
    c2().opacity(0.45, 0.22),
    c3().opacity(0.45, 0.22),
    c4().opacity(0.45, 0.22),
    chainIsp().stroke(C.danger, 0.3),
    ispFail().opacity(1, 0.25),
    delay(2.0, chainIsp().stroke(C.border, 0.25)),
    delay(2.0, ispFail().opacity(0, 0.2)),
    delay(2.2, chainDns().opacity(1, 0.18)),
    delay(2.2, chainIsp().opacity(0.72, 0.18)),
    delay(2.2, chainDns().stroke(C.danger, 0.3)),
    delay(2.2, dnsFail().opacity(1, 0.25)),
    delay(4.2, chainDns().stroke(C.border, 0.25)),
    delay(4.2, dnsFail().opacity(0, 0.2)),
    delay(4.4, chainServer().opacity(1, 0.18)),
    delay(4.4, chainDns().opacity(0.72, 0.18)),
    delay(4.4, chainServer().stroke(C.danger, 0.3)),
    delay(4.4, serverFail().opacity(1, 0.25)),
  );

  // 37.869–45.063 — V20 ownership handoff: one semantic device, one visible owner.
  handoffDevice().position([-760, -30]);
  handoffDevice().scale(1);
  handoffTitle().text('你的设备');
  handoffStatus().opacity(0);
  yield* all(
    waitFor(phase(7, 8)),
    handoffDevice().opacity(1, 0.04),
    chainPhone().opacity(0, 0.04),
    chainRouter().opacity(0, 0.30),
    chainIsp().opacity(0, 0.30),
    chainDns().opacity(0, 0.30),
    chainServer().opacity(0, 0.30),
    c1().opacity(0, 0.24),
    c2().opacity(0, 0.24),
    c3().opacity(0, 0.24),
    c4().opacity(0, 0.24),
    delay(0.12, diagnostic().opacity(1, 0.34, easeInOutCubic)),
    delay(
      0.12,
      all(
        handoffDevice().position([-125, -20], 0.92, easeInOutCubic),
        handoffDevice().scale(1.18, 0.92, easeInOutCubic),
      ),
    ),
    delay(0.54, handoffStatus().opacity(1, 0.24, easeInOutCubic)),
    delay(0.72, diagOther().opacity(1, 0.30, easeInOutCubic)),
    delay(0.32, chain().opacity(0, 0.22, easeInOutCubic)),
  );

  // 45.063–49.005 — Another device also fails.
  otherState().text('× 也上不了网');
  otherState().fill(C.danger);
  yield* all(
    waitFor(phase(8, 9)),
    diagResult().opacity(1, 0.35),
    diagOther().stroke(C.danger, 0.24),
  );

  // 49.005–52.882 — Retire the handoff proxy before Shot 5 takes ownership.
  yield* all(
    waitFor(phase(9, 10)),
    diagnostic().opacity(0, 0.28),
    handoffDevice().opacity(0, 0.22, easeInOutCubic),
    delay(0.30, takeaway().opacity(1, 0.36, easeInOutCubic)),
  );
  handoffStatus().opacity(0);

  // 52.882–57.487 — Hold through narration end.
  yield* waitFor(phase(10, 11));
});
