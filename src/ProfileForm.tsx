"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Validation schema

const formSchema = z.object({
  ProjectName: z.string().min(3, { message: "Project name is too short" }),
  OwnerName: z.string().min(3, { message: "Owner name is too short" }),
  TeamName: z.string().min(3, { message: "Team name is too short" }),
  Environment: z.enum(["Development", "Testing", "Production"]),
  PreferredCloud: z.enum(["AWS", "Azure", "GCP"]),
})

// Define TypeScript interface for form data
type ProfileFormData = z.infer<typeof formSchema>

// Create a reusable FormSelect component
interface FormSelectProps {
  label: string
  name: keyof ProfileFormData
  options: {
    label: string,
    value: string
  }[]
  control: any
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, control }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <select {...field} className="input w-full border rounded-md p-2">
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

// Organize form fields configuration
const formFields = [
  {
    name: "ProjectName",
    label: "Project Name",
    placeholder: "My Awesome Project",
    type: "input",
  },
  {
    name: "OwnerName",
    label: "Owner Name",
    placeholder: "Jane Doe",
    type: "input",
  },
  {
    name: "TeamName",
    label: "Team Name",
    placeholder: "Awesome-team",
    type: "input",
  },
]

export function ProfileForm() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProjectName: "",
      OwnerName: "",
      TeamName: "",
      Environment: undefined,
      PreferredCloud: undefined,
    },
  })

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data)
    // Handle form submission logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Render input fields */}
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof ProfileFormData}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Render select fields */}
        <FormSelect
          label="Environment"
          name="Environment"
          control={form.control}
          options={[
            { label: "Development", value: "Development" },
            { label: "Testing", value: "Testing" },
            { label: "Production", value: "Production" },
          ]}
        />

        <FormSelect
          label="Preferred Cloud"
          name="PreferredCloud"
          control={form.control}
          options={[
            { label: "AWS", value: "AWS" },
            { label: "Azure", value: "Azure" },
            { label: "GCP", value: "GCP" },
          ]}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
