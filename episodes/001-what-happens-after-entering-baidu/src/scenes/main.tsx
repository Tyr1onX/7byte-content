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

// EP.001 V3 — vertical-first, single-stage composition.
// Keep these decisions episode-local until the first video is visually approved.
const C = {
  bg: '#0F100E',
  surface: '#191A17',
  raised: '#22231F',
  border: '#383B33',
  text: '#F4F1E8',
  muted: '#969A90',
  accent: '#D8FF68',
  accentDark: '#1D2411',
  paper: '#F7F7F3',
  ink: '#1D1E1B',
  softInk: '#777B72',
  baiduBlue: '#4E6EF2',
  success: '#5BA76B',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const SAFE_W = 900;

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const caption = createRef<Txt>();
  const detail = createRef<Txt>();

  const browser = createRef<Rect>();
  const addressText = createRef<Txt>();
  const pageWaiting = createRef<Txt>();
  const pageLogoGhost = createRef<Rect>();
  const pageLogo = createRef<Txt>();
  const pageSearch = createRef<Rect>();
  const pageButton = createRef<Rect>();
  const pageLine1 = createRef<Rect>();
  const pageLine2 = createRef<Rect>();
  const pageLine3 = createRef<Rect>();
  const pageInteractive = createRef<Rect>();
  const pageImage = createRef<Rect>();

  const link = createRef<Line>();
  const dnsCard = createRef<Rect>();
  const serverCard = createRef<Rect>();
  const secureChip = createRef<Rect>();
  const secureText = createRef<Txt>();
  const resultChip = createRef<Rect>();
  const resultText = createRef<Txt>();

  const packet = createRef<Rect>();
  const packetIcon = createRef<Icon>();
  const packetLabel = createRef<Txt>();
  const packetMeta = createRef<Txt>();

  const summary = createRef<Layout>();
  const outro = createRef<Layout>();

  view.add(
    <>
      {/* Only one concise narrative label. No episode tag, no step number, no duplicate chrome. */}
      <Txt
        ref={caption}
        y={-790}
        width={860}
        text={'在浏览器输入 baidu.com，然后回车。'}
        fill={C.text}
        fontFamily={FONT}
        fontSize={48}
        lineHeight={64}
        fontWeight={720}
        textAlign={'center'}
        opacity={0}
      />
      <Txt
        ref={detail}
        y={-710}
        width={840}
        text={'不到一秒，背后会发生什么？'}
        fill={C.muted}
        fontFamily={FONT}
        fontSize={26}
        lineHeight={38}
        fontWeight={500}
        textAlign={'center'}
        opacity={0}
      />

      {/* Familiar browser frame. Everything inside is flex-laid-out and clipped. */}
      <Rect
        ref={browser}
        y={20}
        width={SAFE_W}
        height={650}
        radius={30}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2}
        clip
        opacity={0}
        scale={0.97}
      >
        <Rect
          y={-277}
          width={SAFE_W}
          height={96}
          padding={[0, 24]}
          fill={C.raised}
          layout
          direction={'row'}
          alignItems={'center'}
          gap={15}
        >
          <Icon icon={'lucide:arrow-left'} size={27} color={C.muted} />
          <Icon icon={'lucide:rotate-cw'} size={25} color={C.muted} />
          <Rect
            height={62}
            grow={1}
            radius={31}
            padding={[0, 20]}
            fill={'#11120F'}
            stroke={C.border}
            lineWidth={2}
            layout
            direction={'row'}
            alignItems={'center'}
            gap={12}
          >
            <Icon icon={'lucide:globe-2'} size={23} color={C.muted} />
            <Txt
              ref={addressText}
              grow={1}
              text={''}
              fill={C.text}
              fontFamily={MONO}
              fontSize={29}
              fontWeight={650}
              textAlign={'left'}
            />
          </Rect>
          <Icon icon={'lucide:ellipsis'} size={27} color={C.muted} />
        </Rect>

        <Rect y={48} width={SAFE_W} height={554} fill={C.paper}>
          <Txt
            ref={pageWaiting}
            y={0}
            text={'等待服务器响应…'}
            fill={C.softInk}
            fontFamily={FONT}
            fontSize={25}
            opacity={0}
          />

          <Rect
            ref={pageLogoGhost}
            y={-120}
            width={160}
            height={54}
            radius={13}
            fill={'#E1E3DD'}
            opacity={0}
          />
          <Txt
            ref={pageLogo}
            y={-120}
            text={'百度'}
            fill={C.baiduBlue}
            fontFamily={FONT}
            fontSize={62}
            fontWeight={800}
            opacity={0}
          />
          <Rect
            ref={pageSearch}
            y={-10}
            width={600}
            height={74}
            radius={14}
            fill={'#FFFFFF'}
            stroke={'#D7D9D3'}
            lineWidth={2}
            opacity={0}
          >
            <Txt
              x={-215}
              text={'搜索一下'}
              fill={'#A2A59D'}
              fontFamily={FONT}
              fontSize={24}
            />
            <Rect
              ref={pageButton}
              x={247}
              width={106}
              height={70}
              radius={[0, 14, 14, 0]}
              fill={'#D7D9D3'}
            >
              <Txt
                text={'搜索'}
                fill={'#FFFFFF'}
                fontFamily={FONT}
                fontSize={23}
                fontWeight={650}
              />
            </Rect>
          </Rect>
          <Rect ref={pageLine1} x={-82} y={112} width={470} height={21} radius={10} fill={'#D9DCD5'} opacity={0} />
          <Rect ref={pageLine2} x={-128} y={158} width={378} height={17} radius={8} fill={'#E4E6E0'} opacity={0} />
          <Rect ref={pageLine3} x={-160} y={200} width={314} height={17} radius={8} fill={'#E4E6E0'} opacity={0} />
          <Rect
            ref={pageInteractive}
            x={132}
            y={180}
            height={40}
            radius={20}
            padding={[0, 14]}
            fill={'#EEF1EA'}
            layout
            direction={'row'}
            alignItems={'center'}
            gap={8}
            opacity={0}
          >
            <Circle size={9} fill={C.success} />
            <Txt text={'交互已就绪'} fill={C.softInk} fontFamily={FONT} fontSize={19} fontWeight={600} />
          </Rect>
          <Rect
            ref={pageImage}
            x={238}
            y={108}
            width={112}
            height={82}
            radius={15}
            fill={'#ECEFE8'}
            stroke={'#D9DCD5'}
            lineWidth={2}
            opacity={0}
          >
            <Icon icon={'lucide:image'} size={30} color={'#9BA096'} />
          </Rect>
        </Rect>
      </Rect>

      {/* One centered vertical network path. This uses the 9:16 frame instead of fighting it. */}
      <Line
        ref={link}
        points={[
          [0, -120],
          [0, 290],
        ]}
        stroke={C.border}
        lineWidth={4}
        end={0}
        opacity={0}
      />

      <Rect
        ref={dnsCard}
        y={410}
        width={520}
        height={190}
        radius={28}
        padding={26}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2}
        layout
        direction={'row'}
        alignItems={'center'}
        gap={20}
        opacity={0}
        scale={0.94}
      >
        <Rect width={68} height={68} radius={20} fill={C.accentDark} layout alignItems={'center'} justifyContent={'center'}>
          <Icon icon={'lucide:network'} size={34} color={C.accent} />
        </Rect>
        <Layout grow={1} layout direction={'column'} alignItems={'start'} gap={8}>
          <Txt text={'DNS'} fill={C.text} fontFamily={MONO} fontSize={36} fontWeight={800} />
          <Txt text={'把域名翻译成 IP 地址'} fill={C.muted} fontFamily={FONT} fontSize={23} />
        </Layout>
      </Rect>

      <Rect
        ref={serverCard}
        y={420}
        width={540}
        height={220}
        radius={28}
        padding={28}
        fill={C.surface}
        stroke={C.border}
        lineWidth={2}
        layout
        direction={'row'}
        alignItems={'center'}
        gap={22}
        opacity={0}
        scale={0.94}
      >
        <Rect width={74} height={74} radius={22} fill={C.accentDark} layout alignItems={'center'} justifyContent={'center'}>
          <Icon icon={'lucide:server'} size={36} color={C.accent} />
        </Rect>
        <Layout grow={1} layout direction={'column'} alignItems={'start'} gap={9}>
          <Txt text={'WEB SERVER'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={800} />
          <Layout layout direction={'row'} alignItems={'center'} gap={9}>
            <Circle size={10} fill={C.accent} />
            <Txt text={'ready · 等待请求'} fill={C.muted} fontFamily={MONO} fontSize={19} />
          </Layout>
        </Layout>
      </Rect>

      <Rect
        ref={secureChip}
        y={92}
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
        scale={0.94}
      >
        <Icon icon={'lucide:shield-check'} size={25} color={C.accent} />
        <Txt ref={secureText} text={'连接已建立'} fill={C.accent} fontFamily={FONT} fontSize={22} fontWeight={650} />
      </Rect>

      <Rect
        ref={resultChip}
        y={105}
        height={58}
        radius={29}
        padding={[0, 18]}
        fill={C.raised}
        stroke={C.border}
        lineWidth={2}
        layout
        alignItems={'center'}
        opacity={0}
      >
        <Txt ref={resultText} text={''} fill={C.text} fontFamily={MONO} fontSize={22} fontWeight={700} />
      </Rect>

      {/* The packet is the only primary moving object during network stages. */}
      <Rect
        ref={packet}
        width={270}
        height={86}
        radius={21}
        padding={[0, 18]}
        fill={C.accent}
        layout
        direction={'row'}
        alignItems={'center'}
        gap={13}
        opacity={0}
        scale={0.96}
      >
        <Icon ref={packetIcon} icon={'lucide:send'} size={28} color={C.bg} />
        <Layout layout direction={'column'} alignItems={'start'} gap={1}>
          <Txt ref={packetLabel} text={''} fill={C.bg} fontFamily={MONO} fontSize={24} fontWeight={800} />
          <Txt ref={packetMeta} text={''} fill={'#36401F'} fontFamily={MONO} fontSize={16} fontWeight={650} />
        </Layout>
      </Rect>

      <Layout
        ref={summary}
        y={0}
        width={860}
        layout
        direction={'column'}
        alignItems={'center'}
        gap={26}
        opacity={0}
        scale={0.98}
      >
        <Txt
          text={'一次回车，背后其实就这几步'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={48}
          fontWeight={720}
        />
        <Txt
          width={820}
          text={'找地址  →  建连接  →  发请求\n→  收资源  →  浏览器渲染'}
          fill={C.muted}
          fontFamily={FONT}
          fontSize={36}
          lineHeight={62}
          fontWeight={560}
          textAlign={'center'}
        />
      </Layout>

      <Layout ref={outro} y={0} layout direction={'column'} alignItems={'center'} gap={18} opacity={0} scale={0.97}>
        <Txt text={'7BYTE'} fill={C.text} fontFamily={MONO} fontSize={116} fontWeight={850} letterSpacing={5} />
        <Rect width={108} height={6} radius={3} fill={C.accent} />
        <Txt text={'把计算机讲简单一点。'} fill={C.muted} fontFamily={FONT} fontSize={36} fontWeight={550} />
      </Layout>
    </>,
  );

  function* setCaption(title: string, subtitle: string) {
    yield* all(caption().opacity(0, 0.18), detail().opacity(0, 0.18));
    caption().text(title);
    detail().text(subtitle);
    yield* all(caption().opacity(1, 0.3), detail().opacity(1, 0.3));
  }

  function* movePacket(
    label: string,
    meta: string,
    icon: string,
    fromY: number,
    toY: number,
    duration = 1.0,
  ) {
    packetLabel().text(label);
    packetMeta().text(meta);
    packetIcon().icon(icon);
    packet().position([0, fromY]);
    packet().scale(0.96);
    yield* all(packet().opacity(1, 0.18), packet().scale(1, 0.24));
    yield* packet().position([0, toY], duration, easeInOutCubic);
    yield* packet().opacity(0, 0.18);
  }

  // Hook — let the browser be the hero. No extra episode chrome.
  yield* all(
    caption().opacity(1, 0.36),
    detail().opacity(1, 0.42),
    browser().opacity(1, 0.45),
    spring(SmoothSpring, 0.97, 1, value => browser().scale(value)),
  );
  yield* waitFor(0.65);

  const domain = 'baidu.com';
  for (let i = 1; i <= domain.length; i++) {
    addressText().text(domain.slice(0, i));
    yield* waitFor(0.11);
  }
  yield* waitFor(0.45);
  pageWaiting().text('↵  Enter');
  yield* pageWaiting().opacity(1, 0.2);
  yield* waitFor(0.5);
  pageWaiting().text('等待服务器响应…');
  yield* waitFor(0.35);

  // DNS — browser moves upward; the explanation naturally continues downward.
  yield* setCaption('第一步，先找到百度在哪', 'DNS 会把域名翻译成 IP 地址。');
  yield* all(
    browser().position([0, -360], 0.78, easeInOutCubic),
    browser().scale(0.72, 0.78, easeInOutCubic),
  );
  yield* all(
    link().opacity(1, 0.2),
    link().end(1, 0.65, easeInOutCubic),
    dnsCard().opacity(1, 0.28),
    spring(SmoothSpring, 0.94, 1, value => dnsCard().scale(value)),
  );
  yield* waitFor(0.35);

  yield* movePacket('DNS QUERY', 'baidu.com ?', 'lucide:search', -125, 300, 1.0);
  yield* waitFor(0.4);
  yield* movePacket('DNS ANSWER', 'IP 地址', 'lucide:map-pin', 300, -125, 1.0);
  resultText().text('baidu.com  →  IP 地址');
  yield* resultChip().opacity(1, 0.28);
  yield* waitFor(0.75);

  // Connection + HTTPS — same vertical path, new endpoint.
  yield* setCaption('找到服务器以后，先建立连接', '如果是 HTTPS，还会先建立一条加密通道。');
  yield* all(dnsCard().opacity(0, 0.3), resultChip().opacity(0, 0.25));
  yield* all(
    serverCard().opacity(1, 0.28),
    spring(SmoothSpring, 0.94, 1, value => serverCard().scale(value)),
  );
  link().stroke(C.accent);
  secureText().text('连接已建立');
  yield* all(
    secureChip().opacity(1, 0.25),
    spring(SmoothSpring, 0.94, 1, value => secureChip().scale(value)),
  );
  yield* waitFor(0.7);
  secureText().text('HTTPS · 加密通道');
  yield* waitFor(0.8);

  // HTTP request.
  yield* setCaption('连接准备好，浏览器才真正要网页', '这时才会发送 HTTP 请求。');
  yield* movePacket('GET /', 'HTTP REQUEST', 'lucide:send', -125, 305, 1.05);
  yield* waitFor(0.55);

  // Resource return. Every return visibly changes the same browser.
  yield* setCaption('服务器把网页需要的内容发回来', 'HTML 定结构，CSS 管样式，JS 管交互，图片负责视觉内容。');
  yield* secureChip().opacity(0, 0.25);

  yield* movePacket('HTML', '页面结构', 'lucide:file-code-2', 305, -125, 0.88);
  pageWaiting().opacity(0);
  yield* sequence(
    0.07,
    pageLogoGhost().opacity(1, 0.22),
    pageSearch().opacity(1, 0.25),
    pageLine1().opacity(1, 0.22),
    pageLine2().opacity(1, 0.22),
    pageLine3().opacity(1, 0.22),
  );
  yield* waitFor(0.3);

  yield* movePacket('CSS', '布局 + 样式', 'lucide:palette', 305, -125, 0.88);
  yield* all(
    pageButton().fill(C.baiduBlue, 0.4),
    pageSearch().stroke('#BFC2BC', 0.4),
    pageLine1().fill('#C9CCC5', 0.4),
  );
  yield* waitFor(0.3);

  yield* movePacket('JS', '交互逻辑', 'lucide:braces', 305, -125, 0.88);
  yield* pageInteractive().opacity(1, 0.3);
  yield* waitFor(0.3);

  yield* movePacket('IMG', '图片资源', 'lucide:image', 305, -125, 0.88);
  yield* all(
    pageLogoGhost().opacity(0, 0.24),
    pageLogo().opacity(1, 0.3),
    pageImage().opacity(1, 0.28),
  );
  yield* waitFor(0.65);

  // Render — same browser returns to the center, now complete.
  yield* setCaption('最后，浏览器把这些内容真正画出来', '解析 → 排版 → 绘制，于是你看到了网页。');
  yield* all(
    serverCard().opacity(0, 0.3),
    link().opacity(0, 0.28),
    browser().position([0, 25], 0.78, easeInOutCubic),
    browser().scale(1, 0.78, easeInOutCubic),
  );
  yield* waitFor(1.2);

  // Summary + outro. Still no numbered chapter list.
  yield* all(caption().opacity(0, 0.28), detail().opacity(0, 0.28), browser().opacity(0, 0.38));
  yield* all(summary().opacity(1, 0.4), spring(SmoothSpring, 0.98, 1, value => summary().scale(value)));
  yield* waitFor(1.8);
  yield* summary().opacity(0, 0.32);
  yield* all(outro().opacity(1, 0.4), spring(SmoothSpring, 0.97, 1, value => outro().scale(value)));
  yield* waitFor(1.8);
});
