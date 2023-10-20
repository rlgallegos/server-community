"""adding tip amount

Revision ID: e2f30a59278d
Revises: da5a1af78db4
Create Date: 2023-10-20 18:57:01.224422

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2f30a59278d'
down_revision = 'da5a1af78db4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tip_amount', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tips', schema=None) as batch_op:
        batch_op.drop_column('tip_amount')

    # ### end Alembic commands ###
