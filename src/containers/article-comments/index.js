import {useDispatch, useSelector as useReduxSelector} from "react-redux";
import useSelector from "../../hooks/use-selector";
import CommentsTree from "../../components/comments-tree";
import {memo, useCallback, useState} from "react";
import AddCommentForm from "../../components/add-comment-form";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import AuthMessage from "../../components/auth-message";
import commentsActions from "../../store-redux/comments/actions";
import PropTypes from "prop-types";

function ArticleComments(props) {

  const [openReplyForm, setOpenReplyForm] = useState(null);

  const dispatch = useDispatch();

  const callbacks = {
    onOpenReplyForm: useCallback((id) => {
      setOpenReplyForm(id)
    }, []),
    onCloseReplyForm: useCallback(() => setOpenReplyForm(null), []),
    onSendComment: useCallback((comment) => {
      dispatch(commentsActions.sendComment(props.id, comment))
    }, [props.id]),
    onReplyComment: useCallback((id, reply) => {
      dispatch(commentsActions.sendReply(id, reply));
      setOpenReplyForm(null);
    }, [props.id])
  }

  const selectRedux = useReduxSelector(state => ({
    comments: state.comments
  }));

  const select = useSelector(state => ({
    session: state.session
  }));

  return (
    <Spinner active={selectRedux.comments.waiting}>
      <CommentsTree
        sessionId={select.session.user._id || ""}
        comments={selectRedux.comments.data}
        isAuth={select.session.exists}
        count={selectRedux.comments.data.length}
        onCloseReplyForm={callbacks.onCloseReplyForm}
        onOpenReplyForm={callbacks.onOpenReplyForm}
        currentReplyFormId={openReplyForm}
        onReply={callbacks.onReplyComment}
      />
      {select.session.exists ? !openReplyForm && <AddCommentForm onSubmit={callbacks.onSendComment} /> : !openReplyForm && <AuthMessage />}
    </Spinner>
  )
}

ArticleComments.propTypes = {
  id: PropTypes.string
}

export default memo(ArticleComments)