const apiKey='cd75ed413e93467789c8235def1cd704';

const blogContainer = document.getElementById("blog-container");
const SearchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=24&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch(error){
        console.log("Error in fetching some Random News ",error); 
        return [];
    }
}

searchButton.addEventListener("click",async()=>{
    const query = SearchField.value.trim()
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.log("Error in fetching searched News ",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch(error){
        console.log("Error in fetching some Random News ",error); 
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article)=>{
        const blogCard =document.createElement("div");
        blogCard.classList.add("blog-card");
        const img =document.createElement("img");
        img.src=article.urlToImage;
        img.alt=article.title;
        const title =document.createElement("h2");
        const truncateTitle=article.title.length > 30 ? article.title.slice(0,30) + "...." : article.title;
        title.textContent=truncateTitle; 
        const description =document.createElement("p");
        //const truncateDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent=article.description;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
    })
}


//Used IIFE(Immediately invoked Function Expression)
(async () =>{
    try{
        const article = await fetchRandomNews();
        displayBlogs(article);
    }
    catch(error){
        console.log("Error in fetching some Random News ",error)
    }
})()