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
  SmoothSpring,
  all,
  createRef,
  easeInOutCubic,
  sequence,
  spring,
  waitFor,
} from '@motion-canvas/core';

// Episode-local visual system. Keep it here until EP.001 is approved.
const C = {
  bg: '#10110F',
  surface: '#191A17',
  raised: '#20221D',
  border: '#363930',
  text: '#F4F1E8',
  muted: '#9B9E94',
  accent: '#D8FF68',
  accentDark: '#1C2410',
  paper: '#F7F7F2',
  ink: '#1D1E1B',
  softInk: '#74776F',
  baiduBlue: '#4E6EF2',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const SAFE_W = 912;

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const kicker = createRef<Txt>();
  const headline = createRef<Txt>();
  const subhead = createRef<Txt>();
  const stepPill = createRef<Rect>();
  const stepText = createRef<Txt>();

  const browser = createRef<Rect>();
  const browserToolbar = createRef<Rect>();
  const addressBar = createRef<Rect>();
  const addressText = createRef<Txt>();
  const caret = createRef<Rect>();
  const browserStatus = createRef<Txt>();
  const pageBody = createRef<Rect>();
  const logoSkeleton = createRef<Rect>();
  const pageLogo = createRef<Txt>();
  const pageSearch = createRef<Rect>();
  const pageButton = createRef<Rect>();
  const pageButtonText = createRef<Txt>();
  const pageLine1 = createRef<Rect>();
  const pageLine2 = createRef<Rect>();
  const pageLine3 = createRef<Rect>();
  const pageReady = createRef<Rect>();
  const pageReadyText = createRef<Txt>();

  const dnsCard = createRef<Rect>();
  const dnsLine = createRef<Line>();
  const serverCard = createRef<Rect>();
  const serverLine = createRef<Line>();
  const securePill = createRef<Rect>();
  const secureText = createRef<Txt>();

  const packet = createRef<Rect>();
  const packetIcon = createRef<Icon>();
  const packetLabel = createRef<Txt>();
  const packetMeta = createRef<Txt>();

  const resultPill = createRef<Rect>();
  const resultText = createRef<Txt>();
  const footer = createRef<Txt>();

  const summary = createRef<Layout>();
  const outro = createRef<Layout>();

  view.add(
    <>
      {/* Fixed title system. All copy stays inside a 912px safe width. */}
      <Txt
        ref={kicker}
        x={-SAFE_W / 2}
        y={-822}
        offset={[-1, 0]}
        text={'7BYTE  /  INTERNET 001'}
        fill={C.accent}
        fontFamily={MONO}
        fontSize={25}
        fontWeight={700}
        letterSpacing={1.5}
        opacity={0}
      />
      <Txt
        ref={headline}
        x={-SAFE_W / 2}
        y={-700}
        offset={[-1, 0]}
        width={SAFE_W}
        text={'输入 baidu.com 后，\n电脑到底做了什么？'}
        fill={C.text}
        fontFamily={FONT}
        fontSize={72}
        lineHeight={93}
        fontWeight={760}
        textAlign={'left'}
        opacity={0}
      />
      <Txt
        ref={subhead}
        x={-SAFE_W / 2}
        y={-560}
        offset={[-1, 0]}
        width={SAFE_W}
        text={'你看到的只是一次回车，背后却是一整条互联网流程。'}
        fill={C.muted}
        fontFamily={FONT}
        fontSize={29}
        lineHeight={44}
        textAlign={'left'}
        opacity={0}
      />
      <Rect
        ref={stepPill}
        x={-SAFE_W / 2}
        y={-792}
        offset={[-1, 0]}
        height={52}
        radius={26}
        padding={[0, 20]}
        fill={C.accentDark}
        stroke={'#405021'}
        lineWidth={2}
        layout
        alignItems={'center'}
        opacity={0}
      >
        <Txt
          ref={stepText}
          text={''}
          fill={C.accent}
          fontFamily={MONO}
          fontSize={22}
          fontWeight={700}
        />
      </Rect>

      {/* Browser shell uses layout internally instead of hand-placing toolbar children. */}
      <Rect
        ref={browser}
        y={190}
        width={900}
        height={760}
        radius={34}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2.5}
        clip
        opacity={0}
        scale={0.96}
      >
        <Rect
          ref={browserToolbar}
          y={-321}
          width={900}
          height={118}
          padding={[0, 26]}
          fill={C.raised}
          layout
          direction={'row'}
          alignItems={'center'}
          gap={16}
        >
          <Icon icon={'lucide:arrow-left'} size={28} color={C.muted} />
          <Icon icon={'lucide:rotate-cw'} size={26} color={C.muted} />
          <Rect
            ref={addressBar}
            height={70}
            grow={1}
            radius={35}
            padding={[0, 22]}
            fill={'#11120F'}
            stroke={C.border}
            lineWidth={2}
            layout
            direction={'row'}
            alignItems={'center'}
            gap={12}
          >
            <Icon icon={'lucide:globe-2'} size={24} color={C.muted} />
            <Txt
              ref={addressText}
              text={''}
              fill={C.text}
              fontFamily={MONO}
              fontSize={31}
              fontWeight={600}
            />
            <Rect ref={caret} width={2} height={31} fill={C.accent} opacity={0} />
          </Rect>
          <Icon icon={'lucide:ellipsis'} size={28} color={C.muted} />
        </Rect>

        <Rect
          ref={pageBody}
          y={59}
          width={900}
          height={642}
          fill={C.paper}
        >
          <Rect
            ref={logoSkeleton}
            y={-155}
            width={180}
            height={58}
            radius={14}
            fill={'#E1E2DD'}
            opacity={0}
          />
          <Txt
            ref={pageLogo}
            y={-155}
            text={'Baidu'}
            fill={C.ink}
            fontFamily={FONT}
            fontSize={64}
            fontWeight={760}
            opacity={0}
          />
          <Rect
            ref={pageSearch}
            y={-35}
            width={610}
            height={76}
            radius={14}
            fill={'#FFFFFF'}
            stroke={'#D7D8D3'}
            lineWidth={2}
            opacity={0}
          >
            <Txt
              x={-220}
              text={'搜索一下'}
              fill={'#A1A49C'}
              fontFamily={FONT}
              fontSize={25}
            />
            <Rect
              ref={pageButton}
              x={252}
              width={106}
              height={72}
              radius={[0, 14, 14, 0]}
              fill={'#D7D8D3'}
            >
              <Txt
                ref={pageButtonText}
                text={'搜索'}
                fill={'#FFFFFF'}
                fontFamily={FONT}
                fontSize={24}
                fontWeight={650}
              />
            </Rect>
          </Rect>
          <Rect ref={pageLine1} x={-70} y={100} width={500} height={22} radius={11} fill={'#DEDFDA'} opacity={0} />
          <Rect ref={pageLine2} x={-120} y={150} width={400} height={18} radius={9} fill={'#E6E7E2'} opacity={0} />
          <Rect ref={pageLine3} x={-155} y={196} width={330} height={18} radius={9} fill={'#E6E7E2'} opacity={0} />
          <Rect
            ref={pageReady}
            y={258}
            height={42}
            radius={21}
            padding={[0, 16]}
            fill={'#EDF0E8'}
            layout
            alignItems={'center'}
            gap={9}
            opacity={0}
          >
            <Circle size={9} fill={'#58A36A'} />
            <Txt
              ref={pageReadyText}
              text={'交互已就绪'}
              fill={C.softInk}
              fontFamily={FONT}
              fontSize={20}
              fontWeight={600}
            />
          </Rect>
          <Txt
            ref={browserStatus}
            y={270}
            text={'等待网页数据…'}
            fill={C.softInk}
            fontFamily={FONT}
            fontSize={25}
            opacity={0}
          />
        </Rect>
      </Rect>

      {/* DNS node */}
      <Rect
        ref={dnsCard}
        x={255}
        y={-135}
        width={370}
        height={230}
        radius={28}
        padding={28}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2.5}
        layout
        direction={'column'}
        alignItems={'start'}
        justifyContent={'center'}
        gap={12}
        opacity={0}
        scale={0.9}
      >
        <Rect width={58} height={58} radius={18} fill={C.accentDark} layout alignItems={'center'} justifyContent={'center'}>
          <Icon icon={'lucide:network'} size={31} color={C.accent} />
        </Rect>
        <Txt text={'DNS'} fill={C.text} fontFamily={MONO} fontSize={40} fontWeight={800} />
        <Txt text={'把域名翻译成 IP 地址'} fill={C.muted} fontFamily={FONT} fontSize={24} />
      </Rect>
      <Line
        ref={dnsLine}
        points={[
          [-80, 250],
          [60, 90],
          [120, -40],
        ]}
        stroke={C.border}
        lineWidth={3}
        radius={28}
        end={0}
        opacity={0}
      />

      {/* Web server node */}
      <Rect
        ref={serverCard}
        x={270}
        y={330}
        width={360}
        height={310}
        radius={28}
        padding={28}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2.5}
        layout
        direction={'column'}
        alignItems={'start'}
        justifyContent={'center'}
        gap={14}
        opacity={0}
        scale={0.9}
      >
        <Rect width={58} height={58} radius={18} fill={C.accentDark} layout alignItems={'center'} justifyContent={'center'}>
          <Icon icon={'lucide:server'} size={31} color={C.accent} />
        </Rect>
        <Txt text={'WEB SERVER'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={800} />
        <Rect width={260} height={2} fill={C.border} />
        <Layout layout direction={'row'} alignItems={'center'} gap={10}>
          <Circle size={10} fill={C.accent} />
          <Txt text={'ready · 等待请求'} fill={C.muted} fontFamily={MONO} fontSize={20} />
        </Layout>
      </Rect>
      <Line
        ref={serverLine}
        points={[
          [-15, 330],
          [55, 330],
          [88, 330],
        ]}
        stroke={C.accent}
        lineWidth={4}
        end={0}
        opacity={0}
      />

      <Rect
        ref={securePill}
        x={36}
        y={244}
        height={58}
        radius={29}
        padding={[0, 18]}
        fill={C.accentDark}
        stroke={'#405021'}
        lineWidth={2}
        layout
        direction={'row'}
        alignItems={'center'}
        gap={10}
        opacity={0}
        scale={0.9}
      >
        <Icon icon={'lucide:shield-check'} size={25} color={C.accent} />
        <Txt ref={secureText} text={'连接已建立'} fill={C.accent} fontFamily={FONT} fontSize={22} fontWeight={650} />
      </Rect>

      {/* One primary moving object: packet chip. */}
      <Rect
        ref={packet}
        width={286}
        height={92}
        radius={22}
        padding={[0, 20]}
        fill={C.accent}
        layout
        direction={'row'}
        alignItems={'center'}
        gap={14}
        opacity={0}
        scale={0.94}
      >
        <Icon ref={packetIcon} icon={'lucide:send'} size={30} color={C.bg} />
        <Layout layout direction={'column'} alignItems={'start'} gap={2}>
          <Txt ref={packetLabel} text={''} fill={C.bg} fontFamily={MONO} fontSize={25} fontWeight={800} />
          <Txt ref={packetMeta} text={''} fill={'#36401F'} fontFamily={MONO} fontSize={17} fontWeight={650} />
        </Layout>
      </Rect>

      <Rect
        ref={resultPill}
        x={-260}
        y={555}
        height={64}
        radius={32}
        padding={[0, 20]}
        fill={C.raised}
        stroke={C.border}
        lineWidth={2}
        layout
        alignItems={'center'}
        opacity={0}
      >
        <Txt ref={resultText} text={''} fill={C.text} fontFamily={MONO} fontSize={22} fontWeight={700} />
      </Rect>

      <Txt
        ref={footer}
        x={-SAFE_W / 2}
        y={805}
        offset={[-1, 0]}
        width={SAFE_W}
        text={''}
        fill={C.muted}
        fontFamily={FONT}
        fontSize={27}
        lineHeight={42}
        textAlign={'left'}
        opacity={0}
      />

      <Layout
        ref={summary}
        y={30}
        width={SAFE_W}
        layout
        direction={'column'}
        alignItems={'center'}
        gap={32}
        opacity={0}
      >
        <Txt text={'一次回车，背后跑完这一整条链路'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={720} />
        <Layout layout direction={'column'} alignItems={'stretch'} gap={14} width={780}>
          {[
            ['01', 'DNS', '找到服务器'],
            ['02', 'CONNECT', '建立连接 + 加密通道'],
            ['03', 'HTTP', '发送网页请求'],
            ['04', 'RESOURCES', 'HTML / CSS / JS / IMG 返回'],
            ['05', 'RENDER', '浏览器解析、排版、绘制'],
          ].map(([n, label, desc]) => (
            <Rect height={88} radius={22} padding={[0, 24]} fill={C.surface} stroke={C.border} lineWidth={2} layout direction={'row'} alignItems={'center'} gap={22}>
              <Txt width={48} text={n} fill={C.accent} fontFamily={MONO} fontSize={22} fontWeight={800} />
              <Txt width={190} text={label} fill={C.text} fontFamily={MONO} fontSize={24} fontWeight={750} />
              <Txt grow={1} text={desc} fill={C.muted} fontFamily={FONT} fontSize={23} />
            </Rect>
          ))}
        </Layout>
      </Layout>

      <Layout ref={outro} y={0} layout direction={'column'} alignItems={'center'} gap={18} opacity={0} scale={0.96}>
        <Txt text={'7BYTE'} fill={C.text} fontFamily={MONO} fontSize={122} fontWeight={850} letterSpacing={5} />
        <Rect width={110} height={6} radius={3} fill={C.accent} />
        <Txt text={'把计算机讲简单一点。'} fill={C.muted} fontFamily={FONT} fontSize={38} fontWeight={550} />
      </Layout>
    </>,
  );

  function* setStep(index: string, title: string, caption: string) {
    yield* all(headline().opacity(0, 0.22), subhead().opacity(0, 0.22), stepPill().opacity(0, 0.18));
    headline().text(title);
    subhead().text(caption);
    stepText().text(index);
    yield* all(headline().opacity(1, 0.34), subhead().opacity(1, 0.34), stepPill().opacity(1, 0.28));
  }

  function* movePacket(
    label: string,
    meta: string,
    icon: string,
    from: [number, number],
    to: [number, number],
    duration = 1.05,
  ) {
    packetLabel().text(label);
    packetMeta().text(meta);
    packetIcon().icon(icon);
    packet().position(from);
    packet().scale(0.94);
    yield* all(packet().opacity(1, 0.2), packet().scale(1, 0.28));
    yield* packet().position(to, duration, easeInOutCubic);
    yield* packet().opacity(0, 0.2);
  }

  // 00:00–00:06 — Hook: a clean, readable browser at full vertical-video scale.
  yield* all(
    kicker().opacity(1, 0.35),
    headline().opacity(1, 0.5),
    subhead().opacity(1, 0.55),
    browser().opacity(1, 0.5),
    spring(SmoothSpring, 0.96, 1, value => browser().scale(value)),
  );
  yield* waitFor(0.8);

  caret().opacity(1);
  const domain = 'baidu.com';
  for (let i = 1; i <= domain.length; i++) {
    addressText().text(domain.slice(0, i));
    yield* waitFor(0.11);
  }
  yield* waitFor(0.35);
  caret().opacity(0);
  browserStatus().text('↵  Enter');
  yield* browserStatus().opacity(1, 0.2);
  yield* waitFor(0.55);
  yield* browserStatus().opacity(0, 0.18);

  // 00:06–00:15 — DNS. Browser becomes a persistent left anchor.
  yield* setStep('01  /  DNS', '第一步：先找到百度在哪', '电脑真正连接的是 IP 地址，所以浏览器要先把域名交给 DNS。');
  yield* all(
    browser().position([-230, 320], 0.8, easeInOutCubic),
    browser().scale(0.46, 0.8, easeInOutCubic),
  );
  yield* all(
    dnsCard().opacity(1, 0.28),
    spring(SmoothSpring, 0.9, 1, value => dnsCard().scale(value)),
    dnsLine().opacity(1, 0.2),
    dnsLine().end(1, 0.7, easeInOutCubic),
  );
  yield* waitFor(0.4);

  yield* movePacket('DNS QUERY', 'baidu.com ?', 'lucide:search', [-120, 210], [230, -65], 1.05);
  yield* waitFor(0.45);
  yield* movePacket('DNS ANSWER', 'IP 地址', 'lucide:map-pin', [230, -65], [-120, 210], 1.05);
  resultText().text('baidu.com  →  IP 地址');
  yield* resultPill().opacity(1, 0.3);
  yield* waitFor(0.85);

  // 00:15–00:23 — Connection + HTTPS.
  yield* setStep('02  /  CONNECT', '找到服务器后，先建立连接', 'HTTPS 还会建立加密通道，后面的请求不会直接裸奔在网络上。');
  yield* all(dnsCard().opacity(0, 0.35), dnsLine().opacity(0, 0.35), resultPill().opacity(0, 0.3));
  yield* all(
    serverCard().opacity(1, 0.3),
    spring(SmoothSpring, 0.9, 1, value => serverCard().scale(value)),
  );
  serverLine().opacity(1);
  yield* serverLine().end(1, 0.8, easeInOutCubic);
  secureText().text('连接已建立');
  yield* all(
    securePill().opacity(1, 0.25),
    spring(SmoothSpring, 0.9, 1, value => securePill().scale(value)),
  );
  yield* waitFor(0.65);
  secureText().text('HTTPS · 加密通道');
  yield* waitFor(1.0);

  // 00:23–00:30 — HTTP request.
  yield* setStep('03  /  HTTP', '连接好了，浏览器才真正要网页', '这时浏览器发送 HTTP 请求：把这个页面给我。');
  yield* movePacket('GET /', 'HTTP REQUEST', 'lucide:send', [-80, 340], [245, 340], 1.15);
  yield* waitFor(0.7);

  // 00:30–00:43 — Resources return one by one; each packet visibly changes the browser.
  yield* setStep('04  /  RESOURCES', '服务器把网页需要的东西陆续发回来', 'HTML 定结构，CSS 管样式，JavaScript 管交互，图片负责视觉内容。');
  yield* all(browser().position([-190, 330], 0.55, easeInOutCubic), browser().scale(0.52, 0.55, easeInOutCubic));

  yield* movePacket('HTML', '页面结构', 'lucide:file-code-2', [245, 330], [-55, 330], 0.9);
  yield* sequence(
    0.08,
    logoSkeleton().opacity(1, 0.26),
    pageSearch().opacity(1, 0.28),
    pageLine1().opacity(1, 0.25),
    pageLine2().opacity(1, 0.25),
    pageLine3().opacity(1, 0.25),
  );
  yield* waitFor(0.35);

  yield* movePacket('CSS', '布局 + 样式', 'lucide:palette', [245, 330], [-55, 330], 0.9);
  yield* all(
    pageButton().fill(C.baiduBlue, 0.45),
    pageSearch().stroke('#BFC2BC', 0.45),
    pageLine1().fill('#C9CBC5', 0.45),
  );
  yield* waitFor(0.35);

  yield* movePacket('JS', '交互逻辑', 'lucide:braces', [245, 330], [-55, 330], 0.9);
  yield* pageReady().opacity(1, 0.35);
  yield* waitFor(0.35);

  yield* movePacket('IMG', '图片资源', 'lucide:image', [245, 330], [-55, 330], 0.9);
  yield* all(logoSkeleton().opacity(0, 0.28), pageLogo().opacity(1, 0.35));
  yield* waitFor(0.7);

  // 00:43–00:49 — Render: same browser returns to center, now complete.
  yield* setStep('05  /  RENDER', '最后，浏览器把这些内容真正画出来', '解析、计算布局、绘制——于是你终于看到了网页。');
  yield* all(
    serverCard().opacity(0, 0.35),
    serverLine().opacity(0, 0.3),
    securePill().opacity(0, 0.3),
    browser().position([0, 185], 0.8, easeInOutCubic),
    browser().scale(1, 0.8, easeInOutCubic),
  );
  yield* waitFor(1.3);

  // 00:49–00:55 — Summary and restrained outro.
  yield* all(
    kicker().opacity(0, 0.3),
    headline().opacity(0, 0.3),
    subhead().opacity(0, 0.3),
    stepPill().opacity(0, 0.3),
    browser().opacity(0, 0.42),
  );
  yield* all(summary().opacity(1, 0.45), spring(SmoothSpring, 0.97, 1, value => summary().scale(value)));
  yield* waitFor(2.1);
  yield* summary().opacity(0, 0.4);
  yield* all(outro().opacity(1, 0.45), spring(SmoothSpring, 0.96, 1, value => outro().scale(value)));
  yield* waitFor(2.0);
});
