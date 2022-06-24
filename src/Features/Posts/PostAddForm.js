import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUserSelectors } from '../Users/UserSlice';
import { addNewPost } from './PostSlice';

import { Form, FormGroup, Input, Button, Label, Col } from 'reactstrap';

const PostAddForm = () => {
    const dispatch = useDispatch();
    const userData = useSelector(allUserSelectors);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const usersOption = userData.map((user) =>
        <option key={user.id} value={user.id}>{user.name}</option>
    )

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
    const handleTitleChange = useCallback((e) => { setTitle(e.target.value) }, []);
    const handleContentChange = useCallback((e) => { setContent(e.target.value) }, []);
    const handleAuthorChange = useCallback((e) => { setUserId(e.target.value) }, []);




    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({  title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }, [canSave, content, dispatch, title, userId])

    return (
        <>
           
            <div className='m-3 p-5 border'>
                <h3 className='text-center'>Create Post </h3>
                <Form onSubmit={handleSubmit} row='true' >
                  
                    <FormGroup >
                        <Label className="me-sm-2" sm={2}>Title</Label>
                        <Col sm={10}>
                            <Input type='text' placeholder='Heading...' onChange={handleTitleChange} value={title} />
                        </Col>
                    </FormGroup>
                    <FormGroup >
                        <Label className='me-sm-2' sm={2}>Cotent</Label>
                        <Col sm={10}>
                            <Input type='text' placeholder='Description...' onChange={handleContentChange} value={content} />
                        </Col>
                    </FormGroup>

                    <Label className='me-sm-2'>Select Author</Label>
                    <FormGroup >
                        <Col sm={10}>
                            <Input
                                type="select"
                                onChange={handleAuthorChange}
                                value={userId}
                            >
                                <option>Select</option>
                                {usersOption}

                            </Input>
                            <Button className='btn-success mt-3 ' type='submit' disabled={!canSave} >submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}

export default PostAddForm;