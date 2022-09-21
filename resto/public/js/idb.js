const dbRequest = indexedDB.open("myDB", 3);

function saveInIndexededDB(elem)
{
  console.log('entrer')
  let dbObject = indexedDB.open("myDB", 3);
    dbObject.onsuccess = (event)=>{
        let database = event.target.result;
        const tx = database.transaction("posts", "readwrite"); 
        const store = tx.objectStore("posts")
        store.add(elem);
        
    }

}

function getAllData()
{
  console.log('entrer')
  let dbObject = indexedDB.open("myDB", 3);
    dbObject.onsuccess = (event)=>{
        let database = event.target.result;
        //console.log(database);
        const tx = database.transaction("posts", 'readonly').objectStore("posts"); 
        //console.log(tx);
        const store = tx.getAll();
        store.onsuccess= (e) =>{
            console.log(e.target.result);
        }
        
    }
}
/*
dbRequest.addEventListener ("upgradeneeded", (event =>{
    console.log("Update")
    const db = event.target.result;
    const postStore = db.createObjectStore("posts",{autoIncrement:true});
    postStore.createIndex("name", "name", { unique:true});
    postStore.createIndex("description", "description", { unique:false});
    postStore.createIndex("price", "price", { unique:false});
    postStore.transaction.oncomplete = (event) =>{db.transaction("posts", "readwrite").objectStore("posts")
    
    const objectStore = transaction.objectStore("food"); 
    objectStore.createIndex("name", "Koki", { unique:true});
    objectStore.createIndex("description", "Veggi Food", { unique:false});
    objectStore.createIndex("price", "50", { unique:false});
    customerData.forEach((food) => {
    const request = objectStore.add(postStore);
    request.onsuccess = (event) => {
        console.log("Foot was added.")
    };
});

};


}));*/

dbRequest.addEventListener("success", (event) =>{
    console.log("success");
})

dbRequest.addEventListener("error", (event) =>{
    console.log(event.target.error);
})