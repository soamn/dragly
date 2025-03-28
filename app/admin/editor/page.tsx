"use client";
import React, { useState } from "react";
import Studio from "./studio";
import { z } from "zod";
import { toast } from "sonner";

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().min(1, "Tags are required"),
  content: z.string().min(1, "Content is required"),
});

type PostData = z.infer<typeof PostSchema>;
const page = () => {
  const [html, setHTML] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    tags?: string;
    content?: string;
  }>({});
  const data = {
    title,
    description,
    html,
    tags,
    errors,
    setHTML,
    setTitle,
    setDescription,
    setTags,
  };

  const handleSave = async () => {
    const postData: PostData = { title, description, tags, content: html };
    const validation = PostSchema.safeParse(postData);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors((prev) => ({
        ...prev,
        title: formattedErrors.title?._errors?.[0] || prev.title,
        description:
          formattedErrors.description?._errors?.[0] || prev.description,
        tags: formattedErrors.tags?._errors?.[0] || prev.tags,
        content: formattedErrors.content?._errors?.[0] || prev.content,
      }));
      return;
    }

    setErrors({});

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create post");

      toast("Post created successfully");
    } catch (error) {
      toast("Error creating post");
    }
  };

  return <Studio data={data} handleSave={handleSave} />;
};

export default page;
