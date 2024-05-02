import express from "express";
import connectDatabase from "../database/db.js";
import * as schema from "../schema.js";
import { eq, and, or } from "drizzle-orm";
import 'dotenv/config';
import { sendMail, sendInviteMail } from "../services/mail.js";
import { generateToken, verifyToken } from "../services/auth.js";


const db = connectDatabase(process.env.DATABASE_CONNECTION_STRING);

async function createMatch(req, res) {
    const check = await checkUser(req.params.mid);
    if (check) {
        const insertres = await db.insert(schema.matches).values({
            "u_id": req.params.uid,
            "m_id": req.params.mid,
            "pref": req.params.pref,
            "status": "U"
        }).returning();
        console.log(insertres);
        res.status(200).send(insertres);
    }
    else {
        res.status(202).send("User not found");
    }
};

async function deleteMatch(req, res) {
    const deletedMatch = await db.delete(schema.matches).where(and(eq(schema.matches.u_id, req.params.uid), eq(schema.matches.m_id, req.params.mid)));
    console.log(deletedMatch);
    res.send(deletedMatch);
};

async function updateMatchPreference(req, res) {
    console.log(req.body.pref_list);
    const updateMatchPreference = await db.update(schema.matches)
        .set({ pref: req.params.pref })
        .where(and(eq(schema.matches.u_id, req.params.uid), eq(schema.matches.m_id, req.params.mid))).returning();
    console.log(updateMatchPreference);
    res.send(updateMatchPreference);
};

async function inviteUser(req, res) {
    const msgId = await sendInviteMail(req.params.email);
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
    const check = await checkUser(req.params.email.split("@")[0]);
    if (check == false) {
        const addUser = await db.insert(schema.users).values({
            "email_id": req.params.email,
            "net_id": req.params.email.split("@")[0],
            "num_invites": 0
        }).returning();
    }
    const token = generateToken(req.params.email);
    await sendMail(req.params.email, token);
}


async function checkUserRoute(req, res, u_id) {
    const result = await db.select().from(schema.users).where(eq(schema.users.net_id, req.params.uid));
    if (result.length == 0) {
        res.send(false);
        return false;
    }
    else {
        res.send(true);
        return true;
    }
}

async function checkUser(u_id) {
    const result = await db.select().from(schema.users).where(eq(schema.users.net_id, u_id));
    if (result.length == 0) {
        return false;
    }
    else {
        return true;
    }
}

async function viewFinalMatches(req, res) {
    const result = await db.select().from(schema.final_matches).where(or(eq(schema.final_matches.u_id, req.params.uid), eq(schema.final_matches.fm_id, req.params.uid)));
    if (result.length == 0) {
        res.status(202).send("No final matches found");
    }
    else {
        res.status(200).json(result);
    }
}



export { createMatch };
export { deleteMatch };
export { updateMatchPreference };
export { inviteUser };
export { viewMatches };
export { login };
export { sendMagicLink };
export { checkUserRoute };
export { viewFinalMatches };
