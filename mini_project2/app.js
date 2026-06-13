let categories =
JSON.parse(localStorage.getItem("categories"))
|| ["Personal"];

let notes =
JSON.parse(localStorage.getItem("notes"))
|| [];

let selectedCategory = "Personal";

function renderCategories(){

    const list =
    document.getElementById("categoryList");

    list.innerHTML = "";

    categories.forEach(category=>{

        const li =
        document.createElement("li");

        li.textContent = "📁 " + category;

        li.onclick = ()=>{

            selectedCategory = category;
            renderNotes();
        };

        list.appendChild(li);
    });
}

function addCategory(){

    const input =
    document.getElementById("categoryInput");

    if(input.value.trim()==="") return;

    categories.push(input.value.trim());

    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );

    input.value="";

    renderCategories();
}

function formatText(command){
    document.execCommand(command,false,null);
}

function saveNote(){

    const title =
    document.getElementById("title").value;

    const tags =
    document.getElementById("tags").value;

    const content =
    document.getElementById("editor").innerHTML;

    if(title.trim()===""){
        alert("Enter note title");
        return;
    }

    notes.push({
        title,
        tags,
        content,
        category:selectedCategory,
        date:new Date().toLocaleString()
    });

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    document.getElementById("title").value="";
    document.getElementById("tags").value="";
    document.getElementById("editor").innerHTML="";

    renderNotes();
}

function renderNotes(){

    const container =
    document.getElementById("notesContainer");

    container.innerHTML="";

    notes
    .filter(note =>
    note.category===selectedCategory)

    .forEach(note=>{

        const card =
        document.createElement("div");

        card.className="note-card";

        card.innerHTML=`
        <h3>${note.title}</h3>

        <div class="note-content">
            ${note.content}
        </div>

        <div class="note-tags">
            🏷️ ${note.tags}
        </div>

        <div class="note-category">
            ${note.category}
        </div>

        <div class="note-date">
            ${note.date}
        </div>
        `;

        container.appendChild(card);
    });
}

renderCategories();
renderNotes();