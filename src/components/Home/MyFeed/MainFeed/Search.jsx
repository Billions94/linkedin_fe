import "../../styles.css"

const Search = () => {


    const fetchPost = async () => {
        let information = fetchType === "people" ? "profile" : "posts"
        try {
          const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/${information}/`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.ok) {
            console.log(response);
            const post =  await response.json();
            console.log(post);
          }
        } catch (e) {
          console.error(e);
        }
      };



      return (
          <>
          </>
      )
}

export default Search