# A股上市公司基本面研究与长期跟踪 Agent 平台

> 这是一份可以直接交给 Codex / Cursor / Claude Code 生成项目的完整规格书。  
> 项目定位：面向找工作展示与个人使用的 **A股基本面研究 Agent 平台**。  
> 注意：本系统只做公开信息整理、财务分析、长期跟踪和研究辅助，不提供买卖建议，不接交易接口，不构成投资建议。

---

## 0. 给 Codex 的总指令

请基于本规格书生成一个可运行的全栈项目，采用以下技术栈：

- 前端：Vue3 + TypeScript + Vite + ECharts + Pinia + Vue Router
- 后端：FastAPI + PostgreSQL + Redis + SQLAlchemy 2.x + Alembic
- 异步任务：Celery + Redis；轻量定时任务可使用 APScheduler
- Agent 编排：自研任务状态表 + LangGraph
- RAG：先实现自研 BM25 + pgvector 混合检索；预留 LlamaIndex 接入层
- 向量库：默认 pgvector，后续可切换 Qdrant
- MCP：自定义 market-data-mcp、financial-report-mcp、news-sector-mcp、wiki-memory-mcp
- Skills：本地 Skill.md + Python 执行器
- 评估：自定义 eval cases；预留 DeepEval / RAGAS 插件接口
- 部署：Docker Compose，本地一键启动

请优先保证：

1. 项目结构清晰。
2. 后端 API 可运行。
3. 前端页面可访问。
4. 先用 mock/demo provider 跑通完整链路。
5. 数据源设计必须可替换，后续能接 Tushare / AKShare / 巨潮资讯等真实数据。
6. Agent 分析必须有“任务状态、步骤状态、工具调用日志、引用证据、评估结果”。
7. 任何金融分析文案必须带免责声明：仅供研究参考，不构成投资建议。

---

## 1. UI 参考图

以下图片是产品 UI 方向参考。实现时不要求像素级一致，但整体风格要一致：**浅色金融 SaaS、左侧导航、顶部搜索、多卡片、多图表、状态标签、数据表格、右侧 Agent 解读面板**。

### 1.1 自选股分组 / 长期监控

![自选股分组 / 长期监控](images/01_watchlist_monitor.png)

### 1.2 个股驾驶舱

![个股驾驶舱](images/02_stock_cockpit.png)

### 1.3 财报中心

![财报中心](images/03_report_center.png)

### 1.4 Skills / MCP / Agent 评估概览

![Skills / MCP / Agent 评估概览](images/04_skills_mcp_eval.png)

### 1.5 新闻与板块 / 热点归因

![新闻与板块](images/05_news_sector.png)

### 1.6 Wiki 知识库 / 长期记忆

![Wiki 知识库 / 长期记忆](images/06_wiki_memory.png)

### 1.7 Agent 评估页

![Agent 评估页](images/07_agent_eval.png)

---

## 2. 产品定位

项目名称：

**A股上市公司基本面研究与长期跟踪 Agent 平台**

英文名可选：

**A-Share Fundamental Intelligence Agent**

核心定位：

```text
面向 A 股上市公司的基本面研究场景，整合行情估值、财务报表、上市公司公告、新闻事件、板块热点、Wiki 知识库、长期记忆、Skills、MCP 和 Agent 评估体系，支持自选股分组、长期监控、财报自动更新、基本面分析报告生成、投资假设追踪和系统质量评估。
```

不要实现：

- 不接交易接口。
- 不做自动买卖。
- 不输出“买入/卖出/目标价”之类直接投资建议。
- 不承诺收益。

可以输出：

- 基本面分析。
- 财务指标变化。
- 风险点。
- 估值区间位置。
- 投资假设是否被财务数据验证或削弱。
- 后续跟踪指标。

---

## 3. MVP 与完整版本边界

### 3.1 MVP 必须完成

MVP 要保证 Codex 首轮就能生成可跑项目：

1. 自选股分组页面。
2. 个股驾驶舱页面。
3. 财报中心页面。
4. Wiki / 长期记忆页面。
5. Agent 评估页面。
6. 后端 mock 数据 API。
7. PostgreSQL 数据表。
8. Celery 任务：更新股票数据、更新财报、生成分析报告。
9. LangGraph 基本面分析流程。
10. Skills 执行器。
11. MCP 工具抽象层。
12. 评估用例和评估结果表。

### 3.2 完整版本扩展

1. 接入真实行情数据源。
2. 接入公告 / 财报 PDF 下载。
3. PDF 表格抽取。
4. 新闻聚类和板块热点归因。
5. Qdrant 替换 pgvector。
6. DeepEval / RAGAS 接入。
7. 更复杂的用户长期记忆。
8. 多股票周报自动生成。

---

## 4. 系统架构

### 4.1 总体架构

```text
Vue3 前端
  ↓ REST API / SSE
FastAPI Backend
  ├── 股票/行情/财务 API
  ├── 财报中心 API
  ├── Wiki / Memory API
  ├── Agent Task API
  ├── Eval API
  └── MCP Client 层
        ↓
PostgreSQL + pgvector
Redis
Celery Worker
APScheduler
LangGraph Agent Runtime
Skills Executor
MCP Tool Services
```

### 4.2 数据流

```text
用户加入自选股
  ↓
创建 WatchlistStock + InvestmentThesis
  ↓
定时或手动触发数据更新任务
  ↓
Market Data Provider 获取行情、估值、市值
  ↓
Financial Provider 获取财务指标、三大报表
  ↓
Report Provider 获取公告/财报文档
  ↓
清洗、标准化、落库
  ↓
财报 / 公告 / Wiki 文档切分、向量化
  ↓
用户点击“生成基本面分析”
  ↓
创建 Agent Task
  ↓
LangGraph 编排多个节点：数据检查 → 检索 → Skills → 证据校验 → 报告生成 → 记忆更新 → 评估
  ↓
前端展示分析报告、引用证据、任务步骤、工具调用日志
```

---

## 5. 推荐项目目录结构

请生成 monorepo：

