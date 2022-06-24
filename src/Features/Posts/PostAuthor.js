import React from 'react';
import { useSelector } from "react-redux";
import { allUserSelectors } from "../Users/UserSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(allUserSelectors);
    const author = users?.find(user => user.id === userId);
    return (<>
    <span>
        <h6 className='text-success' > Posted By <span className='text-black'> {author ? author.name : `unknown`} </span> </h6> 
    </span>
    </>)
}

export default PostAuthor;
