class LlamaIndexAdapter:
    enabled=False
    async def retrieve(self,*args,**kwargs):
        raise NotImplementedError("LlamaIndex adapter is reserved for a future provider.")
