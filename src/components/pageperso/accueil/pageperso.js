import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../assets/menu/menu";
import "./pageperso.css";

function PagePerso() {
  const navigate = useNavigate();
  //on crée un tableau vide pour stocker les données du back end
  const [posts, setPosts] = useState([]);

  //on va récupérer la donnée grâce au fetch
  const getPosts = async () => {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/posts?limit=5",
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
    console.log("postID", postID);

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
    console.log("options", options);
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/post/like",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
        console.log("posts.likes", posts[index].likes);
        //si l'envoi des données est réussi, on stocke les likes dans une variable d'état
        if (response.success == true) {
          getPosts();
          //sinon on affiche le message d'erreur
        } else {
          alert(response.message);
        }
      });
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
              Par {item.firstname} {item.lastname}
            </i>
          </p>
          <p>Nombre de likes: {item.likes.length} </p>
          <button
            onClick={() => {
              addLike(index);
            }}
          >
            J'aime
          </button>{" "}
          <button>Ajouter un commentaire</button>
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
    <div className="postRender">
      <Menu />
      <h1>Publications récentes</h1>
      <button onClick={createPost}>Nouvelle publication</button>
      {renderPosts()}
    </div>
  );
}

export default PagePerso;
