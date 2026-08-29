import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
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
  amber: '#F3C969',
  blue: '#72A7FF',
  red: '#FF745F',
};

const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const dataBlock = (label: string, fill: string, stroke: string = C.border) => (
  <Rect width={150} height={112} radius={22} fill={fill} stroke={stroke} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={8}>
    <Icon icon={'lucide:binary'} size={34} color={C.text} />
    <Txt text={label} fill={C.muted} fontFamily={MONO} fontSize={18} fontWeight={700} />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.bg);

  const hook = createRef<Layout>();
  const hookFile = createRef<Rect>();
  const hookTrash = createRef<Rect>();
  const hookBlocks = createRef<Layout>();
  const hookBadge = createRef<Rect>();

  const release = createRef<Layout>();
  const pointer = createRef<Rect>();
  const stateBadge = createRef<Rect>();
  const releaseBlocks = createRef<Layout>();

  const scan = createRef<Layout>();
  const scanner = createRef<Rect>();
  const residueA = createRef<Rect>();
  const residueB = createRef<Rect>();
  const foundBadge = createRef<Rect>();

  const compare = createRef<Layout>();
  const trimBadge = createRef<Rect>();
  const ssdBlocks = createRef<Layout>();
  const compareBadge = createRef<Rect>();

  const takeaway = createRef<Layout>();
  const actionCard = createRef<Rect>();

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

      <Layout ref={hook} width={1920} height={1080} opacity={0}>
        <Txt y={-350} width={1650} text={'文件都删了，为什么还能恢复？'} fill={C.text}
          fontFamily={FONT} fontSize={64} fontWeight={830} textAlign={'center'} />
        <Rect ref={hookFile} x={-420} y={-45} width={500} height={330} radius={34} fill={C.surface}
          stroke={C.border} lineWidth={2} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20}>
          <Icon icon={'lucide:file-image'} size={86} color={C.blue} />
          <Txt text={'report.png'} fill={C.text} fontFamily={MONO} fontSize={34} fontWeight={760} />
          <Txt text={'12.4 MB'} fill={C.muted} fontFamily={MONO} fontSize={23} fontWeight={650} />
        </Rect>
        <Rect ref={hookTrash} x={40} y={-45} width={150} height={150} radius={30} fill={C.raised}
          stroke={C.border} lineWidth={2} layout alignItems={'center'} justifyContent={'center'} opacity={0}>
          <Icon icon={'lucide:trash-2'} size={72} color={C.red} />
        </Rect>
        <Layout ref={hookBlocks} x={500} y={-45} opacity={0} layout direction={'column'} alignItems={'center'} gap={18}>
          <Txt text={'底层数据块'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={650} />
          <Layout layout direction={'row'} gap={12}>
            {dataBlock('A1', C.accentDark, '#46572A')}
            {dataBlock('A2', C.accentDark, '#46572A')}
            {dataBlock('A3', C.accentDark, '#46572A')}
          </Layout>
          <Layout layout direction={'row'} gap={12}>
            {dataBlock('A4', C.accentDark, '#46572A')}
            {dataBlock('A5', C.accentDark, '#46572A')}
            {dataBlock('A6', C.accentDark, '#46572A')}
          </Layout>
        </Layout>
        <Rect ref={hookBadge} y={270} width={650} height={78} radius={22} fill={C.accentDark}
          stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'文件没了 · 数据块还在？'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={800} />
        </Rect>
      </Layout>

      <Layout ref={release} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'删除，先改变的是“占用状态”'} fill={C.text} fontFamily={FONT} fontSize={58} fontWeight={820} />
        <Rect x={-560} y={-40} width={540} height={380} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          padding={34} layout direction={'column'} alignItems={'stretch'} justifyContent={'center'} gap={24}>
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Txt text={'文件记录'} fill={C.text} fontFamily={FONT} fontSize={36} fontWeight={780} />
            <Icon icon={'lucide:file'} size={48} color={C.blue} />
          </Layout>
          <Rect width={470} height={84} radius={18} fill={C.raised} padding={18}
            layout direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Txt text={'report.png'} fill={C.muted} fontFamily={MONO} fontSize={24} fontWeight={650} />
            <Txt text={'→ A1…A6'} fill={C.accent} fontFamily={MONO} fontSize={24} fontWeight={760} />
          </Rect>
          <Rect width={470} height={12} radius={6} fill={C.border}>
            <Rect ref={pointer} width={470} height={12} radius={6} fill={C.accent} />
          </Rect>
        </Rect>
        <Icon icon={'lucide:arrow-right'} x={-160} y={-40} size={68} color={C.muted} />
        <Layout ref={releaseBlocks} x={390} y={-40} layout direction={'column'} alignItems={'center'} gap={20}>
          <Layout layout direction={'row'} gap={14}>
            {dataBlock('A1', C.raised)}{dataBlock('A2', C.raised)}{dataBlock('A3', C.raised)}
          </Layout>
          <Layout layout direction={'row'} gap={14}>
            {dataBlock('A4', C.raised)}{dataBlock('A5', C.raised)}{dataBlock('A6', C.raised)}
          </Layout>
          <Rect ref={stateBadge} width={470} height={70} radius={20} fill={C.accentDark} stroke={'#46572A'} lineWidth={2}
            opacity={0} layout alignItems={'center'} justifyContent={'center'}>
            <Txt text={'空间：可再次使用'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={800} />
          </Rect>
        </Layout>
      </Layout>

      <Layout ref={scan} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'覆盖之前，旧内容可能还在'} fill={C.text} fontFamily={FONT} fontSize={58} fontWeight={820} />
        <Rect y={-45} width={1390} height={390} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={32}>
          <Layout layout direction={'row'} gap={18}>
            <Rect ref={residueA} width={190} height={150} radius={24} fill={C.raised} stroke={C.border} lineWidth={2}
              layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={12}>
              <Icon icon={'lucide:image'} size={46} color={C.blue}/><Txt text={'old A'} fill={C.muted} fontFamily={MONO} fontSize={20}/>
            </Rect>
            {dataBlock('free', C.raised)}
            <Rect ref={residueB} width={190} height={150} radius={24} fill={C.raised} stroke={C.border} lineWidth={2}
              layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={12}>
              <Icon icon={'lucide:file-text'} size={46} color={C.amber}/><Txt text={'old B'} fill={C.muted} fontFamily={MONO} fontSize={20}/>
            </Rect>
            {dataBlock('free', C.raised)}
            {dataBlock('free', C.raised)}
          </Layout>
          <Txt text={'文件系统说“可用” · 物理内容未必已经被新数据覆盖'} fill={C.muted}
            fontFamily={FONT} fontSize={25} fontWeight={620} />
        </Rect>
        <Rect ref={scanner} x={-650} y={-45} width={24} height={360} radius={12} fill={C.accent} opacity={0.72} />
        <Rect ref={foundBadge} y={265} width={520} height={76} radius={22} fill={C.accentDark}
          stroke={'#46572A'} lineWidth={2} opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'恢复软件：扫描到残留'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={800} />
        </Rect>
      </Layout>

      <Layout ref={compare} width={1920} height={1080} opacity={0}>
        <Txt y={-350} text={'HDD 和 SSD，删除后的情况不完全一样'} fill={C.text} fontFamily={FONT} fontSize={54} fontWeight={820} />
        <Layout y={-45} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={60}>
          <Rect width={700} height={430} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            padding={36} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={26}>
            <Layout layout direction={'row'} alignItems={'center'} gap={18}>
              <Icon icon={'lucide:hard-drive'} size={62} color={C.amber}/>
              <Txt text={'HDD'} fill={C.text} fontFamily={MONO} fontSize={42} fontWeight={820}/>
            </Layout>
            <Layout layout direction={'row'} gap={12}>
              {dataBlock('old', C.accentDark, '#46572A')}{dataBlock('old', C.accentDark, '#46572A')}{dataBlock('old', C.accentDark, '#46572A')}
            </Layout>
            <Txt text={'被新数据覆盖前，旧内容可能仍在'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={620}/>
          </Rect>
          <Rect width={700} height={430} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
            padding={36} layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22}>
            <Layout layout direction={'row'} alignItems={'center'} gap={18}>
              <Icon icon={'lucide:cpu'} size={62} color={C.blue}/>
              <Txt text={'SSD'} fill={C.text} fontFamily={MONO} fontSize={42} fontWeight={820}/>
            </Layout>
            <Rect ref={trimBadge} width={250} height={58} radius={18} fill={C.accentDark} stroke={'#46572A'} lineWidth={2}
              opacity={0} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={'TRIM'} fill={C.accent} fontFamily={MONO} fontSize={26} fontWeight={850}/>
            </Rect>
            <Layout ref={ssdBlocks} layout direction={'row'} gap={12}>
              {dataBlock('free', C.raised)}{dataBlock('free', C.raised)}{dataBlock('free', C.raised)}
            </Layout>
            <Txt text={'通知底层：这些块已经不用了'} fill={C.muted} fontFamily={FONT} fontSize={25} fontWeight={620}/>
          </Rect>
        </Layout>
        <Rect ref={compareBadge} y={270} width={620} height={74} radius={22} fill={C.raised} stroke={C.border} lineWidth={2}
          opacity={0} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text={'SSD 恢复通常更困难、更不确定'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={760}/>
        </Rect>
      </Layout>

      <Layout ref={takeaway} width={1920} height={1080} opacity={0}>
        <Txt y={-190} text={'删除 ≠ 安全擦除'} fill={C.accent} fontFamily={FONT} fontSize={86} fontWeight={900}/>
        <Txt y={-65} text={'普通删除只是释放空间，不保证旧内容立刻消失'} fill={C.muted}
          fontFamily={FONT} fontSize={31} fontWeight={620}/>
        <Rect ref={actionCard} y={130} width={880} height={170} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          opacity={0} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:pause-circle'} size={58} color={C.amber}/>
          <Layout layout direction={'column'} gap={8}>
            <Txt text={'误删自己的文件？'} fill={C.text} fontFamily={FONT} fontSize={31} fontWeight={780}/>
            <Txt text={'先停止向这个盘继续写入'} fill={C.accent} fontFamily={FONT} fontSize={34} fontWeight={820}/>
          </Layout>
        </Rect>
      </Layout>
    </>,
  );

  yield* all(
    waitFor(phase(0, 1)),
    hook().opacity(1, 0.3),
    delay(0.45, hookTrash().opacity(1, 0.4)),
    delay(0.9, hookFile().opacity(0, 0.55)),
    delay(1.05, hookBlocks().opacity(1, 0.55)),
    delay(1.65, hookBadge().opacity(1, 0.45)),
  );

  hook().opacity(0);
  release().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.55, pointer().width(0, 0.85, easeInOutCubic)),
    delay(1.25, stateBadge().opacity(1, 0.45)),
  );

  release().opacity(0);
  scan().opacity(1);
  yield* all(
    waitFor(phase(2, 3)),
    scanner().opacity(0.75, 0.2),
    scanner().position.x(650, 1.4, easeInOutCubic),
    delay(0.65, residueA().stroke(C.accent, 0.35)),
    delay(0.95, residueB().stroke(C.accent, 0.35)),
    delay(1.35, foundBadge().opacity(1, 0.45)),
  );

  scan().opacity(0);
  compare().opacity(1);
  yield* all(
    waitFor(phase(3, 4)),
    delay(0.55, trimBadge().opacity(1, 0.45)),
    delay(1.25, ssdBlocks().opacity(0.38, 0.85)),
    delay(1.95, compareBadge().opacity(1, 0.45)),
  );

  compare().opacity(0);
  takeaway().opacity(1);
  yield* all(
    waitFor(phase(4, 5)),
    delay(0.75, actionCard().opacity(1, 0.5)),
  );

  takeaway().opacity(0);
});
