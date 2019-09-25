import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'addBlogPost':
      return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }]
    case 'editBlogPost':
      return state.map(blogPost => {
        if (blogPost.id === action.payload.id) {
          blogPost.title = action.payload.title;
          blogPost.content = action.payload.content;
        };
        return blogPost;
      })
    case 'deleteBlogPost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    default:
      return state;
  }
}

const addBlogPost = dispatch => {
  return (title, content, cb) => {
    dispatch({ type: 'addBlogPost', payload: { title, content } });
    cb();
  }
}

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: 'deleteBlogPost', payload: id })
  }
}

const editBlogPost = dispatch => {
  return (id, title, content, cb) => {
    dispatch({ type: 'editBlogPost', payload: { title, content, id } });
    cb();
  }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost, editBlogPost }, [{ id: Math.floor(Math.random() * 99999), title: "Test Post", content: "Test Content" }])