```text
ashare-fundamental-agent/
├── README.md
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
├── Makefile
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── router/
│       │   └── index.ts
│       ├── stores/
│       │   ├── stockStore.ts
│       │   ├── taskStore.ts
│       │   └── uiStore.ts
│       ├── api/
│       │   ├── client.ts
│       │   ├── stocks.ts
│       │   ├── reports.ts
│       │   ├── agent.ts
│       │   ├── wiki.ts
│       │   └── eval.ts
│       ├── types/
│       │   ├── stock.ts
│       │   ├── report.ts
│       │   ├── agent.ts
│       │   └── eval.ts
│       ├── layouts/
│       │   └── MainLayout.vue
│       ├── components/
│       │   ├── common/
│       │   ├── charts/
│       │   ├── stocks/
│       │   ├── reports/
│       │   ├── agent/
│       │   └── wiki/
│       ├── views/
│       │   ├── DashboardView.vue
│       │   ├── WatchlistView.vue
│       │   ├── StockCockpitView.vue
│       │   ├── ReportCenterView.vue
│       │   ├── FundamentalAnalysisView.vue
│       │   ├── NewsSectorView.vue
│       │   ├── WikiMemoryView.vue
│       │   ├── SkillsMcpView.vue
│       │   └── AgentEvalView.vue
│       └── styles/
│           ├── variables.css
│           └── global.css
├── backend/
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── alembic/
│   └── app/
│       ├── main.py
│       ├── core/
│       │   ├── config.py
│       │   ├── database.py
│       │   ├── redis.py
│       │   ├── logging.py
│       │   └── security.py
│       ├── api/
│       │   ├── deps.py
│       │   └── v1/
│       │       ├── router.py
│       │       ├── stocks.py
│       │       ├── watchlists.py
│       │       ├── reports.py
│       │       ├── analysis.py
│       │       ├── wiki.py
│       │       ├── memory.py
│       │       ├── agent_tasks.py
│       │       ├── mcp.py
│       │       └── evals.py
│       ├── models/
│       │   ├── base.py
│       │   ├── stock.py
│       │   ├── financial.py
│       │   ├── report.py
│       │   ├── wiki.py
│       │   ├── memory.py
│       │   ├── agent.py
│       │   └── eval.py
│       ├── schemas/
│       │   ├── stock.py
│       │   ├── report.py
│       │   ├── wiki.py
│       │   ├── memory.py
│       │   ├── agent.py
│       │   └── eval.py
│       ├── services/
│       │   ├── stocks/
│       │   ├── financials/
│       │   ├── reports/
│       │   ├── news/
│       │   ├── wiki/
│       │   ├── memory/
│       │   ├── rag/
│       │   └── evals/
│       ├── providers/
│       │   ├── base.py
│       │   ├── mock_provider.py
│       │   ├── tushare_provider.py
│       │   ├── akshare_provider.py
│       │   └── cninfo_provider.py
│       ├── agent/
│       │   ├── state.py
│       │   ├── graph.py
│       │   ├── nodes/
│       │   │   ├── check_freshness.py
│       │   │   ├── load_context.py
│       │   │   ├── retrieve_evidence.py
│       │   │   ├── run_skills.py
│       │   │   ├── generate_report.py
│       │   │   ├── verify_evidence.py
│       │   │   ├── update_memory.py
│       │   │   └── evaluate_output.py
│       │   └── prompts/
│       │       ├── fundamental_report.md
│       │       ├── sector_reasoning.md
│       │       └── evidence_verify.md
│       ├── skills/
│       │   ├── registry.py
│       │   ├── executor.py
│       │   └── builtin/
│       │       ├── valuation_range/
│       │       │   ├── Skill.md
│       │       │   └── skill.py
│       │       ├── three_statement_analysis/
│       │       ├── dupont_analysis/
│       │       ├── cashflow_quality/
│       │       ├── business_segment_analysis/
│       │       └── risk_red_flags/
│       ├── mcp_clients/
│       │   ├── base.py
│       │   ├── market_data.py
│       │   ├── financial_report.py
│       │   ├── news_sector.py
│       │   └── wiki_memory.py
│       ├── workers/
│       │   ├── celery_app.py
│       │   ├── tasks_data_update.py
│       │   ├── tasks_reports.py
│       │   ├── tasks_agent.py
│       │   └── scheduler.py
│       ├── seed/
│       │   └── seed_demo_data.py
│       └── tests/
├── mcp_servers/
│   ├── market-data-mcp/
│   ├── financial-report-mcp/
│   ├── news-sector-mcp/
│   └── wiki-memory-mcp/
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   ├── agent-workflow.md
│   └── eval-system.md
└── ui-reference/
    └── images/
```

---

## 6. 数据库设计

### 6.1 关键设计原则

1. 结构化数据走 PostgreSQL。
2. 文档 chunk 和 embedding 默认放 pgvector。
3. 所有外部数据要记录 source、source_url、fetched_at。
4. 所有 Agent 输出要能追溯到 evidence。
5. 任务状态必须可恢复。
6. 长期记忆要有 scope、confidence、expires_at。

### 6.2 核心表

#### stock_basic

存上市公司基础信息。

```sql
CREATE TABLE stock_basic (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) UNIQUE NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    name VARCHAR(128) NOT NULL,
    exchange VARCHAR(16),
    market VARCHAR(32),
    industry VARCHAR(128),
    sector VARCHAR(128),
    list_date DATE,
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

#### stock_price_daily

```sql
CREATE TABLE stock_price_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    trade_date DATE NOT NULL,
    open NUMERIC(18,4),
    high NUMERIC(18,4),
    low NUMERIC(18,4),
    close NUMERIC(18,4),
    pre_close NUMERIC(18,4),
    change NUMERIC(18,4),
    pct_chg NUMERIC(10,4),
    volume NUMERIC(24,4),
    amount NUMERIC(24,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, trade_date)
);
```

#### stock_valuation_daily

```sql
CREATE TABLE stock_valuation_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    trade_date DATE NOT NULL,
    pe_ttm NUMERIC(18,4),
    pb NUMERIC(18,4),
    ps_ttm NUMERIC(18,4),
    dividend_yield NUMERIC(18,4),
    total_mv NUMERIC(24,4),
    circ_mv NUMERIC(24,4),
    pe_percentile_5y NUMERIC(10,4),
    pb_percentile_5y NUMERIC(10,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, trade_date)
);
```

#### financial_statement_income / balance / cashflow

三张表分开存，字段可先覆盖核心指标。

```sql
CREATE TABLE financial_income_statement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_period VARCHAR(16) NOT NULL,
    report_date DATE,
    report_type VARCHAR(16), -- annual, q1, half, q3
    revenue NUMERIC(24,4),
    operating_profit NUMERIC(24,4),
    total_profit NUMERIC(24,4),
    net_profit NUMERIC(24,4),
    net_profit_parent NUMERIC(24,4),
    net_profit_deducted NUMERIC(24,4),
    eps_basic NUMERIC(18,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, report_period)
);

