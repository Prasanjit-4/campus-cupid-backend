import express from "express";
import connectDatabase from "../database/db.js";
import * as schema from "../schema.js";
import { eq, and } from "drizzle-orm";
import 'dotenv/config';
import { sendMail } from "../services/mail.js";
import { generateToken, verifyToken } from "../services/auth.js";


const db = connectDatabase(process.env.DATABASE_CONNECTION_STRING);

async function createMatch(req, res) {
    const insertres = await db.insert(schema.matches).values(req.body).returning();
    console.log(insertres);
    res.send(req.body);
};

async function deleteMatch(req, res) {
    const deletedMatch = await db.delete(schema.matches).where(and(eq(schema.matches.u_id, req.body.u_id), eq(schema.matches.m_id, req.body.m_id)));
    console.log(deletedMatch);
    res.send(deletedMatch);
};

async function updateMatchPreference(req, res) {
    const updateMatchPreference = await db.update(schema.matches)
        .set({ pref: req.body.pref })
        .where(and(eq(schema.matches.u_id, req.body.u_id), eq(schema.matches.m_id, req.body.m_id))).returning();
    console.log(updateMatchPreference);
    res.send(updateMatchPreference);
};

async function inviteUser(req, res) {
    const msgId = await sendMail(req.body.email);
    console.log(msgId);
    res.send(msgId);
};

async function viewMatches(req, res) {
    console.log(req.body.u_id);
    const result = await db.select().from(schema.matches).where(eq(schema.matches.u_id, req.body.u_id));
    console.log(result);
    res.json(result);
}

async function login(req, res) {
    const decoded = verifyToken(req.body.token);
    res.send(decoded);
}

async function sendMagicLink(req, res) {
    const token = generateToken(req.body.email);
    await sendMail(req.body.email, token);
    res.send(token);
}

export { createMatch };
export { deleteMatch };
export { updateMatchPreference };
export { inviteUser };
export { viewMatches };
export { login };
export { sendMagicLink };
