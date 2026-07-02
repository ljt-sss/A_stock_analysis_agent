"""Add agent checkpoint table."""
from alembic import op
import sqlalchemy as sa


revision = "0002_agent_checkpoint"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    if sa.inspect(bind).has_table("agent_checkpoint"):
        indexes = {item["name"] for item in sa.inspect(bind).get_indexes("agent_checkpoint")}
        if "ix_agent_checkpoint_task_order" not in indexes:
            op.create_index("ix_agent_checkpoint_task_order", "agent_checkpoint", ["task_id", "step_order"])
        return
    op.create_table(
        "agent_checkpoint",
        sa.Column("task_id", sa.UUID(), nullable=False),
        sa.Column("step_name", sa.String(length=128), nullable=False),
        sa.Column("step_order", sa.Integer(), nullable=False),
        sa.Column("state", sa.JSON(), nullable=False),
        sa.Column("output", sa.JSON(), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.ForeignKeyConstraint(["task_id"], ["agent_task.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_agent_checkpoint_task_order", "agent_checkpoint", ["task_id", "step_order"])


def downgrade():
    bind = op.get_bind()
    if not sa.inspect(bind).has_table("agent_checkpoint"):
        return
    op.drop_index("ix_agent_checkpoint_task_order", table_name="agent_checkpoint")
    op.drop_table("agent_checkpoint")