CREATE TABLE financial_balance_sheet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_period VARCHAR(16) NOT NULL,
    total_assets NUMERIC(24,4),
    total_liabilities NUMERIC(24,4),
    equity_parent NUMERIC(24,4),
    monetary_funds NUMERIC(24,4),
    accounts_receivable NUMERIC(24,4),
    inventories NUMERIC(24,4),
    goodwill NUMERIC(24,4),
    short_term_borrowing NUMERIC(24,4),
    long_term_borrowing NUMERIC(24,4),
    contract_liabilities NUMERIC(24,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, report_period)
);

CREATE TABLE financial_cashflow_statement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_period VARCHAR(16) NOT NULL,
    net_operate_cashflow NUMERIC(24,4),
    net_invest_cashflow NUMERIC(24,4),
    net_finance_cashflow NUMERIC(24,4),
    capex NUMERIC(24,4),
    free_cashflow NUMERIC(24,4),
    cash_received_from_sales NUMERIC(24,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, report_period)
);
```

#### financial_indicators

```sql
CREATE TABLE financial_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_period VARCHAR(16) NOT NULL,
    gross_margin NUMERIC(10,4),
    net_margin NUMERIC(10,4),
    roe NUMERIC(10,4),
    roa NUMERIC(10,4),
    roic NUMERIC(10,4),
    debt_asset_ratio NUMERIC(10,4),
    current_ratio NUMERIC(10,4),
    quick_ratio NUMERIC(10,4),
    ocf_to_net_profit NUMERIC(10,4),
    revenue_yoy NUMERIC(10,4),
    net_profit_yoy NUMERIC(10,4),
    deducted_profit_yoy NUMERIC(10,4),
    asset_turnover NUMERIC(10,4),
    inventory_turnover NUMERIC(10,4),
    ar_turnover NUMERIC(10,4),
    source VARCHAR(64),
    fetched_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, report_period)
);
```

#### business_segment

```sql
CREATE TABLE business_segment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_period VARCHAR(16) NOT NULL,
    segment_name VARCHAR(128) NOT NULL,
    revenue NUMERIC(24,4),
    revenue_ratio NUMERIC(10,4),
    gross_profit NUMERIC(24,4),
    gross_margin NUMERIC(10,4),
    source_report_id UUID,
    created_at TIMESTAMP DEFAULT now()
);
```

#### watchlist_group / watchlist_stock

```sql
CREATE TABLE watchlist_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    description TEXT,
    color VARCHAR(32),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE watchlist_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES watchlist_group(id),
    ts_code VARCHAR(32) NOT NULL,
    priority VARCHAR(32) DEFAULT 'normal',
    status VARCHAR(32) DEFAULT 'tracking',
    added_reason TEXT,
    latest_report_period VARCHAR(16),
    last_analysis_at TIMESTAMP,
    next_review_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(group_id, ts_code)
);
```

#### investment_thesis

```sql
CREATE TABLE investment_thesis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    title VARCHAR(256),
    thesis TEXT NOT NULL,
    key_assumptions JSONB DEFAULT '[]',
    watch_indicators JSONB DEFAULT '[]',
    status VARCHAR(32) DEFAULT 'active', -- active, weakened, verified, invalidated
    confidence NUMERIC(5,2) DEFAULT 0.50,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

#### company_report / report_chunk

```sql
CREATE TABLE company_report (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32) NOT NULL,
    report_type VARCHAR(32) NOT NULL, -- annual, q1, half, q3, announcement
    report_period VARCHAR(16),
    title VARCHAR(512),
    publish_date DATE,
    source VARCHAR(64),
    source_url TEXT,
    file_path TEXT,
    parse_status VARCHAR(32) DEFAULT 'pending',
    parse_progress NUMERIC(5,2) DEFAULT 0,
    extraction_completeness NUMERIC(5,2),
    summary TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    UNIQUE(ts_code, report_type, report_period, title)
);

CREATE TABLE report_chunk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES company_report(id),
    ts_code VARCHAR(32) NOT NULL,
    chunk_index INT NOT NULL,
    section_title VARCHAR(256),
    page_start INT,
    page_end INT,
    content TEXT NOT NULL,
    token_count INT,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT now()
);
```

#### company_news / sector_hot_event

```sql
CREATE TABLE company_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts_code VARCHAR(32),
    title VARCHAR(512) NOT NULL,
    content TEXT,
    url TEXT,
    source VARCHAR(64),
    publish_time TIMESTAMP,
    sentiment VARCHAR(32),
    event_type VARCHAR(64),
    entities JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE sector_hot_event (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sector_name VARCHAR(128) NOT NULL,
    event_date DATE NOT NULL,
    heat_score NUMERIC(10,4),
    change_pct NUMERIC(10,4),
    turnover NUMERIC(24,4),
    reasons JSONB DEFAULT '[]',
    related_stocks JSONB DEFAULT '[]',
    evidence_news_ids JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT now()
);
```

#### wiki_page / wiki_chunk

```sql
CREATE TABLE wiki_page (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_type VARCHAR(32) NOT NULL, -- company, industry, concept, skill, personal
    title VARCHAR(256) NOT NULL,
    slug VARCHAR(256) UNIQUE NOT NULL,
    ts_code VARCHAR(32),
    content_md TEXT NOT NULL,
    version INT DEFAULT 1,
    freshness VARCHAR(32) DEFAULT 'unknown',
    updated_by VARCHAR(64) DEFAULT 'agent',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE wiki_chunk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wiki_page_id UUID REFERENCES wiki_page(id),
    chunk_index INT NOT NULL,
    heading VARCHAR(256),
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT now()
);
```

#### agent_memory

```sql
CREATE TABLE agent_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope VARCHAR(32) NOT NULL, -- user, stock, system, industry
    memory_type VARCHAR(64) NOT NULL, -- preference, thesis, conclusion, watch_indicator, risk, system_rule
    ts_code VARCHAR(32),
    title VARCHAR(256),
    content TEXT NOT NULL,
    source VARCHAR(64),
    source_ref JSONB DEFAULT '{}',
    confidence NUMERIC(5,2) DEFAULT 0.50,
    status VARCHAR(32) DEFAULT 'active',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

#### agent_task / agent_step / tool_call_log

这是项目展示 Agent 工程能力的重点。

```sql
CREATE TABLE agent_task (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_type VARCHAR(64) NOT NULL, -- fundamental_analysis, report_update, sector_reasoning, weekly_monitor
    title VARCHAR(256) NOT NULL,
    ts_code VARCHAR(32),
    input JSONB DEFAULT '{}',
    status VARCHAR(32) DEFAULT 'pending', -- pending, running, success, failed, cancelled
    current_step VARCHAR(128),
    progress NUMERIC(5,2) DEFAULT 0,
    result JSONB DEFAULT '{}',
    error_message TEXT,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now(),
    started_at TIMESTAMP,
    finished_at TIMESTAMP
);

