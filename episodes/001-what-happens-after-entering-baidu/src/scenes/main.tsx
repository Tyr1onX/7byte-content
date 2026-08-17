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

// EP.001 V4 — audio-synced cut based on the first recorded narration.
// The visual system stays unchanged; only narration/subtitle timing is retimed.
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

  const subtitleBar = createRef<Rect>();
  const subtitleText = createRef<Txt>();

  const summary = createRef<Layout>();
  const outro = createRef<Layout>();

  view.add(
    <>
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

      <Rect
        ref={subtitleBar}
        y={690}
        width={880}
        height={112}
        radius={26}
        padding={[14, 28]}
        fill={'#181916'}
        stroke={'#30332B'}
        lineWidth={2}
        layout
        alignItems={'center'}
        justifyContent={'center'}
        opacity={0}
      >
        <Txt
          ref={subtitleText}
          width={820}
          text={'你有没有想过？'}
          fill={C.text}
          fontFamily={FONT}
          fontSize={36}
          lineHeight={48}
          fontWeight={650}
          textAlign={'center'}
        />
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
          text={'找地址  →  建连接  →  加密\n→  请求  →  传输  →  渲染'}
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

  function setSubtitle(text: string) {
    subtitleText().text(text);
    subtitleBar().opacity(1);
  }

  function* setCaption(title: string, subtitle: string) {
    yield* all(caption().opacity(0, 0.2), detail().opacity(0, 0.2));
    caption().text(title);
    detail().text(subtitle);
    yield* all(caption().opacity(1, 0.34), detail().opacity(1, 0.34));
  }

  function* movePacket(
    label: string,
    meta: string,
    icon: string,
    fromY: number,
    toY: number,
    duration = 1.2,
  ) {
    packetLabel().text(label);
    packetMeta().text(meta);
    packetIcon().icon(icon);
    packet().position([0, fromY]);
    packet().scale(0.96);
    yield* all(packet().opacity(1, 0.2), packet().scale(1, 0.26));
    yield* packet().position([0, toY], duration, easeInOutCubic);
    yield* packet().opacity(0, 0.2);
  }

  // 00:00–00:09.9 — Hook.
  yield* all(
    caption().opacity(1, 0.42),
    detail().opacity(1, 0.48),
    browser().opacity(1, 0.5),
    subtitleBar().opacity(1, 0.32),
    spring(SmoothSpring, 0.97, 1, value => browser().scale(value)),
  );
  yield* waitFor(0.35);

  setSubtitle('当你在浏览器里输入 baidu.com，\n然后按下回车。');
  const domain = 'baidu.com';
  for (let i = 1; i <= domain.length; i++) {
    addressText().text(domain.slice(0, i));
    yield* waitFor(0.2);
  }
  yield* waitFor(1.4);
  pageWaiting().text('↵  Enter');
  yield* pageWaiting().opacity(1, 0.22);

  setSubtitle('看起来只是打开了一个网页。');
  yield* waitFor(1.8);
  setSubtitle('但背后其实已经跑完了\n一整套互联网流程。');
  pageWaiting().text('等待服务器响应…');
  yield* waitFor(3.7);

  // 00:09.9–00:33.2 — DNS.
  setSubtitle('第一步，浏览器得先知道：\n百度到底在哪。');
  yield* setCaption('第一步，先找到百度在哪', 'DNS 会把域名翻译成 IP 地址。');
  yield* waitFor(0.8);
  yield* all(
    browser().position([0, -360], 0.86, easeInOutCubic),
    browser().scale(0.72, 0.86, easeInOutCubic),
  );
  yield* all(
    link().opacity(1, 0.24),
    link().end(1, 0.72, easeInOutCubic),
    dnsCard().opacity(1, 0.32),
    spring(SmoothSpring, 0.94, 1, value => dnsCard().scale(value)),
  );

  setSubtitle('网络通信真正要找的，\n不是 baidu.com 这个名字。');
  yield* waitFor(5.2);
  setSubtitle('而是服务器对应的 IP 地址。');
  yield* waitFor(3.0);
  setSubtitle('所以浏览器会先去问 DNS。');
  yield* waitFor(1.1);

  setSubtitle('这个域名，对应哪个 IP？');
  yield* movePacket('DNS QUERY', 'baidu.com ?', 'lucide:search', -125, 300, 1.3);
  yield* waitFor(1.8);

  setSubtitle('DNS 把地址返回来以后。');
  yield* movePacket('DNS ANSWER', 'IP 地址', 'lucide:map-pin', 300, -125, 1.3);
  resultText().text('baidu.com  →  IP 地址');
  yield* resultChip().opacity(1, 0.32);
  setSubtitle('浏览器才知道接下来\n该去找哪台服务器。');
  yield* waitFor(5.4);

  // 00:33.2–00:44.7 — Connection + HTTPS.
  setSubtitle('找到服务器以后，\n接下来就要建立连接。');
  yield* setCaption('找到服务器以后，先建立连接', 'HTTPS 会再建立一条加密通道。');
  yield* waitFor(0.8);
  yield* all(dnsCard().opacity(0, 0.34), resultChip().opacity(0, 0.3));
  yield* all(
    serverCard().opacity(1, 0.32),
    spring(SmoothSpring, 0.94, 1, value => serverCard().scale(value)),
  );
  yield* waitFor(1.0);

  setSubtitle('如果访问的是 HTTPS。');
  yield* waitFor(1.8);
  link().stroke(C.accent);
  secureText().text('连接已建立');
  yield* all(
    secureChip().opacity(1, 0.28),
    spring(SmoothSpring, 0.94, 1, value => secureChip().scale(value)),
  );

  setSubtitle('还会先建立一条加密通道。');
  secureText().text('HTTPS · 加密通道');
  yield* waitFor(2.2);
  setSubtitle('后面的数据就会通过\n这条通道来传输。');
  yield* waitFor(3.6);

  // 00:44.7–00:55.9 — HTTP request.
  setSubtitle('连接准备好以后。');
  yield* setCaption('连接准备好，浏览器才真正要网页', '这时才会发送 HTTP 请求。');
  yield* waitFor(1.0);
  setSubtitle('浏览器才会真正发送 HTTP 请求。');
  yield* waitFor(3.5);

  setSubtitle('比如 GET /。');
  yield* movePacket('GET /', 'HTTP REQUEST', 'lucide:send', -125, 305, 1.3);
  setSubtitle('你可以简单理解成一句话：');
  yield* waitFor(2.1);
  setSubtitle('“把首页给我。”');
  yield* waitFor(2.3);

  // 00:55.9–01:12.7 — Resource return.
  setSubtitle('服务器收到请求以后。');
  yield* setCaption('服务器把网页需要的内容发回来', 'HTML、CSS、JavaScript 和图片会陆续返回。');
  yield* waitFor(1.6);
  setSubtitle('就会把网页需要的东西\n陆续发回来。');
  yield* waitFor(1.76);
  yield* secureChip().opacity(0, 0.28);

  setSubtitle('比如 HTML 负责页面结构。');
  yield* movePacket('HTML', '页面结构', 'lucide:file-code-2', 305, -125, 1.1);
  pageWaiting().opacity(0);
  yield* sequence(
    0.09,
    pageLogoGhost().opacity(1, 0.28),
    pageSearch().opacity(1, 0.3),
    pageLine1().opacity(1, 0.28),
    pageLine2().opacity(1, 0.28),
    pageLine3().opacity(1, 0.28),
  );
  yield* waitFor(0.8);

  setSubtitle('CSS 负责样式。');
  yield* movePacket('CSS', '布局 + 样式', 'lucide:palette', 305, -125, 1.1);
  yield* all(
    pageButton().fill(C.baiduBlue, 0.46),
    pageSearch().stroke('#BFC2BC', 0.46),
    pageLine1().fill('#C9CCC5', 0.46),
  );
  yield* waitFor(0.6);

  setSubtitle('JavaScript 负责交互。');
  yield* movePacket('JS', '交互逻辑', 'lucide:braces', 305, -125, 1.1);
  yield* pageInteractive().opacity(1, 0.36);
  yield* waitFor(0.6);

  setSubtitle('图片这些资源也会一起加载。');
  yield* movePacket('IMG', '图片资源', 'lucide:image', 305, -125, 1.1);
  yield* all(
    pageLogoGhost().opacity(0, 0.3),
    pageLogo().opacity(1, 0.36),
    pageImage().opacity(1, 0.34),
  );
  yield* waitFor(1.0);

  // 01:12.7–01:22.7 — Browser render.
  setSubtitle('浏览器一边接收这些内容。');
  yield* setCaption('最后，浏览器把这些内容真正画出来', '解析 → 排版 → 绘制。');
  yield* waitFor(1.0);
  setSubtitle('一边解析、排版，\n再把它们绘制到屏幕上。');
  yield* waitFor(1.4);
  yield* all(
    serverCard().opacity(0, 0.34),
    link().opacity(0, 0.32),
    browser().position([0, 25], 0.88, easeInOutCubic),
    browser().scale(1, 0.88, easeInOutCubic),
  );
  setSubtitle('最后，你才真正看到了这个网页。');
  yield* waitFor(6.2);

  // 01:22.7–01:39.3 — Summary + outro.
  setSubtitle('所以你以为自己\n只是按了一次回车。');
  yield* all(caption().opacity(0, 0.3), detail().opacity(0, 0.3), browser().opacity(0, 0.42));
  yield* all(summary().opacity(1, 0.42), spring(SmoothSpring, 0.98, 1, value => summary().scale(value)));
  yield* waitFor(2.0);

  setSubtitle('但实际上背后已经完成了\n一整套互联网流程。');
  yield* waitFor(4.2);
  setSubtitle('找地址、建立连接、加密、请求、\n传输和渲染。');
  yield* waitFor(2.9);

  yield* all(summary().opacity(0, 0.34), subtitleBar().opacity(0, 0.24));
  yield* all(outro().opacity(1, 0.42), spring(SmoothSpring, 0.97, 1, value => outro().scale(value)));
  yield* waitFor(1.6);
  yield* waitFor(2.2);
  yield* waitFor(1.5);
});
