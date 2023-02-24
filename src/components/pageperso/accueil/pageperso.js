import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../assets/footer/footer";
import Menu from "../../../assets/menu/menu";
import "./pageperso.css";

function PagePerso() {
  const navigate = useNavigate();
  //on crée un tableau vide pour stocker les données du back end
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  //on va récupérer la donnée grâce au fetch
  const getPosts = async () => {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/posts?limit=15",
      options
    )
      .then((response) => {
        return response.json();
      })
      //on envoie les données du back dans la variable d'état
      .then((response) => {
        setPosts(response.posts);
      });
  };

  //au clic sur "nouvelle publication", on est redirigé vers la page "postCreation"
  const createPost = () => {
    if (localStorage.getItem("@userToken")) {
      navigate("/postCreation");
    } else {
      alert("Vous devez être connecté pour poster de nouvelles publications");
    }
  };
  //on définit la fonction du bouton "j'aime"
  const addLike = async (index) => {
    //on récupère l'id de chaque element pour pouvoir "liker"
    const postID = posts[index]._id;

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
      body: JSON.stringify({
        postId: postID,
      }),
    };

    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/post/like",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //si l'envoi des données est réussi, on stocke les likes dans une variable d'état
        if (response.success == true) {
          getPosts();
          //sinon on affiche le message d'erreur
        } else {
          alert(response.message);
        }
      });
  };
  //on stocke la valeur de la textarea dans une variable d'état
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  //on crée la fonction pour ajouter un commentaire
  const addComment = async (index) => {
    const postID = posts[index]._id;

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
      body: JSON.stringify({
        postId: postID,
        content: comment,
      }),
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/post/comment",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success == true) {
          setComment("");
          getPosts();
        } else {
          alert(response.message);
        }
      });
  };

  //on crée une fonction pour afficher les commentaires
  const [commentsOn, setCommentsOn] = useState(false);
  const showComments = () => {
    setCommentsOn(!commentsOn);
  };

  //on affiche le contenu de posts grâce au .map
  const renderPosts = () => {
    return posts.map((item, index) => {
      return (
        <div key={index} className="postRender">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <p>
            <i>
              par {item.firstname} {item.lastname}
            </i>
          </p>
          <p> Likes: {item.likes.length} </p>
          <h3>Commentaires</h3>

          {/*On ajoute une condition pour l'affichage des commentaires */}
          {commentsOn ? (
            <div className="commentsWrapper">
              {/** on fait un .map dans le .map pour pouvoir aller chercher les commentaires un par un */}
              {item.comments.map((element, index) => {
                return (
                  <p key={index}>
                    {element.content}
                    <i>
                      {" "}
                      par {element.firstname} {element.lastname}
                    </i>
                  </p>
                );
              })}
            </div>
          ) : null}

          <button id="showComments" onClick={showComments}>
            Afficher les commentaires
          </button>

          <textarea
            onChange={handleComment}
            name="newComment"
            id="newComment"
            placeholder="Ecrivez un commentaire ici"
            cols="30"
            rows="2"
          ></textarea>

          <div id="buttons">
            <button
              onClick={() => {
                addLike(index);
              }}
            >
              <i className="fa-solid fa-thumbs-up"></i> J'aime
            </button>{" "}
            <button
              onClick={() => {
                addComment(index);
              }}
            >
              <i className="fa-solid fa-comment"></i> Ajouter un commentaire
            </button>
          </div>
        </div>
      );
    });
  };

  //on récupère le contenu du back grâce à la fonction getPost
  useEffect(() => {
    getPosts();
  }, []);
  //on actualise l'affichage du console.log chaque fois que le tableau change
  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);
  return (
    <div className="publications">
      <Menu />
      <h1>Publications récentes</h1>
      <button id="createPost" onClick={createPost}>
        <i className="fa-solid fa-plus"></i> Nouvelle publication
      </button>
      <div className="postsContainer"> {renderPosts()}</div>
      <Footer />
    </div>
  );
}

export default PagePerso;
