import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../Posts/PostSlice";
import { useEffect } from "react";
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { Card,CardHeader,CardBody,CardTitle} from 'reactstrap';
const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => 
            <div key={post.id}>
            <Card className='m-5 '>
                <CardHeader
                    style={{
                        backgroundColor: '',
                        borderColor: 'black'
                    }}
                    tag='h3' className='text-center'>{post.title}</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">  {post.body}</CardTitle>
                    <CardTitle tag="h5">  {post.content}</CardTitle>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </CardBody>
            </Card>
            
            </div>
            )
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList









