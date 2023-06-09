import PropTypes from "prop-types";
import CommentCard from "../comment-card";
import {Fragment, memo, useCallback} from "react";
import './style.css';

function CommentsTree({ comments, onReply, onOpenReplyForm, onCloseReplyForm, currentReplyFormId, count, isAuth, sessionId }) {

  const renders = {
    renderComment: useCallback((comment, parentLevel) => {
      const { _id, children } = comment;
      let level = parentLevel + 1;

      if (level > 9) {
        level = 9;
      }

      return (
        <Fragment key={_id}>
          <CommentCard
            my={comment.author._id === sessionId}
            isAuth={isAuth}
            onOpen={onOpenReplyForm}
            onClose={onCloseReplyForm}
            level={level}
            data={comment}
            showForm={_id === currentReplyFormId}
            onReply={onReply}
          />
          {children.length > 0 &&
            children.map((child) => renders.renderComment(child, level))
          }
        </Fragment>
      );
    }, [currentReplyFormId, isAuth, comments])
  }

  return (
    <div className="CommentsTree">
      <span className={'CommentsTree-title'}>Комментариев ({count})</span>
      {comments.map(comment => renders.renderComment(comment, 0))}
    </div>
  );
}

CommentsTree.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    dateCreate: PropTypes.string,
    children: PropTypes.array
  })),
  count: PropTypes.number,
  currentReplyFormId: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  isAuth: PropTypes.bool,
  onReply: PropTypes.func,
  sessionId: PropTypes.string
};

export default memo(CommentsTree);
