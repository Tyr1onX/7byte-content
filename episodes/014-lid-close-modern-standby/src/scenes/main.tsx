import {Icon, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, delay, waitFor} from '@motion-canvas/core';
import {HORIZONTAL_BRAND} from '../../../../shared/brand/horizontal-video-chrome';
import {T} from '../production-timing';

const C = HORIZONTAL_BRAND;
const FONT = 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const phase = (from: number, to: number) => T[to] - T[from];

const chip = (text: string, accent = false) => (
  <Rect radius={18} padding={[11, 20]} fill={accent ? C.accentDark : C.raised}
    stroke={accent ? C.accent : C.border} lineWidth={accent ? 2 : 1}
    layout alignItems={'center'} justifyContent={'center'}>
    <Txt text={text} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={25} fontWeight={760}/>
  </Rect>
);

const statusCard = (icon: string, title: string, value: string, accent = false) => (
  <Rect width={430} height={150} radius={28} fill={C.surface} stroke={accent ? C.accent : C.border} lineWidth={2}
    layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={26} padding={24}>
    <Icon icon={icon} size={54} color={accent ? C.accent : C.muted}/>
    <Layout layout direction={'column'} alignItems={'start'} justifyContent={'center'} gap={8}>
      <Txt text={title} fill={C.muted} fontFamily={FONT} fontSize={24}/>
      <Txt text={value} fill={accent ? C.accent : C.text} fontFamily={MONO} fontSize={31} fontWeight={780}/>
    </Layout>
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(C.background);

  const hook = createRef<Layout>();
  const hookHeat = createRef<Rect>();
  const modern = createRef<Layout>();
  const netEvent = createRef<Rect>();
  const maintenanceEvent = createRef<Rect>();
  const deviceEvent = createRef<Rect>();
  const normal = createRef<Layout>();
  const normalPulse = createRef<Rect>();
  const problem = createRef<Layout>();
  const problemBadge = createRef<Rect>();
  const final = createRef<Layout>();
  const finalBadge = createRef<Rect>();

  view.add(<>
    <Txt text={C.watermark.text} x={C.watermark.x} y={C.watermark.y} opacity={C.watermark.opacity}
      fill={C.text} fontFamily={MONO} fontSize={C.watermark.fontSize} fontWeight={C.watermark.fontWeight}
      letterSpacing={C.watermark.letterSpacing}/>

    <Layout ref={hook} width={1920} height={1080} opacity={1}>
      <Txt y={-350} text={'合盖 ≠ 完全停机'} fill={C.text} fontFamily={FONT} fontSize={78} fontWeight={880}/>
      <Layout y={-40} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={54}>
        <Rect width={650} height={420} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Icon icon={'lucide:briefcase'} size={128} color={C.muted}/>
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={18}>
            <Icon icon={'lucide:laptop'} size={58} color={C.accent}/>
            <Txt text={'LID CLOSED'} fill={C.text} fontFamily={MONO} fontSize={31} fontWeight={760}/>
          </Layout>
          <Txt text={'屏幕关了，不代表系统已经断电'} fill={C.muted} fontFamily={FONT} fontSize={27}/>
        </Rect>
        <Layout layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={28}>
          {statusCard('lucide:battery-low', '背包里', 'BATTERY ↓', true)}
          <Rect ref={hookHeat} opacity={0.45}>
            {statusCard('lucide:thermometer', '机身温度', 'TEMP ↑', false)}
          </Rect>
        </Layout>
      </Layout>
      <Rect y={272} width={780} height={74} radius={24} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'合上笔记本，它也可能还在工作'} fill={C.accent} fontFamily={FONT} fontSize={30} fontWeight={790}/>
      </Rect>
    </Layout>

    <Layout ref={modern} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'Modern Standby：S0 低功耗空闲'} fill={C.text} fontFamily={FONT} fontSize={62} fontWeight={850}/>
      <Rect y={-55} width={1320} height={470} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={32} padding={34}>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={36}>
          {chip('SCREEN OFF', true)}
          <Txt text={'→'} fill={C.muted} fontFamily={MONO} fontSize={42}/>
          {chip('S0 LOW POWER IDLE', true)}
        </Layout>
        <Txt text={'低功耗为主，但允许特定事件短暂活动'} fill={C.muted} fontFamily={FONT} fontSize={29}/>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={24}>
          <Rect ref={netEvent} opacity={0.35}>{chip('NETWORK')}</Rect>
          <Rect ref={maintenanceEvent} opacity={0.35}>{chip('MAINTENANCE')}</Rect>
          <Rect ref={deviceEvent} opacity={0.35}>{chip('DEVICE EVENT')}</Rect>
        </Layout>
      </Rect>
      <Rect y={272} width={720} height={72} radius={23} fill={C.raised}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'不是持续高负载，而是可能短暂被唤醒'} fill={C.text} fontFamily={FONT} fontSize={28} fontWeight={730}/>
      </Rect>
    </Layout>

    <Layout ref={normal} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'正常情况下：大部分时间很安静'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Rect y={-55} width={1300} height={450} radius={34} fill={C.surface} stroke={C.border} lineWidth={2}
        layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={34} padding={34}>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={18}>
          {chip('LOW POWER', true)}
          {chip('LOW POWER', true)}
          <Rect ref={normalPulse} opacity={0.45}>{chip('SHORT WAKE')}</Rect>
          {chip('LOW POWER', true)}
          {chip('LOW POWER', true)}
        </Layout>
        <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={28}>
          <Icon icon={'lucide:moon'} size={64} color={C.accent}/>
          <Txt text={'正常睡眠：活动短，随后重新回到低功耗'} fill={C.text} fontFamily={FONT} fontSize={32} fontWeight={780}/>
        </Layout>
      </Rect>
      <Rect y={270} width={650} height={72} radius={23} fill={C.accentDark}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'目标是“绝大多数时间都在省电”'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={760}/>
      </Rect>
    </Layout>

    <Layout ref={problem} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'如果没顺利进入低功耗，就可能发热掉电'} fill={C.text} fontFamily={FONT} fontSize={61} fontWeight={850}/>
      <Layout y={-45} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={46}>
        <Rect width={650} height={430} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={27} padding={30}>
          <Icon icon={'lucide:moon'} size={72} color={C.accent}/>
          <Txt text={'正常低功耗'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={830}/>
          {chip('LOW POWER', true)}
          <Txt text={'BATTERY  ↓ slowly'} fill={C.muted} fontFamily={MONO} fontSize={25}/>
        </Rect>
        <Rect width={650} height={430} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={22} padding={30}>
          <Icon icon={'lucide:triangle-alert'} size={68} color={C.muted}/>
          <Txt text={'可能被阻塞'} fill={C.text} fontFamily={FONT} fontSize={38} fontWeight={830}/>
          <Layout layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={13}>
            {chip('DRIVER')}{chip('DEVICE')}{chip('TASK')}
          </Layout>
          <Txt text={'BATTERY ↓   ·   TEMP ↑'} fill={C.text} fontFamily={MONO} fontSize={25}/>
        </Rect>
      </Layout>
      <Rect ref={problemBadge} y={284} width={920} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'原因不止一种：驱动 / 外设 / 后台任务都可能参与'} fill={C.accent} fontFamily={FONT} fontSize={28} fontWeight={760}/>
      </Rect>
    </Layout>

    <Layout ref={final} width={1920} height={1080} opacity={0}>
      <Txt y={-350} text={'长时间放包里：休眠通常更稳妥'} fill={C.text} fontFamily={FONT} fontSize={64} fontWeight={850}/>
      <Layout y={-55} layout direction={'row'} alignItems={'center'} justifyContent={'center'} gap={52}>
        <Rect width={610} height={410} radius={32} fill={C.surface} stroke={C.border} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={28} padding={30}>
          <Icon icon={'lucide:moon'} size={72} color={C.muted}/>
          <Txt text={'短暂停用'} fill={C.muted} fontFamily={FONT} fontSize={29}/>
          <Txt text={'睡眠'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={840}/>
          {chip('FAST RESUME')}
        </Rect>
        <Rect width={610} height={410} radius={32} fill={C.surface} stroke={C.accent} lineWidth={2}
          layout direction={'column'} alignItems={'center'} justifyContent={'center'} gap={25} padding={30}>
          <Icon icon={'lucide:hard-drive'} size={72} color={C.accent}/>
          <Txt text={'长时间携带'} fill={C.muted} fontFamily={FONT} fontSize={29}/>
          <Txt text={'休眠'} fill={C.text} fontFamily={FONT} fontSize={46} fontWeight={840}/>
          {chip('RAM → hiberfil.sys → S4', true)}
        </Rect>
      </Layout>
      <Rect ref={finalBadge} y={284} width={760} height={72} radius={23} fill={C.accentDark} opacity={0}
        layout alignItems={'center'} justifyContent={'center'}>
        <Txt text={'合盖是睡眠动作，不是物理断电'} fill={C.accent} fontFamily={FONT} fontSize={29} fontWeight={780}/>
      </Rect>
    </Layout>
  </>);

  yield* all(waitFor(phase(0, 1)), delay(0.55, hookHeat().opacity(1, 0.35)));
  hook().opacity(0); modern().opacity(1);
  yield* all(
    waitFor(phase(1, 2)),
    delay(0.35, netEvent().opacity(1, 0.25)),
    delay(0.85, maintenanceEvent().opacity(1, 0.25)),
    delay(1.35, deviceEvent().opacity(1, 0.25)),
  );
  modern().opacity(0); normal().opacity(1);
  yield* all(waitFor(phase(2, 3)), delay(0.45, normalPulse().opacity(1, 0.3)));
  normal().opacity(0); problem().opacity(1);
  yield* all(waitFor(phase(3, 4)), delay(0.45, problemBadge().opacity(1, 0.35)));
  problem().opacity(0); final().opacity(1);
  yield* all(waitFor(phase(4, 5)), delay(0.45, finalBadge().opacity(1, 0.35)));
});
