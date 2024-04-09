"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setUserNameLogic } from "@/lib/supabase-utils/actions";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username must contain only letters, numbers, and underscores.",
    }),
});

export default function SetUsername() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastMessage = await setUserNameLogic(values);
    toast({ title: toastMessage.title, description: toastMessage.description });
    setTimeout(() => {
      router.push(`/member/${values.username}`);
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-end px-5 py-4">
        <ModeToggle />
      </div>
      <div>
        <h1 className="text-[44px]">Set your username!</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    You can&apos;t change it later.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