CREATE TABLE agent_step (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES agent_task(id),
    step_name VARCHAR(128) NOT NULL,
    step_order INT NOT NULL,
    status VARCHAR(32) DEFAULT 'pending',
    input JSONB DEFAULT '{}',
    output JSONB DEFAULT '{}',
    error_message TEXT,
    retry_count INT DEFAULT 0,
    started_at TIMESTAMP,
    finished_at TIMESTAMP
);

CREATE TABLE tool_call_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES agent_task(id),
    step_id UUID REFERENCES agent_step(id),
    tool_name VARCHAR(128) NOT NULL,
    tool_type VARCHAR(32) NOT NULL, -- mcp, skill, sql, rag, llm
    input JSONB DEFAULT '{}',
    output JSONB DEFAULT '{}',
    status VARCHAR(32) DEFAULT 'success',
    latency_ms INT,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

#### analysis_report / analysis_evidence

```sql
CREATE TABLE analysis_report (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES agent_task(id),
    ts_code VARCHAR(32) NOT NULL,
    report_type VARCHAR(64) NOT NULL, -- fundamental, sector, risk, weekly
    title VARCHAR(256),
    summary TEXT,
    conclusion VARCHAR(64), -- positive, neutral, cautious, risk_up
    content_md TEXT NOT NULL,
    structured_result JSONB DEFAULT '{}',
    disclaimer TEXT DEFAULT '本报告仅基于公开数据生成，仅供研究参考，不构成投资建议。',
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE analysis_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES analysis_report(id),
    evidence_type VARCHAR(32), -- financial, report_chunk, news, wiki, market
    source_id UUID,
    source_url TEXT,
    quote TEXT,
    metric_name VARCHAR(128),
    metric_value VARCHAR(128),
    created_at TIMESTAMP DEFAULT now()
);
```

#### eval_case / eval_result

