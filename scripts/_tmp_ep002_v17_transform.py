from pathlib import Path

scene15 = Path('episodes/002-wifi-full-signal/src/scenes/main-v15.tsx')
source = scene15.read_text(encoding='utf-8')

old_endpoint = '''        {/* Endpoint: softer, device-like silhouette. */}
        <Rect ref={chainPhone} x={-760} y={-30} width={180} height={220} radius={44} fill={'#141512'} stroke={C.border} lineWidth={2}>
          <Rect y={-22} width={116} height={150} radius={28} fill={C.raised} stroke={'#4A4E43'} lineWidth={2}>
            <Icon icon={'lucide:smartphone'} y={-16} size={48} color={C.text} />
            <Rect y={46} width={34} height={5} radius={3} fill={C.muted} opacity={0.72} />
          </Rect>
          <Txt y={88} text={'设备'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
        </Rect>'''
new_endpoint = '''        {/* Endpoint V16+: one quiet container, one dominant device glyph. */}
        <Rect
          ref={chainPhone}
          x={-760}
          y={-30}
          width={166}
          height={184}
          radius={30}
          fill={'#141512'}
          stroke={C.border}
          lineWidth={2}
        >
          <Icon icon={'lucide:smartphone'} y={-26} size={70} color={C.text} />
          <Txt y={48} text={'设备'} fill={C.text} fontFamily={FONT} fontSize={24} fontWeight={720} />
        </Rect>'''
if old_endpoint not in source:
    raise SystemExit('V15 endpoint block not found; refusing broad replacement')
v16 = source.replace(old_endpoint, new_endpoint, 1)
v16 = v16.replace('yield* sendHop(-660, -555, chainRouter());', 'yield* sendHop(-670, -555, chainRouter());', 1)
Path('episodes/002-wifi-full-signal/src/scenes/main-v16.tsx').write_text(v16, encoding='utf-8')

v17 = v16
decl_old = '''  const localWifiLine = createRef<Line>();
  const localInternetLine = createRef<Line>();'''
decl_new = '''  const localWifiLine = createRef<Line>();
  const localInternetLine = createRef<Line>();
  const localBadge = createRef<Rect>();'''
if decl_old not in v17:
    raise SystemExit('local declaration block not found')
v17 = v17.replace(decl_old, decl_new, 1)

badge_old = '''        <Rect x={-300} y={88} width={230} height={54} radius={18} fill={C.accentDark} stroke={'#415124'} lineWidth={2}>'''
badge_new = '''        <Rect ref={localBadge} x={-300} y={88} width={230} height={54} radius={18} fill={C.accentDark} stroke={'#415124'} lineWidth={2}>'''
if badge_old not in v17:
    raise SystemExit('local badge block not found')
v17 = v17.replace(badge_old, badge_new, 1)

transition_old = '''  // 19.693–23.329 — Preserve context, then establish the first focus pair.
  yield* all(
    waitFor(phase(4, 5)),
    local().opacity(0, 0.18),
    delay(0.14, chain().opacity(1, 0.24)),
    delay(0.7, c1().end(1, 0.7, easeInOutCubic)),
    delay(1.5, focusHop([chainPhone(), chainRouter()], [c1()], chainPhone(), chainRouter(), c1())),
  );'''
transition_new = '''  // 19.693–23.329 — Preserve object identity while the local pair makes room for the full path.
  c1().end(1);
  yield* all(
    waitFor(phase(4, 5)),
    localInternetLine().end(0, 0.42, easeInOutCubic),
    localInternet().opacity(0, 0.34, easeInOutCubic),
    localBadge().opacity(0, 0.28, easeInOutCubic),
    delay(
      0.18,
      all(
        localPhone().x(-760, 0.82, easeInOutCubic),
        localPhone().scale(0.46, 0.82, easeInOutCubic),
        localRouter().x(-420, 0.82, easeInOutCubic),
        localRouter().scale(0.72, 0.82, easeInOutCubic),
        localWifiLine().lineWidth(6, 0.55, easeInOutCubic),
      ),
    ),
    delay(0.94, chain().opacity(1, 0.34, easeInOutCubic)),
    delay(0.94, localPhone().opacity(0, 0.34, easeInOutCubic)),
    delay(0.94, localRouter().opacity(0, 0.34, easeInOutCubic)),
    delay(0.94, localWifiLine().opacity(0, 0.34, easeInOutCubic)),
    delay(1.34, local().opacity(0, 0.02)),
    delay(1.46, focusHop([chainPhone(), chainRouter()], [c1()], chainPhone(), chainRouter(), c1())),
  );'''
if transition_old not in v17:
    raise SystemExit('V15 transition block not found; refusing broad replacement')
v17 = v17.replace(transition_old, transition_new, 1)
Path('episodes/002-wifi-full-signal/src/scenes/main-v17.tsx').write_text(v17, encoding='utf-8')

project = Path('episodes/002-wifi-full-signal/src/project.ts')
p = project.read_text(encoding='utf-8')
if "./scenes/main-v15?scene" not in p:
    raise SystemExit('project.ts does not point to V15')
project.write_text(p.replace('./scenes/main-v15?scene', './scenes/main-v17?scene', 1), encoding='utf-8')

notes = Path('episodes/002-wifi-full-signal/design-notes.md')
n = notes.read_text(encoding='utf-8') if notes.exists() else ''
if '## V16 endpoint refinement' not in n:
    n += '''\n\n## V16 endpoint refinement\n\n- Accepted visual change: the endpoint uses one quiet container with one dominant smartphone glyph; nested card chrome is removed.\n- Principle: endpoint identity should come from the device silhouette.\n'''
if '## V17 object continuity experiment' not in n:
    n += '''\n\n## V17 object continuity experiment\n\n- Scope: only the Shot 2 → Shot 3 transition is changed; V16 endpoint, Focus System, BytePacket, subtitles, brand layers and outro remain intact.\n- V15 problem: Shot 2 faded out and Shot 3 faded in, forcing the viewer to rebuild the same phone/router relationship.\n- V17 keeps the visible phone/router and their reactive connector on screen, moves/scales them into the topology positions, then crossfades to simplified typed nodes at those same positions.\n- The Internet placeholder and its line retract/fade first. Shot 3 c1 is pre-drawn while hidden, so the local wireless link reads as one continuous object.\n- Audit continuity before/during/after the handoff for double images, connector jumps, premature downstream nodes and temporary residue.\n'''
notes.write_text(n, encoding='utf-8')
