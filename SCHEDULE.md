<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# tôi chọn ý tưởng: AI Ops Copilot for Incident Investigatio và phác họa cho tôi 1 project spec hoàn chỉnh

Dưới đây là một project spec hoàn chỉnh cho **AI Ops Copilot for Incident Investigation**: một web app Next.js giúp on-call engineer điều tra sự cố bằng cách hội tụ logs, metrics, traces, deploy events, runbooks và AI-guided hypotheses trong một workspace thống nhất. Ý tưởng này bám rất sát cách các AI/SRE copilots hiện đại hoạt động: khởi động điều tra từ alert, truy cập telemetry đa nguồn, tương quan context, gợi ý root cause và tái sử dụng tri thức từ incident trước đó.[^1][^2][^3][^4]

## Product definition

### 1. Mục tiêu

Xây một incident investigation workspace nơi người dùng không phải nhảy giữa Grafana, APM, logs, CI/CD và wiki để tìm nguyên nhân sự cố; thay vào đó, họ hỏi bằng ngôn ngữ tự nhiên và AI sẽ điều phối các tool để dựng timeline, tương quan signals và đề xuất hướng xử lý. OpenTelemetry đặc biệt phù hợp cho nền này vì logs, metrics và traces có thể được liên kết bằng trace/span context, giúp root-cause analysis nhanh và có căn cứ hơn.[^5][^6][^4]

### 2. Người dùng chính

- On-call engineer.
- SRE / DevOps engineer.
- Backend engineer xử lý production incident.
- Engineering manager cần incident summary và RCA draft.


### 3. Value proposition

App giảm thời gian “triage” bằng cách gom alert context, deployments, service topology và telemetry vào một màn hình điều tra duy nhất, đồng thời cho AI tạo hypothesis theo từng bước thay vì trả lời kiểu black-box. Các hệ thống SRE agent hiện nay cũng nhấn mạnh các năng lực như truy cập metrics, activity logs, dependencies, dashboards, past resolutions và runbooks để điều tra nhanh hơn.[^2][^7][^1]

## Core use cases

### 1. Alert-to-investigation

Người dùng mở một alert như “checkout latency p95 increased 4x”, app tự hydrate workspace với impacted services, recent deploys, spikes, linked traces, correlated logs và suggested first questions. Đây là pattern thực tế vì AI/SRE tooling thường bắt đầu từ alert và kéo theo dependencies, metrics, activity logs và incident context.[^8][^1]

### 2. Chat-driven investigation

Người dùng hỏi: “Why did checkout fail after the 10:20 deploy?” rồi AI gọi tools như query_metrics, query_logs, query_traces, compare_deploys, fetch_runbook và summarize_impact. Kết quả không chỉ là câu trả lời mà còn là một investigation graph gồm evidence, confidence score, discarded hypotheses và recommended next step, phù hợp với định hướng SRE copilots là tóm tắt timeline, gợi ý remediation và đánh giá blast radius.[^9][^3][^10]

### 3. RCA draft generation

Sau khi incident được mitigation, app tự sinh draft RCA gồm timeline, impact, root cause, contributing factors, remediation và follow-up actions dựa trên toàn bộ investigation trail. Kiến trúc observability tốt cho AI copilot còn cho phép theo dõi thứ tự queries, mitigation actions và thời điểm metrics phục hồi để dựng RCA có cấu trúc.[^3]

## Scope v1

### 1. Phạm vi bắt buộc

- Auth + role-based access.
- Incident list và incident detail workspace.
- AI chat với tool calling.
- Correlated logs, metrics, traces.
- Deployment timeline.
- Runbook retrieval.
- Suggested hypotheses.
- RCA draft generator.
- Audit trail của mọi AI/tool action.


### 2. Ngoài phạm vi v1

- Auto-remediation chạy lệnh thật lên production.
- Full bi-directional Slack bot.
- Multi-region active-active backend.
- Fine-tuned private model.
- Native mobile app.


## Functional requirements

### 1. Incident workspace

Mỗi incident có:

- Title, severity, status, started_at, resolved_at.
- Impact summary.
- Affected services.
- Suspected deployment(s).
- Timeline events.
- Investigation notes.
- AI conversation thread.
- Linked evidence objects.

Timeline phải hợp nhất nhiều loại event như alert fired, metric anomaly, deploy started, deploy finished, rollback, trace spike, manual note và AI hypothesis created. Việc kết nối telemetry theo shared context là một điểm quan trọng của OpenTelemetry vì trace/span IDs có thể xuất hiện trong logs và traces để pivot qua lại giữa signals.[^6][^4][^5]

