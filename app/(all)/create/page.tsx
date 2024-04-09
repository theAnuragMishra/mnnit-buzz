"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/supabase-utils/actions";
import { lusitana } from "@/lib/font";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  title: z
    .string()
    .min(3, { message: "The title should be minimum 3 characters long." })
    .max(100),
  content: z.string().min(10),
  type: z.enum(["public", "private"]),
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= 10000000, `Max image size is 10MB.`)
  //   .refine(
  //     (file) =>
  //       ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
  //         file?.type
  //       ),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
});

export default function Create() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "public",
      // image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createPost(values);
  }

  return (
    <div>
      <h1 className={`${lusitana.className} text-5xl mb-5`}>Create</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={100} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none h-[280px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    {...field}
                    defaultValue="public"
                    orientation="horizontal"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