```sql
CREATE TABLE eval_case (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(256) NOT NULL,
    task_type VARCHAR(64),
    input JSONB NOT NULL,
    expected_checks JSONB DEFAULT '{}',
    skill_name VARCHAR(128),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE eval_result (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    eval_case_id UUID REFERENCES eval_case(id),
    task_id UUID REFERENCES agent_task(id),
    score NUMERIC(6,2),
    data_accuracy NUMERIC(6,2),
    retrieval_hit_rate NUMERIC(6,2),
    citation_coverage NUMERIC(6,2),
    hallucination_rate NUMERIC(6,2),
    tool_success_rate NUMERIC(6,2),
    completeness NUMERIC(6,2),
    status VARCHAR(32),
    failure_reasons JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 7. 后端模块设计

### 7.1 FastAPI 入口

`backend/app/main.py`：

- 创建 FastAPI app。
- 注册 CORS。
- 注册 `/api/v1` router。
- 注册 health check。
- 启动时检查数据库连接。

API 前缀：

```text
/api/v1
```

### 7.2 核心 API

#### 股票搜索与基础信息

```http
GET /api/v1/stocks/search?keyword=茅台
GET /api/v1/stocks/{ts_code}
GET /api/v1/stocks/{ts_code}/dashboard
GET /api/v1/stocks/{ts_code}/valuation?years=5
GET /api/v1/stocks/{ts_code}/financials?periods=20
GET /api/v1/stocks/{ts_code}/segments
GET /api/v1/stocks/{ts_code}/peers
```

`/dashboard` 返回个股驾驶舱所有数据，避免前端发太多请求。

响应结构：

```json
{
  "stock": {"ts_code": "600519.SH", "name": "贵州茅台"},
  "summary": {
    "price": 1645.30,
    "pct_chg": -0.65,
    "total_mv": 20707,
    "pe_ttm": 20.79,
    "pb": 8.59,
    "dividend_yield": 2.12,
    "latest_report_period": "2024Q1"
  },
  "valuation_series": [],
  "quarterly_financials": [],
  "indicator_series": [],
  "business_segments": [],
  "peers": [],
  "agent_insight": {}
}
```

#### 自选股

```http
GET /api/v1/watchlists/groups
POST /api/v1/watchlists/groups
PUT /api/v1/watchlists/groups/{group_id}
DELETE /api/v1/watchlists/groups/{group_id}
GET /api/v1/watchlists/groups/{group_id}/stocks
POST /api/v1/watchlists/groups/{group_id}/stocks
DELETE /api/v1/watchlists/groups/{group_id}/stocks/{ts_code}
PUT /api/v1/watchlists/stocks/{watchlist_stock_id}/thesis
```

#### 财报中心

```http
GET /api/v1/reports
GET /api/v1/reports/{report_id}
POST /api/v1/reports/update-all
POST /api/v1/reports/update-latest
POST /api/v1/reports/{report_id}/reparse
POST /api/v1/reports/{report_id}/generate-analysis
GET /api/v1/reports/{report_id}/chunks
GET /api/v1/reports/{report_id}/pipeline
```

#### Agent 任务

```http
POST /api/v1/agent/tasks/fundamental-analysis
POST /api/v1/agent/tasks/sector-reasoning
POST /api/v1/agent/tasks/weekly-monitor
GET /api/v1/agent/tasks/{task_id}
GET /api/v1/agent/tasks/{task_id}/steps
GET /api/v1/agent/tasks/{task_id}/tool-calls
GET /api/v1/agent/tasks/{task_id}/stream
```

`/stream` 用 Server-Sent Events 实时推送任务状态。

#### Wiki / Memory

```http
GET /api/v1/wiki/pages
GET /api/v1/wiki/pages/{slug}
POST /api/v1/wiki/pages/{slug}/update
GET /api/v1/wiki/search?q=ROE
GET /api/v1/memory?scope=stock&ts_code=600519.SH
POST /api/v1/memory
PUT /api/v1/memory/{memory_id}
DELETE /api/v1/memory/{memory_id}
```

#### Skills / MCP / Eval

```http
GET /api/v1/skills
GET /api/v1/skills/{skill_name}
POST /api/v1/skills/{skill_name}/run
GET /api/v1/mcp/tools
POST /api/v1/mcp/tools/{tool_name}/call
GET /api/v1/evals/metrics
GET /api/v1/evals/cases
POST /api/v1/evals/run
GET /api/v1/evals/results
```

---

## 8. 前端设计

### 8.1 全局布局

`MainLayout.vue`：

- 左侧 Sidebar。
- 顶部 Header。
- 主内容区。
- 底部可不做。

左侧导航：

```text
总览
自选股分组
个股驾驶舱
财报中心
基本面分析
新闻与板块
Wiki知识库
长期记忆
Skills / MCP
Agent评估
```

底部小卡片：

```text
数据与模型状态
- 财报数据更新 2小时前
- 资讯数据更新 28分钟前
- 因子模型版本 v2.3.1
```

顶部 Header：

- Logo：基本面研究 Agent 平台。
- 全局搜索框。
- 日期。
- 市场状态。
- 通知铃铛。
- 用户：研究员。

### 8.2 设计风格

CSS 变量：

```css
:root {
  --color-primary: #2563eb;
  --color-primary-light: #eff6ff;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-purple: #8b5cf6;
  --color-bg: #f7f9fc;
  --color-card: #ffffff;
  --color-border: #e5e7eb;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --radius-card: 14px;
  --shadow-card: 0 8px 24px rgba(15, 23, 42, 0.06);
}
```

### 8.3 页面 1：WatchlistView

参考图：`images/01_watchlist_monitor.png`

功能：

- KPI：关注股票数、待更新财报、本周预警、新增热点、已完成分析。
- 左侧分组列表。
- 中间自选股表格。
- 右侧选中股票详情面板。
- 底部近期预警与动态。

组件拆分：

```text
WatchlistView.vue
├── SummaryKpiCards.vue
├── WatchlistGroupPanel.vue
├── WatchlistStockTable.vue
├── StockTrackingPanel.vue
└── RecentAlertsFeed.vue
```

股票表格列：

```text
股票、现价、涨跌幅、PE-TTM、PB、总市值、1Y涨跌幅、最新财报、状态
```

右侧详情：

```text
我的投资假设
关键观察指标
下次跟踪计划
```

### 8.4 页面 2：StockCockpitView

参考图：`images/02_stock_cockpit.png`

功能：

- 顶部股票摘要。
- Tabs：估值、成长、盈利、现金流、负债、对比。
- ECharts 图表：
  - PE-TTM 近 5 年走势。
  - PB 近 5 年走势。
  - 总市值周度走势。
  - 单季营收。
  - 单季归母净利润。
  - ROE / 毛利率 / 净利率。
  - 经营现金流。
  - 资产负债率。
  - 主营业务占比。
- 可比公司对比表。
- 右侧 Agent 解读。

组件：

```text
StockCockpitView.vue
├── StockSummaryStrip.vue
├── MetricTabs.vue
├── charts/PeTrendChart.vue
├── charts/PbTrendChart.vue
├── charts/MarketCapChart.vue
├── charts/QuarterRevenueChart.vue
├── charts/QuarterProfitChart.vue
├── charts/ProfitabilityTrendChart.vue
├── charts/CashflowChart.vue
├── charts/DebtRatioChart.vue
├── charts/BusinessSegmentDonut.vue
├── PeerComparisonTable.vue
└── AgentInsightPanel.vue
```

### 8.5 页面 3：ReportCenterView

参考图：`images/03_report_center.png`

功能：

- 操作按钮：更新全部财报、只更新最新财报、重新解析、生成基本面分析。
- KPI：已收录财报数、待解析、解析成功率、本周新增公告、待复核异常。
- 左侧筛选树。
- 财报表格。
- 右侧财报详情。
- 底部处理流程。

组件：

```text
ReportCenterView.vue
├── ReportActionBar.vue
├── ReportKpiCards.vue
├── ReportFilterPanel.vue
├── ReportTable.vue
├── ReportDetailPanel.vue
└── ReportPipelineTimeline.vue
```

### 8.6 页面 4：NewsSectorView

参考图：`images/05_news_sector.png`

功能：

- 今日热点板块。
- 板块异动数量。
- 个股新闻数。
- 风险公告。
- 机构调研。
- 板块热度排行。
- 板块走势图。
- 新闻与事件聚类。
- 相关个股。
- 热点原因分析。
- 持续性观察指标。

### 8.7 页面 5：WikiMemoryView

参考图：`images/06_wiki_memory.png`

功能：

- 左侧知识库树。
- 中间 Wiki 页面。
- 右侧长期记忆。
- 关联图谱。
- 记忆时间线。

### 8.8 页面 6：AgentEvalView

参考图：`images/07_agent_eval.png`

功能：

- KPI：数据准确率、检索命中率、引用覆盖率、工具成功率、幻觉率、任务恢复率。
- 近 30 天趋势图。
- 最近评估用例。
- 活跃 Skills。
- MCP 工具状态。
- 工具调用日志。
- 失败用例分析。
- 下一步行动建议。

---

## 9. 数据源 Provider 设计

### 9.1 Provider 抽象接口

`backend/app/providers/base.py`

```python
from abc import ABC, abstractmethod
from typing import Any

class MarketDataProvider(ABC):
    @abstractmethod
    async def search_stock(self, keyword: str) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def get_price_history(self, ts_code: str, start_date: str, end_date: str) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def get_valuation_history(self, ts_code: str, start_date: str, end_date: str) -> list[dict[str, Any]]: ...

class FinancialDataProvider(ABC):
    @abstractmethod
    async def get_income_statement(self, ts_code: str, periods: int = 20) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def get_balance_sheet(self, ts_code: str, periods: int = 20) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def get_cashflow_statement(self, ts_code: str, periods: int = 20) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def get_financial_indicators(self, ts_code: str, periods: int = 20) -> list[dict[str, Any]]: ...

class ReportProvider(ABC):
    @abstractmethod
    async def search_reports(self, ts_code: str, report_type: str | None = None) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def download_report(self, report_id: str) -> str: ...
```

### 9.2 Mock Provider

必须实现 `mock_provider.py`，保证没有外部 API Token 时也能跑项目。

Mock 数据包含：

```text
贵州茅台 600519.SH
宁德时代 300750.SZ
中国平安 601318.SH
美的集团 000333.SZ
招商银行 600036.SH
比亚迪 002594.SZ
五粮液 000858.SZ
泸州老窖 000568.SZ
山西汾酒 600809.SH
```

要生成近五年 PE/PB/市值和季度财务 mock 数据。

---

## 10. RAG 设计

### 10.1 检索路由

```text
具体财务数字 → SQL 查询
财报原文/公告内容 → report_chunk 向量检索 + BM25
行业知识/分析框架 → wiki_chunk 检索
综合基本面分析 → SQL + RAG + Skills
```

### 10.2 自研 Hybrid Retriever

`backend/app/services/rag/hybrid_retriever.py`

功能：

1. 输入 query、ts_code、source_types。
2. 同时执行：
   - BM25 keyword search。
   - pgvector similarity search。
3. 合并结果。
4. 按 score、freshness、source_type rerank。
5. 返回 evidence 列表。

返回格式：

```json
{
  "items": [
    {
      "source_type": "report_chunk",
      "source_id": "uuid",
      "title": "2023年年度报告 - 管理层讨论",
      "content": "...",
      "score": 0.87,
      "metadata": {"page": 32, "report_period": "2023FY"}
    }
  ]
}
```

### 10.3 Embedding 服务

先做 mock embedding 或 deterministic embedding，保证本地运行。后续接 OpenAI / 本地 embedding。

接口：

```python
class EmbeddingService:
    async def embed_text(self, text: str) -> list[float]:
        ...

    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        ...
