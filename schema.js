import { pgTable, text, integer, pgSchema } from 'drizzle-orm/pg-core';
// export const ccDbSchema = pgSchema('db_schema');
export const users = pgTable('users', {
    email_id: text('email_id').primaryKey(),
    net_id: text('net_id').notNull(),
    avatar_id: text('avatar_id').notNull(),
    num_invites: integer('num_invites').notNull(),
});

export const invites = pgTable('invites', {
    net_id: text('net_id').primaryKey(),
});

export const matches = pgTable('matches', {
    u_id: text('u_id').notNull(),
    m_id: text('m_id').notNull(),
    pref: integer('pref').notNull(),
    status: text('status').notNull(),
});

export const final_matches = pgTable('final_matches', {
    u_id: text('u_id').notNull(),
    fm_id: text('m_id').notNull(),
});

