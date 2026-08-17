import {
  Circle,
  Line,
  Rect,
  Txt,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  all,
  createRef,
  easeInOutCubic,
  waitFor,
} from '@motion-canvas/core';

const BG = '#111210';
const PANEL = '#1A1C19';
const PANEL_2 = '#22241F';
const TEXT = '#F2F0E7';
const MUTED = '#9B9E95';
const LINE = '#4A4E46';
const ACCENT = '#D9FF6A';
const ACCENT_DARK = '#1B2110';
const WARM = '#E9D9B5';

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = 'JetBrains Mono, Consolas, monospace';

export default makeScene2D(function* (view) {
  view.fill(BG);

  const eyebrow = createRef<Txt>();
  const headline = createRef<Txt>();
  const phase = createRef<Txt>();

  const browser = createRef<Rect>();
  const addressText = createRef<Txt>();
  const caret = createRef<Rect>();
  const browserHint = createRef<Txt>();
  const pageTitle = createRef<Txt>();
  const pageSearch = createRef<Rect>();
  const pageLine1 = createRef<Rect>();
  const pageLine2 = createRef<Rect>();
  const pageLine3 = createRef<Rect>();
  const pageStatus = createRef<Txt>();

  const dns = createRef<Rect>();
  const dnsLine = createRef<Line>();
  const server = createRef<Rect>();
  const serverLine = createRef<Line>();
  const connectionState = createRef<Txt>();
  const lock = createRef<Rect>();

  const packet = createRef<Rect>();
  const packetText = createRef<Txt>();
  const packetSub = createRef<Txt>();

  const result = createRef<Rect>();
  const resultText = createRef<Txt>();

  const summary = createRef<Txt>();
  const outroBrand = createRef<Txt>();
  const outroTagline = createRef<Txt>();

  view.add(
    <>
      <Txt
        ref={eyebrow}
        x={-390}
        y={-790}
        text={'7BYTE · EP.001'}
        fill={ACCENT}
        fontFamily={MONO}
        fontSize={28}
        fontWeight={700}
        opacity={0}
      />
      <Txt
        ref={headline}
        x={-40}
        y={-690}
        width={880}
        text={'输入 baidu.com 后\n发生了什么？'}
        fill={TEXT}
        fontFamily={FONT}
        fontSize={76}
        fontWeight={700}
        lineHeight={100}
        textAlign={'left'}
        opacity={0}
      />
      <Txt
        ref={phase}
        x={-360}
        y={-785}
        text={''}
        fill={MUTED}
        fontFamily={MONO}
        fontSize={26}
        fontWeight={600}
        opacity={0}
      />

      {/* 程序化浏览器：同一个对象贯穿开头、抽象流程和结尾。 */}
      <Rect
        ref={browser}
        x={0}
        y={150}
        width={900}
        height={1040}
        radius={30}
        fill={PANEL}
        stroke={LINE}
        lineWidth={3}
        opacity={0}
        clip
      >
        <Rect y={-470} width={900} height={100} fill={PANEL_2}>
          <Circle x={-395} width={18} height={18} fill={'#6C7068'} />
          <Circle x={-360} width={18} height={18} fill={'#6C7068'} />
          <Circle x={-325} width={18} height={18} fill={'#6C7068'} />
          <Txt
            x={-190}
            text={'新标签页'}
            fill={MUTED}
            fontFamily={FONT}
            fontSize={24}
          />
        </Rect>

        <Rect
          y={-380}
          width={790}
          height={68}
          radius={34}
          fill={'#111310'}
          stroke={LINE}
          lineWidth={2}
        >
          <Txt
            x={-340}
            text={'⌕'}
            fill={MUTED}
            fontFamily={FONT}
            fontSize={28}
          />
          <Txt
            ref={addressText}
            x={-285}
            width={570}
            text={''}
            fill={TEXT}
            fontFamily={MONO}
            fontSize={28}
            textAlign={'left'}
          />
          <Rect
            ref={caret}
            x={-281}
            width={2}
            height={32}
            fill={ACCENT}
            opacity={0}
          />
        </Rect>

        {/* 资源抵达时页面真的发生变化，避免装饰性“飞卡片”。 */}
        <Txt
          ref={browserHint}
          y={-80}
          text={'等待页面数据…'}
          fill={MUTED}
          fontFamily={FONT}
          fontSize={30}
          opacity={0}
        />
        <Txt
          ref={pageTitle}
          y={-150}
          text={'Baidu'}
          fill={TEXT}
          fontFamily={FONT}
          fontSize={68}
          fontWeight={700}
          opacity={0}
        />
        <Rect
          ref={pageSearch}
          y={-20}
          width={580}
          height={80}
          radius={18}
          fill={'#111310'}
          stroke={LINE}
          lineWidth={2}
          opacity={0}
        >
          <Txt
            x={-210}
            text={'搜索内容'}
            fill={MUTED}
            fontFamily={FONT}
            fontSize={25}
          />
          <Rect
            x={235}
            width={110}
            height={58}
            radius={12}
            fill={ACCENT}
          >
            <Txt
              text={'搜索'}
              fill={BG}
              fontFamily={FONT}
              fontSize={24}
              fontWeight={700}
            />
          </Rect>
        </Rect>
        <Rect
          ref={pageLine1}
          x={-80}
          y={145}
          width={570}
          height={28}
          radius={14}
          fill={'#343831'}
          opacity={0}
        />
        <Rect
          ref={pageLine2}
          x={-135}
          y={205}
          width={460}
          height={22}
          radius={11}
          fill={'#2B2E29'}
          opacity={0}
        />
        <Rect
          ref={pageLine3}
          x={-175}
          y={260}
          width={380}
          height={22}
          radius={11}
          fill={'#2B2E29'}
          opacity={0}
        />
        <Txt
          ref={pageStatus}
          y={390}
          text={''}
          fill={ACCENT}
          fontFamily={MONO}
          fontSize={25}
          fontWeight={600}
          opacity={0}
        />
      </Rect>

      <Rect
        ref={dns}
        x={290}
        y={-190}
        width={300}
        height={220}
        radius={26}
        fill={PANEL}
        stroke={LINE}
        lineWidth={3}
        opacity={0}
      >
        <Txt
          y={-45}
          text={'DNS'}
          fill={TEXT}
          fontFamily={MONO}
          fontSize={50}
          fontWeight={700}
        />
        <Txt
          y={35}
          text={'域名 → IP 地址'}
          fill={MUTED}
          fontFamily={FONT}
          fontSize={25}
        />
      </Rect>

      <Line
        ref={dnsLine}
        points={[
          [-175, 220],
          [-20, 40],
          [160, -120],
        ]}
        stroke={LINE}
        lineWidth={4}
        radius={30}
        end={0}
      />

      <Rect
        ref={server}
        x={300}
        y={350}
        width={320}
        height={290}
        radius={26}
        fill={PANEL}
        stroke={LINE}
        lineWidth={3}
        opacity={0}
      >
        <Txt
          y={-70}
          text={'WEB SERVER'}
          fill={TEXT}
          fontFamily={MONO}
          fontSize={32}
          fontWeight={700}
        />
        <Rect y={10} width={235} height={18} radius={9} fill={'#383C35'} />
        <Rect y={55} width={235} height={18} radius={9} fill={'#383C35'} />
        <Circle x={95} y={105} width={18} height={18} fill={ACCENT} />
        <Txt
          x={-20}
          y={105}
          text={'ready'}
          fill={MUTED}
          fontFamily={MONO}
          fontSize={21}
        />
      </Rect>

      <Line
        ref={serverLine}
        points={[
          [-175, 280],
          [20, 300],
          [140, 330],
        ]}
        stroke={ACCENT}
        lineWidth={5}
        radius={30}
        end={0}
        opacity={0}
      />

      <Txt
        ref={connectionState}
        x={0}
        y={450}
        text={''}
        fill={MUTED}
        fontFamily={FONT}
        fontSize={30}
        fontWeight={600}
        opacity={0}
      />

      <Rect
        ref={lock}
        x={5}
        y={310}
        width={96}
        height={82}
        radius={22}
        fill={ACCENT_DARK}
        stroke={ACCENT}
        lineWidth={3}
        opacity={0}
      >
        <Txt
          text={'LOCK'}
          fill={ACCENT}
          fontFamily={MONO}
          fontSize={21}
          fontWeight={800}
        />
      </Rect>

      {/* packet 是网络阶段唯一的主运动对象。 */}
      <Rect
        ref={packet}
        x={-180}
        y={160}
        width={290}
        height={104}
        radius={18}
        fill={ACCENT}
        opacity={0}
      >
        <Txt
          ref={packetText}
          y={-14}
          text={''}
          fill={BG}
          fontFamily={MONO}
          fontSize={29}
          fontWeight={800}
        />
        <Txt
          ref={packetSub}
          y={25}
          text={''}
          fill={'#343B21'}
          fontFamily={MONO}
          fontSize={19}
          fontWeight={600}
        />
      </Rect>

      <Rect
        ref={result}
        x={-220}
        y={500}
        width={420}
        height={112}
        radius={22}
        fill={WARM}
        opacity={0}
      >
        <Txt
          ref={resultText}
          text={''}
          fill={BG}
          fontFamily={MONO}
          fontSize={27}
          fontWeight={800}
        />
      </Rect>

      <Txt
        ref={summary}
        y={-50}
        width={850}
        text={'找地址  →  建连接  →  加密\n→  请求  →  传输  →  渲染'}
        fill={TEXT}
        fontFamily={FONT}
        fontSize={54}
        fontWeight={650}
        lineHeight={90}
        textAlign={'center'}
        opacity={0}
      />

      <Txt
        ref={outroBrand}
        y={-80}
        text={'7BYTE'}
        fill={TEXT}
        fontFamily={MONO}
        fontSize={118}
        fontWeight={800}
        letterSpacing={4}
        opacity={0}
      />
      <Txt
        ref={outroTagline}
        y={70}
        text={'把计算机讲简单一点。'}
        fill={MUTED}
        fontFamily={FONT}
        fontSize={38}
        fontWeight={500}
        opacity={0}
      />
    </>,
  );

  // 00:00–00:06 — 从真实浏览器行为进入，不先抛流程图。
  yield* all(
    eyebrow().opacity(1, 0.45),
    headline().opacity(1, 0.65),
    browser().opacity(1, 0.65),
  );
  yield* waitFor(0.8);

  yield* all(
    headline().opacity(0, 0.45),
    eyebrow().opacity(0, 0.45),
  );
  caret().opacity(1);

  const domain = 'baidu.com';
  for (let i = 1; i <= domain.length; i++) {
    addressText().text(domain.slice(0, i));
    caret().x(-281 + i * 18.5);
    yield* waitFor(0.10);
  }
  yield* waitFor(0.45);

  browserHint().text('↵  Enter');
  yield* browserHint().opacity(1, 0.25);
  yield* waitFor(0.55);
  yield* browserHint().opacity(0, 0.25);
  caret().opacity(0);

  // 浏览器缩到左侧后保持锚点位置，保证空间连续性。
  yield* all(
    browser().position([-300, 220], 0.9, easeInOutCubic),
    browser().scale(0.56, 0.9, easeInOutCubic),
  );

  // 00:06–00:17 — DNS 查询与响应。
  phase().text('01 / 先找到服务器在哪');
  yield* phase().opacity(1, 0.35);
  yield* dns().opacity(1, 0.55);
  yield* dnsLine().end(1, 0.75, easeInOutCubic);
  yield* waitFor(0.55);

  packetText().text('DNS QUERY');
  packetSub().text('baidu.com ?');
  packet().fill(ACCENT);
  packet().position([-185, 205]);
  yield* packet().opacity(1, 0.25);
  yield* packet().position([250, -105], 1.25, easeInOutCubic);
  yield* waitFor(0.75);

  packetText().text('DNS ANSWER');
  packetSub().text('IP address');
  packet().fill(WARM);
  yield* packet().position([-185, 205], 1.25, easeInOutCubic);
  yield* packet().opacity(0, 0.25);

  resultText().text('baidu.com  →  IP 地址');
  yield* result().opacity(1, 0.35);
  yield* waitFor(1.15);
  yield* result().opacity(0, 0.35);

  yield* all(
    dns().opacity(0.18, 0.55),
    dnsLine().opacity(0.18, 0.55),
  );

  // 00:17–00:27 — 建立连接，再建立 HTTPS 加密通道。
  phase().text('02 / 建立连接');
  yield* server().opacity(1, 0.55);
  serverLine().opacity(1);
  yield* serverLine().end(1, 1.0, easeInOutCubic);
  connectionState().text('连接已经建立');
  yield* connectionState().opacity(1, 0.35);
  yield* waitFor(1.0);

  phase().text('03 / 建立 HTTPS 加密通道');
  connectionState().text('后面的数据在加密通道中传输');
  yield* lock().opacity(1, 0.45);
  yield* waitFor(1.35);
  yield* all(
    lock().opacity(0, 0.35),
    connectionState().opacity(0, 0.35),
  );

  // 00:27–00:34 — 沿既有路径发送一个明确的 HTTP request packet。
  phase().text('04 / 发出 HTTP 请求');
  packetText().text('GET /');
  packetSub().text('HTTP request');
  packet().fill(ACCENT);
  packet().position([-175, 300]);
  yield* packet().opacity(1, 0.25);
  yield* packet().position([180, 340], 1.15, easeInOutCubic);
  yield* waitFor(0.75);
  yield* packet().opacity(0, 0.25);

  resultText().text('服务器收到请求');
  result().position([220, 535]);
  yield* result().opacity(1, 0.35);
  yield* waitFor(0.85);
  yield* result().opacity(0, 0.35);

  // 00:34–00:47 — 返回资源，每个 packet 抵达都改变页面状态。
  phase().text('05 / 数据回来，页面一点点长出来');
  browserHint().text('正在接收页面数据…');
  yield* browserHint().opacity(1, 0.3);

  const resources = [
    {
      label: 'HTML',
      sub: 'structure',
      state: 'HTML → 页面结构',
      apply: function* () {
        yield* all(
          pageTitle().opacity(1, 0.35),
          pageLine1().opacity(1, 0.35),
          pageLine2().opacity(1, 0.35),
          pageLine3().opacity(1, 0.35),
        );
      },
    },
    {
      label: 'CSS',
      sub: 'styles',
      state: 'CSS → 页面样式',
      apply: function* () {
        yield* pageSearch().opacity(1, 0.4);
      },
    },
    {
      label: 'JS',
      sub: 'behavior',
      state: 'JavaScript → 页面开始工作',
      apply: function* () {
        pageStatus().text('interaction ready');
        yield* pageStatus().opacity(1, 0.35);
      },
    },
    {
      label: 'IMG',
      sub: 'assets',
      state: '图片等资源继续加载',
      apply: function* () {
        yield* all(
          pageLine1().fill('#5B6255', 0.35),
          pageLine2().fill('#444940', 0.35),
          pageLine3().fill('#383D36', 0.35),
        );
      },
    },
  ];

  for (const item of resources) {
    packetText().text(item.label);
    packetSub().text(item.sub);
    packet().fill(WARM);
    packet().position([180, 340]);
    yield* packet().opacity(1, 0.2);
    yield* packet().position([-175, 300], 1.0, easeInOutCubic);
    yield* packet().opacity(0, 0.2);

    pageStatus().text(item.state);
    pageStatus().opacity(1);
    yield* item.apply();
    yield* waitFor(0.45);
  }

  yield* browserHint().opacity(0, 0.3);
  yield* waitFor(0.65);

  // 00:47–00:52 — 网络抽象退场，同一个浏览器回到中央形成闭环。
  phase().text('06 / 浏览器解析、排版、绘制');
  yield* all(
    dns().opacity(0, 0.45),
    dnsLine().opacity(0, 0.45),
    server().opacity(0, 0.45),
    serverLine().opacity(0, 0.45),
    connectionState().opacity(0, 0.45),
  );

  yield* all(
    browser().position([0, 120], 0.9, easeInOutCubic),
    browser().scale(0.86, 0.9, easeInOutCubic),
  );
  pageStatus().text('页面渲染完成');
  pageStatus().fill(ACCENT);
  pageStatus().opacity(1);
  yield* waitFor(1.2);

  yield* all(
    browser().opacity(0, 0.55),
    phase().opacity(0, 0.45),
  );

  // 00:52–00:57 — 六步总结和克制片尾。
  yield* summary().opacity(1, 0.55);
  yield* waitFor(1.65);
  yield* summary().opacity(0, 0.45);

  yield* all(
    outroBrand().opacity(1, 0.55),
    outroTagline().opacity(1, 0.75),
  );
  yield* waitFor(2.0);
});
