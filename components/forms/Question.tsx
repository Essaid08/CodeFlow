"use client"
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion } from '@/lib/actions/question.action';
import { useRouter , usePathname } from 'next/navigation';


interface Props {
    mongoUserId : string
}

const type : string = 'create'

const Question = ({mongoUserId} : Props) => {
    const editorRef = useRef(null);
    const [isSubmiting , setIsSubmiting] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            title: "",
            explanation: '',
            tags: []
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof QuestionSchema>) {
        setIsSubmiting(true)
        try {
            await createQuestion({
                title : values.title ,
                content : values.explanation ,
                tags : values.tags ,
                author : JSON.parse(mongoUserId)
            })
            router.push('/')
        } catch (error) {
            
        }finally{
            setIsSubmiting(false)
        }
    }

    const handleInputKeyDow = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault()
            const tagInput = e.target as HTMLInputElement
            const tagValue = tagInput.value.trim()

            if (tagValue !== '') {
                if (tagValue.length > 15) {
                    return form.setError('tags', {
                        type: 'required',
                        message: 'Tag must be less then 15 charachters'
                    })
                }

                if (!field.value.includes(tagValue as never)) {
                    form.setValue('tags', [...field.value, tagValue])
                    tagInput.value = ''
                    form.clearErrors('tags')
                }
            } else {
                form.trigger()
            }
        }
    }
    const handleRemoveTag = (tag : string , field : any) => {
        const newTag = field.value.filter((t : string) => t !== tag)
        form.setValue('tags' , newTag)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="pargraph-semibold text-dark400_light800">
                                Question Title <span className=" text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 
                                    light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Be spicefic and imagine you're asking a qution to another persone
                            </FormDescription>
                            <FormMessage className=" text-red-500 " />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="pargraph-semibold text-dark400_light800">
                                Detailed explanation of your problem <span className=" text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                {/*editor component */}
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                    onInit={(evt, editor) => {
                                        // @ts-ignore
                                        editorRef.current = editor
                                    }}
                                    onBlur={field.onBlur}
                                    onEditorChange={(content) => field.onChange(content)}
                                    initialValue=""
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link',
                                            'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                                            'visualblocks', 'codesample', 'fullscreen',
                                            'insertdatetime', 'media', 'table']
                                        ,
                                        toolbar: 'undo redo | ' +
                                            'codesample | bold italic forecolor | alignleft aligncenter |' +
                                            'alignright alignjustify | bullist numlist',
                                        content_style: 'body { font-family:Inter; font-size:16px }'
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                introduce the problem and expand on what you put in the title .minumum 20 characters.
                            </FormDescription>
                            <FormMessage className=" text-red-500 " />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="pargraph-semibold text-dark400_light800">
                                Tags <span className=" text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <>
                                    <Input
                                        className="no-focus paragraph-regular background-light900_dark300 
                                    light-border-2 text-dark300_light700 min-h-[56px] border"
                                        placeholder="Add Tags..."
                                        onKeyDown={e => handleInputKeyDow(e, field)}
                                    />

                                    {field.value.length > 0 && (
                                        <div className='flex-start mt-2.5 gap-2.5'>
                                            {field.value.map((tag: any) => (
                                                <Badge
                                                    className='subtle-medium background-light800_dark300 text-light400_light500
                                                    flex items-center justify-center gap-2 rounded-md border-none
                                                    px-4 py-2 capitalize'
                                                    key={tag}
                                                    onClick={() => handleRemoveTag(tag , field)}
                                                >
                                                    {tag}
                                                    <Image
                                                        src='/assets/icons/close.svg'
                                                        alt='close'
                                                        width={12}
                                                        height={12}
                                                        className=' cursor-pointer object-contain invert-0 dark:invert'
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add up to 3 tags to describe what your question is about . You need to press
                                enter to add a tag.
                            </FormDescription>
                            <FormMessage className=" text-red-500 " />
                        </FormItem>
                    )}
                />
                <Button
                    disabled = {isSubmiting}
                    className=' primary-gradient w-fit !text-light-900'
                    type="submit"
                >
                    { isSubmiting ? (
                        <>
                            {type === 'edit' ? 'Editing...' : 'Posting...'}
                        </>
                    ) : (
                        <>
                            {type === 'edit' ? 'Edit Question' : 'Ask a Question'}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default Question