```

---

## 11. Skills 设计

### 11.1 Skill 目录格式

每个 Skill 一个目录：

```text
skills/builtin/valuation_range/
├── Skill.md
└── skill.py
```

### 11.2 Skill.md 标准格式

```markdown
# 五年估值区间分析

## name
valuation_range_analysis

## description
分析股票当前 PE-TTM、PB、总市值在近五年历史区间中的位置，判断估值是否处于偏低、合理、偏高区间。

## inputs
- ts_code: 股票代码
- valuation_series: 近五年估值序列
- current_valuation: 当前估值

## outputs
- pe_percentile_5y
- pb_percentile_5y
- valuation_label
- evidence
- risks
- summary

## steps
1. 计算 PE-TTM 近五年均值、中位数、最大值、最小值。
2. 计算当前 PE-TTM 分位数。
3. 计算 PB 近五年均值、中位数、最大值、最小值。
4. 计算当前 PB 分位数。
5. 判断估值位置。
6. 输出证据和结论。

## guardrails
- 不输出买入、卖出、目标价。
- 结论必须带数据证据。
- 如果数据不足 3 年，必须提示数据不足。
```

### 11.3 Skill Python 接口

```python
from pydantic import BaseModel
from typing import Any

class SkillResult(BaseModel):
    skill_name: str
    status: str
    output: dict[str, Any]
    evidence: list[dict[str, Any]] = []
    warnings: list[str] = []

class BaseSkill:
    name: str
    description: str

    async def run(self, input_data: dict[str, Any]) -> SkillResult:
        raise NotImplementedError
```

### 11.4 内置 Skills

必须实现以下 Skill：

1. `valuation_range_analysis`：五年估值区间分析。
2. `three_statement_analysis`：财报三表联动分析。
3. `dupont_analysis`：杜邦分析。
4. `cashflow_quality_analysis`：现金流质量分析。
5. `business_segment_analysis`：主营业务结构分析。
6. `peer_comparison_analysis`：同行对比分析。
7. `risk_red_flags_analysis`：风险红旗分析。
8. `investment_thesis_check`：投资假设验证。
9. `sector_heat_reasoning`：板块热点归因。
10. `evidence_coverage_check`：证据覆盖检查。

---

## 12. MCP 设计

MCP 可以先在项目内实现为本地服务/客户端抽象，不要求一开始完全按外部 MCP 协议部署，但目录和接口要预留。

### 12.1 market-data-mcp

工具：

```text
search_stock(keyword)
get_price_history(ts_code, start_date, end_date)
get_valuation_history(ts_code, years)
get_market_cap_history(ts_code, years)
get_sector_index(sector_name, days)
```

### 12.2 financial-report-mcp

工具：

```text
get_income_statement(ts_code, periods)
get_balance_sheet(ts_code, periods)
get_cashflow_statement(ts_code, periods)
get_financial_indicators(ts_code, periods)
search_reports(ts_code, report_type)
parse_report(report_id)
```

### 12.3 news-sector-mcp

工具：

```text
search_company_news(ts_code, days)
search_sector_news(sector_name, days)
get_sector_heat_rank(date)
cluster_news_events(news_items)
analyze_sector_heat_reason(sector_name)
```

### 12.4 wiki-memory-mcp

工具：

```text
search_wiki(query, filters)
get_company_wiki(ts_code)
update_company_wiki(ts_code, content)
get_stock_memory(ts_code)
update_stock_memory(ts_code, memory_item)
get_investment_thesis(ts_code)
update_investment_thesis(ts_code, evidence)
```

### 12.5 MCP 工具调用日志

每次 MCP 调用必须写入 `tool_call_log`：

```json
{
  "tool_name": "market-data-mcp.get_valuation_history",
  "tool_type": "mcp",
  "input": {"ts_code": "600519.SH", "years": 5},
  "status": "success",
  "latency_ms": 286
}
```

---

## 13. Agent 编排设计

### 13.1 自研任务状态表 + LangGraph

不要完全依赖 LangGraph 保存状态。LangGraph 负责流程编排，数据库负责长期状态、任务恢复和展示。

### 13.2 Agent State

`backend/app/agent/state.py`

```python
from typing import TypedDict, Any

class FundamentalAnalysisState(TypedDict, total=False):
    task_id: str
    ts_code: str
    report_period: str | None
    user_question: str | None
    data_freshness: dict[str, Any]
    stock_context: dict[str, Any]
    financial_data: dict[str, Any]
    retrieved_evidence: list[dict[str, Any]]
    skill_results: list[dict[str, Any]]
    draft_report: str
    verified_report: str
    memory_updates: list[dict[str, Any]]
    eval_result: dict[str, Any]
    errors: list[str]
```

### 13.3 基本面分析 Graph

节点顺序：

```text
start
  ↓
check_data_freshness
  ↓
load_stock_context
  ↓
retrieve_evidence
  ↓
run_financial_skills
  ↓
generate_report
  ↓
verify_evidence
  ↓
update_memory
  ↓
evaluate_output
  ↓
