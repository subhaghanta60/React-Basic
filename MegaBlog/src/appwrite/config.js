import conf from "../config/config";
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Service {
    client = new Client();
    Databases;
    bucket;

    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        console.log(userId);
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }

            )
            
        } catch (error) {
            console.log("Appwrite Service :: Create Post :: Error",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            console.log("Appwrite Service :: Update Post :: Error",error)
            
        }

    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite Service :: Delete Post :: Error",error)
            return false;
        }
    }

    async getPostByID (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite Service :: Get Post :: Error",error)
            return false;
        }

    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )

            
        } catch (error) {
            console.log("Appwrite Service :: Get All Post :: Error",error)
            return false;
        }
    }

    //File Upload Method
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite Service :: Upload File :: Error",error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite Service :: Delete File :: Error",error)
            return false;
        }

    }

    getFilePreview(fileId){
       const ImgURL = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        
        return ImgURL.href;
    }

}


const service =new Service();

export default service;