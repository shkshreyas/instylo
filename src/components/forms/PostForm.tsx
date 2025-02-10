import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader, Loader } from "@/components/shared";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  const handleSubmit = async (values: z.infer<typeof PostValidation>) => {
    if (values.file.length === 0 && !post) {
      toast({
        title: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      if (post && action === "Update") {
        const updatedPost = await updatePost({
          ...values,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
        });

        if (!updatedPost) {
          toast({
            title: `${action} post failed. Please try again.`,
            variant: "destructive",
          });
          return;
        }

        return navigate(`/posts/${post.$id}`);
      }

      const newPost = await createPost({
        ...values,
        userId: user.id,
      });

      if (!newPost) {
        toast({
          title: `${action} post failed. Please try again.`,
          variant: "destructive",
        });
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
      <div className="max-w-5xl w-full">
        <div className="flex gap-3 items-center justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/gallery-add.svg"
            width={36}
            height={36}
            alt="post"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">
            {action} Post
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-9 w-full max-w-5xl mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}>
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Caption</FormLabel>
                    <FormControl>
                      <Textarea
                        className="shad-textarea custom-scrollbar min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Add Photos</FormLabel>
                    <FormControl>
                      <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={post?.imageUrl}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Add Location</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full bg-dark-4 rounded-xl px-4">
                        <img
                          src="/assets/icons/location.svg"
                          width={24}
                          height={24}
                          alt="location"
                        />
                        <Input
                          type="text"
                          className="shad-input border-none focus:border-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">
                      Add Tags (separated by comma " , ")
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full bg-dark-4 rounded-xl px-4">
                        <img
                          src="/assets/icons/tag.svg"
                          width={24}
                          height={24}
                          alt="tags"
                        />
                        <Input
                          placeholder="Art, Expression, Learn"
                          type="text"
                          className="shad-input border-none focus:border-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingCreate || isLoadingUpdate}>
                {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                {action} Post
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default PostForm;