### 2. AI copilot

Copilot phải hỗ trợ:

- Streaming trả lời từng token để UX mượt hơn.
- Tool calling có kiểm soát.
- Citation/evidence links trong từng answer.
- Hypothesis tracking: proposed, confirmed, rejected.
- “Why this answer?” để hiển thị evidence path.

UI streaming và partial prerendering của Next.js rất hợp với kiểu app này vì static shell có thể render ngay, còn các panel động như incident summary, timeline và AI output có thể stream dần trong một request.[^11]

### 3. Tooling layer

Copilot được phép gọi các tools sau:

- `query_metrics(service, time_range, metric, filters)`
- `query_logs(service, time_range, query)`
- `query_traces(service, time_range, latency_above, error_only)`
- `compare_deploys(service, before, after)`
- `get_service_dependencies(service)`
- `get_recent_changes(service)`
- `search_runbooks(query)`
- `search_past_incidents(query)`
- `estimate_customer_impact(service, window)`
- `create_rca_draft(incident_id)`

Mỗi tool call phải có:

- Input schema rõ ràng.
- Authorization check.
- Timeout.
- Retry policy.
- Tool result normalization.
- Audit log record.


### 4. Evidence model

Mọi AI answer phải map về evidence:

- Metric snapshot.
- Log sample group.
- Trace sample.
- Deployment event.
- Runbook excerpt.
- Incident note.
- Similar incident match.

Điểm mạnh ở đây là không để AI trả lời tự do; thay vào đó, mỗi kết luận phải bám vào bằng chứng thực tế, điều rất hợp với mô hình incident investigation dựa trên telemetry correlation.[^4][^3]

### 5. RCA generator

RCA output gồm:

- Executive summary.
- Customer impact.
- Detection.
- Timeline.
- Root cause.
- Contributing factors.
- Mitigation.
- Corrective actions.
- Preventive actions.
- Open questions.


## Non-functional requirements

### 1. Performance

- Initial incident page shell hiển thị dưới 1.5 giây với static shell + streamed dynamic panels là mục tiêu hợp lý nhờ Partial Prerendering/streaming của Next.js.[^11]
- Chat response bắt đầu stream dưới 1 giây.
- Tool queries thường gặp dưới 3 giây.
- Heavy trace exploration dưới 8 giây.


### 2. Reliability

- Tool execution phải idempotent khi có thể.
- Fallback khi một data source down.
- Circuit breaker cho flaky integrations.
- Job retry với exponential backoff.


### 3. Security

- RBAC theo team/service ownership.
- Secret management tách biệt.
- PII redaction cho logs.
- Audit trail không thể sửa.


### 4. Observability

Chính app của bạn cũng phải được instrument bằng OpenTelemetry để trace route handlers, tool execution, AI latency, queue jobs và external connector latency. Đây là phần cực đáng khoe vì OTel cho phép logs, metrics và traces được liên kết qua context propagation, giúp bạn quan sát cả sản phẩm lẫn dữ liệu điều tra bên trong sản phẩm.[^5][^6][^4]

## UX and screens

### 1. Main screens

- Sign in.
- Incident dashboard.
- Incident detail workspace.
- AI chat investigation panel.
- Service explorer.
- RCA editor.
- Runbook library.
- Admin/integrations page.


### 2. Incident detail layout

Chia 4 vùng:

- Left sidebar: incidents, filters, saved views.
- Main center: timeline + AI chat thread.
- Right top: impact summary, services, deploys.
- Right bottom: evidence tabs, logs/metrics/traces.

Đây là nơi bạn có thể khoe kỹ năng layout phức tạp, streaming panels và keyboard-first UX. Với Next.js, phần shell của route có thể prerender trước, còn từng Suspense boundary stream độc lập từ server.[^11]

### 3. Key interactions

- Click log line để pivot sang trace.
- Click trace để xem spans và correlated logs.
- Ask AI từ một selected error.
- Pin evidence vào case board.
- Convert AI answer thành incident note.
- One-click “Generate RCA from current investigation”.


## Technical architecture

### 1. Frontend

- Next.js 15 App Router.
- React Server Components cho data-heavy shell.
- Client components cho interactive panels.
- Server Actions cho mutations nội bộ.
- Suspense + streaming cho timeline, summaries, AI panels.[^12][^13][^11]


