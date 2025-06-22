import NextAuth from 'next-auth'
// import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcryptjs from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
	providers: [Credentials({
        async authorize(credentials) {
            const validateFields = LoginSchema.safeParse(credentials)

            if (validateFields.success) {
                const { email, password } = validateFields.data

                const user = await getUserByEmail(email)
                if(!user || !user.password) return null

                const passwordMatch = await bcryptjs.compare(password, user.password)

                if (passwordMatch) return user
            }

            return null
        }
    })],
})
