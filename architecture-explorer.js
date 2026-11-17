const architectureModels = {
  cloudops: {
    overview: { title: 'From signal to human-reviewed remediation', summary: 'Operational signals become normalized evidence, persisted incident context, correlated analysis and AI-assisted guidance inside one authenticated operator workflow.', journey: ['signals','ingest','analysis','ai','db','api','ui'] },
    modes: {
      overview: ['signals', 'ui', 'ingest', 'api', 'analysis', 'db', 'ai'],
      services: ['ui', 'api', 'ingest', 'analysis', 'db', 'ai'],
      data: ['signals', 'ingest', 'api', 'db', 'analysis', 'ai', 'ui'],
      security: ['ui', 'api', 'db', 'ai'],
      deployment: ['ui', 'api', 'db', 'ai']
    },
    nodes: [
      ['signals', 'Operational signals', 6, 47, 'Telemetry', 'Logs, health signals and incident events enter through explicit ingestion paths.', 'External'],
      ['ui', 'Next.js workspace', 6, 12, 'Experience', 'Authenticated incident, log and investigation workflows for human operators.', 'Public edge'],
      ['ingest', 'Ingestion service', 31, 47, 'Service', 'Normalizes incoming operational evidence before it is attached to an incident.', 'Private service'],
      ['api', 'FastAPI boundary', 31, 12, 'API', 'Thirty-one routes own authentication, validation and operational workflow contracts.', 'Trust boundary'],
      ['analysis', 'Analysis engine', 57, 47, 'Service', 'Correlates health and incident context before requesting AI guidance.', 'Private service'],
      ['db', 'PostgreSQL', 57, 12, 'Data', 'Persists users, operational events and incident context.', 'Data boundary'],
      ['ai', 'AI provider', 82, 47, 'External AI', 'Produces evidence-grounded hypotheses and guidance; never performs production changes.', 'External boundary']
    ],
    links: [['signals','ingest'],['ingest','analysis'],['ui','api'],['api','db'],['api','analysis'],['analysis','ai'],['ai','analysis'],['analysis','ui']]
  },
  topologyx: {
    overview: { title: 'From workload brief to reviewable Azure plan', summary: 'A structured request moves through deterministic and optional AI generation, then stays connected to project history and six engineering outputs.', journey: ['brief','engine','ai','outputs','db','api','ui'] },
    modes: { overview: ['brief','ui','api','engine','ai','db','outputs'], services: ['ui','api','engine','ai','db','outputs'], data: ['brief','api','engine','ai','outputs','db'], security: ['ui','api','db','ai'], deployment: ['ui','api','db','ai'] },
    nodes: [
      ['brief','Workload brief',5,47,'Input','Natural-language requirements are normalized into a structured architecture request.','User input'],
      ['ui','Next.js workspace',5,12,'Experience','Project workspace, React Flow topology and Monaco-based IaC review.','Vercel edge'],
      ['api','FastAPI service',30,12,'API','Nine routes cover health, authentication, projects and architecture generation.','CORS + signed session'],
      ['engine','Deterministic engine',30,47,'Rules','Provides a stable baseline and validates output consistency.','Private service'],
      ['ai','OpenAI / Azure OpenAI',56,47,'Optional AI','Enhances generation when configured; provider failure returns to deterministic output.','External boundary'],
      ['db','Project history',56,12,'Data','Owner-scoped projects, requests and run history managed through migrations.','Data boundary'],
      ['outputs','Six review outputs',81,30,'Output','Topology, security, cost, scaling, Bicep and Terraform remain connected.','Reviewer boundary']
    ],
    links: [['brief','engine'],['ui','api'],['api','engine'],['api','db'],['engine','ai'],['ai','engine'],['engine','outputs'],['outputs','db']]
  },
  deployforge: {
    overview: { title: 'From infrastructure template to recoverable state', summary: 'A template passes through parsing, desired-state comparison and policy checks before a simulated deployment is stored and exposed as graph, cost, history and rollback evidence.', journey: ['template','parser','policy','db','graph','api','ui','github'] },
    modes: { overview: ['template','ui','parser','api','policy','db','graph','github'], services: ['ui','api','parser','policy','db','graph'], data: ['template','parser','policy','db','graph'], security: ['ui','api','policy','db'], deployment: ['github','ui','api','db'] },
    nodes: [
      ['template','IaC template',5,47,'Input','Terraform, Bicep, YAML or JSON enters the simulation pipeline.','Untrusted input'],
      ['ui','Next.js dashboard',5,12,'Experience','Planning, cost, dependency graph, history and rollback workflows.','Vercel edge'],
      ['parser','Parser + planner',30,47,'Pipeline','Validates syntax, resolves resources and compares desired state with stored state.','Private service'],
      ['api','FastAPI control plane',30,12,'API','Eighteen application routes sit behind JWT authentication and ownership checks.','JWT boundary'],
      ['policy','Policy + simulation',56,47,'Guardrail','Checks public, costly and untagged resources before deterministic execution.','Policy boundary'],
      ['db','Snapshot history',56,12,'Data','Alembic-managed projects, deployments, resources and rollback events.','Data boundary'],
      ['graph','Graph · cost · history',81,47,'Output','Turns each stored snapshot into reviewable operational evidence.','Reviewer boundary'],
      ['github','GitHub Actions',81,12,'Delivery','Migration smoke test, pytest, production build and typecheck gate changes.','CI boundary']
    ],
    links: [['template','parser'],['ui','api'],['api','parser'],['parser','policy'],['policy','db'],['db','graph'],['github','ui'],['github','api']]
  },
  wealthcompass: {
    overview: { title: 'From investor inputs to resilient guidance', summary: 'Validated user data feeds deterministic domain rules and a local-first workspace, with server routes selectively adding cloud persistence and external providers.', journey: ['input','rules','ui','routes','supabase','providers','github'] },
    modes: { overview: ['input','ui','rules','routes','supabase','providers','github'], services: ['ui','rules','routes','supabase','providers'], data: ['input','rules','ui','supabase','providers'], security: ['ui','routes','supabase','providers'], deployment: ['github','ui','supabase','providers'] },
    nodes: [
      ['input','Investor data',5,47,'Input','Profile, holdings, goals, statements and transaction history enter through validated flows.','User data'],
      ['ui','Next.js workspace',5,12,'Experience','Dashboard, portfolio, goals, academy, market and mentor surfaces.','Vercel edge'],
      ['rules','Domain rule engines',30,47,'Logic','Deterministic scoring, health and planning logic remains useful offline.','Client boundary'],
      ['routes','19 route handlers',30,12,'API','Imports, market, mentor, broker, inbox and scheduled sync integrations.','Server boundary'],
      ['supabase','Supabase sync',56,12,'Data','Authenticated cloud persistence complements local-first browser state.','RLS data boundary'],
      ['providers','Optional providers',56,47,'External','Market, AI, broker and inbox adapters fail visibly and preserve fallback paths.','External boundary'],
      ['github','GitHub Actions',81,12,'Delivery','Install, lint, 314 tests and production build run on every change.','CI boundary']
    ],
    links: [['input','rules'],['rules','ui'],['ui','routes'],['routes','supabase'],['routes','providers'],['providers','rules'],['github','ui']]
  }
};

