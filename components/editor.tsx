"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// types
import type { EditorProps, Post } from "@/lib/types";
// api
import { patchPost, patchComment } from "@/app/(server)/api";
// components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  body: z
    .string()
    .min(10, {
      message: "Text must be at least 10 characters.",
    })
    .max(500, {
      message: "Text must be at most 500 characters.",
    }),
});

export function Editor(props: EditorProps) {
  const { editType, post, comment, comments } = props;
  const [data, setData] = useState(editType === "post" ? post! : comment!);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: data.body || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsDirty(false);
    if (values.body === data?.body) return;

    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        body: values.body,
      };
    });

    let result = { ok: false };

    if (editType === "post") {
      result = await patchPost({
        ...post,
        body: values.body,
      } as Post);
    } else if (editType === "comment") {
      const updatedComments =
        comments!.map((c) => {
          if (c.id === comment?.id) {
            return {
              ...c,
              body: values.body,
            };
          }
          return c;
        }) || [];
      result = await patchComment(comment!.postId, updatedComments);
    }

    if (!result.ok) {
      toast.error(`Failed to update ${editType} ${data?.id}`, {
        description:
          "Sorry, we couldn't submit your changes. Please try again later.",
      });
    } else {
      toast.success(`${editType} ${data?.id} updated successfully`, {
        description: "Your changes have been saved.",
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-16">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="my-8">
            <DrawerTitle className="capitalize text-2xl">
              Edit {editType} #{data?.id}
            </DrawerTitle>
            <DrawerDescription className="text-lg">
              {!!data && (editType === "post" ? data.title : data.name)}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                  id="editor-form"
                >
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Pencil />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            onInput={() => !isDirty && setIsDirty(true)}
                            placeholder="Write something..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Press enter to submit your {editType}.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DrawerFooter>
            <div className="flex justify-between my-12">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button type="submit" form="editor-form" disabled={!isDirty}>
                Submit
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Editor;