end
```

每个节点必须：

1. 更新 `agent_step` 状态。
2. 写入输入和输出。
3. 失败时记录错误。
4. 调用工具时写 `tool_call_log`。

### 13.4 节点职责

#### check_data_freshness

检查：

- 行情数据是否最近 7 天内更新。
- 财务数据是否有最新报告期。
- 新闻数据是否最近 24 小时内更新。
- Wiki 是否超过 30 天未更新。

输出：

```json
{
  "market_data": "fresh",
  "financial_data": "fresh",
  "reports": "stale",
  "wiki": "fresh",
  "need_update_reports": true
}
```

#### load_stock_context

加载：

- 股票基础信息。
- 自选分组。
- 投资假设。
- 长期记忆。
- 近期分析报告。

#### retrieve_evidence

检索：

- 财报 chunk。
- Wiki chunk。
- 新闻。
- 历史指标。

#### run_financial_skills

依次运行：

```text
valuation_range_analysis
three_statement_analysis
dupont_analysis
cashflow_quality_analysis
business_segment_analysis
risk_red_flags_analysis
investment_thesis_check
```

#### generate_report

生成 Markdown 报告，必须包含：

```text
一、核心结论
二、公司与商业模式
三、估值位置
四、成长性
五、盈利能力
六、现金流质量
七、资产负债情况
八、主营业务结构
九、同行对比
十、最新财报变化
十一、投资假设验证
十二、风险清单
十三、后续跟踪计划
十四、引用证据
免责声明
```

#### verify_evidence

检查：

- 每个关键结论是否有 evidence。
- 是否出现没有来源的数据。
- 是否出现买卖建议。
- 是否出现目标价。

#### update_memory

更新：

- 股票长期结论。
- 投资假设状态。
- 下次跟踪指标。
- 风险变化。

#### evaluate_output

计算：

- 数据准确率。
- 检索命中率。
- 引用覆盖率。
- 幻觉率。
- 工具成功率。
- 完整度。

---

## 14. Celery / 定时任务设计

### 14.1 Celery 队列

```text
data_update_queue
report_queue
agent_queue
eval_queue
```

### 14.2 任务

```python
update_stock_market_data(ts_code: str)
update_watchlist_market_data(group_id: str)
update_latest_reports(ts_code: str)
parse_report(report_id: str)
generate_fundamental_analysis(ts_code: str)
run_eval_cases(case_ids: list[str] | None)
weekly_watchlist_monitor(group_id: str)
```

### 14.3 APScheduler

开发版可以使用 APScheduler 做：

```text
每周一 08:00 更新自选股市值和估值
每天下午 18:00 更新新闻和板块热点
每天 20:00 扫描新公告和新财报
每周日 20:00 生成自选股周报
```

实际生产可迁移到 Celery Beat。

---

## 15. 评估体系

### 15.1 评估指标

| 指标 | 定义 |
|---|---|
| data_accuracy | 报告中的财务数字是否和数据库一致 |
| retrieval_hit_rate | 检索是否命中正确财报 / Wiki / 新闻 |
| citation_coverage | 关键结论是否有引用证据 |
| hallucination_rate | 是否出现无来源事实、目标价、买卖建议 |
| tool_success_rate | MCP / Skill 调用成功率 |
| completeness | 是否覆盖指定分析维度 |
| task_recovery_rate | 失败任务是否可重试 / 恢复 |

### 15.2 Eval Case 示例

```json
{
  "case_id": "EVL-20240520-0087",
  "name": "分析贵州茅台2024Q1业绩表现与利润质量",
  "task_type": "fundamental_analysis",
  "input": {
    "ts_code": "600519.SH",
    "report_period": "2024Q1"
  },
  "expected_checks": {
    "must_include_sections": ["估值位置", "盈利能力", "现金流质量", "风险提示"],
    "must_have_citations": true,
    "forbidden_phrases": ["建议买入", "强烈推荐", "目标价"]
  },
  "skill_name": "财报深度解析"
}
```

### 15.3 AgentEvalView 展示

参考图：`images/07_agent_eval.png`

展示：

- 顶部 KPI。
- 评估趋势。
- 最近评估用例。
- 活跃 Skills。
- MCP 工具状态。
- 最近工具调用日志。
- 失败用例分析。
- 下一步行动建议。

---

## 16. 前端 API 类型定义示例

### 16.1 Stock 类型

```ts
export interface StockBasic {
  tsCode: string
  symbol: string
  name: string
  exchange: string
  industry?: string
  sector?: string
}

export interface StockSummary {
  price: number
  change: number
  pctChg: number
  totalMv: number
  peTtm: number
  pb: number
  dividendYield?: number
  latestReportPeriod?: string
}

export interface TimeSeriesPoint {
  date: string
  value: number
  [key: string]: string | number | null | undefined
}
```

### 16.2 Agent 类型

```ts
export type AgentTaskStatus = 'pending' | 'running' | 'success' | 'failed' | 'cancelled'

export interface AgentTask {
  id: string
  taskType: string
  title: string
  tsCode?: string
  status: AgentTaskStatus
  currentStep?: string
  progress: number
  createdAt: string
  startedAt?: string
  finishedAt?: string
}

