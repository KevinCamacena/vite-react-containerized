"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ProjectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Project" {...field} />
              </FormControl>        
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="OwnerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
            control={form.control}
            name="TeamName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                    <Input placeholder="Awesome-team" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="Environment"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Environment</FormLabel>
                    <FormControl>
                        <select {...field} className="input w-full border rounded-md p-2">
                            <option value="Development">Development</option>
                            <option value="Testing">Testing</option>
                            <option value="Production">Production</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="PreferredCloud"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cloud</FormLabel>
                    <FormControl>
                        <select {...field} className="input w-full border rounded-md p-2">
                            <option value="AWS">AWS</option>
                            <option value="Azure">Azure</option>
                            <option value="GCP">GCP</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
