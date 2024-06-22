import React, { useCallback, useState , useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select } from '../index'


//addPost and EditPosts(props => post)
//postCard => image and title card
export default function PostForm({ post }){
    const [image, setImage] = useState(null);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
                //delete prev image
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                data.image = file.$id;
                const dbPost = await service.createPost({ ...data, userId: userData.$id, featuredImage: data.image });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    //if title is Hello world => slug - hello-world
    //will use slug in url instead of ids
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return '';
    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} /> {/*defaultValue in case we are updating */}
            </div>

            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="mb-4"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status: "
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type='submit'
                    bgColor={post ? "bg-green-500" : undefined}
                    className='w-full'
                >{post ? "Update" : "Submit"}
                </Button>

            </div>

        </form>
    )
}

