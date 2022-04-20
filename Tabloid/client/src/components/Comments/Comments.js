import { getPostWithComments } from "../../modules/postManager";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Comments = () => {
  const [postWithComments, setPostWithComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPostWithComments(id).then((pwc) => setPostWithComments(pwc));
  }, [id]);

  return (
    <>
      <h1>{postWithComments.Title}</h1>
      <div>
        <ul>
          {postWithComments.Comments.map((c) => {
            return (
              <li>{`${c.Subject}  ${c.Content}  Created by ${c.UserDisplayName} ${c.CreateDateTime}`}</li>
            );
          })}
        </ul>
      </div>
      <div>
        <Link to={`/posts/${postWithComments.id}`}>
          <button>Return to Post</button>
        </Link>
      </div>
    </>
  );
};
