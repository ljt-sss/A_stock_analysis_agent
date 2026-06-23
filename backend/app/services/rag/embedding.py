import hashlib
class EmbeddingService:
    async def embed_text(self,text:str)->list[float]:
        seed=hashlib.sha256(text.encode()).digest()
        return [round(seed[i%len(seed)]/255,6) for i in range(1536)]
    async def embed_texts(self,texts:list[str])->list[list[float]]:
        return [await self.embed_text(t) for t in texts]
embedding_service=EmbeddingService()
