import {makeScene2D} from '@motion-canvas/2d';
import {Circle, Line, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';

const BG = '#111210';
const SURFACE = '#1B1D1A';
const TEXT = '#F3F1E8';
const MUTED = '#A7AAA1';
const ACCENT = '#D9FF6A';

export default makeScene2D(function* (view) {
  view.fill(BG);

  const title = createRef<Txt>();
  const question = createRef<Txt>();
  const domain = createRef<Txt>();
  const computer = createRef<Rect>();
  const dns = createRef<Rect>();
  const server = createRef<Rect>();
  const packet = createRef<Rect>();
  const packetText = createRef<Txt>();
  const link = createRef<Line>();
  const result = createRef<Txt>();
  const lock = createRef<Circle>();
  const resource = createRef<Rect>();
  const resourceText = createRef<Txt>();
  const page = createRef<Rect>();
  const pageText = createRef<Txt>();
  const outro = createRef<Txt>();

  view.add(
    <>
      <Txt
        ref={title}
        y={-560}
        text={'baidu.com'}
        fill={TEXT}
        fontSize={96}
        fontWeight={700}
        opacity={0}
      />
      <Txt
        ref={question}
        y={-390}
        text={'浏览器首先要知道：百度在哪？'}
        fill={MUTED}
        fontSize={42}
        opacity={0}
      />

      <Rect
        ref={computer}
        x={-300}
        y={180}
        width={320}
        height={210}
        radius={28}
        fill={SURFACE}
        stroke={TEXT}
        lineWidth={3}
        opacity={0}
      >
        <Txt text={'你的电脑'} fill={TEXT} fontSize={42} />
      </Rect>

      <Rect
        ref={dns}
        x={260}
        y={-240}
        width={250}
        height={160}
        radius={80}
        fill={SURFACE}
        stroke={MUTED}
        lineWidth={3}
        opacity={0}
      >
        <Txt text={'DNS'} fill={TEXT} fontSize={44} fontWeight={700} />
      </Rect>

      <Rect
        ref={server}
        x={300}
        y={180}
        width={300}
        height={230}
        radius={24}
        fill={SURFACE}
        stroke={TEXT}
        lineWidth={3}
        opacity={0}
      >
        <Txt text={'百度服务器'} fill={TEXT} fontSize={38} />
      </Rect>

      <Line
        ref={link}
        points={[[-135, 180], [140, 180]]}
        stroke={ACCENT}
        lineWidth={6}
        end={0}
      />

      <Rect
        ref={packet}
        x={-300}
        y={0}
        width={210}
        height={82}
        radius={18}
        fill={ACCENT}
        opacity={0}
      >
        <Txt ref={packetText} text={'DNS ?'} fill={BG} fontSize={34} fontWeight={700} />
      </Rect>

      <Txt
        ref={result}
        y={-30}
        text={'IP address'}
        fill={ACCENT}
        fontSize={44}
        opacity={0}
      />

      <Circle
        ref={lock}
        x={0}
        y={80}
        width={86}
        height={86}
        fill={ACCENT}
        opacity={0}
      >
        <Txt text={'✓'} fill={BG} fontSize={52} fontWeight={700} />
      </Circle>

      <Rect
        ref={resource}
        x={300}
        y={40}
        width={190}
        height={78}
        radius={16}
        fill={TEXT}
        opacity={0}
      >
        <Txt ref={resourceText} text={'HTML'} fill={BG} fontSize={32} fontWeight={700} />
      </Rect>

      <Rect
        ref={page}
        x={-300}
        y={540}
        width={360}
        height={500}
        radius={26}
        fill={SURFACE}
        stroke={MUTED}
        lineWidth={3}
        opacity={0}
      >
        <Txt ref={pageText} y={-150} text={'网页骨架'} fill={MUTED} fontSize={34} />
      </Rect>

      <Txt
        ref={outro}
        text={'7BYTE\n把计算机讲简单一点。'}
        fill={TEXT}
        fontSize={72}
        fontWeight={700}
        textAlign={'center'}
        lineHeight={110}
        opacity={0}
      />
    </>,
  );

  // 00:00–00:05 — 输入域名：先让观众看清问题。
  yield* title().opacity(1, 0.7);
  yield* waitFor(1.0);
  yield* question().opacity(1, 0.6);
  yield* waitFor(1.5);

  // 00:05–00:16 — DNS：保持电脑与 DNS 的空间关系稳定。
  yield* all(computer().opacity(1, 0.6), dns().opacity(1, 0.6));
  yield* waitFor(0.8);
  packetText().text('DNS ?');
  packet().position([-300, 0]);
  yield* packet().opacity(1, 0.3);
  yield* packet().position([260, -120], 1.15);
  yield* waitFor(0.7);
  packetText().text('IP');
  yield* packet().position([-300, 0], 1.15);
  yield* result().opacity(1, 0.5);
  yield* waitFor(1.0);
  yield* packet().opacity(0, 0.3);

  // 00:16–00:23 — 建立连接和加密。
  yield* all(dns().opacity(0.2, 0.6), server().opacity(1, 0.6));
  yield* link().end(1, 1.2);
  result().text('建立连接');
  yield* result().opacity(1, 0.3);
  yield* waitFor(0.8);
  result().text('建立加密通信');
  yield* lock().opacity(1, 0.45);
  yield* waitFor(1.0);

  // 00:23–00:30 — HTTP request：沿同一条连接发送明确的数据包。
  lock().opacity(0);
  result().opacity(0);
  packetText().text('GET /');
  packet().position([-160, 180]);
  yield* packet().opacity(1, 0.3);
  yield* packet().position([160, 180], 1.15);
  yield* waitFor(0.8);
  yield* packet().opacity(0, 0.3);

  // 00:30–00:41 — 资源回来并真正改变页面状态。
  yield* page().opacity(1, 0.5);
  const resources = [
    ['HTML', '页面结构'],
    ['CSS', '页面有了样式'],
    ['JS', '页面开始工作'],
    ['IMG', '图片显示出来'],
  ];

  for (const [label, state] of resources) {
    resourceText().text(label);
    resource().position([300, 40]);
    yield* resource().opacity(1, 0.25);
    yield* resource().position([-160, 420], 1.0);
    pageText().text(state);
    yield* resource().opacity(0, 0.25);
    yield* waitFor(0.45);
  }

  // 00:41–00:47 — 给结果阅读时间。
  yield* all(
    title().opacity(0, 0.6),
    question().opacity(0, 0.6),
    computer().opacity(0, 0.6),
    dns().opacity(0, 0.6),
    server().opacity(0, 0.6),
    link().opacity(0, 0.6),
  );
  page().position([0, 120]);
  page().size([700, 900]);
  pageText().text('于是，你看到了网页。');
  pageText().fontSize(48);
  yield* waitFor(2.0);
  yield* page().opacity(0, 0.7);

  // 00:47–00:51 — 克制片尾。
  yield* outro().opacity(1, 0.7);
  yield* waitFor(2.2);
});
