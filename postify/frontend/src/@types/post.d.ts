interface User {
    id: number
    username: string
    name: string
    email: string
    profile_image: string | null
}

interface LikeOrDislike {
    id: number
    user: User
    created_at: string
}

interface Comment {
    id: number
    user: User
    comment: string
    created_at: string
    updated_at: string
}

interface Post {
    id: number
    user: User
    likes: LikeOrDislike[]
    deslikes: LikeOrDislike[]
    comments: Comment[]
    caption: string
    image: string
    is_active: boolean
    created_at: string
    updated_at: string
    excluded_at: string | null
}

export default Post
