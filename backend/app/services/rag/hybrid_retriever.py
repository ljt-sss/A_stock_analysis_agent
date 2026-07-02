from rank_bm25 import BM25Okapi

from app.agent.context_engineering import rerank_and_compress


class HybridRetriever:
    async def retrieve(self,query: str,ts_code: str|None=None,source_types:list[str]|None=None,top_k:int=5)->dict:
        documents=[("report_chunk","2023年年度报告 - 管理层讨论","公司核心产品保持稳定，渠道库存处于合理区间。"),("wiki","商业模式","品牌、产能和渠道构成核心竞争优势。"),("news","行业动态","行业需求温和复苏，渠道信心边际改善。")]
        if source_types:
            documents=[item for item in documents if item[0] in source_types]
        if not documents:
            return {"items":[]}
        corpus=[list(content) for _,_,content in documents]
        bm25=BM25Okapi(corpus); scores=bm25.get_scores(list(query))
        items=[]
        for (source,title,content),score in sorted(zip(documents,scores),key=lambda x:x[1],reverse=True):
            items.append({"source_type":source,"source_id":f"mock-{source}","title":title,"content":content,"score":round(float(score)+0.75,3),"metadata":{"ts_code":ts_code,"provider":"mock"}})
        return {"items":rerank_and_compress(query,items,top_k=top_k,max_chars=900)}

hybrid_retriever=HybridRetriever()
