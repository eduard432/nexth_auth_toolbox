'use client'

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { RegisterSchema } from '@/schemas'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			register(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonLabel="Alredy have an account?"
			backButtonHref="/auth/login"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="john.doe@example.com"
											type="email"
										></Input>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="John Doe"
											type="text"
										></Input>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="*********"
											type="password"
										></Input>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Register
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
