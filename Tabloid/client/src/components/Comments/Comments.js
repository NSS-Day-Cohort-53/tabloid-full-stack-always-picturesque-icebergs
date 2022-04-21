import { getPostWithComments } from "../../modules/postManager";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

export const Comments = () => {
  const [postWithComments, setPostWithComments] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPostWithComments(id).then((pwc) => setPostWithComments(pwc));
  }, [id]);

  return (
    <>
      <h2>{postWithComments.title}</h2>
      <div>
        {postWithComments.comments?.length ? (
          <ListGroup>
            {postWithComments.comments?.map((c) => {
              return (
                <ListGroupItem key={c.id}>
                  {c.subject} {c.content}{" "}
                  <b>
                    Created by {c.userDisplayName} on {c.createDateTime}
                  </b>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        ) : (
          <div>There are no comments for this post</div>
        )}
      </div>
      <div>
        <Link to={`/posts/${postWithComments.id}`}>
          <button>Return to Post</button>
        </Link>
      </div>
    </>
  );
};
