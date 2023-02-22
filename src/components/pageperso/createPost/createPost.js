import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createPost.css";

function CreatePost(props) {
  //on stocke le contenu du formulaire dans une variable d'état
  const [postContent, setPostContent] = useState({});
  //on sauvegarde le hooks "useNavigate" dans une variable navigate
  const navigate = useNavigate();
  //on garde en mémoire les valeurs des inputs, grâce au "name"
  const saveContent = (e) => {
    setPostContent({ ...postContent, [e.target.name]: e.target.value });
    console.log("postContent", postContent);
  };
  //quand on valide le formulaire
  const sendPost = async (e) => {
    e.preventDefault();
    //on paramètre les options du fetch
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //on va chercher le token dans le local storage
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
      body: JSON.stringify({
        title: postContent.title,
        content: postContent.commentaire,
      }),
    };

    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/dev-factory/post`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //si la requête est validée, on envoie un message pour indiquer que la publication est en ligne, puis on retourne sur pageperso
        console.log("response", response);
        if (response.success == true) {
          alert("Votre nouvelle publication sera bientôt visible");
          navigate("/pageperso");
          //sinon on affiche le message d'erreur
        } else {
          alert(response.message);
        }
      });
  };

  return (
    <div className="newPost">
      <h1>Nouvelle publication</h1>
      <form className="postContent" value={postContent}>
        <input
          onChange={saveContent}
          type="text"
          placeholder="Titre de la publication"
          name="title"
        />
        <textarea
          onChange={saveContent}
          name="commentaire"
          id="commentaire"
          cols="60"
          rows="10"
          placeholder="Votre contenu"
        ></textarea>

        <input type="submit" onClick={sendPost} value="Publier" />
      </form>
    </div>
  );
}

export default CreatePost;
