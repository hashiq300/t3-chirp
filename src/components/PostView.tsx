/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { convertCreatedAt } from '~/lib/dateFns';
import type { RouterOutputs } from '~/utils/api'

type PostViewProps = {
    posts: RouterOutputs["post"]["getAll"] | null | undefined;
}

const PostView = ({ posts }: PostViewProps) => {
    if (!posts) return null;
    if (posts.length === 0) return (
        <>
            <h1 className='text-center mt-4 text-2xl'>No Posts</h1>
        </>
    );
    return (
        <div
            className="flex flex-col"
        >
            {[...posts, ...posts].map(post => (

                <div className="border-b p-8 border-slate-400 flex gap-7" key={post.id}>
                    <img src={post.author.profileImageUrl} alt={post.author.username} className="w-10 h-10 rounded-full" />
                    <div>
                        <h3 className='text-lg mb-3 text-slate-300 flex items-center'>{post.author.username} · <span className='ml-2 text-sm'>{convertCreatedAt(post.createdAt) + " ago"}</span>
                        </h3>
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default PostView
