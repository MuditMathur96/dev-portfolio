import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase.config"


export async function getAll<T>(collectionName:string):Promise<T[]|null>{
    try{

        const collectionRef = collection(db,collectionName);
        const q = query( collectionRef,
            where('active', '==', true)

        );

        const snapShot = await getDocs(q);
        const data:T[] = [];

        snapShot.forEach((doc)=>{
            const tempData = {id:doc.id,...doc.data()};
            data.push(tempData as T);
        });

       // console.log("from get all",data);

        return data;



    }catch(error:unknown){
        console.log("Error: ",(error as {message:string}).message);
        return null;
    }
}

export async function createAsync<T>(data:T,collectionName:string):Promise<string | null>{

    try{

        const collectionRef  = collection(db,collectionName);

        const docRef = await addDoc(collectionRef,{
            ...data,
            createdAt:Timestamp.now(),
            updatedAt:Timestamp.now()
        });

        console.log("Data saved with Id",docRef.id);
        return docRef.id;


    }catch(error:unknown){
        console.log("Error: ", (error as {message:string}).message);   
        return null;
    }



}


export async function getByIdAsync<T>(id:string,collectionName:string):Promise<T | null>{
    try{
        const docRef = doc(db,collectionName,id);

        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const data = {id:docSnap.id,...docSnap.data()};
            return data as T;
        }else{
            throw Error("Data entry with give Id does not exist");
            
        }


    }catch(error:unknown){

        console.log("Error: ",(error as {message:string}).message);
        return null;

    }
}

export async function getByUserIdAsync<T>(userId:string,collectionName:string):Promise<T[]|null>{
    try{

        const collectionRef = collection(db,collectionName);
        const q = query( collectionRef,
            where('userId', '==', userId)

        );

        const snapShot = await getDocs(q);
        const data:T[] = [];

        snapShot.forEach((doc)=>{
            const tempData = {id:doc.id,...doc.data()};
            data.push(tempData as T);
        });

        return data;



    }catch(error:unknown){
        console.log("Error: ",(error as {message:string}).message);
        return null;
    }
}

export async function updateAsync<T>(id:string,data:T,collectionName:string):Promise<void>{

    try{

        //remove any id filed
        if(data && typeof data === "object" &&  "id" in data){
            delete data.id;
        };

        const docRef = doc( db,collectionName,id);
        await updateDoc(docRef,{
            ...data,
            updatedAt:Timestamp.now()
        });



    }catch(error){
        console.log("Error: ",(error as {message:string}).message);
    }



}


// DELETE - Delete a document
export async function deleteAsync(id:string,collectionName:string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};



