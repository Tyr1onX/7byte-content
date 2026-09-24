import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const processRow = (label: string, disk: string, accent = false) => (
  <Rect width={1120} height={86} radius={18} fill={accent ? C.accentDark : C.raised}
    stroke={accent ? C.accent : C.border} lineWidth={accent ? 2 : 1}
    layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={[16, 28]}>
    <Txt text={label} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={accent ? 760 : 650}/>
    <Txt text={disk} fill={accent ? C.accent : C.muted} fontFamily={MONO} fontSize={25} fontWeight={760}/>
  </Rect>
);

const ioBlock = (w: number, accent = false) => (
  <Rect width={w} height={46} radius={11} fill={accent ? C.accent : C.muted} opacity={accent ? 1 : 0.45}/>
);

const decisionCard = (kicker: string, main: string, sub: string, accent = false) => (
  <Rect width={650} height={390} radius={32} fill={C.surface} stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20} padding={34}>
    <Txt text={kicker} fill={C.muted} fontFamily={MONO} fontSize={24}/>
    <Txt text={main} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={38} fontWeight={850}/>
    <Txt text={sub} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={700}/>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);
  const hook = createRef<Layout>();
  const busy = createRef<Layout>();
  const busyBadge = createRef<Rect>();
  const inspect = createRef<Layout>();
  const inspectBadge = createRef<Rect>();
  const decide = createRef<Layout>();
  const decideBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'磁盘100%，为什么速度却只有几MB/s？'} fill={C.text} fontFamily={FONT} fontSize={65} fontWeight={880}/>
      <Layout y={-65} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={48}>
        <Rect width={650} height={420} radius={34} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Txt text={'DISK 0'} fill={C.muted} fontFamily={MONO} fontSize={26}/>
          <Txt text={'ACTIVE TIME'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={760}/>
          <Txt text={'100%'} fill={C.accent} fontFamily={MONO} fontSize={100} fontWeight={900}/>
        </Rect>
        <Rect width={650} height={420} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Txt text={'TRANSFER'} fill={C.muted} fontFamily={MONO} fontSize={26}/>
          <Txt text={'READ / WRITE'} fill={C.text} fontFamily={MONO} fontSize={30} fontWeight={760}/>
          <Txt text={'3.2 MB/s'} fill={C.text} fontFamily={MONO} fontSize={74} fontWeight={900}/>
        </Rect>
      </Layout>
      <Rect y={288} width={820} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'100% ≠ 跑满带宽'} fill={C.accent} fontFamily={FONT} fontSize={32} fontWeight={840}/>
      </Rect>
    </Layout>

    <Layout ref={busy} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'一个是“忙多久”，一个是“传多少”'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Rect y={-70} width={1380} height={480} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={28} padding={40}>
        <Layout width={1200} layout direction={'row'} justifyContent={'space-between'}>
          <Txt text={'BUSY TIME'} fill={C.accent} fontFamily={MONO} fontSize={25} fontWeight={800}/>
          <Txt text={'BYTES / SEC'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
        </Layout>
        <Layout width={1200} height={120} layout direction={'row'} alignItems={'center'} gap={12}>
          {ioBlock(115, true)}{ioBlock(70)}{ioBlock(150, true)}{ioBlock(85)}{ioBlock(110, true)}
          {ioBlock(60)}{ioBlock(140, true)}{ioBlock(76)}{ioBlock(128, true)}
        </Layout>
        <Layout width={1200} layout direction={'row'} justifyContent={'space-between'}>
          <Txt text={'几乎没有空闲时间'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={720}/>
          <Txt text={'每次只搬一点数据'} fill={C.muted} fontFamily={FONT} fontSize={28}/>
        </Layout>
      </Rect>
      <Rect ref={busyBadge} y={286} width={900} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'小而碎的 I/O，也能把“忙碌时间”顶满'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={780}/>
      </Rect>
    </Layout>

    <Layout ref={inspect} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'先看是谁在持续读写'} fill={C.text} fontFamily={FONT} fontSize={65} fontWeight={860}/>
      <Layout y={-65} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={50}>
        <Rect width={470} height={445} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={30}>
          <Icon icon={'lucide:keyboard'} size={74} color={C.text}/>
          <Txt text={'CTRL + SHIFT + ESC'} fill={C.text} fontFamily={MONO} fontSize={28} fontWeight={820}/>
          <Txt text={'Task Manager'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
        </Rect>
        <Rect width={850} height={445} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={14} padding={30}>
          <Layout width={1120} scale={0.68} layout direction={'column'} alignItems={'center'} gap={18}>
            <Layout width={1120} layout direction={'row'} justifyContent={'space-between'}>
              <Txt text={'PROCESS'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
              <Txt text={'DISK ↓'} fill={C.accent} fontFamily={MONO} fontSize={27} fontWeight={820}/>
            </Layout>
            {processRow('Background process', 'HIGH', true)}
            {processRow('Browser', 'LOW')}
            {processRow('Other process', 'LOW')}
          </Layout>
        </Rect>
      </Layout>
      <Rect ref={inspectBadge} y={286} width={760} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'按“磁盘”排序，看最上面是谁'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={decide} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'短时峰值和持续100%，不是一回事'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
        {decisionCard('SHORT SPIKE', '100%', '先观察')}
        {decisionCard('SUSTAINED', '100% + HIGH LATENCY', '继续排查', true)}
      </Layout>
      <Rect ref={decideBadge} y={286} width={820} height={72} radius={23} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'看持续时间，也看响应时间'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>
  </>);

  yield* waitFor(phase(0,1));
  hook().opacity(0); busy().opacity(1);
  yield* all(waitFor(phase(1,2)), delay(0.3, busyBadge().opacity(1,0.28)));
  busy().opacity(0); inspect().opacity(1);
  yield* all(waitFor(phase(2,3)), delay(0.3, inspectBadge().opacity(1,0.28)));
  inspect().opacity(0); decide().opacity(1);
  yield* all(waitFor(phase(3,4)), delay(0.3, decideBadge().opacity(1,0.28)));
});