### 2. Backend within app

- Route handlers cho chat streaming, integrations, webhooks.
- Tool orchestration layer tách riêng khỏi UI.
- Background workers cho ingestion, embeddings, summarization.
- Cache layer cho repeated investigation queries.


### 3. Data plane

- Postgres: incidents, notes, deploys, users, runbooks metadata, audit logs.
- Redis: queues, ephemeral state, rate limits, response cache.
- Object storage: RCA exports, raw snapshots.
- Search/vector store: runbook + past incidents retrieval.


### 4. Telemetry connectors

- Metrics source: Prometheus-compatible hoặc Datadog-like abstraction.
- Logs source: Elastic/Loki-like abstraction.
- Traces source: Tempo/Jaeger/OTel backend abstraction.
- Deployments source: GitHub Actions/Azure DevOps/Vercel abstraction.
- Incident source: PagerDuty/Alertmanager abstraction.


### 5. AI layer

- Model router cho chat + reasoning.
- Tool executor sandbox.
- Retrieval pipeline cho runbooks/past incidents.
- Answer composer với evidence citation.
- Confidence estimator.


## Suggested repository structure

```txt
apps/
  web/
    app/
      (marketing)/
      incidents/
      services/
      runbooks/
      admin/
      api/
        chat/
        incidents/
        integrations/
    components/
      incident/
      ai/
      telemetry/
      layout/
    lib/
      auth/
      db/
      telemetry/
      ai/
      tools/
      rbac/
      cache/
      otel/
    server/
      connectors/
      jobs/
      workflows/
packages/
  ui/
  schemas/
  config/
  telemetry-sdk/
  tool-contracts/
docs/
  architecture/
  adr/
  product/
```

Cấu trúc này giúp repo nhìn mature hơn hẳn vì tách UI, schemas, telemetry SDK và tool contracts thành package rõ ràng, rất hợp với một portfolio repo muốn chứng minh design discipline.

## Data model

### 1. Core entities

- User
- Team
- Service
- Incident
- IncidentEvent
- InvestigationSession
- ChatMessage
- ToolExecution
- Evidence
- Deployment
- Runbook
- SimilarIncident
- RCAReport
- AuditEntry


### 2. Example relationships

- Incident has many IncidentEvents.
- InvestigationSession belongs to Incident.
- ChatMessage belongs to InvestigationSession.
- ToolExecution belongs to ChatMessage.
- Evidence can attach to ToolExecution or Incident.
- RCAReport belongs to Incident.


### 3. Important fields

OpenTelemetry log records thường có timestamp, severity, body, resource, attributes, traceId và spanId; bạn nên mirror các trường correlation quan trọng này trong ingestion/evidence schema để pivot từ logs sang traces dễ dàng.[^6][^5]

## AI behavior spec

### 1. System rules

Copilot phải:

- Không khẳng định root cause khi thiếu evidence.
- Luôn phân biệt fact, hypothesis và recommendation.
- Luôn trả về cited evidence objects.
- Ưu tiên questions làm giảm uncertainty nhanh nhất.
- Cảnh báo khi data source đang stale hoặc unavailable.


### 2. Output schema

Mỗi AI response nên có:

- `summary`
- `facts[]`
- `hypotheses[]`
- `recommended_next_steps[]`
- `evidence_ids[]`
- `confidence_score`
- `needs_human_confirmation`


### 3. Investigation states

- Intake.
- Triage.
- Deep investigation.
- Mitigated.
- Monitoring.
- Resolved.
- RCA drafting.
- Closed.


## API and contracts

### 1. Main API routes

- `POST /api/chat`
- `GET /api/incidents`
- `GET /api/incidents/:id`
- `POST /api/incidents/:id/notes`
- `POST /api/incidents/:id/rca`
- `GET /api/services/:id/dependencies`
- `POST /api/integrations/:provider/webhook`


### 2. Streaming chat contract

Chat API trả về:

- assistant delta tokens,
- tool start/end events,
- evidence attached events,
- status updates như “querying traces” hoặc “comparing deploys”.

Kiểu evented streaming này rất hợp với trải nghiệm incident investigation vì người dùng thấy tiến trình suy luận/tooling theo thời gian thực thay vì đợi một block text cuối cùng; Next.js streaming hỗ trợ rất tốt model UX đó.[^11]

## Security and governance

### 1. Access control

- Viewer: chỉ xem incident.
- Investigator: chat, note, pin evidence.
- Lead: resolve incident, generate RCA.
- Admin: manage integrations, retention, policies.