export interface AgentStep {
  id: string
  taskId: string
  stepName: string
  stepOrder: number
  status: AgentTaskStatus
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  errorMessage?: string
}
```

---

## 17. Docker Compose

### 17.1 服务

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE=http://localhost:8000/api/v1
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - postgres
      - redis

  worker:
    build: ./backend
    command: celery -A app.workers.celery_app worker -l info
    env_file:
      - .env
    depends_on:
      - backend
      - redis
      - postgres

  scheduler:
    build: ./backend
    command: python -m app.workers.scheduler
    env_file:
      - .env
    depends_on:
      - backend
      - redis
      - postgres

  postgres:
    image: pgvector/pgvector:pg16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ashare
      POSTGRES_PASSWORD: ashare
      POSTGRES_DB: ashare_agent
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 17.2 .env.example

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

---

## 18. Codex 实现顺序

请按以下顺序开发，避免一次性生成混乱。

### Phase 1：项目骨架

1. 创建 monorepo。
2. 配置 Docker Compose。
3. 创建 FastAPI 项目。
4. 创建 Vue3 项目。
5. 创建数据库连接和健康检查。
6. 创建基础路由。

验收：

```text
http://localhost:8000/health 返回 ok
http://localhost:5173 可打开前端首页
```

### Phase 2：数据库与 mock 数据

1. 创建 SQLAlchemy models。
2. 创建 Alembic migration。
3. 实现 seed_demo_data.py。
4. 写入贵州茅台、宁德时代等 mock 数据。
5. 实现股票、财务、估值 API。

验收：

```text
GET /api/v1/stocks/search?keyword=茅台 返回数据
GET /api/v1/stocks/600519.SH/dashboard 返回完整驾驶舱数据
```

### Phase 3：前端核心页面

1. 实现 MainLayout。
2. 实现 WatchlistView。
3. 实现 StockCockpitView。
4. 实现 ReportCenterView。
5. 接入 ECharts。

验收：

```text
页面能显示 mock 数据图表，布局接近 UI 参考图。
```

### Phase 4：任务系统与 Celery

1. 实现 agent_task、agent_step、tool_call_log。
2. 实现创建任务 API。
3. 实现 Celery worker。
4. 实现任务状态轮询或 SSE。

验收：

```text
点击“生成基本面分析”后产生任务，前端能看到任务进度。
```

### Phase 5：Skills 与 MCP

1. 实现 Skill registry。
2. 实现 valuation_range_analysis。
3. 实现 three_statement_analysis。
4. 实现 risk_red_flags_analysis。
5. 实现 MCP client 抽象。
6. 每次调用写 tool_call_log。

验收：

```text
POST /api/v1/skills/valuation_range_analysis/run 返回分析结果。
```

### Phase 6：LangGraph Agent

1. 实现 FundamentalAnalysisState。
2. 实现基本面分析 graph。
3. 每个节点写 agent_step。
4. 输出 analysis_report。
5. 输出 evidence。
6. 更新 memory。

验收：

```text
POST /api/v1/agent/tasks/fundamental-analysis 能生成完整 Markdown 报告。
```

### Phase 7：Wiki / Memory / RAG

1. 实现 wiki_page、wiki_chunk。
2. 实现 memory API。
3. 实现简单 BM25 检索。
4. 实现 pgvector 检索接口。
5. 实现 WikiMemoryView。

验收：

```text
Wiki 页面可查看，长期记忆可新增、编辑、查询。
```

### Phase 8：Eval Dashboard

1. 实现 eval_case、eval_result。
2. 实现评估指标计算。
3. 实现 AgentEvalView。
4. 展示 Skills / MCP 状态和工具调用日志。

验收：

```text
Agent 评估页面展示 KPI、趋势图、失败用例和建议。
```

---

## 19. 重要交互说明

### 19.1 生成基本面分析

用户在个股驾驶舱点击“生成研究报告”：

```text
POST /api/v1/agent/tasks/fundamental-analysis
body: {"ts_code": "600519.SH"}
```

后端：

1. 创建 agent_task。
2. Celery 异步执行。
3. LangGraph 节点逐步更新任务状态。
4. 前端轮询或 SSE 展示进度。
5. 完成后跳转报告页。

### 19.2 更新财报

用户在财报中心点击“更新全部财报”：

```text
POST /api/v1/reports/update-all
```

后端：

1. 创建 report_update task。
2. 使用 ReportProvider 搜索报告。
3. 下载 / mock 生成报告。
4. 解析。
5. 切块。
6. 向量化。
7. 更新 Wiki。

### 19.3 长期记忆写入

用户点击“写入长期记忆”：

```text
POST /api/v1/memory
```

记忆类型：

```text
user_preference
investment_thesis
historical_conclusion
watch_indicator
risk_note
system_rule
```

---

## 20. 分析报告模板

Agent 生成的报告必须使用以下结构：

```markdown
# {股票名称}（{ts_code}）基本面分析报告

> 本报告仅基于公开数据和系统内已有资料生成，仅供研究参考，不构成投资建议。

## 一、核心结论

- 综合判断：谨慎乐观 / 中性 / 需观察 / 风险上升
- 最重要的三条变化：
  1. ...
  2. ...
  3. ...

## 二、公司与商业模式

## 三、估值位置

## 四、成长性分析

## 五、盈利能力分析

## 六、现金流质量分析

## 七、资产负债情况

## 八、主营业务结构

## 九、同行对比

## 十、最新财报变化

## 十一、投资假设验证

| 原始假设 | 当前证据 | 状态 | 说明 |
|---|---|---|---|

## 十二、风险清单

## 十三、后续跟踪计划

## 十四、引用证据

## 免责声明

本报告由 Agent 基于公开数据、财报、公告、新闻与系统知识库生成，仅供研究参考，不构成任何投资建议或收益承诺。
```

---

## 21. 安全与合规要求

1. 所有页面底部或报告尾部必须显示：仅供研究参考，不构成投资建议。
2. Agent 不得输出明确买卖建议。
3. Agent 不得输出“目标价”。
4. Agent 不得承诺收益。
5. 外部数据必须记录来源。
6. 如果数据不足或过期，必须提示。
7. 如果引用证据不足，报告状态标记为“需复核”。

---

## 22. README 必须包含

README.md 内容：

```text
项目介绍
功能截图
技术栈
系统架构
快速启动
环境变量
如何导入 demo 数据
如何运行 Celery
如何生成基本面报告
如何新增 Skill
如何新增 MCP 工具
如何运行评估
免责声明
```

快速启动命令：

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec backend alembic upgrade head
docker compose exec backend python -m app.seed.seed_demo_data
```

访问：

```text
前端：http://localhost:5173
后端：http://localhost:8000/docs
```

---

## 23. 面试展示重点

这个项目最终要能讲出以下亮点：

1. **多源金融数据接入层**：Provider 抽象，支持 mock、Tushare、AKShare、巨潮资讯。
2. **金融因子计算引擎**：PE/PB 分位、ROE、现金流质量、偿债能力、主营业务占比。
3. **Agent 工程化**：自研任务状态表 + LangGraph，支持步骤追踪、失败恢复、工具调用日志。
4. **RAG 与 Wiki**：结构化 SQL + 文档检索 + Wiki 检索，避免所有问题都丢给向量库。
5. **长期记忆**：记录用户偏好、股票投资假设、历史结论、风险变化和下次跟踪指标。
6. **Skills 体系**：把价值投资分析流程封装成可复用 Skill。
7. **MCP 工具层**：把行情、财报、新闻、Wiki/记忆能力标准化暴露给 Agent。
8. **Agent 评估体系**：数据准确率、检索命中率、引用覆盖率、幻觉率、工具成功率、任务恢复率。
9. **前后端完整产品化**：Vue3 + FastAPI + PostgreSQL + Redis + Celery + Docker Compose。

---

## 24. 最终验收标准

项目完成后必须满足：

1. `docker compose up -d --build` 可启动所有服务。
2. 前端能打开至少 6 个核心页面。
3. 个股驾驶舱能显示 ECharts 图表。
4. 财报中心能触发 mock 更新/解析任务。
5. 点击“生成研究报告”能创建 Agent 任务并生成报告。
6. Agent 任务有步骤、工具调用日志、结果。
7. Wiki 页面能显示公司知识卡片。
8. 长期记忆能增删改查。
9. Agent 评估页面能展示指标和用例。
10. README 能指导面试官本地启动。

---

## 25. 额外建议

Codex 生成时优先完成可运行版本，不要追求一次实现所有真实数据源。真实数据源后续作为 Provider 插件接入。当前最重要的是：

```text
产品能跑
页面好看
流程完整
任务可追踪
分析有证据
评估有指标
```

做到这几点，这个项目就不是普通股票问答机器人，而是一个完整的 **A股基本面研究 Agent 工程系统**。
