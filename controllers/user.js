import express from "express";
import connectDatabase from "../database/db.js";
import * as schema from "../schema.js";
import { eq, and } from "drizzle-orm";
import 'dotenv/config';
import { sendMail } from "../services/mail.js";
import { generateToken, verifyToken } from "../services/auth.js";


const db = connectDatabase(process.env.DATABASE_CONNECTION_STRING);

async function createMatch(req, res) {
    const insertres = await db.insert(schema.matches).values({
        "u_id": req.params.uid,
        "m_id": req.params.mid,
        "pref": req.params.pref,
        "status": req.params.status
    }).returning();
    console.log(insertres);
    res.send(insertres);
};

async function deleteMatch(req, res) {
    const deletedMatch = await db.delete(schema.matches).where(and(eq(schema.matches.u_id, req.params.u_id), eq(schema.matches.m_id, req.params.m_id)));
    console.log(deletedMatch);
    res.send(deletedMatch);
};

async function updateMatchPreference(req, res) {
    const updateMatchPreference = await db.update(schema.matches)
        .set({ pref: req.params.pref })
        .where(and(eq(schema.matches.u_id, req.params.uid), eq(schema.matches.m_id, req.params.mid))).returning();
    console.log(updateMatchPreference);
    res.send(updateMatchPreference);
};

async function inviteUser(req, res) {
    const msgId = await sendMail(req.params.email);
    console.log(msgId);
    res.send(msgId);
};

async function viewMatches(req, res) {
    const result = await db.select().from(schema.matches).where(eq(schema.matches.u_id, req.params.uid));
    console.log(result);
    res.json(result);
}

async function login(req, res) {
    const decoded = verifyToken(req.params.token);
    res.send(decoded);
}

async function sendMagicLink(req, res) {
    const token = generateToken(req.params.email);
    await sendMail(req.params.email, token);
}

export { createMatch };
export { deleteMatch };
export { updateMatchPreference };
export { inviteUser };
export { viewMatches };
export { login };
export { sendMagicLink };
