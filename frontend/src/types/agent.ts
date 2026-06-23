export type AgentTaskStatus='pending'|'running'|'success'|'failed'|'cancelled'
export interface AgentTask{id:string;task_type:string;title:string;ts_code?:string;status:AgentTaskStatus;current_step?:string;progress:number;result?:Record<string,unknown>}

