import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const sourceCard = (icon: string, label: string, accent = false) => (
  <Rect width={560} height={130} radius={24} fill={C.surface}
    stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'row'} alignItems={'center'} gap={24} padding={[22, 30]}>
    <Icon icon={icon} size={48} color={accent ? C.accent : C.text}/>
    <Txt text={label} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={27} fontWeight={760}/>
  </Rect>
);

const categoryRow = (label: string, width: number, accent = false) => (
  <Layout width={1060} height={76} layout direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={30}>
    <Txt text={label} width={370} fill={C.text} fontFamily={FONT} fontSize={27} fontWeight={700}/>
    <Rect width={610} height={34} radius={15} fill={C.raised} padding={5} layout alignItems={'start'}>
      <Rect width={width} height={24} radius={11} fill={accent ? C.accent : C.muted} opacity={accent ? 1 : 0.48}/>
    </Rect>
  </Layout>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const hookBar = createRef<Rect>();
  const sources = createRef<Layout>();
  const sourceBadge = createRef<Rect>();
  const storage = createRef<Layout>();
  const storageBadge = createRef<Rect>();
  const cleanup = createRef<Layout>();
  const cleanupBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'C盘没装新软件，为什么还是越来越满？'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={880}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={48}>
        <Rect width={540} height={410} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={30}>
          <Icon icon={'lucide:app-window'} size={76} color={C.text}/>
          <Txt text={'NEW APPS'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
          <Txt text={'0'} fill={C.text} fontFamily={MONO} fontSize={86} fontWeight={900}/>
        </Rect>

        <Rect width={760} height={410} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={30}>
          <Layout width={620} layout direction={'row'} justifyContent={'space-between'}>
            <Txt text={'C: FREE SPACE'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
            <Txt text={'80 GB → 8 GB'} fill={C.accent} fontFamily={MONO} fontSize={30} fontWeight={820}/>
          </Layout>
          <Rect width={620} height={70} radius={20} fill={C.raised} padding={8} layout alignItems={'start'}>
            <Rect ref={hookBar} width={105} height={54} radius={15} fill={C.accent}/>
          </Rect>
          <Txt text={'FREE SPACE ↓'} fill={C.accent} fontFamily={MONO} fontSize={38} fontWeight={860}/>
        </Rect>
      </Layout>
      <Rect y={286} width={820} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'很多空间 ≠ 应用本体'} fill={C.accent} fontFamily={FONT} fontSize={31} fontWeight={820}/>
      </Rect>
    </Layout>

    <Layout ref={sources} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'系统盘里，不只有你安装的软件'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Layout y={-65} width={1200} layout direction={'column'} alignItems={'center'} gap={24}>
        <Layout layout direction={'row'} gap={26}>
          {sourceCard('lucide:download', 'WINDOWS UPDATE', true)}
          {sourceCard('lucide:clock-3', 'TEMP FILES')}
        </Layout>
        <Layout layout direction={'row'} gap={26}>
          {sourceCard('lucide:trash-2', 'RECYCLE BIN')}
          {sourceCard('lucide:shield', 'SYSTEM & RESERVED')}
        </Layout>
      </Layout>
      <Rect ref={sourceBadge} y={286} width={880} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'没装软件，也可能继续占空间'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>

    <Layout ref={storage} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'先看“存储”，别靠猜'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Layout y={-60} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={50}>
        <Rect width={500} height={455} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={26}>
          <Icon icon={'lucide:settings'} size={70} color={C.accent}/>
          <Txt text={'SETTINGS'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={800}/>
          <Txt text={'→ SYSTEM'} fill={C.text} fontFamily={MONO} fontSize={29}/>
          <Txt text={'→ STORAGE'} fill={C.accent} fontFamily={MONO} fontSize={35} fontWeight={850}/>
        </Rect>
        <Rect width={850} height={455} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={20} padding={34}>
          <Layout width={1060} scale={0.7} layout direction={'column'} alignItems={'center'} gap={24}>
            {categoryRow('Installed apps', 260)}
            {categoryRow('Temporary files', 430, true)}
            {categoryRow('System & reserved', 350)}
          </Layout>
        </Rect>
      </Layout>
      <Rect ref={storageBadge} y={286} width={760} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'先看哪一类在长'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={cleanup} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'先确认分类，再清理'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={860}/>
      <Layout y={-70} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={34}>
        <Rect width={530} height={380} radius={30} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:file-clock'} size={70} color={C.accent}/>
          <Txt text={'TEMPORARY FILES'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={800}/>
          <Txt text={'先看条目'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
        </Rect>
        <Rect width={530} height={380} radius={30} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:list-checks'} size={70} color={C.text}/>
          <Txt text={'CLEANUP'} fill={C.text} fontFamily={MONO} fontSize={27} fontWeight={800}/>
          <Txt text={'RECOMMENDATIONS'} fill={C.text} fontFamily={MONO} fontSize={24} fontWeight={760}/>
        </Rect>
        <Rect width={530} height={380} radius={30} fill={C.surface} stroke={'#ff6b5f'} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:triangle-alert'} size={70} color={'#ff6b5f'}/>
          <Txt text={'DON\'T RANDOMLY'} fill={'#ff6b5f'} fontFamily={MONO} fontSize={25} fontWeight={820}/>
          <Txt text={'DELETE WINDOWS'} fill={'#ff6b5f'} fontFamily={MONO} fontSize={25} fontWeight={820}/>
        </Rect>
      </Layout>
      <Rect ref={cleanupBadge} y={286} width={760} height={72} radius={23} fill={C.raised} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'系统清理入口 > 手动乱删'} fill={C.text} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>
  </>);

  yield* all(waitFor(phase(0, 1)), delay(0.25, hookBar().width(520, 0.42)));
  hook().opacity(0); sources().opacity(1);
  yield* all(waitFor(phase(1, 2)), delay(0.32, sourceBadge().opacity(1, 0.28)));
  sources().opacity(0); storage().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.32, storageBadge().opacity(1, 0.28)));
  storage().opacity(0); cleanup().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.32, cleanupBadge().opacity(1, 0.28)));
});
