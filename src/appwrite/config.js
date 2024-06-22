import config from "../config/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)   //
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            const result = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,  // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

            return result;
        }   catch(error){
            console.log(error);
            throw error;
        }     
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        }catch(error){
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        }catch(error){
            throw error;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        }catch(error){
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ],
                // queries
            );
        }catch(error){
            throw error;
        }
    }

    //file services  (file is image in this case)
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){  //url deta h 
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;