const modeLabels = { overview: 'Overview', services: 'Services', data: 'Data flow', security: 'Security boundaries', deployment: 'Deployment topology' };

document.querySelectorAll('[data-architecture]').forEach((root) => {
  const model = architectureModels[root.dataset.architecture];
  if (!model) return;
  root.innerHTML = `<div class="architecture-toolbar" role="tablist" aria-label="Architecture view">${Object.entries(modeLabels).map(([id, label], index) => `<button type="button" role="tab" aria-selected="${index === 0}" data-mode="${id}">${label}</button>`).join('')}</div><section class="architecture-overview-card" aria-labelledby="${root.dataset.architecture}-overview-title"><div><small>End-to-end overview</small><h3 id="${root.dataset.architecture}-overview-title">${model.overview.title}</h3><p>${model.overview.summary}</p></div><div class="architecture-overview-path" aria-label="Select a stage in the complete flow">${model.overview.journey.map((id, index) => { const node=model.nodes.find(([nodeId]) => nodeId===id); return `<button type="button" data-overview-node="${id}"><span>${String(index + 1).padStart(2,'0')}</span>${node[1]}</button>`; }).join('')}</div></section><div class="architecture-stage"><svg class="architecture-links" aria-hidden="true"></svg><div class="architecture-nodes"></div></div><div class="architecture-inspector" aria-live="polite"></div><p class="architecture-help">Select a stage or node for implementation detail. Use the arrow keys across view tabs.</p>`;
  const nodesHost = root.querySelector('.architecture-nodes');
  const inspector = root.querySelector('.architecture-inspector');
  const svg = root.querySelector('svg');
  let mode = 'overview';
  let selected = model.nodes[0][0];

  const render = () => {
    const visible = new Set(model.modes[mode]);
    if (!visible.has(selected)) selected = model.modes[mode][0];
    nodesHost.innerHTML = model.nodes.filter(([id]) => visible.has(id)).map(([id,label,x,y,type,,boundary]) => `<button type="button" class="architecture-node${id === selected ? ' selected' : ''}" style="--x:${x}%;--y:${y}%" data-node="${id}" aria-pressed="${id === selected}"><small>${type}</small><strong>${label}</strong><span>${boundary}</span></button>`).join('');
    const node = model.nodes.find(([id]) => id === selected);
    inspector.innerHTML = `<div><small>${node[4]} · ${node[6]}</small><h3>${node[1]}</h3></div><p>${node[5]}</p>`;
    root.querySelectorAll('[data-overview-node]').forEach((button) => button.classList.toggle('active', button.dataset.overviewNode === selected));
    requestAnimationFrame(drawLinks);
  };

  const drawLinks = () => {
    const stage = svg.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${stage.width} ${stage.height}`);
    svg.innerHTML = model.links.map(([from,to]) => {
      const a = nodesHost.querySelector(`[data-node="${from}"]`);
      const b = nodesHost.querySelector(`[data-node="${to}"]`);
      if (!a || !b) return '';
      const ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return `<line x1="${ar.left-stage.left+ar.width/2}" y1="${ar.top-stage.top+ar.height/2}" x2="${br.left-stage.left+br.width/2}" y2="${br.top-stage.top+br.height/2}" marker-end="url(#arrow)"/>`;
    }).join('') + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>';
  };
  root.querySelector('.architecture-toolbar').addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode]'); if (!button) return;
    mode = button.dataset.mode;
    root.querySelectorAll('[role="tab"]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    render();
  });
  root.querySelector('.architecture-toolbar').addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].click();
    tabs[next].focus();
  });
  nodesHost.addEventListener('click', (event) => { const button=event.target.closest('[data-node]'); if(button){selected=button.dataset.node;render();nodesHost.querySelector(`[data-node="${selected}"]`).focus();} });
  root.querySelector('.architecture-overview-path').addEventListener('click', (event) => {
    const button = event.target.closest('[data-overview-node]');
    if (!button) return;
    mode = 'overview';
    selected = button.dataset.overviewNode;
    root.querySelectorAll('[role="tab"]').forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.mode === mode)));
    render();
    nodesHost.querySelector(`[data-node="${selected}"]`)?.focus();
  });
  new ResizeObserver(drawLinks).observe(root.querySelector('.architecture-stage'));
  render();
});
