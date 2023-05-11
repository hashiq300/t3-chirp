import React from 'react'
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
            {posts.map(post => (

                <div className="border-b p-8 border-slate-400" key={post.id}>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default PostView
