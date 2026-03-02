'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: SignInProps) => {
    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession({
            email,
            password
        });
        
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(session);
    } catch (error) {
        console.error('SignIn Error:', error);
        throw error;
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName, address1, city, state, postalCode, dateOfBirth } = userData;
   
    if (!firstName || !lastName) {
        throw new Error('First name and last name are required for signup');
    }

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        
        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
} 

export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession("current");

    cookies().delete("appwrite-session");

    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
}