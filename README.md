# Financial Agent Harness：金融投研 RAG 与多 Agent 分析平台

面向股票基本面研究场景，围绕财报、公告、新闻、行情和个人研究记录，构建一套可观测、可评估、可纠错、可长期复盘的金融 RAG 知识库与多 Agent 投研分析平台。

项目重点不是让大模型一次性写出一篇分析报告，而是把金融 Agent 放进可测试、可回归、可审计的工程系统中，系统性处理长任务执行里的上下文膨胀、工具误调用、证据遗漏、结论漂移和幻觉风险。

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent_Runtime-1C3C3C)](https://langchain-ai.github.io/langgraph/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker_Compose-Ready-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)

> 本项目仅用于工程学习、公开信息整理和个人研究复盘，不提供买卖建议、目标价或收益承诺，不构成任何投资建议。财务、公告、新闻与行情数据可能存在延迟或口径差异，请以上市公司公告和交易所披露为准。

## 项目定位

传统股票 Agent 常见问题不是“不会写报告”，而是分析链路不可控：

- 长财报、公告和多轮工具结果不断塞入上下文，重要证据被噪声淹没；
- Agent 选错工具、参数缺失或 JSON 不合法时，任务直接中断或悄悄降质；
- 报告里出现无来源数字、旧数据覆盖新数据、证据与结论不匹配；
- 一次任务失败后只剩日志，无法沉淀为可复现 Eval Case；
- 历史研究结论、风险假设和失败教训没有进入下一次分析。

因此本项目将金融投研流程抽象为 **Financial Agent Harness**：

```text
执行环：任务拆解 -> RAG 检索 -> MCP / Skill 调用 -> 多 Agent 协作 -> 报告生成 -> Wiki 写回
评估环：数据准确率 -> 引用覆盖率 -> 幻觉率 -> 工具成功率 -> 报告完整度 -> 回归用例
```

执行环负责产出研究结果，评估环负责持续检查和回归，使 Agent 从一次性生成器升级为可持续优化的工程系统。

## 核心能力

### Agent Harness 双环机制

- 执行环基于 LangGraph 编排主控 Agent、财务分析 Agent、公告事件 Agent、新闻归因 Agent、风险识别 Agent 和报告生成 Agent。
- 评估环检查数据准确率、检索命中率、引用覆盖率、幻觉率、工具调用成功率、任务完成率和报告完整度。
- 失败任务自动沉淀为 Eval Case，用于 Prompt、RAG 策略、Skill 描述、工具 Schema 和 Agent 路由规则变更后的回归测试。

### 长任务状态管理

- 使用结构化 State 记录每个节点的输入、输出、证据来源、工具返回、失败原因、Token 消耗和耗时。
- 任务、步骤、工具调用、报告、证据、记忆和评估结果落库，支持追踪和复盘。
- 面向断点恢复、失败重试、节点回放和任务级审计预留 checkpoint 与幂等设计。

### 金融 RAG 与实体标签

- 围绕公司、行业、指标、公告事件、新闻热点、风险因素和研究结论构建实体标签体系。
- 将财报摘要、公告事件、新闻变化、财务指标、估值信息和个人研究记录沉淀为可检索知识资产。
- RAG 结果保留来源、时间、公司、指标、事件类型、报告期和质量分，降低证据错配和引用缺失。

### Reflection Memory

项目设计三层记忆：

| 记忆类型 | 内容 | 作用 |
| --- | --- | --- |
| 短期记忆 | 当前任务目标、约束、节点产物 | 控制单次任务上下文 |
| 长期记忆 | 公司历史结论、核心假设、风险清单、跟踪指标 | 支持持续研究和复盘 |
| 反思记忆 | 工具选错、指标口径错误、新闻归因偏差、引用缺失等失败案例 | 新任务启动时注入同类错误提醒 |

### Token 审计与上下文压缩

- 按任务、节点、模型调用维度统计输入 / 输出 Token、耗时和成本。
- 将上下文拆分为最近原文、滚动摘要、关键证据、长期记忆和工具结果。
- 通过证据重排、片段压缩和阶段裁剪减少无效上下文传递，降低长任务成本和噪声干扰。

### MCP / Skill 调用纠错

- 封装财务指标计算、公告事件提取、新闻热点归因、Wiki 写回、报告渲染等 MCP / Skill 工具。
- 工具调用前做 Schema 校验、权限检查、参数规范化和上下文预算控制。
- 出现工具选错、参数缺失、字段类型错误、JSON 不合法或工具异常时，将错误原因回传给 Agent，触发重新规划、降级调用和最多 N 次重试。

### Rules + Hooks 风险控制

- 高风险节点前加入证据检查 Hook、数据口径检查 Hook、工具参数检查 Hook 和报告生成前事实校验 Hook。
- 对无来源结论、过度投资建议、指标口径不一致、旧数据覆盖新数据等问题进行拦截。
- 报告统一禁止买卖建议、目标价和收益承诺，并带研究辅助免责声明。

### 可视化观测看板

- 展示任务状态、节点耗时、Token 消耗、RAG 检索命中率、工具调用成功率、失败重试次数、Eval Case 通过率和报告完整度。
- 通过 Mission Control 追踪 Agent 节点、证据账本、工具日志、记忆写回和评估结果。

## 产品界面

| Agent Mission Control | 个股基本面研究 |
| --- | --- |
| ![Agent Mission Control](ui-reference/images/08_mission_control_light.png) | ![个股基本面研究](ui-reference/images/09_stock_research_light.png) |

Mission Control 用于查看任务节点、证据、工具调用、记忆写回和 Eval 结果；个股研究页用于核对行情、财务趋势、三张表数据，并发起基本面分析任务。

## 系统架构

```mermaid
flowchart TB
    UI["Vue3 / ECharts 研究工作台"] --> API["FastAPI API / SSE"]
    API --> Queue["Celery / Redis"]
    Queue --> Graph["LangGraph Agent Runtime"]

    subgraph Harness["Financial Agent Harness"]
        Exec["执行环"]
        Eval["评估环"]
        Obs["Trace / Token / Tool Audit"]
        Guard["Rules + Hooks"]
    end

    Graph --> Exec
    Graph --> Eval
    Graph --> Obs
    Graph --> Guard

    Exec --> Planner["主控 Agent"]
    Exec --> Finance["财务分析 Agent"]
    Exec --> Event["公告事件 Agent"]
    Exec --> News["新闻归因 Agent"]
    Exec --> Risk["风险识别 Agent"]
    Exec --> Report["报告生成 Agent"]

    Finance --> Skills["Financial Skills"]
    Event --> MCP["MCP Tools"]
    News --> MCP
    Report --> Memory["Wiki / Reflection Memory"]

    Exec --> RAG["Hybrid RAG"]
    RAG --> SQL[("PostgreSQL / pgvector")]
    RAG --> Wiki[("公司 / 行业 / 指标 Wiki")]
    MCP --> Providers["AkShare / CNInfo / News / Mock Provider"]
    Eval --> Cases["Eval Cases / Regression"]
```

后端采用 FastAPI 提供接口，Celery 负责异步任务，LangGraph 管理 Agent 节点和状态流转。任务、报告、证据、工具日志、评估结果、Wiki 和记忆版本统一保存在 PostgreSQL 中。

## 一次分析如何执行

```mermaid
flowchart LR
    A["创建任务"] --> B["主控规划"]
    B --> C["加载记忆与上下文"]
    C --> D["数据新鲜度检查"]
    D --> E["RAG 检索与证据压缩"]
    E --> F["MCP / Skill 调用"]
    F --> G["多 Agent 分析"]
    G --> H["报告生成"]
    H --> I["事实与引用校验"]
    I --> J["Eval Harness"]
    J --> K["Wiki / Reflection 写回"]
```

| 阶段 | 关键动作 | 可观测产物 |
| --- | --- | --- |
| 任务规划 | 拆解研究维度、选择 Agent 和工具 | `master_plan`、预算、工具白名单 |
| 数据检查 | 检查行情、财报、公告、新闻、Wiki 新鲜度 | 数据质量、缺失原因、补数建议 |
| 证据检索 | SQL + BM25 + pgvector 混合检索、重排和压缩 | Evidence Ledger、检索分数、来源元数据 |
| 工具调用 | 调用财务 Skills、MCP Provider、Wiki 工具 | `tool_call_log`、Schema 校验、重试记录 |
| 分析生成 | 形成 Claim、风险清单和报告草稿 | 结构化 Claim、引用关系、报告 Markdown |
| 事实校验 | 检查数字、引用、旧数据、禁用表达 | 失败原因、修复建议、发布门禁 |
| 评估回归 | 计算质量指标，失败转 Eval Case | Eval Result、Bad Case、回归指标 |
| 记忆写回 | 写入公司 Wiki、风险清单、反思记忆 | Wiki 版本、Memory Proposal、置信度 |

## 已实现功能

- 输入 A 股代码，查看公司摘要、季度财务数据、估值序列和三张表数据。
- 创建基本面分析任务，实时查看 Agent 节点进度和工具调用记录。
- 通过财务 Skills 计算估值分位、现金流质量、杜邦拆解、业务结构和风险项。
- 为报告保留证据账本，记录来源、报告期、原始片段和支撑结论。
- 对报告数字、引用覆盖、章节完整度和禁止性表述做自动检查。
- 将未通过检查的任务转成 Eval Case，供后续回归。
- 将指标变化、风险点和结论增量写回公司 Wiki 与长期记忆。
- 提供 Mission Control、个股研究、能力中心和报告归档页面。

## 技术栈

| 模块 | 技术 |
| --- | --- |
| Agent 编排 | LangGraph、Agent Loop、TypedDict / Pydantic State |
| RAG | Hybrid Retrieval、BM25、pgvector、证据重排、上下文压缩 |
| Eval Harness | 自定义 Eval Case、质量指标、失败归因、回归测试 |
| Tooling | MCP Client / Server、Skill Executor、Schema 校验、重试降级 |
| 后端 | Python 3.12、FastAPI、SQLAlchemy、Pydantic、Celery |
| 数据 | PostgreSQL、pgvector、Redis |
| 前端 | Vue 3、TypeScript、Pinia、Vue Router、ECharts |
| 部署 | Docker Compose、Alembic、Makefile |

## 项目结构

```text
backend/app/
├── agent/                 # LangGraph、State、Context Engineering、节点实现
├── skills/                # 财务分析 Skills 与执行器
├── mcp_clients/           # 行情、财报、新闻、Wiki MCP 客户端
├── providers/             # Mock / AkShare / CNInfo 数据 Provider
├── services/rag/          # Hybrid Retriever 与 LlamaIndex 预留层
├── services/evals/        # 报告质量评估与 Eval Harness
├── models/                # Task、Step、Tool、Report、Evidence、Wiki、Eval
├── api/v1/                # REST API、任务进度、报告与评估接口
└── workers/               # Celery Worker、定时任务

frontend/src/
├── views/                 # Mission Control、个股研究、能力中心
├── components/dashboard/  # 工作流、证据、工具日志、记忆、Eval 组件
├── components/agent/      # Agent 解读面板
├── stores/                # Pinia 状态管理
└── api/                   # 前端 API 封装

mcp_servers/
├── market-data-mcp/
├── financial-report-mcp/
├── news-sector-mcp/
└── wiki-memory-mcp/
```

更详细的设计见 `docs/agent-technical-solution.md`、`docs/eval-system.md` 和 `docs/database.md`。

## 快速启动

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec backend alembic upgrade head
docker compose exec backend python -m app.seed.seed_demo_data
```

访问地址：

- Web：<http://localhost:5173>
- OpenAPI：<http://localhost:8000/docs>
- Health：<http://localhost:8000/health>

运行测试与构建：

```bash
docker compose exec backend pytest -q
docker compose exec frontend npm run build
```

## 环境变量

默认可以使用 mock provider 跑通完整链路，无需外部数据源密钥。

```env
DATABASE_URL=postgresql+asyncpg://ashare:ashare@postgres:5432/ashare_agent
SYNC_DATABASE_URL=postgresql://ashare:ashare@postgres:5432/ashare_agent
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/1
CELERY_RESULT_BACKEND=redis://redis:6379/2
DATA_PROVIDER=mock
EMBEDDING_PROVIDER=mock
LLM_PROVIDER=mock
OPENAI_API_KEY=
TUSHARE_TOKEN=
AKSHARE_ENABLED=false
CNINFO_ENABLED=false
```

## 常用操作

### 导入 Demo 数据

```bash
docker compose exec backend python -m app.seed.seed_demo_data
```

Demo 数据覆盖贵州茅台、宁德时代、中国平安、美的集团、招商银行、比亚迪等股票的行情、估值、财务指标、报告、Wiki、任务和评估样例。

### 运行 Celery

Docker Compose 会启动 worker。单独调试时可进入后端容器运行：

```bash
celery -A app.workers.celery_app worker -l info
```

### 生成基本面报告

前端在个股研究页点击“生成研究报告”，或通过 API 创建任务：

```http
POST /api/v1/agent/tasks/fundamental-analysis
Content-Type: application/json

{
  "ts_code": "600519.SH",
  "report_period": "2024Q1"
}
```

任务执行后可查看步骤、工具调用、证据、报告和评估结果。

### 新增 Skill

1. 在 `backend/app/skills/builtin/` 下新增 Skill 目录。
2. 编写 `Skill.md`，描述用途、输入、输出、步骤和 guardrails。
3. 实现 `skill.py`，返回结构化结果、证据和 warnings。
4. 在 Skill registry 中注册名称、版本、输入输出约束和权限。
5. 为公式、缺失值、异常口径和失败场景补充测试。

### 新增 MCP 工具

1. 在 `mcp_servers/` 下新增服务或扩展现有 server。
2. 定义工具名称、输入 Schema、输出 Schema、权限、超时和副作用。
3. 在 `backend/app/mcp_clients/` 中增加客户端封装。
4. 工具调用必须写入 `tool_call_log`，保留参数摘要、状态、耗时和错误原因。
5. 高风险写操作需要通过 Rules + Hooks 做事实和权限校验。

### 运行评估

```bash
docker compose exec backend pytest backend/app/tests/verify_agent_flow.py -q
```

评估指标包括：

- `data_accuracy`：报告数字与事实源一致率；
- `retrieval_hit_rate`：检索是否命中正确证据；
- `citation_coverage`：关键结论引用覆盖率；
- `hallucination_rate`：无来源或矛盾结论比例；
- `tool_success_rate`：MCP / Skill 调用成功率；
- `completeness`：报告必需章节完整度；
- `task_recovery_rate`：失败任务恢复能力。

## 当前边界

- Eval 已覆盖数字、章节、引用和禁用表达，但不等同于完整投研质量判断。
- Cross-Encoder 重排已支持配置开启，默认仍使用本地 lexical/BM25 回退，避免无模型环境影响启动。
- LangGraph 节点级 checkpoint 已落库，任务可通过 retry 从最新成功节点后继续执行。
- 真实数据源可能存在口径差异，报告仍需结合公告原文复核。
- 系统只做研究辅助，不输出交易建议、目标价或收益承诺。

## License

当前仓库未附带开源许可证。未经许可，不代表允许复制、修改或商业使用。
