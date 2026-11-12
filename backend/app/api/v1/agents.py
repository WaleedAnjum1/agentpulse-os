import json
from fastapi import APIRouter, HTTPException, Depends
from sse_starlette.sse import EventSourceResponse
from app.schemas.agent import AgentTaskCreateRequest, AgentTaskResponse
from app.services.orchestrator import orchestrator

router = APIRouter()

@router.post("/run-stream")
async def run_agent_task_stream(request: AgentTaskCreateRequest):
    """
    Spawns an autonomous multi-agent task and streams live thought-traces,
    tool executions, and the final deliverable via Server-Sent Events (SSE).
    """
    async def event_generator():
        async for data in orchestrator.execute_task_stream(request):
            yield {"event": data.get("event", "message"), "data": json.dumps(data)}

    return EventSourceResponse(event_generator())

@router.get("/task/{task_id}", response_model=AgentTaskResponse)
async def get_task_status(task_id: str):
    task = orchestrator.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

