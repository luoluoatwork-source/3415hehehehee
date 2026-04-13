from backend.agents.base_agent import BaseAgent
from backend.prompts.templates import COMPLIANCE_SYSTEM


class ComplianceAgent(BaseAgent):
    agent_name = "compliance"
    system_prompt = COMPLIANCE_SYSTEM
    use_fast_model = True

    async def run(self, session_id, task, context=None):
        context = context or {}
        creative_output = self.memory.get_agent_output(session_id, "creative")
        if creative_output:
            context["creatives_to_review"] = creative_output
        return await super().run(session_id, task, context)