### 2. Guardrails

- Sensitive log content redaction.
- Tool allowlist theo role.
- No write-action tools in v1.
- Incident data retention policies.
- Full audit for AI answers and tool calls.


## Demo dataset and scenario design

### 1. Golden demo scenario

“Checkout latency spike after deploy”

- 10:20 deploy on checkout-service.
- p95 latency tăng 4x.
- Error rate tăng ở payment dependency.
- Trace waterfall cho thấy slow DB query + retry storm.
- Logs có timeout bursts.
- Rollback at 10:36.
- Metrics recover at 10:41.


### 2. Why it matters

Một demo scenario tốt giúp recruiter hoặc reviewer clone repo lên và hiểu ngay app đang giải quyết bài toán gì. Nó cũng cho phép bạn showcase correlation giữa deploy events, traces, logs và metrics như trong quy trình incident response thật.[^1][^3][^4]

## Roadmap

### Phase 1: Foundation

- Auth, incident dashboard, static mock data.
- Incident detail UI.
- Chat panel streaming.
- Basic tools with mock responses.


### Phase 2: Real telemetry

- Metrics/logs/traces connectors.
- Deployments ingestion.
- Evidence graph.
- Cross-signal pivoting.
- OTel instrumentation cho chính app.[^14][^4]


### Phase 3: Intelligence

- Runbook retrieval.
- Similar incident search.
- Hypothesis engine.
- RCA generator.
- Confidence scoring.


### Phase 4: Production polish

- Multi-tenant RBAC.
- Audit explorer.
- Cost controls.
- Failure handling.
- Playwright E2E.
- Performance tuning với streamed panels và cached shell.[^11]


## What makes it impressive

### 1. Điểm kỹ thuật khó

Repo này khoe được cùng lúc:

- Advanced Next.js architecture.
- Streaming UX.
- Tool-calling AI.
- Observability understanding.
- Data correlation.
- Background jobs.
- Security governance.
- Incident domain modeling.


### 2. Điểm “senior”

Nó không chỉ là một chat app; nó thể hiện bạn hiểu production systems, on-call workflow, telemetry semantics, deployment impact và cách biến AI thành một operator assistant có guardrails. Đây chính là kiểu năng lực mà các SRE copilot và AI observability products ngoài thị trường đang hướng tới.[^7][^2][^3][^1]

Tôi có thể làm tiếp bước kế tiếp ngay: viết cho bạn **README portfolio-ready bằng tiếng Anh**, hoặc **thiết kế chi tiết database schema + thư mục Next.js + API contracts** cho project này. Bạn muốn tôi làm phần nào trước?
<span style="display:none">[^15][^16][^17][^18]</span>

<div align="center">⁂</div>

[^1]: https://techcommunity.microsoft.com/blog/azurepaasblog/introducing-azure-sre-agent/4414569

[^2]: https://azure.microsoft.com/en-us/products/sre-agent

[^3]: https://clickhouse.com/blog/ai-sre-observability-architecture

[^4]: https://www.dash0.com/knowledge/logs-metrics-and-traces-observability

[^5]: https://opentelemetry.io/docs/concepts/signals/logs/

[^6]: https://opentelemetry.io/docs/specs/otel/logs/

[^7]: https://dzone.com/articles/how-sre-copilot-tools-will-transform-organizations

[^8]: https://logz.io/blog/opentelemetry-metrics/

[^9]: https://cloudnativenow.com/contributed-content/how-sres-are-using-ai-to-transform-incident-response-in-the-real-world/

[^10]: https://drdroid.io/engineering-tools/list-of-ai-copilot-for-sres-on-call-engineer----top-rcacopilots-sre-agents

[^11]: https://nextjs.org/docs/15/app/getting-started/partial-prerendering

[^12]: https://nextjs.org/blog/next-15

[^13]: https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations

[^14]: https://last9.io/blog/how-to-implement-opentelemetry-in-next-js/

[^15]: https://github.com/agamm/awesome-ai-sre

[^16]: https://www.reddit.com/r/nextjs/comments/1fse1qt/nextjs_partial_prerendering_is_an_antipattern/

[^17]: https://www.youtube.com/watch?v=BrHJAlynR0w

[^18]: https://www.linkedin.com/posts/krishna-kumar-nair-21b1b4115_executive-summary-ai-is-transforming-sre-activity-7393894518825082881-51-0

